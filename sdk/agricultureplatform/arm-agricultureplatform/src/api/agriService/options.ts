// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgriServiceListAvailableSolutionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgriServiceListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgriServiceListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgriServiceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgriServiceUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgriServiceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgriServiceGetOptionalParams extends OperationOptions {}
