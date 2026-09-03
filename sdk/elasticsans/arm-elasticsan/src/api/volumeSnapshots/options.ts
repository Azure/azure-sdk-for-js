// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VolumeSnapshotsListByVolumeGroupOptionalParams extends OperationOptions {
  /** Specify $filter='volumeName eq <volume name>' to filter on volume. */
  filter?: string;
}

/** Optional parameters. */
export interface VolumeSnapshotsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeSnapshotsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeSnapshotsGetOptionalParams extends OperationOptions {}
