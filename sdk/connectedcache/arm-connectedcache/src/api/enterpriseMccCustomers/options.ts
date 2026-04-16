// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnterpriseMccCustomersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCustomersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCustomersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnterpriseMccCustomersUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCustomersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnterpriseMccCustomersGetOptionalParams extends OperationOptions {}
