// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiscountsScopeListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiscountsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiscountsSubscriptionListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiscountsResourceGroupListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiscountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiscountsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
