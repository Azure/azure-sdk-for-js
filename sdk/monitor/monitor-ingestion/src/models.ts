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
}

/**
 * Result type for upload operation
 */
export type UploadLogsResult =
  | {
      errors: Array<UploadLogsError>;
      status: "Failure" | "PartialFailure";
    }
  | { status: "Success" };

/**
 * Error for each log upload request
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
 * Type representing whether all or few logs succeeded uploading
 */
export type UploadLogsStatus =
  /** Represents Complete Failure scenario where all logs have failed for processing and the list of logs that failed to upload are returned */
  | "Failure"
  /** Represents Partial Failure scenario where partial logs have failed for processing and the list of logs that failed to upload are returned */
  | "PartialFailure"
  /** Represents Success scenario where all logs have succeeded and no index is returned */
  | "Success";
