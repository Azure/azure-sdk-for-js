// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SelectiveKeyRestoreOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SelectiveKeyRestoreStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PreFullRestoreOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FullRestoreOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestoreStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PreFullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FullBackupStatusOptionalParams extends OperationOptions {}
