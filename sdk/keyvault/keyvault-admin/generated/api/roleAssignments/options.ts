// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleAssignmentsListForScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  filter?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsDeleteOptionalParams extends OperationOptions {}
