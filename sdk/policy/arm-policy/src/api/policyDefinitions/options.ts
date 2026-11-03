// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyDefinitionsListByManagementGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
  filter?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionsDeleteAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsGetAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsListBuiltInOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
  filter?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionsGetBuiltInOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
  filter?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionsGetOptionalParams extends OperationOptions {}
