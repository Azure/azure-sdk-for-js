// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogStatusRequest, MetricStatusRequest, SSODetailsRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetAllConnectedResourcesCountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListLinkableEnvironmentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetSSODetailsOptionalParams extends OperationOptions {
  /** The details of the get sso details request. */
  request?: SSODetailsRequest;
}

/** Optional parameters. */
export interface MonitorsUpgradePlanOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsListAppServicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetMetricStatusOptionalParams extends OperationOptions {
  /** The details of the metric status request. */
  request?: MetricStatusRequest;
}

/** Optional parameters. */
export interface MonitorsListHostsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsManageAgentInstallationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetVMHostPayloadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListMonitoredResourcesOptionalParams extends OperationOptions {
  /** The details of the log status request. */
  request?: LogStatusRequest;
}

/** Optional parameters. */
export interface MonitorsListBySubscriptionIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsGetOptionalParams extends OperationOptions {}
