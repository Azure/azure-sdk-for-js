// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AlertsRefreshAllOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AlertsRefreshOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AlertsListForScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetOptionalParams extends OperationOptions {}
