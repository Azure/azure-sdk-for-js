// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isError } from "@azure/core-util";

/** Service API versions */
export enum KnownVersions {
  /** The 2023-01-01 API version. */
  V20230101 = "2023-01-01",
}

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://monitor.azure.cn",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://monitor.azure.us",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://monitor.azure.com",
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
