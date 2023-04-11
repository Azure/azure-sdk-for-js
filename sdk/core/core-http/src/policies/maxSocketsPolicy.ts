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
 * Options for how many concurrent sockets the HTTP agent can have open.
 */
export interface MaxSocketsOptions {
  /**
   * The number of concurrent sockets the agent can have open per host.
   * Unset by default, corresponding to Infinity. Node.js only.
   */
  perHost?: number;

  /**
   * The total number of concurrent sockets the agent can have open.
   * Unset by default, corresponding to Infinity. Node.js only.
   */
  total?: number;
}

/**
 * By default, no limit is set on the maximum number of sockets.
 */
export const DefaultMaxSocketsOptions: MaxSocketsOptions = {};

/**
 * Creates a policy that controls the maximum number of concurrent sockets the
 * HTTP agent can have open per host and in total.
 * @param maxSocketsOptions - Max sockets options. By default, these options
 * are unset, corresponding to "no limit". Node.js.
 * @returns An instance of {@link MaxSocketsOptions}
 */
export function maxSocketsPolicy(maxSocketsOptions?: MaxSocketsOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new MaxSocketsPolicy(
        nextPolicy,
        options,
        maxSocketsOptions || DefaultMaxSocketsOptions
      );
    },
  };
}

/**
 * MaxSocketsPolicy is a policy used to configure the maximum number of
 * concurrent sockets for HTTP agents.
 */
export class MaxSocketsPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private readonly maxSocketsOptions: MaxSocketsOptions
  ) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request
   */
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    request.maxSockets = this.maxSocketsOptions.perHost;
    request.maxTotalSockets = this.maxSocketsOptions.total;
    return this._nextPolicy.sendRequest(request);
  }
}
