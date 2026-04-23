// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsCreateOrUpdateOptionalParams extends OperationOptions {}
