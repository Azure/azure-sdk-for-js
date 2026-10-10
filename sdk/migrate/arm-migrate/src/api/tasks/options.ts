// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TasksGetSummaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TasksListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
