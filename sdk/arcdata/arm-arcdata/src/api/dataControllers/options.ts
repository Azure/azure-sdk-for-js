// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataControllersListInSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataControllersListInGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataControllersDeleteDataControllerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataControllersPatchDataControllerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataControllersPutDataControllerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataControllersGetDataControllerOptionalParams extends OperationOptions {}
