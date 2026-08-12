// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BastionHostsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BastionHostsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BastionHostsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BastionHostsUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BastionHostsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BastionHostsGetOptionalParams extends OperationOptions {}
