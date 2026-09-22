// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PaymentHsmClustersListBySubscriptionOptionalParams extends OperationOptions {
  /** The page-continuation token to use with a paged version of this API */
  skiptoken?: string;
}
/** Optional parameters. */
export interface PaymentHsmClustersListByResourceGroupOptionalParams extends OperationOptions {
  /** The page-continuation token to use with a paged version of this API */
  skiptoken?: string;
}
/** Optional parameters. */
export interface PaymentHsmClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface PaymentHsmClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface PaymentHsmClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface PaymentHsmClustersGetOptionalParams extends OperationOptions {}
