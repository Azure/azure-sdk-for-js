// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { isError } from "@azure/core-util";
/**
 * Options for send logs operation
 */
export interface UploadLogsOptions extends OperationOptions {
  /**
   * Concurrency of parallel requests. Must be greater than or equal to 1.
   * The default value is 1.
   */
  maxConcurrency?: number;
  /**
   * Callback function for error handling when logs fail to upload
   * @param uploadLogsError - This is the {@link UploadLogsFailure} object
   * @returns void
   */
  onError?: (uploadLogsError: UploadLogsFailure) => void;
}

/**
 * Error for each log upload request to service
 */
export interface UploadLogsFailure {
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
export const AggregateUploadLogsErrorName = "AggregateUploadLogsError";

/**
 * Aggregate Error type for upload function
 */
export class AggregateUploadLogsError extends Error {
  /**
   * List of {@link UploadLogsFailure} returned from
   * individual upload requests to service
   */
  errors: UploadLogsFailure[];

  /**
   *
   * @param errors - list of {@link UploadLogsFailure}
   * @param errorMessage - error message
   */
  constructor(errors: UploadLogsFailure[], errorMessage?: string) {
    super(`${errorMessage}\n}`);
    this.errors = errors;
    this.name = AggregateUploadLogsErrorName;
  }
}

/**
 * Typeguard for AggregateUploadLogsError
 * @param e - Something caught by a catch clause.
 */
export function isAggregateUploadLogsError(e: unknown): e is AggregateUploadLogsError {
  if (e instanceof AggregateUploadLogsError) {
    return true;
  }
  return isError(e) && e.name === "AggregateUploadLogsError";
}
