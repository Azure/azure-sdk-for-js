// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectionGroupsBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectionGroupsResumeBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectionGroupsRestoreOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectionGroupsStopBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectionGroupsListByCloudAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectionGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectionGroupsCreateOrupdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectionGroupsGetOptionalParams extends OperationOptions {}
