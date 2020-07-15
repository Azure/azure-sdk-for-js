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
 * Creates a new BearerTokenAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the bearer token.
 * @param scopes The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenAuthenticationPolicy(
        nextPolicy,
        options,
        credential,
        scopes,
        tokenCache
      );
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
  private tokenRefresher: AccessTokenRefresher;

  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The TokenCredential implementation that can supply the bearer token.
   * @param scopes The scopes for which the bearer token applies.
   * @param tokenCache The cache for the most recent AccessToken returned from the TokenCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private credential: TokenCredential,
    private scopes: string | string[],
    private tokenCache: AccessTokenCache
  ) {
    super(nextPolicy, options);
    const requiredMillisecondsBeforeNewRefresh = 30000;
    this.tokenRefresher = new AccessTokenRefresher(
      this.credential,
      this.scopes,
      requiredMillisecondsBeforeNewRefresh
    );
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource
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
    return this._nextPolicy.sendRequest(webResource);
  }

  private async getToken(options: GetTokenOptions): Promise<string | undefined> {
    let accessToken = this.tokenCache.getCachedToken();
    if (accessToken === undefined) {
      // Triggering or waiting for the next refresh
      // only if the cache is unable to retrieve the access token,
      // which means that it has expired, or it has never been set.
      const refreshPromise = this.tokenRefresher.refresh(options);
      if (refreshPromise !== null) {
        accessToken = await refreshPromise;
      }
    } else {
      // If we still have a cached access token,
      // then attempt to refresh without waiting.
      const refreshPromise = this.tokenRefresher.refresh(options);
      // If the tokenRefresher returned null, some other refresh is happening already.
      // if this is a new refresh, we set it up to update the cachedToken once it finishes.
      if (refreshPromise !== null) {
        refreshPromise.then((accessToken: AccessToken | undefined) => {
          this.tokenCache.setCachedToken(accessToken);
        });
      }
    }

    return accessToken ? accessToken.token : undefined;
  }
}
