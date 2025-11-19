// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetAppResourceUpdateNetworkSiblingSetOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetAppResourceQueryNetworkSiblingSetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetAppResourceQueryRegionInfoOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetAppResourceCheckQuotaAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetAppResourceCheckFilePathAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetAppResourceCheckNameAvailabilityOptionalParams
  extends OperationOptions {}
