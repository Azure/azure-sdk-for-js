// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiGatewayListOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Skip token for retrieving the next page of results. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ApiGatewayListByResourceGroupOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Skip token for retrieving the next page of results. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ApiGatewayDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiGatewayUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiGatewayCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiGatewayGetOptionalParams extends OperationOptions {}
