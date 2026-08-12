// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointsGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
