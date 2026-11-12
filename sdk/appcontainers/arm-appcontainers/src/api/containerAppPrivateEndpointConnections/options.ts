// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppPrivateEndpointConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppPrivateEndpointConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
