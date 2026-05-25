// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowRunsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowRunsListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The filter to apply on the operation. Options for filters include: Status, StartTime, and ClientTrackingId. */
  filter?: string;
}

/** Optional parameters. */
export interface WorkflowRunsGetOptionalParams extends OperationOptions {}
