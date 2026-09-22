// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StartTaskRequest } from "../../../models/microsoft/discovery/workspace/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TasksAddExecutionHistoryOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface TasksAddCommentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface TasksStartOptionalParams extends OperationOptions {
  /** Start task request body. */
  body?: StartTaskRequest;
}
/** Optional parameters. */
export interface TasksDeleteOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface TasksStableUpdateOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface TasksCreateOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface TasksListOptionalParams extends OperationOptions {
  /** OData filter expression. Supported fields: investigationId, status, createdByType, priority, createdAt, lastModifiedAt. Example: status eq 'new' or status eq 'executing' */
  filter?: string;
}
/** Optional parameters. */
export interface TasksGetOptionalParams extends OperationOptions {}
