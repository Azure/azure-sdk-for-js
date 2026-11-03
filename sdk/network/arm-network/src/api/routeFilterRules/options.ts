// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RouteFilterRulesListByRouteFilterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteFilterRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RouteFilterRulesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteFilterRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
