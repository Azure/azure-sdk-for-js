// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { XMsDeleteSnapshots, XMsForceDelete } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VolumesPreRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumesPreBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumesListByVolumeGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VolumesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional, used to delete snapshots under volume. Allowed value are only true or false. Default value is false. */
  xMsDeleteSnapshots?: XMsDeleteSnapshots;
  /** Optional, used to delete volume if active sessions present. Allowed value are only true or false. Default value is false. */
  xMsForceDelete?: XMsForceDelete;
}

/** Optional parameters. */
export interface VolumesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumesGetOptionalParams extends OperationOptions {}
