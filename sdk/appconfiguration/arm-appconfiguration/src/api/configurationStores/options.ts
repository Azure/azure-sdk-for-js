// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigurationStoresListDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationStoresPurgeDeletedOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationStoresGetDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationStoresRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationStoresListKeysOptionalParams extends OperationOptions {
  /** A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ConfigurationStoresListOptionalParams extends OperationOptions {
  /** A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ConfigurationStoresListByResourceGroupOptionalParams extends OperationOptions {
  /** A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ConfigurationStoresDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationStoresUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationStoresCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationStoresGetOptionalParams extends OperationOptions {}
