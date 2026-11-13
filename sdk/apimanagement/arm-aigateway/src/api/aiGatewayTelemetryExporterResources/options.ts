// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesListByWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the resource. Required for an update. */
  ifMatch?: string;
  /** Set to '*' to allow creating a new resource, but prevent updating an existing resource. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewayTelemetryExporterResourcesCheckExistenceOptionalParams extends OperationOptions {}
