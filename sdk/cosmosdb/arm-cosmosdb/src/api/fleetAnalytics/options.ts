// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetAnalyticsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetAnalyticsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetAnalyticsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetAnalyticsGetOptionalParams extends OperationOptions {}
