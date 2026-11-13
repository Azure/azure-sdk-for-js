// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayAliasResourcesListByWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayAliasResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayAliasResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayAliasResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayAliasResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayAliasResourcesCheckExistenceOptionalParams extends OperationOptions {}
