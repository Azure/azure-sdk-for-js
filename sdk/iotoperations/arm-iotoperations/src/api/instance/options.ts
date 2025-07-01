// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InstanceListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstanceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstanceGetOptionalParams extends OperationOptions {}
