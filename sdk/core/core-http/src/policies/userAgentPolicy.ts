// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeaders } from "../httpHeaders";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { WebResourceLike } from "../webResource";
import { getDefaultUserAgentKey, getPlatformSpecificData } from "./msRestUserAgentPolicy";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";

export type TelemetryInfo = { key?: string; value?: string };

/**
 * Options for adding user agent details to outgoing requests.
 */
export interface UserAgentOptions {
  /*
   * String prefix to add to the user agent for outgoing requests.
   * Defaults to an empty string.
   */
  userAgentPrefix?: string;
}

function getRuntimeInfo(): TelemetryInfo[] {
  const msRestRuntime = {
    key: "core-http",
    value: Constants.coreHttpVersion
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

export function getDefaultUserAgentValue(): string {
  const runtimeInfo = getRuntimeInfo();
  const platformSpecificData = getPlatformSpecificData();
  const userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
  return userAgent;
}

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
    }
  };
}

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

  addUserAgentHeader(request: WebResourceLike): void {
    if (!request.headers) {
      request.headers = new HttpHeaders();
    }

    if (!request.headers.get(this.headerKey) && this.headerValue) {
      request.headers.set(this.headerKey, this.headerValue);
    }
  }
}
