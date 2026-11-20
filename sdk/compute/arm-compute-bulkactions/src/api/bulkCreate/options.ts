// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BulkCreateListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateVirtualMachinesGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BulkCreateGetAsyncOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkCreateGetOptionalParams extends OperationOptions {}
