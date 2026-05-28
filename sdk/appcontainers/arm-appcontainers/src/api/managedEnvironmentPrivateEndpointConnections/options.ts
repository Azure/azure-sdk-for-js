// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedEnvironmentPrivateEndpointConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedEnvironmentPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedEnvironmentPrivateEndpointConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedEnvironmentPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
