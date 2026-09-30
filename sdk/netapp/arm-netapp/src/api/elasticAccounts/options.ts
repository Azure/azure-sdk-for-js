// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ElasticAccountsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ElasticAccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ElasticAccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticAccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticAccountsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticAccountsGetOptionalParams extends OperationOptions {}
