// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationGatewayPrivateEndpointConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewayPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewayPrivateEndpointConnectionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewayPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
