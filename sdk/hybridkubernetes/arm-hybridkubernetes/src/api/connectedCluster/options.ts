// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedClusterListClusterUserCredentialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedClusterUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedClusterCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedClusterGetOptionalParams extends OperationOptions {}
