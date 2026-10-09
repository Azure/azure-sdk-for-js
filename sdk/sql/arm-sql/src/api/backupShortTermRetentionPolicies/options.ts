// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupShortTermRetentionPoliciesListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupShortTermRetentionPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupShortTermRetentionPoliciesGetOptionalParams extends OperationOptions {}
