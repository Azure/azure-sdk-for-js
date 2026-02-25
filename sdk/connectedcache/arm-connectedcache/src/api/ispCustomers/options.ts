// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IspCustomersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCustomersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCustomersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IspCustomersUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCustomersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IspCustomersGetOptionalParams extends OperationOptions {}
