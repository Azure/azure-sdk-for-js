// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";

/**
 * Options for how HTTP connections should be maintained for future
 * requests.
 */
export interface KeepAliveOptions {
  /*
   * When true, connections will be kept alive for multiple requests.
   * Defaults to true.
   */
  enable: boolean;
}

export const DefaultKeepAliveOptions: KeepAliveOptions = {
  enable: true
};

export function keepAlivePolicy(keepAliveOptions?: KeepAliveOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new KeepAlivePolicy(nextPolicy, options, keepAliveOptions || DefaultKeepAliveOptions);
    }
  };
}

/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 */
export class KeepAlivePolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of KeepAlivePolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {KeepAliveOptions} [keepAliveOptions]
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private readonly keepAliveOptions: KeepAliveOptions
  ) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResourceLike} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof KeepAlivePolicy
   */
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    request.keepAlive = this.keepAliveOptions.enable;
    return this._nextPolicy.sendRequest(request);
  }
}
