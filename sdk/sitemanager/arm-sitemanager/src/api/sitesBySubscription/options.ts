// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SitesBySubscriptionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesBySubscriptionUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesBySubscriptionCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SitesBySubscriptionGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesBySubscriptionListOptionalParams extends OperationOptions {}
