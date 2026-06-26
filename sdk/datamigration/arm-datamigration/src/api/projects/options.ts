// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsDeleteOptionalParams extends OperationOptions {
  /** Delete the resource even if it contains running tasks */
  deleteRunningTasks?: boolean;
}

/** Optional parameters. */
export interface ProjectsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsGetOptionalParams extends OperationOptions {}
