// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TaskRunsGetDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TaskRunsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TaskRunsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TaskRunsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TaskRunsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TaskRunsGetOptionalParams extends OperationOptions {}
