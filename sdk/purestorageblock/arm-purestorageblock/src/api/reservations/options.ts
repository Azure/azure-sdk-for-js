// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationsGetBillingReportOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsGetBillingStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsGetResourceLimitsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationsGetOptionalParams extends OperationOptions {}
