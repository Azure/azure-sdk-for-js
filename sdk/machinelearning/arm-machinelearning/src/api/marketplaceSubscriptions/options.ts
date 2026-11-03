// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MarketplaceSubscriptionsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface MarketplaceSubscriptionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MarketplaceSubscriptionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MarketplaceSubscriptionsGetOptionalParams extends OperationOptions {}
