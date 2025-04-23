// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StartRequest, StopRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SAPCentralServerInstancesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Central Services instance stop request body. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Central Services instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPCentralServerInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPCentralServerInstancesGetOptionalParams extends OperationOptions {}
