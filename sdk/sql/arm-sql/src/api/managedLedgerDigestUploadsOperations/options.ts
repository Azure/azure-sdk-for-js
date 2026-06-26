// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsOperationsDisableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsOperationsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsOperationsGetOptionalParams extends OperationOptions {}
