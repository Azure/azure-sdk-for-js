// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayToolServerResourcesGetOauth2LoginLinksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesListByWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayToolServerResourcesCheckExistenceOptionalParams extends OperationOptions {}
