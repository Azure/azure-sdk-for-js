// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesListByWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelProviderResourcesCheckExistenceOptionalParams extends OperationOptions {}
