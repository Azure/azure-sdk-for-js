// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";

import { LoggingPolicy } from "./policies/LoggingPolicy";

/**
 * RequestLogOptions configures the retry policy's behavior.
 *
 * @export
 * @interface RequestLogOptions
 */
export interface RequestLogOptions {
  /**
   * LogWarningIfTryOverThreshold logs a warning if a tried operation takes longer than the specified
   * duration in ms. Default is 3000ms.
   * @type {number}
   * @memberof RequestLogOptions
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
  private readonly loggingOptions?: RequestLogOptions;

  constructor(loggingOptions?: RequestLogOptions) {
    this.loggingOptions = loggingOptions;
  }

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): LoggingPolicy {
    return new LoggingPolicy(nextPolicy, options, this.loggingOptions);
  }
}
