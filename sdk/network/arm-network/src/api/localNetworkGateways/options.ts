// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocalNetworkGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalNetworkGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalNetworkGatewaysUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalNetworkGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalNetworkGatewaysGetOptionalParams extends OperationOptions {}
