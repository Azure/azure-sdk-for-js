// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowRunActionsListExpressionTracesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowRunActionsListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The filter to apply on the operation. Options for filters include: Status. */
  filter?: string;
}

/** Optional parameters. */
export interface WorkflowRunActionsGetOptionalParams extends OperationOptions {}
