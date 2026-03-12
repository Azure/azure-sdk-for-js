// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StartRequest, StopRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SAPDatabaseInstancesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Stop request for the database instance of the SAP system. */
  body?: StopRequest;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** SAP Database server instance start request body. */
  body?: StartRequest;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPDatabaseInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SAPDatabaseInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SAPDatabaseInstancesGetOptionalParams extends OperationOptions {}
