// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BookshelfPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BookshelfPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
