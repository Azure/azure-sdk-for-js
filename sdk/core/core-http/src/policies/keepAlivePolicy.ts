// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

/**
 * Options for how HTTP connections should be maintained for future
 * requests.
 */
export interface KeepAliveOptions {
  /**
   * When true, connections will be kept alive for multiple requests.
   * Defaults to true.
   */
  enable: boolean;
}

/**
 * By default, HTTP connections are maintained for future requests.
 */
export const DefaultKeepAliveOptions: KeepAliveOptions = {
  enable: true,
};

/**
 * Creates a policy that controls whether HTTP connections are maintained on future requests.
 * @param keepAliveOptions - Keep alive options. By default, HTTP connections are maintained for future requests.
 * @returns An instance of the {@link KeepAlivePolicy}
 */
export function keepAlivePolicy(keepAliveOptions?: KeepAliveOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new KeepAlivePolicy(nextPolicy, options, keepAliveOptions || DefaultKeepAliveOptions);
    },
  };
}

/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 */
export class KeepAlivePolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of KeepAlivePolicy.
   *
   * @param nextPolicy -
   * @param options -
   * @param keepAliveOptions -
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
   * @param request -
   * @returns
   */
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    request.keepAlive = this.keepAliveOptions.enable;
    return this._nextPolicy.sendRequest(request);
  }
}
