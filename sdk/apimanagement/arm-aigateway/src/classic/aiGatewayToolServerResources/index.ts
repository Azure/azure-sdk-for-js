// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  getOauth2LoginLinks,
  listSecrets,
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "../../api/aiGatewayToolServerResources/operations.js";
import type {
  AiGatewayToolServerResourcesGetOauth2LoginLinksOptionalParams,
  AiGatewayToolServerResourcesListSecretsOptionalParams,
  AiGatewayToolServerResourcesListByWorkspaceOptionalParams,
  AiGatewayToolServerResourcesDeleteOptionalParams,
  AiGatewayToolServerResourcesUpdateOptionalParams,
  AiGatewayToolServerResourcesCreateOrUpdateOptionalParams,
  AiGatewayToolServerResourcesGetOptionalParams,
  AiGatewayToolServerResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayToolServerResources/options.js";
import type {
  AiGatewayToolServerResource,
  AiGatewayToolServerUpdateParameters,
  AiGatewayToolServerSecrets,
  AiGatewayToolServerLoginLinksRequest,
  AiGatewayToolServerOauth2LoginLinks,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayToolServerResources operations. */
export interface AiGatewayToolServerResourcesOperations {
  /** Gets links to complete OAuth consent for a tool server endpoint. */
  getOauth2LoginLinks: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    body: AiGatewayToolServerLoginLinksRequest,
    options?: AiGatewayToolServerResourcesGetOauth2LoginLinksOptionalParams,
  ) => Promise<AiGatewayToolServerOauth2LoginLinks>;
  /** Lists secret values configured on tool server endpoints. */
  listSecrets: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    options?: AiGatewayToolServerResourcesListSecretsOptionalParams,
  ) => Promise<AiGatewayToolServerSecrets>;
  /** List AiGatewayToolServerResource resources by AiGatewayWorkspaceResource */
  listByWorkspace: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayToolServerResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayToolServerResource>;
  /** Delete a AiGatewayToolServerResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    ifMatch: string,
    options?: AiGatewayToolServerResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayToolServerResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    ifMatch: string,
    properties: AiGatewayToolServerUpdateParameters,
    options?: AiGatewayToolServerResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayToolServerResource>;
  /** Create a AiGatewayToolServerResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    resource: AiGatewayToolServerResource,
    options?: AiGatewayToolServerResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayToolServerResource>;
  /** Get a AiGatewayToolServerResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    options?: AiGatewayToolServerResourcesGetOptionalParams,
  ) => Promise<AiGatewayToolServerResource>;
  /** Check for the existence of a AiGatewayToolServerResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    toolServerName: string,
    options?: AiGatewayToolServerResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayToolServerResources(context: ApiManagementContext) {
  return {
    getOauth2LoginLinks: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      body: AiGatewayToolServerLoginLinksRequest,
      options?: AiGatewayToolServerResourcesGetOauth2LoginLinksOptionalParams,
    ) =>
      getOauth2LoginLinks(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        body,
        options,
      ),
    listSecrets: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      options?: AiGatewayToolServerResourcesListSecretsOptionalParams,
    ) =>
      listSecrets(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        options,
      ),
    listByWorkspace: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayToolServerResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, aiGatewayName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      ifMatch: string,
      options?: AiGatewayToolServerResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      ifMatch: string,
      properties: AiGatewayToolServerUpdateParameters,
      options?: AiGatewayToolServerResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        ifMatch,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      resource: AiGatewayToolServerResource,
      options?: AiGatewayToolServerResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      options?: AiGatewayToolServerResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, workspaceName, toolServerName, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      toolServerName: string,
      options?: AiGatewayToolServerResourcesCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        toolServerName,
        options,
      ),
  };
}

export function _getAiGatewayToolServerResourcesOperations(
  context: ApiManagementContext,
): AiGatewayToolServerResourcesOperations {
  return {
    ..._getAiGatewayToolServerResources(context),
  };
}
