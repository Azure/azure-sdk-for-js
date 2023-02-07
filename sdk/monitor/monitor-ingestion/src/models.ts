// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

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
   * @param uploadLogsError - This is the {@link UploadLogsError} object
   * @returns void
   */
  onError?: (uploadLogsError: UploadLogsError) => Promise<void>;
}

/**
 * Error for each log upload request to service
 */
export interface UploadLogsError {
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
   * List of {@link UploadLogsError} returned from
   * individual upload requests to service
   */
  errors: UploadLogsError[];

  /**
   *
   * @param errors - list of {@link UploadLogsError}
   * @param errorMessage - error message
   */
  constructor(errors: UploadLogsError[], errorMessage?: string) {
    super(`${errorMessage}\n}`);
    this.errors = errors;
    this.name = AggregateUploadLogsErrorName;
  }
  //isAggregateUploadLogsError
}
