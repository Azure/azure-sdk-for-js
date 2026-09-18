// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionDeploymentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionDeploymentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionDeploymentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionDeploymentsGetOptionalParams extends OperationOptions {}
