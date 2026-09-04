// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClusterMeshProfilesApplyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ClusterMeshProfilesListByFleetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClusterMeshProfilesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ClusterMeshProfilesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ClusterMeshProfilesGetOptionalParams extends OperationOptions {}
