// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiGatewayConfigConnectionListByGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiGatewayConfigConnectionDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiGatewayConfigConnectionCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiGatewayConfigConnectionGetOptionalParams extends OperationOptions {}
