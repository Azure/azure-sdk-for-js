// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GoldenGateDeploymentsGetAssignedConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateDeploymentsUnassignConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateDeploymentsAssignConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateDeploymentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateDeploymentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateDeploymentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GoldenGateDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GoldenGateDeploymentsListBySubscriptionOptionalParams extends OperationOptions {}
