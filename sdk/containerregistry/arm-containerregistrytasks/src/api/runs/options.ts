// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RunsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunsGetLogSasUrlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunsListOptionalParams extends OperationOptions {
  /** The runs filter to apply on the operation. Arithmetic operators are not supported. The allowed string function is 'contains'. All logical operators except 'Not', 'Has', 'All' are allowed. */
  filter?: string;
  /** $top is supported for get list of runs, which limits the maximum number of runs to return. */
  top?: number;
}

/** Optional parameters. */
export interface RunsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunsGetOptionalParams extends OperationOptions {}
