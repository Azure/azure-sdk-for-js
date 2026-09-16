// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyExemptionsListForResourceOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the scope, including those that apply directly or apply from containing scopes. If $filter=atScope() is provided, the returned list only includes all policy exemptions that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy exemptions that at the given scope. If $filter=excludeExpired() is provided, the returned list only includes all policy exemptions that either haven't expired or didn't set expiration date. If $filter=policyAssignmentId eq '{value}' is provided. the returned list only includes all policy exemptions that are associated with the give policyAssignmentId. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyExemptionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the scope, including those that apply directly or apply from containing scopes. If $filter=atScope() is provided, the returned list only includes all policy exemptions that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy exemptions that at the given scope. If $filter=excludeExpired() is provided, the returned list only includes all policy exemptions that either haven't expired or didn't set expiration date. If $filter=policyAssignmentId eq '{value}' is provided. the returned list only includes all policy exemptions that are associated with the give policyAssignmentId. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyExemptionsListForManagementGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the scope, including those that apply directly or apply from containing scopes. If $filter=atScope() is provided, the returned list only includes all policy exemptions that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy exemptions that at the given scope. If $filter=excludeExpired() is provided, the returned list only includes all policy exemptions that either haven't expired or didn't set expiration date. If $filter=policyAssignmentId eq '{value}' is provided. the returned list only includes all policy exemptions that are associated with the give policyAssignmentId. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyExemptionsListForResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the scope, including those that apply directly or apply from containing scopes. If $filter=atScope() is provided, the returned list only includes all policy exemptions that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy exemptions that at the given scope. If $filter=excludeExpired() is provided, the returned list only includes all policy exemptions that either haven't expired or didn't set expiration date. If $filter=policyAssignmentId eq '{value}' is provided. the returned list only includes all policy exemptions that are associated with the give policyAssignmentId. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyExemptionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyExemptionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyExemptionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyExemptionsGetOptionalParams extends OperationOptions {}
