// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionOperationsGetByNameOptionalParams extends OperationOptions {}
