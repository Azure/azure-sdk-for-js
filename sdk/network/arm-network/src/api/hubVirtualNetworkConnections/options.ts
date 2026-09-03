// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HubVirtualNetworkConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HubVirtualNetworkConnectionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HubVirtualNetworkConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HubVirtualNetworkConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
