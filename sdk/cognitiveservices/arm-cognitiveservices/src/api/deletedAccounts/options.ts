// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeletedAccountsPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeletedAccountsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeletedAccountsListOptionalParams extends OperationOptions {}
