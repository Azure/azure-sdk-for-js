// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EmailServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EmailServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EmailServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EmailServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EmailServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EmailServicesGetOptionalParams extends OperationOptions {}
