// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRSharedPrivateLinkResourcesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRSharedPrivateLinkResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRSharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {}
