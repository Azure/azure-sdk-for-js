// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PublicIPAddressesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesGetOptionalParams extends OperationOptions {}
