// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InternetGatewayRulesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InternetGatewayRulesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InternetGatewayRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewayRulesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewayRulesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InternetGatewayRulesGetOptionalParams extends OperationOptions {}
