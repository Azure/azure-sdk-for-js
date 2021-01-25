// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  isNode,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  UserAgentOptions
} from "@azure/core-http";
import * as os from "os";

import { TelemetryPolicy } from "./policies/TelemetryPolicy";
import { SDK_VERSION } from "./utils/constants";

/**
 * TelemetryPolicyFactory is a factory class helping generating {@link TelemetryPolicy} objects.
 *
 * @export
 * @class TelemetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class TelemetryPolicyFactory implements RequestPolicyFactory {
  /**
   * @internal
   * @ignore
   */
  public readonly telemetryString: string;

  /**
   * Creates an instance of TelemetryPolicyFactory.
   * @param {UserAgentOptions} [telemetry]
   * @memberof TelemetryPolicyFactory
   */
  constructor(telemetry?: UserAgentOptions) {
    const userAgentInfo: string[] = [];

    if (isNode) {
      if (telemetry) {
        // FIXME: replace() only replaces the first space. And we have no idea why we need to replace spaces in the first place.
        // But fixing this would be a breaking change. Logged an issue here: https://github.com/Azure/azure-sdk-for-js/issues/10793
        const telemetryString = (telemetry.userAgentPrefix || "").replace(" ", "");
        if (telemetryString.length > 0 && userAgentInfo.indexOf(telemetryString) === -1) {
          userAgentInfo.push(telemetryString);
        }
      }

      // e.g. azsdk-js-storageblob/10.0.0
      const libInfo = `azsdk-js-storageblob/${SDK_VERSION}`;
      if (userAgentInfo.indexOf(libInfo) === -1) {
        userAgentInfo.push(libInfo);
      }

      // e.g. (NODE-VERSION 4.9.1; Windows_NT 10.0.16299)
      const runtimeInfo = `(NODE-VERSION ${process.version}; ${os.type()} ${os.release()})`;
      if (userAgentInfo.indexOf(runtimeInfo) === -1) {
        userAgentInfo.push(runtimeInfo);
      }
    }

    this.telemetryString = userAgentInfo.join(" ");
  }

  /**
   * Creates a TelemetryPolicy object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {TelemetryPolicy}
   * @memberof TelemetryPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): TelemetryPolicy {
    return new TelemetryPolicy(nextPolicy, options, this.telemetryString);
  }
}
