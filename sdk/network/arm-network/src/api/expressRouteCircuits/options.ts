// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteCircuitsGetPeeringStatsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCircuitsListRoutesTableSummaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsListRoutesTableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsListArpTableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsGetStatsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCircuitsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCircuitsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCircuitsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCircuitsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsGetOptionalParams extends OperationOptions {}
