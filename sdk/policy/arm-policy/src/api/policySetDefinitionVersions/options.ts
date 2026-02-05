// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListAllBuiltinsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListByManagementGroupOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListBuiltInOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsGetBuiltInOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsListOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicySetDefinitionVersionsGetOptionalParams extends OperationOptions {
  /** Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'. */
  expand?: string;
}
