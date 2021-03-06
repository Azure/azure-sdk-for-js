// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders } from "../httpHeaders";
import { WebResourceLike } from "../webResource";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../credentials/accessTokenCache";
import { AccessTokenRefresher } from "../credentials/accessTokenRefresher";

/**
 * The automated token refresh will only start to happen at the
 * expiration date minus the value of timeBetweenRefreshAttemptsInMs,
 * which is by default 30 seconds.
 */
const timeBetweenRefreshAttemptsInMs = 30000;

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

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenAuthenticationPolicy(nextPolicy, options, tokenCache, tokenRefresher);
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
  private token: AccessToken | undefined;

  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param credential - The TokenCredential implementation that can supply the bearer token.
   * @param scopes - The scopes for which the bearer token applies.
   * @param tokenCache - The cache for the most recent AccessToken returned from the TokenCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private tokenCache: AccessTokenCache,
    private tokenRefresher: AccessTokenRefresher
  ) {
    super(nextPolicy, options);
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
    if (token) {
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);
    }
    return this._nextPolicy.sendRequest(webResource);
  }

  private async getToken(options: GetTokenOptions): Promise<string | undefined> {
    // We reset the cached token in a time window before it expires,
    // after that point, we retry the refresh of the token only if the token refresher is ready.

    let token = this.tokenCache.getCachedToken();
    let refreshPromise: Promise<AccessToken | undefined> | undefined;
    if (!token && this.tokenRefresher.isReady()) {
      refreshPromise = this.tokenRefresher.refresh(options);
    }

    // We don't use the local copy if the token cache has a token that has an expiration date greater than the local copy.
    if (this.token && this.token.expiresOnTimestamp > (token?.expiresOnTimestamp || 0)) {
      token = this.token;
    }

    // If we don't have a token, or if the token has expired, we wait for the refresh promise
    if (!token || token.expiresOnTimestamp < Date.now()) {
      token = await refreshPromise;
    }

    // We save the token we were able to retrieve.
    this.tokenCache.setCachedToken(token);
    this.token = token;

    return token ? token.token : undefined;
  }
}
