// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUserCredential } from "@azure/communication-common";
import {
  Constants,
  HttpOperationResponse,
  WebResourceLike,
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "@azure/core-http";

/**
 * Creates a new CommunicationUserCredentialPolicy factory.
 *
 * @param credential The CommunicationUserCredential implementation that can supply the user credential.
 */
export const createCommunicationUserCredentialPolicy = (
  credential: CommunicationUserCredential
): RequestPolicyFactory => ({
  create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new CommunicationUserCredentialPolicy(nextPolicy, options, credential);
  }
});

/**
 *
 * Provides a RequestPolicy that can request a token from a CommunicationUserCredential
 * implementation and then apply it to the Authorization header of a request.
 *
 * @internal
 */
export class CommunicationUserCredentialPolicy extends BaseRequestPolicy {
  /**
   * Creates a new CommunicationUserCredentialPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The CommunicationUserCredential implementation that can supply the user credential.
   * @param tokenCache The cache for the most recent AccessToken returned from the CommunicationUserCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private readonly credential: CommunicationUserCredential
  ) {
    super(nextPolicy, options);
  }

  /**
   * Applies the user credential to the request through the Authorization header.
   * @param webResource
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    const token = (await this.credential.getToken())?.token;
    webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);
    return this._nextPolicy.sendRequest(webResource);
  }
}
