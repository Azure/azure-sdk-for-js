// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LoadBalancersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersGetOptionalParams extends OperationOptions {}
