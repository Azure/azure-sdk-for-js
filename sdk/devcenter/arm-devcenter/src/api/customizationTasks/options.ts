// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomizationTasksGetErrorDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomizationTasksListByCatalogOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface CustomizationTasksGetOptionalParams extends OperationOptions {}
