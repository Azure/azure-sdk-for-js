// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseRequestPolicy } from "./RequestPolicy";
import {
  WebResourceLike as WebResource,
  CompatResponse as HttpOperationResponse,
} from "@azure/core-http-compat";

/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 */
export abstract class CredentialPolicy extends BaseRequestPolicy {
  /**
   * Sends out request.
   *
   * @param request -
   */
  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(this.signRequest(request));
  }

  /**
   * Child classes must implement this method with request signing. This method
   * will be executed in {@link sendRequest}.
   *
   * @param request -
   */
  protected signRequest(request: WebResource): WebResource {
    // Child classes must override this method with request signing. This method
    // will be executed in sendRequest().
    return request;
  }
}
