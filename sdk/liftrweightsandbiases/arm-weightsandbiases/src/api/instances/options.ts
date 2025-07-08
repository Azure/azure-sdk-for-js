// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InstancesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface InstancesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface InstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstancesCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstancesGetOptionalParams extends OperationOptions {}
