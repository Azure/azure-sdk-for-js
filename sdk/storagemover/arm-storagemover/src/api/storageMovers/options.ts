// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageMoversListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageMoversListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageMoversDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageMoversUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageMoversCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageMoversGetOptionalParams extends OperationOptions {}
