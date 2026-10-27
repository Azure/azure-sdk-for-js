// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GoldenGateConnectionsGetAssignedDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateConnectionsUnassignDeploymentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateConnectionsAssignDeploymentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateConnectionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateConnectionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateConnectionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateConnectionsListBySubscriptionOptionalParams extends OperationOptions {}
