// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PoolStopResizeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolDisableAutoScaleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolListByBatchAccountOptionalParams extends OperationOptions {
  /** The maximum number of items to return in the response. */
  maxresults?: number;
  /** Comma separated list of properties that should be returned. e.g. "properties/provisioningState". Only top level properties under properties/ are valid for selection. */
  select?: string;
  /**
   * OData filter expression. Valid properties for filtering are:
   *
   * name
   * properties/allocationState
   * properties/allocationStateTransitionTime
   * properties/creationTime
   * properties/provisioningState
   * properties/provisioningStateTransitionTime
   * properties/lastModified
   * properties/vmSize
   * properties/interNodeCommunication
   * properties/scaleSettings/autoScale
   * properties/scaleSettings/fixedScale
   */
  filter?: string;
}

/** Optional parameters. */
export interface PoolDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoolUpdateOptionalParams extends OperationOptions {
  /** The entity state (ETag) version of the pool to update. This value can be omitted or set to "*" to apply the operation unconditionally. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PoolCreateOptionalParams extends OperationOptions {
  /** The entity state (ETag) version of the pool to update. A value of "*" can be used to apply the operation only if the pool already exists. If omitted, this operation will always be applied. */
  ifMatch?: string;
  /** Set to '*' to allow a new pool to be created, but to prevent updating an existing pool. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface PoolGetOptionalParams extends OperationOptions {}
