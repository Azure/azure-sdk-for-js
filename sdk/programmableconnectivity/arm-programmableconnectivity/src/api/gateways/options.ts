// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GatewaysListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GatewaysListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GatewaysUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GatewaysGetOptionalParams extends OperationOptions {}
