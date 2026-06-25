// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResubscribeProperties } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitorsResubscribeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resubscribe Properties */
  body?: ResubscribeProperties;
}

/** Optional parameters. */
export interface MonitorsLinkSaaSOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsLatestLinkedSaaSOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsVmHostPayloadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListLinkedResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListMonitoredResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsRefreshIngestionKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListHostsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsSwitchBillingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListAppServicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetMetricStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetMetricRulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsGetOptionalParams extends OperationOptions {}
