// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the keepAlivePolicy.
 */
export const keepAlivePolicyName = "keepAlivePolicy";

/**
 * Options for how HTTP connections should be maintained for future
 * requests.
 */
export interface KeepAlivePolicyOptions {
  /**
   * When true, connections will be kept alive for multiple requests.
   * Defaults to true.
   */
  enable?: boolean;
}

/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 */
export function keepAlivePolicy(
  options: KeepAlivePolicyOptions = { enable: true }
): PipelinePolicy {
  return {
    name: keepAlivePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.keepAlive = options.enable;
      return next(request);
    }
  };
}
