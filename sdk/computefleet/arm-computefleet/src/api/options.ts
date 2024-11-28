// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FleetsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FleetsListVirtualMachineScaleSetsOptionalParams
  extends OperationOptions {}
