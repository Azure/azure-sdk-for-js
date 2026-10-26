// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayResourcesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayResourcesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AiGatewayResourcesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AiGatewayResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AiGatewayResourcesGetOptionalParams extends OperationOptions {}
