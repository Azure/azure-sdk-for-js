// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PoliciesGetBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoliciesCreateOrUpdateByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoliciesGetByBillingAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoliciesCreateOrUpdateByBillingProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoliciesGetByBillingProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoliciesGetByCustomerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoliciesCreateOrUpdateByCustomerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoliciesGetByCustomerAtBillingAccountOptionalParams extends OperationOptions {}
