// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleAssignmentsDeleteByIdOptionalParams extends OperationOptions {
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsCreateByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsGetByIdOptionalParams extends OperationOptions {
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsListForResourceOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  filter?: string;
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsListForResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  filter?: string;
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsListForSubscriptionOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  filter?: string;
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsListForScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  filter?: string;
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
  /** The skipToken to apply on the operation. Use $skipToken={skiptoken} to return paged role assignments following the skipToken passed. Only supported on provider level calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsDeleteOptionalParams extends OperationOptions {
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsGetOptionalParams extends OperationOptions {
  /** Tenant ID for cross-tenant request */
  tenantId?: string;
}
