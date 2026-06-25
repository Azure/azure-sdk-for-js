// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedEnvironmentsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsGetOptionalParams extends OperationOptions {}
