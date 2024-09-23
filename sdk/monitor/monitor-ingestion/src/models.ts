// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { isError } from "@azure/core-util";
/**
 * Options for send logs operation
 */
export interface LogsUploadOptions extends OperationOptions {
  /**
   * Concurrency of parallel requests. Must be greater than or equal to 1.
   * The default value is 1.
   */
  maxConcurrency?: number;
  /**
   * Callback function for error handling when logs fail to upload
   * @param uploadLogsError - This is the {@link LogsUploadFailure} object
   * @returns void
   */
  onError?: (uploadLogsError: LogsUploadFailure) => void;
}

/**
 * Error for each log upload request to service
 */
export interface LogsUploadFailure {
  /**
   * List of failed logs
   */
  failedLogs: Record<string, unknown>[];
  /**
   * Error for failed logs
   */
  cause: Error;
}

/**
 * Aggregate Upload Logs Error Name
 */
export const AggregateLogsUploadErrorName = "AggregateLogsUploadError";

/**
 * Aggregate Error type for upload function
 */
export class AggregateLogsUploadError extends Error {
  /**
   * List of {@link LogsUploadFailure} returned from
   * individual upload requests to service
   */
  errors: LogsUploadFailure[];

  /**
   *
   * @param errors - list of {@link LogsUploadFailure}
   * @param errorMessage - error message
   */
  constructor(errors: LogsUploadFailure[], errorMessage?: string) {
    super(`${errorMessage}\n}`);
    this.errors = errors;
    this.name = AggregateLogsUploadErrorName;
  }
}

/**
 * Typeguard for AggregateUploadLogsError
 * @param e - Something caught by a catch clause.
 */
export function isAggregateLogsUploadError(e: unknown): e is AggregateLogsUploadError {
  if (e instanceof AggregateLogsUploadError) {
    return true;
  }
  return isError(e) && e.name === AggregateLogsUploadErrorName;
}
