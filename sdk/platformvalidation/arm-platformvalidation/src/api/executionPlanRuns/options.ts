// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExecutionPlanRunsListByExecutionPlanOptionalParams extends OperationOptions {
  /** The OData filter expression to apply to the list operation. */
  filter?: string;
}

/** Optional parameters. */
export interface ExecutionPlanRunsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExecutionPlanRunsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExecutionPlanRunsGetOptionalParams extends OperationOptions {}
