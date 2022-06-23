// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Options for send logs operation
 */
export interface UploadOptions {
  /**
   * Concurrency of parallel requests. Must be greater than or equal to 0.
   */
  maxConcurrency?: number;
}

/**
 * Result type for upload operation
 */
export interface UploadResult {
  /**
   * List of errors of type {@link UploadLogsError} for failed logs
   */
  errors: Array<UploadLogsError>;
  /**
   * Status of upload operation. Either Success or Partial Failure. Error will be thrown in case all logs fail.
   */
  uploadStatus: UploadStatus;
}

export class FailedLogsIngestionError extends Error {
  errors: Array<UploadLogsError>;

  constructor(message:string, errors: Array<UploadLogsError>){
    super(message);
    this.errors = errors;
  }
}
export interface UploadLogsError {
  /**
   * List of failed logs
   */
  failedLogs: Record<string, unknown>[];
  /**
   * Error for failed logs
   */
  responseError: Error;
}

/**
 * Enum representing whether all or few logs succeeded
 */
export type UploadStatus =
  /** Represents Partial Failure scenario where partial logs have failed for processing and the list of indices is returned for the logs failed */
  | "PartialFailure"
  /** Represents Success scenario where all logs have succeeded and no index is returned */
  | "Success";
