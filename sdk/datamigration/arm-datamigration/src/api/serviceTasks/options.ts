// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceTasksCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceTasksListOptionalParams extends OperationOptions {
  /** Filter tasks by task type */
  taskType?: string;
}

/** Optional parameters. */
export interface ServiceTasksDeleteOptionalParams extends OperationOptions {
  /** Delete the resource even if it contains running tasks */
  deleteRunningTasks?: boolean;
}

/** Optional parameters. */
export interface ServiceTasksUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceTasksCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceTasksGetOptionalParams extends OperationOptions {
  /** Expand the response */
  expand?: string;
}
