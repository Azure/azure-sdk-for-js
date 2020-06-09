// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { getUserAgentHeaderName, setPlatformSpecificData } from "../util/userAgent";
import { SDK_VERSION } from "../constants";

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
 * @param options Options to customize the user agent value.
 */
export function userAgentPolicy(options: UserAgentPolicyOptions = {}): PipelinePolicy {
  const defaultAgent = getDefaultUserAgentValue();
  const prefix = options.userAgentPrefix;
  const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
  return {
    name: userAgentPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(UserAgentHeaderName)) {
        request.headers.set(UserAgentHeaderName, userAgentValue);
      }
      return next(request);
    }
  };
}

function getUserAgentString(telemetryInfo: Map<string, string>): string {
  const parts: string[] = [];
  for (const [key, value] of telemetryInfo) {
    const token = value ? `${key}/${value}` : key;
    parts.push(token);
  }
  return parts.join(" ");
}

export function getDefaultUserAgentValue(): string {
  const runtimeInfo = new Map<string, string>();
  runtimeInfo.set("core-http", SDK_VERSION);
  setPlatformSpecificData(runtimeInfo);
  const userAgent = getUserAgentString(runtimeInfo);
  return userAgent;
}
