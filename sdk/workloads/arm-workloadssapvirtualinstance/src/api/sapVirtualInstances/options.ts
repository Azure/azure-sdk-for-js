// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StartRequest, StopRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetDiskConfigurationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetSapSupportedSkuOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetSizingRecommendationsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Virtual Instance for SAP solutions resource stop request body. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPVirtualInstancesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Virtual Instance for SAP solutions resource start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPVirtualInstancesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesGetOptionalParams extends OperationOptions {}
