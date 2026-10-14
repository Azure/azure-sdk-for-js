// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductsGenerateDefaultDeviceGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductsCountDevicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductsListByCatalogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProductsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProductsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProductsGetOptionalParams extends OperationOptions {}
