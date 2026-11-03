// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicySetDefinitionsListByManagementGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionsDeleteAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionsGetAtManagementGroupOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}

/** Optional parameters. */
export interface PolicySetDefinitionsListBuiltInOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionsGetBuiltInOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}

/** Optional parameters. */
export interface PolicySetDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
  filter?: string;
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionsGetOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}
