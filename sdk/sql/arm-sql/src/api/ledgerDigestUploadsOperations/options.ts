// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LedgerDigestUploadsOperationsDisableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerDigestUploadsOperationsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerDigestUploadsOperationsGetOptionalParams extends OperationOptions {}
