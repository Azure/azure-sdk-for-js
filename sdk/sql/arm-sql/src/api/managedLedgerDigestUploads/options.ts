// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsDisableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedLedgerDigestUploadsGetOptionalParams extends OperationOptions {}
