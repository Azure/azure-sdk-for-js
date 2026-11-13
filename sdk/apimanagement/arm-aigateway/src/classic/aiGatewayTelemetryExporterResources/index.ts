// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "../../api/aiGatewayTelemetryExporterResources/operations.js";
import type {
  AiGatewayTelemetryExporterResourcesListByWorkspaceOptionalParams,
  AiGatewayTelemetryExporterResourcesDeleteOptionalParams,
  AiGatewayTelemetryExporterResourcesUpdateOptionalParams,
  AiGatewayTelemetryExporterResourcesCreateOrUpdateOptionalParams,
  AiGatewayTelemetryExporterResourcesGetOptionalParams,
  AiGatewayTelemetryExporterResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayTelemetryExporterResources/options.js";
import type {
  AiGatewayTelemetryExporterResource,
  AiGatewayTelemetryExporterUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayTelemetryExporterResources operations. */
export interface AiGatewayTelemetryExporterResourcesOperations {
  /** List AiGatewayTelemetryExporterResource resources by AiGatewayWorkspaceResource */
  listByWorkspace: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayTelemetryExporterResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayTelemetryExporterResource>;
  /** Delete a AiGatewayTelemetryExporterResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    telemetryExporterName: string,
    ifMatch: string,
    options?: AiGatewayTelemetryExporterResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayTelemetryExporterResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    telemetryExporterName: string,
    ifMatch: string,
    properties: AiGatewayTelemetryExporterUpdateParameters,
    options?: AiGatewayTelemetryExporterResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayTelemetryExporterResource>;
  /** Create a AiGatewayTelemetryExporterResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    telemetryExporterName: string,
    resource: AiGatewayTelemetryExporterResource,
    options?: AiGatewayTelemetryExporterResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayTelemetryExporterResource>;
  /** Get a AiGatewayTelemetryExporterResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    telemetryExporterName: string,
    options?: AiGatewayTelemetryExporterResourcesGetOptionalParams,
  ) => Promise<AiGatewayTelemetryExporterResource>;
  /** Check for the existence of a AiGatewayTelemetryExporterResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    telemetryExporterName: string,
    options?: AiGatewayTelemetryExporterResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayTelemetryExporterResources(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayTelemetryExporterResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, aiGatewayName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      telemetryExporterName: string,
      ifMatch: string,
      options?: AiGatewayTelemetryExporterResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        telemetryExporterName,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      telemetryExporterName: string,
      ifMatch: string,
      properties: AiGatewayTelemetryExporterUpdateParameters,
      options?: AiGatewayTelemetryExporterResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        telemetryExporterName,
        ifMatch,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      telemetryExporterName: string,
      resource: AiGatewayTelemetryExporterResource,
      options?: AiGatewayTelemetryExporterResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        telemetryExporterName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      telemetryExporterName: string,
      options?: AiGatewayTelemetryExporterResourcesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, aiGatewayName, workspaceName, telemetryExporterName, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      telemetryExporterName: string,
      options?: AiGatewayTelemetryExporterResourcesCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        telemetryExporterName,
        options,
      ),
  };
}

export function _getAiGatewayTelemetryExporterResourcesOperations(
  context: ApiManagementContext,
): AiGatewayTelemetryExporterResourcesOperations {
  return {
    ..._getAiGatewayTelemetryExporterResources(context),
  };
}
