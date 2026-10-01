// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConditionalCreditsScopeListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConditionalCreditsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConditionalCreditsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConditionalCreditsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConditionalCreditsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConditionalCreditsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConditionalCreditsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConditionalCreditsGetOptionalParams extends OperationOptions {}
