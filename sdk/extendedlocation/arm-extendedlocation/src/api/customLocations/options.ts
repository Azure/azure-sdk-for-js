// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomLocationsFindTargetResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListEnabledResourceTypesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomLocationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomLocationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomLocationsListOperationsOptionalParams extends OperationOptions {}
