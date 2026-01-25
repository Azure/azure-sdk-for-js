// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EdgeMachinesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeMachinesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeMachinesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachinesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachinesGetOptionalParams extends OperationOptions {}
