// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRoutePortsGenerateLOAOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRoutePortsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRoutePortsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRoutePortsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRoutePortsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRoutePortsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRoutePortsGetOptionalParams extends OperationOptions {}
