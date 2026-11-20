// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesListByAiGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayApiKeyResourcesCheckExistenceOptionalParams extends OperationOptions {}
