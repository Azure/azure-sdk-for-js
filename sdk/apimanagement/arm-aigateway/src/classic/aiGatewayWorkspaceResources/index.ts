// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByAiGateway,
  update,
  get,
  checkExistence,
} from "../../api/aiGatewayWorkspaceResources/operations.js";
import type {
  AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams,
  AiGatewayWorkspaceResourcesUpdateOptionalParams,
  AiGatewayWorkspaceResourcesGetOptionalParams,
  AiGatewayWorkspaceResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayWorkspaceResources/options.js";
import type {
  AiGatewayWorkspaceResource,
  AiGatewayWorkspaceUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayWorkspaceResources operations. */
export interface AiGatewayWorkspaceResourcesOperations {
  /** List AiGatewayWorkspaceResource resources by AiGatewayResource */
  listByAiGateway: (
    resourceGroupName: string,
    aiGatewayName: string,
    options?: AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayWorkspaceResource>;
  /** Update a AiGatewayWorkspaceResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    ifMatch: string,
    properties: AiGatewayWorkspaceUpdateParameters,
    options?: AiGatewayWorkspaceResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayWorkspaceResource>;
  /** Get a AiGatewayWorkspaceResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayWorkspaceResourcesGetOptionalParams,
  ) => Promise<AiGatewayWorkspaceResource>;
  /** Check for the existence of a AiGatewayWorkspaceResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayWorkspaceResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayWorkspaceResources(context: ApiManagementContext) {
  return {
    listByAiGateway: (
      resourceGroupName: string,
      aiGatewayName: string,
      options?: AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams,
    ) => listByAiGateway(context, resourceGroupName, aiGatewayName, options),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      ifMatch: string,
      properties: AiGatewayWorkspaceUpdateParameters,
      options?: AiGatewayWorkspaceResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        ifMatch,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayWorkspaceResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, workspaceName, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayWorkspaceResourcesCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, aiGatewayName, workspaceName, options),
  };
}

export function _getAiGatewayWorkspaceResourcesOperations(
  context: ApiManagementContext,
): AiGatewayWorkspaceResourcesOperations {
  return {
    ..._getAiGatewayWorkspaceResources(context),
  };
}
