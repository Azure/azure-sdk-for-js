// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRPrivateEndpointConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRPrivateEndpointConnectionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
