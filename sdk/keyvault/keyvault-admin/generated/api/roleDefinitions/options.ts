// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use atScopeAndBelow filter to search below the given scope as well. */
  filter?: string;
}

/** Optional parameters. */
export interface RoleDefinitionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsDeleteOptionalParams extends OperationOptions {}
