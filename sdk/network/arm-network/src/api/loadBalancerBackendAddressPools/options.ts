// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LoadBalancerBackendAddressPoolsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancerBackendAddressPoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancerBackendAddressPoolsGetOptionalParams extends OperationOptions {}
