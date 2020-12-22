// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationTokenCredential } from "@azure/communication-common";
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
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential The CommunicationTokenCredential implementation that can supply the user credential.
 */
export const createCommunicationTokenCredentialPolicy = (
  credential: CommunicationTokenCredential
): RequestPolicyFactory => ({
  create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new CommunicationTokenCredentialPolicy(nextPolicy, options, credential);
  }
});

/**
 *
 * Provides a RequestPolicy that can request a token from a CommunicationTokenCredential
 * implementation and then apply it to the Authorization header of a request.
 *
 * @internal
 */
export class CommunicationTokenCredentialPolicy extends BaseRequestPolicy {
  /**
   * Creates a new CommunicationTokenCredentialPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The CommunicationTokenCredential implementation that can supply the user credential.
   * @param tokenCache The cache for the most recent AccessToken returned from the CommunicationTokenCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private readonly credential: CommunicationTokenCredential
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
