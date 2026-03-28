// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionListPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionGetPrivateLinkResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionGetByNameOptionalParams extends OperationOptions {}
