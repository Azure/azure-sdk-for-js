// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MongoClustersPromoteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersListConnectionStringsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersGetOptionalParams extends OperationOptions {}
