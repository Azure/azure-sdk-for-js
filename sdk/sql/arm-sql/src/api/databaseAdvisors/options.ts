// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseAdvisorsListByDatabaseOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface DatabaseAdvisorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseAdvisorsGetOptionalParams extends OperationOptions {}
