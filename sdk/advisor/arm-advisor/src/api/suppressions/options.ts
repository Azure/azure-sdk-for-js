// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SuppressionsListOptionalParams extends OperationOptions {
  /** The number of suppressions per page if a paged version of this API is being used. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
}

/** Optional parameters. */
export interface SuppressionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SuppressionsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SuppressionsGetOptionalParams extends OperationOptions {}
