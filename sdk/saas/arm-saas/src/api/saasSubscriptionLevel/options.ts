// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SaasSubscriptionLevelValidateUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SaasSubscriptionLevelUnsubscribeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasSubscriptionLevelListAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SaasSubscriptionLevelListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SaasSubscriptionLevelDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasSubscriptionLevelUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasSubscriptionLevelCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasSubscriptionLevelGetOptionalParams extends OperationOptions {
  /** When `true`, the response includes customer-data (PII) fields such as `purchaserEmail`. Defaults to `false`. */
  expandCustomerData?: boolean;
}
