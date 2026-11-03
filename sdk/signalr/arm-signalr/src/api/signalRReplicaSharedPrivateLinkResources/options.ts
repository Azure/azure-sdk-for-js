// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRReplicaSharedPrivateLinkResourcesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRReplicaSharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {}
