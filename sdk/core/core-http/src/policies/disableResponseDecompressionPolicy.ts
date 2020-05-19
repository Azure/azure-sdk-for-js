// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
import { WebResource } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";

/**
 * Returns a request policy factory that can be used to create an instance of
 * {@link DisableResponseDecompressionPolicy}.
 */
export function disableResponseDecompressionPolicy(): {
  create: (
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ) => DisableResponseDecompressionPolicy;
} {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new DisableResponseDecompressionPolicy(nextPolicy, options);
    }
  };
}

/**
 * A policy to disable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */
export class DisableResponseDecompressionPolicy extends BaseRequestPolicy {
  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.decompressResponse = false;
    return this._nextPolicy.sendRequest(request);
  }
}
