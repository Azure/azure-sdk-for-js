// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "./requestPolicy";
import { WebResource, HttpHeaders, HttpOperationResponse } from "../msRest";
import { Constants } from "../util/constants";
import { getPlatformSpecificData, getDefaultUserAgentKey } from "./msRestUserAgentPolicy";

export type TelemetryInfo = { key?: string; value?: string };

function getRuntimeInfo(): TelemetryInfo[] {
    const msRestRuntime = {
        key: "ms-rest-js",
        value: Constants.msRestVersion
    };

    return [msRestRuntime];
}

function getUserAgentString(telemetryInfo: TelemetryInfo[], keySeparator = " ", valueSeparator = "/"): string {
    return telemetryInfo.map(info => {
        const value = info.value ? `${valueSeparator}${info.value}` : "";
        return `${info.key}${value}`;
    }).join(keySeparator);
}

export function getDefaultUserAgentValue(): string {
    const runtimeInfo = getRuntimeInfo();
    const platformSpecificData = getPlatformSpecificData();
    const userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
    return userAgent;
}

export function userAgentPolicy(userAgentData?: TelemetryInfo): RequestPolicyFactory {
    const key: string = (!userAgentData || userAgentData.key === undefined) ? getDefaultUserAgentKey() : userAgentData.key;
    const value: string = (!userAgentData || userAgentData.value === undefined) ?  getDefaultUserAgentValue() : userAgentData.value;

    return {
        create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
            return new UserAgentPolicy(nextPolicy, options, key, value);
        }
    };
}

export class UserAgentPolicy extends BaseRequestPolicy {
    constructor(readonly _nextPolicy: RequestPolicy, readonly _options: RequestPolicyOptions, protected headerKey: string, protected headerValue: string) {
        super(_nextPolicy, _options);
    }

    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
        this.addUserAgentHeader(request);
        return this._nextPolicy.sendRequest(request);
    }

    addUserAgentHeader(request: WebResource): void {
        if (!request.headers) {
            request.headers = new HttpHeaders();
        }

        if (!request.headers.get(this.headerKey) && this.headerValue) {
            request.headers.set(this.headerKey, this.headerValue);
        }
    }
}
