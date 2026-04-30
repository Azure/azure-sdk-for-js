// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GraphResourcesListGraphsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GraphResourcesDeleteGraphResourceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GraphResourcesCreateUpdateGraphOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GraphResourcesGetGraphOptionalParams extends OperationOptions {}
