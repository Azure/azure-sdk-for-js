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
} from "../../api/aiGatewayAliasResources/operations.js";
import type {
  AiGatewayAliasResourcesListByWorkspaceOptionalParams,
  AiGatewayAliasResourcesDeleteOptionalParams,
  AiGatewayAliasResourcesUpdateOptionalParams,
  AiGatewayAliasResourcesCreateOrUpdateOptionalParams,
  AiGatewayAliasResourcesGetOptionalParams,
  AiGatewayAliasResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayAliasResources/options.js";
import type {
  AiGatewayAliasResource,
  AiGatewayAliasUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayAliasResources operations. */
export interface AiGatewayAliasResourcesOperations {
  /** List AiGatewayAliasResource resources by AiGatewayWorkspaceResource */
  listByWorkspace: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayAliasResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayAliasResource>;
  /** Delete a AiGatewayAliasResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    aliasId: string,
    ifMatch: string,
    options?: AiGatewayAliasResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayAliasResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    aliasId: string,
    ifMatch: string,
    properties: AiGatewayAliasUpdateParameters,
    options?: AiGatewayAliasResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayAliasResource>;
  /** Create a AiGatewayAliasResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    aliasId: string,
    resource: AiGatewayAliasResource,
    options?: AiGatewayAliasResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayAliasResource>;
  /** Get a AiGatewayAliasResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    aliasId: string,
    options?: AiGatewayAliasResourcesGetOptionalParams,
  ) => Promise<AiGatewayAliasResource>;
  /** Check for the existence of a AiGatewayAliasResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    aliasId: string,
    options?: AiGatewayAliasResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayAliasResources(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayAliasResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, aiGatewayName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      aliasId: string,
      ifMatch: string,
      options?: AiGatewayAliasResourcesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, aiGatewayName, workspaceName, aliasId, ifMatch, options),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      aliasId: string,
      ifMatch: string,
      properties: AiGatewayAliasUpdateParameters,
      options?: AiGatewayAliasResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        aliasId,
        ifMatch,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      aliasId: string,
      resource: AiGatewayAliasResource,
      options?: AiGatewayAliasResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        aliasId,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      aliasId: string,
      options?: AiGatewayAliasResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, workspaceName, aliasId, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      aliasId: string,
      options?: AiGatewayAliasResourcesCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, aiGatewayName, workspaceName, aliasId, options),
  };
}

export function _getAiGatewayAliasResourcesOperations(
  context: ApiManagementContext,
): AiGatewayAliasResourcesOperations {
  return {
    ..._getAiGatewayAliasResources(context),
  };
}
