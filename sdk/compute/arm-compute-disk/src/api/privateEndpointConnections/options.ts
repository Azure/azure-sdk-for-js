// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams
  extends OperationOptions {}
