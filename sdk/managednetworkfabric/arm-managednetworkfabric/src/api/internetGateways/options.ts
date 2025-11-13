// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InternetGatewaysListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InternetGatewaysListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InternetGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewaysUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewaysCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewaysGetOptionalParams extends OperationOptions {}
