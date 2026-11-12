// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VnetConnectionsListBySandboxGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VnetConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VnetConnectionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VnetConnectionsGetOptionalParams extends OperationOptions {}
