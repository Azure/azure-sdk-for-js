// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  isNode,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  getDefaultUserAgentValue
} from "@azure/ms-rest-js";
import * as os from "os";

import { TelemetryPolicy } from "./policies/TelemetryPolicy";
import { SDK_VERSION } from "./utils/constants";

/**
 * Interface of TelemetryPolicy options.
 *
 * @export
 * @interface ITelemetryOptions
 */
export interface ITelemetryOptions {
  value: string;
}

/**
 * TelemetryPolicyFactory is a factory class helping generating TelemetryPolicy objects.
 *
 * @export
 * @class TelemetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class TelemetryPolicyFactory implements RequestPolicyFactory {
  private telemetryString: string;

  /**
   * Creates an instance of TelemetryPolicyFactory.
   * @param {ITelemetryOptions} [telemetry]
   * @memberof TelemetryPolicyFactory
   */
  constructor(telemetry?: ITelemetryOptions) {
    const userAgentInfo: string[] = [];

    if (isNode) {
      if (telemetry) {
        const telemetryString = telemetry.value;
        if (
          telemetryString.length > 0 &&
          userAgentInfo.indexOf(telemetryString) === -1
        ) {
          userAgentInfo.push(telemetryString);
        }
      }

      // e.g. Azure-KeyVault-Secrets/0.1.0
      const libInfo = `Azure-KeyVault-Secrets/${SDK_VERSION}`;
      if (userAgentInfo.indexOf(libInfo) === -1) {
        userAgentInfo.push(libInfo);
      }

      // e.g. (NODE-VERSION 4.9.1; Windows_NT 10.0.16299)
      const defaultUserAgentInfo = getDefaultUserAgentValue();
      if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
        userAgentInfo.push(defaultUserAgentInfo);
      }
    }

    this.telemetryString = userAgentInfo.join(" ");
  }

  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): TelemetryPolicy {
    return new TelemetryPolicy(nextPolicy, options, this.telemetryString);
  }
}
