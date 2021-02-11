// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "../../src";

/**
 * Mock
 *
 * @class MockPolicy
 * @extends {BaseRequestPolicy}
 */
export class MockPolicy extends BaseRequestPolicy {
  private responseHeaders?: { [key: string]: any };
  /**
   * Creates an instance of MockPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof MockPolicy
   */
  public constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    responseHeaders: { [key: string]: any } = {}
  ) {
    super(nextPolicy, options);
    this.responseHeaders = responseHeaders;
  }

  /**
   * Sends request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof InjectorPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request).then((res) => {
      res.parsedHeaders = { ...res.parsedHeaders, ...this.responseHeaders };
      return res;
    });
  }
}
