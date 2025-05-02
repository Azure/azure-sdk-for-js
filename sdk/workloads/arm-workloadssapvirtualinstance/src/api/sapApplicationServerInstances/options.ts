// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StartRequest, StopRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SAPApplicationServerInstancesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Application server instance stop request body. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Application server instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPApplicationServerInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPApplicationServerInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPApplicationServerInstancesGetOptionalParams extends OperationOptions {}
