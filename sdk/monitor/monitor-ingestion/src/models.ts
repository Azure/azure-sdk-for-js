// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Options for send logs operation
 */
export interface SendLogsOptions {
  /**
   * Concurrency of parallel requests. Must be greater than or equal to 0.
   */
  maxConcurrency?: number;
}

/**
 * Result type for send logs operation
 */
export interface SendLogsResult {
  /**
   * List of indices for failed logs
   */
  failedLogsIndex: Array<number>;
  /**
   * Status of sendLogs operation. Either Success or Partial Failure. Error will be thrown in case all logs fail.
   */
  sendLogsStatus: SendLogsStatus;
}
/**
 * Enum representing whether all or few logs succeeded
 */
export type SendLogsStatus  = 
  /** Represents Partial Failure scenario where partial logs have failed for processing and the list of indices is returned for the logs failed */
"PartialFailure" |
  /** Represents Success scenario where all logs have succeeded and no index is returned */
  "Success";

