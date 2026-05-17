// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

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
export interface ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The type of failover test. */
  failoverTestType?: string;
  /** Fetch only the latest tests. */
  fetchLatest?: boolean;
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
