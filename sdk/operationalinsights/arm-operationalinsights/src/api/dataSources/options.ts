// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataSourcesListByWorkspaceOptionalParams extends OperationOptions {
  /** Starting point of the collection of data source instances. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface DataSourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataSourcesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataSourcesGetOptionalParams extends OperationOptions {}
