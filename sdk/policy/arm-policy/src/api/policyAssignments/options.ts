// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyAssignmentsListForResourceOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyAssignmentsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyAssignmentsListForManagementGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyAssignmentsListForResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyAssignmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyAssignmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyAssignmentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyAssignmentsGetOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}
