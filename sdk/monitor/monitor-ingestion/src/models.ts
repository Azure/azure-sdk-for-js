// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Options for send logs operation
 */
export interface UploadLogsOptions {
  /**
   * Concurrency of parallel requests. Must be greater than or equal to 1.
   * The default value is 1.
   */
  maxConcurrency?: number;
  errorCallback?: (uploadLogsError: UploadLogsError) => void;
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

export const AggregateUploadLogsErrorName = "AggregateUploadLogsError";

/**
 * Aggregate Error type for upload function
 */
export class AggregateUploadLogsErrror extends Error {
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
}
