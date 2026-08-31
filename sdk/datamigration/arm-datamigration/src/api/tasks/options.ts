// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TasksCommandOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksListOptionalParams extends OperationOptions {
  /** Filter tasks by task type */
  taskType?: string;
}

/** Optional parameters. */
export interface TasksDeleteOptionalParams extends OperationOptions {
  /** Delete the resource even if it contains running tasks */
  deleteRunningTasks?: boolean;
}

/** Optional parameters. */
export interface TasksUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksGetOptionalParams extends OperationOptions {
  /** Expand the response */
  expand?: string;
}
