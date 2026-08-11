// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetGetOptionalParams extends OperationOptions {}
