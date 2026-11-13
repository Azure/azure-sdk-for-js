// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayModelResourcesListByModelProviderOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayModelResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayModelResourcesCheckExistenceOptionalParams extends OperationOptions {}
