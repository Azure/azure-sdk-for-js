// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from './requestPolicy';
import { WebResource } from '../webResource';
import { HttpOperationResponse } from '../httpOperationResponse';

export function disableResponseDecompressionPolicy() {
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
   * Creates an instance of CompressPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof CompressPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.decompressResponse = false;
    return this._nextPolicy.sendRequest(request);
  }
}
