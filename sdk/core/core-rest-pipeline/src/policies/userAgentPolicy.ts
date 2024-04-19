// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { getUserAgentHeaderName, getUserAgentValue } from "../util/userAgent.js";

const UserAgentHeaderName = getUserAgentHeaderName();

/**
 * The programmatic identifier of the userAgentPolicy.
 */
export const userAgentPolicyName = "userAgentPolicy";

/**
 * Options for adding user agent details to outgoing requests.
 */
export interface UserAgentPolicyOptions {
  /**
   * String prefix to add to the user agent for outgoing requests.
   * Defaults to an empty string.
   */
  userAgentPrefix?: string;
}

/**
 * A policy that sets the User-Agent header (or equivalent) to reflect
 * the library version.
 * @param options - Options to customize the user agent value.
 */
export function userAgentPolicy(options: UserAgentPolicyOptions = {}): PipelinePolicy {
  const userAgentValue = getUserAgentValue(options.userAgentPrefix);
  return {
    name: userAgentPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(UserAgentHeaderName)) {
        request.headers.set(UserAgentHeaderName, userAgentValue);
      }
      return next(request);
    },
  };
}
