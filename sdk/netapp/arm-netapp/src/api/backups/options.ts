// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BackupPatch } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupsGetVolumeLatestRestoreStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupsGetLatestStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupsListByVaultOptionalParams extends OperationOptions {
  /** An option to specify the VolumeResourceId. If present, then only returns the backups under the specified volume */
  filter?: string;
}

/** Optional parameters. */
export interface BackupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Backup object supplied in the body of the operation. */
  body?: BackupPatch;
}

/** Optional parameters. */
export interface BackupsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupsGetOptionalParams extends OperationOptions {}
