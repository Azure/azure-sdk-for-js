// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedPrivateLinkResourcesListByWatcherOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {}
