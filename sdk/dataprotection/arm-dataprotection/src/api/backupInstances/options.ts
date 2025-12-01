// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StopProtectionRequest, SuspendBackupRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupInstancesValidateCrossRegionRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesTriggerCrossRegionRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesValidateForRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesSyncBackupInstanceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesSuspendBackupsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
  /** The content of the action request */
  parameters?: SuspendBackupRequest;
}

/** Optional parameters. */
export interface BackupInstancesStopProtectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
  /** The content of the action request */
  parameters?: StopProtectionRequest;
}

/** Optional parameters. */
export interface BackupInstancesResumeProtectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesResumeBackupsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesTriggerRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface BackupInstancesTriggerRehydrateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesValidateForModifyBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesAdhocBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface BackupInstancesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface BackupInstancesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupInstancesValidateForBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupInstancesGetBackupInstanceOperationResultOptionalParams extends OperationOptions {}
