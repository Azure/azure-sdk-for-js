// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServersCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServersRefreshStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServersImportDatabaseOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServersListOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ServersListByResourceGroupOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ServersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServersGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}
