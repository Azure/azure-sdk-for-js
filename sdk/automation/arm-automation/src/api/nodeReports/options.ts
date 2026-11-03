// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NodeReportsGetContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeReportsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeReportsListByNodeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}
