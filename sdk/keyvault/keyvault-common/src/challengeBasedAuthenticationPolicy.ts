// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential } from "@azure/core-http";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory,
} from "@azure/core-http";
import { Constants } from "@azure/core-http";
import { HttpOperationResponse } from "@azure/core-http";
import { WebResource } from "@azure/core-http";
import { AccessTokenCache, ExpiringAccessTokenCache } from "@azure/core-http";

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
  constructor(public authorization: string, public scope: string) {}

  /**
   * Checks that this AuthenticationChallenge is equal to another one given.
   * Only compares the scope.
   * This is exactly what C# is doing, as we can see here:
   * https://github.com/Azure/azure-sdk-for-net/blob/70e54b878ff1d01a45266fb3674a396b4ab9c1d2/sdk/keyvault/Azure.Security.KeyVault.Shared/src/ChallengeBasedAuthenticationPolicy.cs#L143-L147
   * @param other The other AuthenticationChallenge
   */
  public equalTo(other: AuthenticationChallenge | undefined) {
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

  public setCachedChallenge(challenge: AuthenticationChallenge) {
    this.challenge = challenge;
  }
}

/**
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the challenge token.
 */
export function challengeBasedAuthenticationPolicy(
  credential: TokenCredential
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const challengeCache = new AuthenticationChallengeCache();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ChallengeBasedAuthenticationPolicy(
        nextPolicy,
        options,
        credential,
        tokenCache,
        challengeCache
      );
    },
  };
}

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate string value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `, ` or ` `.
  const parts = wwwAuthenticate.split(/,* +/);
  // Then we only keep the strings with an equal sign after a word and before a quote.
  // also splitting these sections by their equal sign
  const keyValues = parts.reduce<string[][]>(
    (parts, str) => (str.match(/\w="/) ? [...parts, str.split("=")] : parts),
    []
  );
  // Then we transform these key-value pairs back into an object.
  const parsed = keyValues.reduce<ParsedWWWAuthenticate>(
    (result, [key, value]: string[]) => ({
      ...result,
      [key]: value.slice(1, -1),
    }),
    {}
  );
  return parsed;
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class ChallengeBasedAuthenticationPolicy extends BaseRequestPolicy {
  private parseWWWAuthenticate: (
    wwwAuthenticate: string
  ) => ParsedWWWAuthenticate = parseWWWAuthenticate;

  /**
   * Creates a new ChallengeBasedAuthenticationPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The TokenCredential implementation that can supply the bearer token.
   * @param tokenCache The cache for the most recent AccessToken returned by the TokenCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private credential: TokenCredential,
    private tokenCache: AccessTokenCache,
    private challengeCache: AuthenticationChallengeCache
  ) {
    super(nextPolicy, options);
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  private async loadToken(webResource: WebResource): Promise<void> {
    let accessToken = this.tokenCache.getCachedToken();

    // If there's no cached token in the cache, we try to get a new one.
    if (accessToken === undefined) {
      const receivedToken = await this.credential.getToken(this.challengeCache.challenge!.scope);
      accessToken = receivedToken || undefined;
      this.tokenCache.setCachedToken(accessToken);
    }

    if (accessToken) {
      webResource.headers.set(
        Constants.HeaderConstants.AUTHORIZATION,
        `Bearer ${accessToken.token}`
      );
    }
  }

  /**
   * Parses the given WWW-Authenticate header, generates a new AuthenticationChallenge,
   * then if the challenge is different from the one cached, resets the token and forces
   * a re-authentication, otherwise continues with the existing challenge and token.
   * @param wwwAuthenticate Value of the incoming WWW-Authenticate header.
   * @param webResource Ongoing HTTP request.
   */
  private async regenerateChallenge(
    wwwAuthenticate: string,
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    // The challenge based authentication will contain both:
    // - An authorization URI with a token,
    // - The resource to which that token is valid against (also called the scope).
    const parsedWWWAuth = this.parseWWWAuthenticate(wwwAuthenticate);
    const authorization = parsedWWWAuth.authorization!;
    const resource = parsedWWWAuth.resource! || parsedWWWAuth.scope!;

    if (!(authorization && resource)) {
      return this._nextPolicy.sendRequest(webResource);
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
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource Ongoing HTTP request.
   */
  public async sendRequest(webResource: WebResource): Promise<HttpOperationResponse> {
    // Ensure that we're about to use a secure connection.
    if (!webResource.url.startsWith("https:")) {
      throw new Error("The resource address for authorization must use the 'https' protocol.");
    }

    // The next request will happen differently whether we have a challenge or not.
    let response: HttpOperationResponse;

    if (this.challengeCache.challenge == undefined) {
      // If there's no challenge in cache, a blank body will start the challenge.
      const originalBody = webResource.body;
      webResource.body = "";
      response = await this._nextPolicy.sendRequest(webResource);
      webResource.body = originalBody;
    } else {
      // If we did have a challenge in memory,
      // we attempt to load the token from the cache into the request before we try to send the request.
      await this.loadToken(webResource);
      response = await this._nextPolicy.sendRequest(webResource);
    }

    // If we don't receive a response with a 401 status code,
    // then we can assume this response has nothing to do with the challenge authentication process.
    if (response.status !== 401) {
      return response;
    }

    // If the response status is 401, we only re-authenticate if the WWW-Authenticate header is present.
    const wwwAuthenticate = response.headers.get("WWW-Authenticate");
    if (!wwwAuthenticate) {
      return response;
    }

    // We re-generate the challenge and see if we have to re-authenticate.
    return await this.regenerateChallenge(wwwAuthenticate, webResource);
  }
}
