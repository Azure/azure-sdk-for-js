// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyDefinitionVersionsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsListAllBuiltinsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsListByManagementGroupOptionalParams extends OperationOptions {
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsGetAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsListBuiltInOptionalParams extends OperationOptions {
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionVersionsGetBuiltInOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsListOptionalParams extends OperationOptions {
  /** Maximum number of records to return. When the $top filter is not provided, it will return 500 records. */
  top?: number;
}

/** Optional parameters. */
export interface PolicyDefinitionVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDefinitionVersionsGetOptionalParams extends OperationOptions {}
