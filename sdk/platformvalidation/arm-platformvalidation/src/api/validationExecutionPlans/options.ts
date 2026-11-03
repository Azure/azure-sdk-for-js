// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ValidationExecutionPlansListByResourceGroupOptionalParams extends OperationOptions {
  /** The OData filter expression to apply to the list operation. */
  filter?: string;
}

/** Optional parameters. */
export interface ValidationExecutionPlansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ValidationExecutionPlansUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ValidationExecutionPlansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ValidationExecutionPlansGetOptionalParams extends OperationOptions {}
