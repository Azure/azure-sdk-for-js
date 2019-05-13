import {
  isNode,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
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
        if (telemetryString.length > 0 && userAgentInfo.indexOf(telemetryString) === -1) {
          userAgentInfo.push(telemetryString);
        }
      }

      // e.g. Azure-Storage/10.0.0
      const libInfo = `Azure-Storage/${SDK_VERSION}`;
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

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): TelemetryPolicy {
    return new TelemetryPolicy(nextPolicy, options, this.telemetryString);
  }
}
