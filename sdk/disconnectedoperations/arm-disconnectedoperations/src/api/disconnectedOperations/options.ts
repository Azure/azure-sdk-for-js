// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DisconnectedOperationsListDeploymentManifestOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisconnectedOperationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisconnectedOperationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisconnectedOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DisconnectedOperationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisconnectedOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DisconnectedOperationsGetOptionalParams extends OperationOptions {}
