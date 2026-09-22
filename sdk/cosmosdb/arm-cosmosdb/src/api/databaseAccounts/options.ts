// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseAccountsCheckNameExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsListMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsListUsagesOptionalParams extends OperationOptions {
  /** An OData filter expression that describes a subset of usages to return. The supported parameter is name.value (name of the metric, can have an or of multiple names). */
  filter?: string;
}

/** Optional parameters. */
export interface DatabaseAccountsListMetricsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsRegenerateKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsListReadOnlyKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsGetReadOnlyKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsOnlineRegionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsOfflineRegionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsListConnectionStringsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsFailoverPriorityChangeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseAccountsGetOptionalParams extends OperationOptions {}
