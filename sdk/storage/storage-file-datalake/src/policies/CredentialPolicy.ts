// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BaseRequestPolicy, HttpOperationResponse, WebResource } from "@azure/core-http";

/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 *
 * @export
 * @abstract
 * @class CredentialPolicy
 * @extends {BaseRequestPolicy}
 */
export abstract class CredentialPolicy extends BaseRequestPolicy {
  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof CredentialPolicy
   */
  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(this.signRequest(request));
  }

  /**
   * Child classes must implement this method with request signing. This method
   * will be executed in {@link sendRequest}.
   *
   * @protected
   * @abstract
   * @param {WebResource} request
   * @returns {WebResource}
   * @memberof CredentialPolicy
   */
  protected signRequest(request: WebResource): WebResource {
    // Child classes must override this method with request signing. This method
    // will be executed in sendRequest().
    return request;
  }
}
