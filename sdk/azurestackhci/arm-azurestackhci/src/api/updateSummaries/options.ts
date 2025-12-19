// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdateSummariesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateSummariesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UpdateSummariesPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateSummariesGetOptionalParams extends OperationOptions {}
