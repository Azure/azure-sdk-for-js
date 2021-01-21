// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions } from "@azure/core-auth";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders } from "../httpHeaders";
import { WebResource, WebResourceLike } from "../webResource";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../credentials/accessTokenCache";
import { AccessTokenRefresher } from "../credentials/accessTokenRefresher";

/**
 * The automated token refresh will only start to happen at the
 * expiration date minus the value of timeBetweenRefreshAttemptsInMs,
 * which is by default 30 seconds.
 */
const timeBetweenRefreshAttemptsInMs = 30000;

type ValidParsedWWWAuthenticateProperties =
  // "authorization_uri" was used in the track 1 version of KeyVault.
  // This is not a relevant property anymore, since the service is consistently answering with "authorization".
  // | "authorization_uri"
  | "authorization"
  // Even though the service is moving to "scope", both "resource" and "scope" should be supported.
  | "resource"
  | "scope";

type ParsedWWWAuthenticate = {
  [Key in ValidParsedWWWAuthenticateProperties]?: string;
};

/**
 * Representation of the Authentication Challenge
 */
export class AuthenticationChallenge {
  constructor(public authorization: string, public scope: string) { }

  /**
   * Checks that this AuthenticationChallenge is equal to another one given.
   * Only compares the scope.
   * This is exactly what C# is doing, as we can see here:
   * https://github.com/Azure/azure-sdk-for-net/blob/70e54b878ff1d01a45266fb3674a396b4ab9c1d2/sdk/keyvault/Azure.Security.KeyVault.Shared/src/ChallengeBasedAuthenticationPolicy.cs#L143-L147
   * @param other - The other AuthenticationChallenge
   */
  public equalTo(other: AuthenticationChallenge | undefined): boolean {
    return other
      ? this.scope.toLowerCase() === other.scope.toLowerCase() &&
      this.authorization.toLowerCase() === other.authorization.toLowerCase()
      : false;
  }
}

/**
 * Helps keep a copy of any previous authentication challenges,
 * so that we can compare on any further request.
 */
export class AuthenticationChallengeCache {
  public challenge?: AuthenticationChallenge;

  public setCachedChallenge(challenge: AuthenticationChallenge): void {
    this.challenge = challenge;
  }
}

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `, ` or ` `.
  const parts = wwwAuthenticate.split(/,* +/);
  // Then we only keep the strings with an equal sign after a word and before a quote.
  // also splitting these sections by their equal sign
  const keyValues = parts.reduce<string[][]>(
    (acc, str) => (str.match(/\w="/) ? [...acc, str.split("=")] : acc),
    []
  );
  // Then we transform these key-value pairs back into an object.
  const parsed = keyValues.reduce<ParsedWWWAuthenticate>(
    (result, [key, value]: string[]) => ({
      ...result,
      [key]: value.slice(1, -1)
    }),
    {}
  );
  return parsed;
}

/**
 * Creates a new BearerTokenAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the bearer token.
 * @param scopes - The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(
    credential,
    scopes,
    timeBetweenRefreshAttemptsInMs
  );
  const challengeCache = new AuthenticationChallengeCache();


  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenAuthenticationPolicy(nextPolicy, options, tokenCache, challengeCache, tokenRefresher);
    }
  };
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class BearerTokenAuthenticationPolicy extends BaseRequestPolicy {
  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param scopes - The scopes for which the bearer token applies.
   * @param tokenCache - The cache for the most recent AccessToken returned from the TokenCredential.
   * @param tokenRefresher - The AccessToken refresher.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private tokenCache: AccessTokenCache,
    private challengeCache: AuthenticationChallengeCache,
    private tokenRefresher: AccessTokenRefresher
  ) {
    super(nextPolicy, options);
  }

  /**
   * Executed in the event a 401 response with a WWW-Authenticate authentication challenge header is received after the initial request.
   */
  protected async handleChallenge(webResource: WebResourceLike, response: HttpOperationResponse): Promise<HttpOperationResponse> {
    const headerValue = response.headers.get("WWW-Authenticate");
    if (response.status !== 401 || !headerValue) return response;

    const challengeMatches = parseWWWAuthenticate(headerValue);
    const authorization = challengeMatches.authorization!;
    const resource = challengeMatches.resource! || challengeMatches.scope!;

    if (!(authorization && resource)) {
      return response;
    }

    const challenge = new AuthenticationChallenge(authorization, resource + "/.default");

    // Either if there's no cached challenge at this point (could have happen in parallel),
    // or if the cached challenge has a different scope,
    // we store the just received challenge and reset the cached token, to force a re-authentication.
    if (!this.challengeCache.challenge?.equalTo(challenge)) {
      this.challengeCache.setCachedChallenge(challenge);
      this.tokenCache.setCachedToken(undefined);
    }

    await this.loadToken(webResource);
    return this._nextPolicy.sendRequest(webResource);
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  private async loadToken(webResource: WebResource): Promise<void> {
    let accessToken = this.getToken({
      abortSignal: webResource.abortSignal,
      tracingOptions: {
        spanOptions: webResource.spanOptions
      }
    });

    if (accessToken) {
      webResource.headers.set(
        Constants.HeaderConstants.AUTHORIZATION,
        `Bearer ${accessToken}`
      );
    }
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    const token = await this.getToken({
      abortSignal: webResource.abortSignal,
      tracingOptions: {
        spanOptions: webResource.spanOptions
      }
    });
    webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);

    const response = await this._nextPolicy.sendRequest(webResource);

    if (response.status === 401 && response.headers.get("WWW-Authenticate")) {
      return this.handleChallenge(webResource, response);
    }

    return response;
  }

  /**
   * Attempts a token update if any other time related conditionals have been reached based on the tokenRefresher class.
   */
  private async updateTokenIfNeeded(options: GetTokenOptions): Promise<void> {
    if (this.tokenRefresher.isReady()) {
      const accessToken = await this.tokenRefresher.refresh(options);
      this.tokenCache.setCachedToken(accessToken);
    }
  }

  private async getToken(options: GetTokenOptions): Promise<string | undefined> {
    let accessToken = this.tokenCache.getCachedToken();
    if (accessToken === undefined) {
      // Waiting for the next refresh only if the cache is unable to retrieve the access token,
      // which means that it has expired, or it has never been set.
      accessToken = await this.tokenRefresher.refresh(options);
      this.tokenCache.setCachedToken(accessToken);
    } else {
      // If we still have a cached access token,
      // And any other time related conditionals have been reached based on the tokenRefresher class,
      // then attempt to refresh without waiting.
      this.updateTokenIfNeeded(options);
    }

    return accessToken ? accessToken.token : undefined;
  }
}
