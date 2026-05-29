// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiBlocklistsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RaiBlocklistsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiBlocklistsGetOptionalParams extends OperationOptions {}
