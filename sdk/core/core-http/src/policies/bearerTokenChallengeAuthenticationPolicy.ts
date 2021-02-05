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

/**
 * Creates a new BearerTokenChallengeAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the bearer token.
 * @param scopes - The scopes for which the bearer token applies.
 */
export function bearerTokenChallengeAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(
    credential,
    scopes,
    timeBetweenRefreshAttemptsInMs
  );

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenChallengeAuthenticationPolicy(nextPolicy, options, tokenCache, tokenRefresher);
    }
  };
}

/**
 * Represents a policy that handles challenges.
 */
export abstract class BaseChallengePolicy extends BaseRequestPolicy {
  /**
   * Allows configuration on the request before its sent.
   */
  protected prepareRequest?(webResource: WebResourceLike): Promise<void>;

  /**
   * Tries to retrieve the challenge.
   */
  protected getChallenge?(response: HttpOperationResponse): string | void;

  /**
   * Authorizes request according to an authentication challenge.
   */
  protected processChallenge?(_webResource: WebResourceLike): Promise<boolean>;
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class BearerTokenChallengeAuthenticationPolicy extends BaseChallengePolicy {
  /**
   * Local cache of the access token.
   */
  protected tokenCache: AccessTokenCache;

  /**
   * Optimization on the refreshing of tokens.
   */
  protected tokenRefresher: AccessTokenRefresher;

  /**
   * Creates a new BearerTokenChallengeAuthenticationPolicy object.
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
    tokenCache: AccessTokenCache,
    tokenRefresher: AccessTokenRefresher
  ) {
    super(nextPolicy, options);
    this.tokenCache = tokenCache;
    this.tokenRefresher = tokenRefresher;
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  protected async loadToken(webResource: WebResource, accessToken?: string): Promise<void> {
    if (!accessToken) {
      accessToken = await this.getToken({
        abortSignal: webResource.abortSignal,
        tracingOptions: {
          spanOptions: webResource.spanOptions
        }
      });
    }

    if (accessToken) {
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${accessToken}`);
    }
  }

  /**
   * Tries to retrieve the challenge.
   */
  protected getChallenge(response: HttpOperationResponse): string | void {
    const challenges = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenges) {
      return challenges;
    }
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    await this.loadToken(webResource);
    if (this.prepareRequest) {
      await this.prepareRequest(webResource);
    }

    const response = await this._nextPolicy.sendRequest(webResource);

    if (this.getChallenge(response) && this.processChallenge && await this.processChallenge(webResource)) {
      return this._nextPolicy.sendRequest(webResource);
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

  /**
   * Tries to retrieve the token from the cache, otherwise tries to refresh the token.
   */
  protected async getToken(options: GetTokenOptions): Promise<string | undefined> {
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
