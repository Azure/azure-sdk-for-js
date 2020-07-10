// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The different levels of logs that can be used with the HttpPipelineLogger.
 */
export enum HttpPipelineLogLevel {
  /**
   * A log level that indicates that no logs will be logged.
   */
  OFF,

  /**
   * An error log.
   */
  ERROR,

  /**
   * A warning log.
   */
  WARNING,

  /**
   * An information log.
   */
  INFO
}
