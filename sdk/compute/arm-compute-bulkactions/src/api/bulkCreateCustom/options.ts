// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BulkCreateCustomListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateCustomListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateCustomCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BulkCreateCustomGetAsyncOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateCustomGetOptionalParams extends OperationOptions {}
