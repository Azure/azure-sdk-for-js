// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "../../api/aiGatewayModelProviderResources/operations.js";
import type {
  AiGatewayModelProviderResourcesListSecretsOptionalParams,
  AiGatewayModelProviderResourcesListByWorkspaceOptionalParams,
  AiGatewayModelProviderResourcesDeleteOptionalParams,
  AiGatewayModelProviderResourcesUpdateOptionalParams,
  AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams,
  AiGatewayModelProviderResourcesGetOptionalParams,
  AiGatewayModelProviderResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayModelProviderResources/options.js";
import type {
  AiGatewayModelProviderResource,
  AiGatewayModelProviderUpdateParameters,
  AiGatewayModelProviderSecrets,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayModelProviderResources operations. */
export interface AiGatewayModelProviderResourcesOperations {
  /** Returns the stored model-provider authentication configuration, including secret values. */
  listSecrets: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    options?: AiGatewayModelProviderResourcesListSecretsOptionalParams,
  ) => Promise<AiGatewayModelProviderSecrets>;
  /** List AiGatewayModelProviderResource resources by AiGatewayWorkspaceResource */
  listByWorkspace: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayModelProviderResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayModelProviderResource>;
  /** Delete a AiGatewayModelProviderResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    ifMatch: string,
    options?: AiGatewayModelProviderResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayModelProviderResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    ifMatch: string,
    properties: AiGatewayModelProviderUpdateParameters,
    options?: AiGatewayModelProviderResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayModelProviderResource>;
  /** Create a AiGatewayModelProviderResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    resource: AiGatewayModelProviderResource,
    options?: AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayModelProviderResource>;
  /** Get a AiGatewayModelProviderResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    options?: AiGatewayModelProviderResourcesGetOptionalParams,
  ) => Promise<AiGatewayModelProviderResource>;
  /** Check for the existence of a AiGatewayModelProviderResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    options?: AiGatewayModelProviderResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayModelProviderResources(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      options?: AiGatewayModelProviderResourcesListSecretsOptionalParams,
    ) =>
      listSecrets(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        options,
      ),
    listByWorkspace: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayModelProviderResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, aiGatewayName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      ifMatch: string,
      options?: AiGatewayModelProviderResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      ifMatch: string,
      properties: AiGatewayModelProviderUpdateParameters,
      options?: AiGatewayModelProviderResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        ifMatch,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      resource: AiGatewayModelProviderResource,
      options?: AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      options?: AiGatewayModelProviderResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, workspaceName, modelProviderName, options),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      options?: AiGatewayModelProviderResourcesCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        options,
      ),
  };
}

export function _getAiGatewayModelProviderResourcesOperations(
  context: ApiManagementContext,
): AiGatewayModelProviderResourcesOperations {
  return {
    ..._getAiGatewayModelProviderResources(context),
  };
}
