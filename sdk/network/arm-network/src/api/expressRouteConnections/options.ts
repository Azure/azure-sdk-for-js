// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteConnectionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
