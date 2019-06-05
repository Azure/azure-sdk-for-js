// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential } from "../credentials/tokenCredential";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders, } from "../httpHeaders";
import { WebResource } from "../webResource";

/**
 * Creates a new BearerTokenAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the bearer token.
 * @param scopes The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(credential: TokenCredential, scopes: string[]): RequestPolicyFactory {
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
    const token = await this.credential.getToken(
      this.scopes,
      webResource.abortSignal
    );
    webResource.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `Bearer ${token}`
    );
    return this._nextPolicy.sendRequest(webResource);
  }
}
