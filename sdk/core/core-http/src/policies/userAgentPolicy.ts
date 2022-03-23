// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { getDefaultUserAgentKey, getPlatformSpecificData } from "./msRestUserAgentPolicy";
import { Constants } from "../util/constants";
import { HttpHeaders } from "../httpHeaders";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

/**
 * Telemetry information. Key/value pairs to include inside the User-Agent string.
 */
export type TelemetryInfo = { key?: string; value?: string };

/**
 * Options for adding user agent details to outgoing requests.
 */
export interface UserAgentOptions {
  /**
   * String prefix to add to the user agent for outgoing requests.
   * Defaults to an empty string.
   */
  userAgentPrefix?: string;
}

function getRuntimeInfo(): TelemetryInfo[] {
  const msRestRuntime = {
    key: "core-http",
    value: Constants.coreHttpVersion,
  };

  return [msRestRuntime];
}

function getUserAgentString(
  telemetryInfo: TelemetryInfo[],
  keySeparator = " ",
  valueSeparator = "/"
): string {
  return telemetryInfo
    .map((info) => {
      const value = info.value ? `${valueSeparator}${info.value}` : "";
      return `${info.key}${value}`;
    })
    .join(keySeparator);
}

export const getDefaultUserAgentHeaderName = getDefaultUserAgentKey;

/**
 * The default approach to generate user agents.
 * Uses static information from this package, plus system information available from the runtime.
 */
export function getDefaultUserAgentValue(): string {
  const runtimeInfo = getRuntimeInfo();
  const platformSpecificData = getPlatformSpecificData();
  const userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
  return userAgent;
}

/**
 * Returns a policy that adds the user agent header to outgoing requests based on the given {@link TelemetryInfo}.
 * @param userAgentData - Telemetry information.
 * @returns A new {@link UserAgentPolicy}.
 */
export function userAgentPolicy(userAgentData?: TelemetryInfo): RequestPolicyFactory {
  const key: string =
    !userAgentData || userAgentData.key === undefined || userAgentData.key === null
      ? getDefaultUserAgentKey()
      : userAgentData.key;
  const value: string =
    !userAgentData || userAgentData.value === undefined || userAgentData.value === null
      ? getDefaultUserAgentValue()
      : userAgentData.value;

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new UserAgentPolicy(nextPolicy, options, key, value);
    },
  };
}

/**
 * A policy that adds the user agent header to outgoing requests based on the given {@link TelemetryInfo}.
 */
export class UserAgentPolicy extends BaseRequestPolicy {
  constructor(
    readonly _nextPolicy: RequestPolicy,
    readonly _options: RequestPolicyOptions,
    protected headerKey: string,
    protected headerValue: string
  ) {
    super(_nextPolicy, _options);
  }

  sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    this.addUserAgentHeader(request);
    return this._nextPolicy.sendRequest(request);
  }

  /**
   * Adds the user agent header to the outgoing request.
   */
  addUserAgentHeader(request: WebResourceLike): void {
    if (!request.headers) {
      request.headers = new HttpHeaders();
    }

    if (!request.headers.get(this.headerKey) && this.headerValue) {
      request.headers.set(this.headerKey, this.headerValue);
    }
  }
}
