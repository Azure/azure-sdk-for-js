// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowVersionsListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
}

/** Optional parameters. */
export interface WorkflowVersionsGetOptionalParams extends OperationOptions {}
