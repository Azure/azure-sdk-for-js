// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkAddressesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkAddressesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkAddressesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkAddressesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
