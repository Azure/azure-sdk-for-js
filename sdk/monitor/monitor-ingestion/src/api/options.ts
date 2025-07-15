// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { LogsUploadFailure } from "../models/models.js";

/** Optional parameters. */
export interface LogsUploadOptions extends OperationOptions {
  /** The content encoding of the request body which is always 'gzip'. */
  contentEncoding?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
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
