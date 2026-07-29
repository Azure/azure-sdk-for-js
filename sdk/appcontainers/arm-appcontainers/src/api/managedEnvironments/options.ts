// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedEnvironmentsListWorkloadProfileStatesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedEnvironmentsGetAuthTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedEnvironmentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedEnvironmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedEnvironmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedEnvironmentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedEnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedEnvironmentsGetOptionalParams extends OperationOptions {}
