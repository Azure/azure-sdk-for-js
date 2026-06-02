// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LedgerDigestUploadsDisableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerDigestUploadsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LedgerDigestUploadsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerDigestUploadsGetOptionalParams extends OperationOptions {}
