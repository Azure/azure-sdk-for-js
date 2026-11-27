// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProfessionalServiceSubscriptionLevelGetOptionalParams extends OperationOptions {
  /** When `true`, the response includes customer-data (PII) fields such as `purchaserEmail`. Defaults to `false`. */
  expandCustomerData?: boolean;
}
