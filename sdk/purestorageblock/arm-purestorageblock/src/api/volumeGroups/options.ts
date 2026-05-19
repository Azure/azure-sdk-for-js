// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VolumeGroupsGetStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VolumeGroupsListConnectionParametersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VolumeGroupsListByStoragePoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VolumeGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsGetOptionalParams extends OperationOptions {}
