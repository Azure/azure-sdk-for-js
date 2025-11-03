// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MhsmPrivateEndpointConnectionsListByResourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface MhsmPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MhsmPrivateEndpointConnectionsPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MhsmPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
