// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams extends OperationOptions {
  /**
   * Page continuation token is only used if a previous operation returned a partial result.
   * If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
   */
  skiptoken?: string;
}

/** Optional parameters. */
export interface ManagementGroupSubscriptionsDeleteOptionalParams extends OperationOptions {
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}

/** Optional parameters. */
export interface ManagementGroupSubscriptionsCreateOptionalParams extends OperationOptions {
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}

/** Optional parameters. */
export interface ManagementGroupSubscriptionsGetSubscriptionOptionalParams extends OperationOptions {
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}
