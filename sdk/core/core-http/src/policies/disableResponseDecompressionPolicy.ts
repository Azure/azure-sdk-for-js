// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";

/**
 * Returns a request policy factory that can be used to create an instance of
 * {@link DisableResponseDecompressionPolicy}.
 */
export function disableResponseDecompressionPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new DisableResponseDecompressionPolicy(nextPolicy, options);
    },
  };
}

/**
 * A policy to disable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */
export class DisableResponseDecompressionPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of DisableResponseDecompressionPolicy.
   *
   * @param nextPolicy -
   * @param options -
   */
  // The parent constructor is protected.
  /* eslint-disable-next-line @typescript-eslint/no-useless-constructor */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param request -
   * @returns
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.decompressResponse = false;
    return this._nextPolicy.sendRequest(request);
  }
}
