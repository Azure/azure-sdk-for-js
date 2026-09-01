// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyEnrollmentsListForResourceOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the scope, including those that apply directly or from containing scopes. If $filter=atScope() is provided, the returned list includes all policy enrollments that apply to the scope, which is everything in the unfiltered list except those applied to sub-scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy enrollments that apply at the given scope. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyEnrollmentsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the scope, including those that apply directly or from containing scopes. If $filter=atScope() is provided, the returned list includes all policy enrollments that apply to the scope, which is everything in the unfiltered list except those applied to sub-scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy enrollments that apply at the given scope. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyEnrollmentsListForManagementGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the scope, including those that apply directly or from containing scopes. If $filter=atScope() is provided, the returned list includes all policy enrollments that apply to the scope, which is everything in the unfiltered list except those applied to sub-scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy enrollments that apply at the given scope. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyEnrollmentsListForResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, no filtering is performed. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the scope, including those that apply directly or from containing scopes. If $filter=atScope() is provided, the returned list includes all policy enrollments that apply to the scope, which is everything in the unfiltered list except those applied to sub-scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy enrollments that apply at the given scope. */
  filter?: string;
}

/** Optional parameters. */
export interface PolicyEnrollmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyEnrollmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyEnrollmentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyEnrollmentsGetOptionalParams extends OperationOptions {}
