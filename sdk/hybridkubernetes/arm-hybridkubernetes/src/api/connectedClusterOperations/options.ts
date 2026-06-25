// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedClusterOperationsListClusterUserCredentialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterOperationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterOperationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedClusterOperationsUpdateAsyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedClusterOperationsCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedClusterOperationsGetOptionalParams extends OperationOptions {}
