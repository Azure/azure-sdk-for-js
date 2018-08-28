import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "ms-rest-js";

import { LoggingPolicy } from "./policies/LoggingPolicy";

/**
 * RequestLogOptions configures the retry policy's behavior.
 *
 * @export
 * @interface IRequestLogOptions
 */
export interface IRequestLogOptions {
  /**
   * LogWarningIfTryOverThreshold logs a warning if a tried operation takes longer than the specified
   * duration in ms. Default is 3000ms.
   * @type {number}
   * @memberof IRequestLogOptions
   */
  logWarningIfTryOverThreshold: number;
}

/**
 * LoggingPolicyFactory is a factory class helping generating LoggingPolicy objects.
 *
 * @export
 * @class LoggingPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class LoggingPolicyFactory implements RequestPolicyFactory {
  private readonly loggingOptions?: IRequestLogOptions;

  constructor(loggingOptions?: IRequestLogOptions) {
    this.loggingOptions = loggingOptions;
  }

  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): LoggingPolicy {
    return new LoggingPolicy(nextPolicy, options, this.loggingOptions);
  }
}
