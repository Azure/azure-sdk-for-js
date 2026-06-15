// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationOrderCalculateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationOrderChangeDirectoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationOrderListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationOrderPurchaseOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationOrderGetOptionalParams extends OperationOptions {
  /** May be used to expand the planInformation. */
  expand?: string;
}
