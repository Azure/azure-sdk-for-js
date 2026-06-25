// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebPubSubPrivateEndpointConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubPrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubPrivateEndpointConnectionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubPrivateEndpointConnectionsGetOptionalParams extends OperationOptions {}
