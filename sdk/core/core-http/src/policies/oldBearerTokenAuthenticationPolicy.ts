// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";

import { AccessTokenCache } from "../credentials/accessTokenCache";
import { AccessTokenRefresher } from "../credentials/accessTokenRefresher";

import { HttpHeaders } from "../httpHeaders";
import { HttpOperationResponse } from "../httpOperationResponse";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { Constants } from "../util/constants";

/**
 * A warning to visitors of this file:
 *
 * This is the old implementation of BearerTokenAuthenticationPolicy, which we
 * no longer use internally. It is preserved for the sake of maintaining API
 * compatibility, as we exposed this internal class through the API surface.
 * In hindsight, this was likely a mistake, so the new implementation of this
 * policy (in `bearerTokenAuthenticationPolicy.ts`) is not exported through
 * the package index.
 *
 * You are encouraged not to use this implementation.
 */

/**
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request as
 * a Bearer token.
 *
 * @see bearerTokenAuthenticationPolicy - Use `bearerTokenAuthenticationPolicy`
 * to create a policy factory instead of instantiating this class directly.
 */
export class BearerTokenAuthenticationPolicy extends BaseRequestPolicy {
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
    webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);
    return this._nextPolicy.sendRequest(webResource);
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
