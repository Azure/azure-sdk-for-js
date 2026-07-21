// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteGatewaysGetResiliencyInformationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Whether to attempt a refresh of the resiliency information. */
  attemptRefresh?: boolean;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysGetRoutesInformationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Whether to attempt a refresh of the route sets. */
  attemptRefresh?: boolean;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysStopSiteFailoverTestOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysStartSiteFailoverTestOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The type of failover test. */
  typeParam?: string;
  /** Fetch only the latest tests for each peering location. */
  fetchLatest?: boolean;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteGatewaysListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteGatewaysGetOptionalParams extends OperationOptions {}
