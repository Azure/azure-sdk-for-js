// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsListVirtualMachinesOptionalParams extends OperationOptions {
  /** Filter expression to filter the virtual machines. */
  filter?: string;
  /** Skip token for pagination. Uses the token from a previous response to fetch the next page of results. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface FleetsListVirtualMachineScaleSetsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsGetOptionalParams extends OperationOptions {}
