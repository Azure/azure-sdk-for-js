// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, AccessToken, GetTokenOptions } from "../credentials/tokenCredential";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders, } from "../httpHeaders";
import { WebResource } from "../webResource";

export const TokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes

/**
 * Creates a new BearerTokenAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the bearer token.
 * @param scopes The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(credential: TokenCredential, scopes: string | string[]): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenAuthenticationPolicy(nextPolicy, options, credential, scopes);
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
  private cachedToken: AccessToken | undefined = undefined;

  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The TokenCredential implementation that can supply the bearer token.
   * @param scopes The scopes for which the bearer token applies.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private credential: TokenCredential,
    private scopes: string | string[],
  ) {
    super(nextPolicy, options);
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource
   */
  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    const token = await this.getToken({
      abortSignal: webResource.abortSignal
    });
    webResource.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `Bearer ${token}`
    );
    return this._nextPolicy.sendRequest(webResource);
  }

  private async getToken(options: GetTokenOptions): Promise<string | undefined> {
    if (
      this.cachedToken &&
      Date.now() + TokenRefreshBufferMs < this.cachedToken.expiresOnTimestamp
    ) {
      return this.cachedToken.token;
    }

    this.cachedToken = (await this.credential.getToken(this.scopes, options)) || undefined;
    return this.cachedToken ? this.cachedToken.token : undefined;
  }
}
