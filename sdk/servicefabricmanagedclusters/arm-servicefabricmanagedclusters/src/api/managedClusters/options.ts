// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedClustersStopFaultSimulationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersStartFaultSimulationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersListFaultSimulationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetFaultSimulationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersGetOptionalParams extends OperationOptions {}
