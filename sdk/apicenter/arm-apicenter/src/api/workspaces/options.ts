// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacesListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesGetOptionalParams extends OperationOptions {}
