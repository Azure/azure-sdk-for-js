// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiBlocklistItemsBatchDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistItemsBatchAddOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistItemsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistItemsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RaiBlocklistItemsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistItemsGetOptionalParams extends OperationOptions {}
