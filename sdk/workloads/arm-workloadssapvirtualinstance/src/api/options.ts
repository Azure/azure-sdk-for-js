// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";
import { StartRequest, StopRequest } from "../models/models.js";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPVirtualInstancesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesStartOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Virtual Instance for SAP solutions resource start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPVirtualInstancesStopOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Virtual Instance for SAP solutions resource stop request body. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPVirtualInstancesGetSizingRecommendationsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetSapSupportedSkuOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetDiskConfigurationsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesListOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesStartOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Central Services instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesStopOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Central Services instance stop request body. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPDatabaseInstancesCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPDatabaseInstancesDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesListOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPDatabaseInstancesStartOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Database server instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesStopOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Stop request for the database instance of the SAP system. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPApplicationServerInstancesCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPApplicationServerInstancesDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesListOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SAPApplicationServerInstancesStartOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Application server instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesStopOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Application server instance stop request body. */
  body?: StopRequest;
}
