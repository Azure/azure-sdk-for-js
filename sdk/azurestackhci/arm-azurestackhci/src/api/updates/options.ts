// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdatesPostOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UpdatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UpdatesPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdatesGetOptionalParams extends OperationOptions {}
