// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VolumeGroupSnapshotsListSnapshotsOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VolumeGroupSnapshotsListByVolumeGroupOptionalParams extends OperationOptions {
  /** OData filter expression (e.g. $filter=substringof('sna', name) and space/unique gt 1000) */
  filter?: string;
  /** OData order-by expression (e.g. $orderby=name asc) */
  orderby?: string;
  /** Maximum number of results to return per page */
  top?: number;
  /** Number of results to skip (page offset) */
  skip?: number;
}
/** Optional parameters. */
export interface VolumeGroupSnapshotsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VolumeGroupSnapshotsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VolumeGroupSnapshotsGetOptionalParams extends OperationOptions {}
