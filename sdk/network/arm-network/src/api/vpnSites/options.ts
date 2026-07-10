// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VpnSitesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnSitesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnSitesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnSitesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnSitesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnSitesGetOptionalParams extends OperationOptions {}
