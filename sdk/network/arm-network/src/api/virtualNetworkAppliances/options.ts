// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkAppliancesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkAppliancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkAppliancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkAppliancesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkAppliancesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkAppliancesGetOptionalParams extends OperationOptions {}
