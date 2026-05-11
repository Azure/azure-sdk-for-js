// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiGatewayConfigConnectionListByGatewayOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Skip token for retrieving the next page of results. */
  skipToken?: string;
}

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
