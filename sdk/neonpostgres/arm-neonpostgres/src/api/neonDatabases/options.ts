// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeonDatabasesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeonDatabasesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NeonDatabasesListOptionalParams extends OperationOptions {}
