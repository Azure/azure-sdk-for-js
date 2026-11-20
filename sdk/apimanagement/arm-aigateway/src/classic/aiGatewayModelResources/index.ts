// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByModelProvider,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
} from "../../api/aiGatewayModelResources/operations.js";
import type {
  AiGatewayModelResourcesListByModelProviderOptionalParams,
  AiGatewayModelResourcesDeleteOptionalParams,
  AiGatewayModelResourcesUpdateOptionalParams,
  AiGatewayModelResourcesCreateOrUpdateOptionalParams,
  AiGatewayModelResourcesGetOptionalParams,
  AiGatewayModelResourcesCheckExistenceOptionalParams,
} from "../../api/aiGatewayModelResources/options.js";
import type {
  AiGatewayModelResource,
  AiGatewayModelUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayModelResources operations. */
export interface AiGatewayModelResourcesOperations {
  /** List AiGatewayModelResource resources by AiGatewayModelProviderResource */
  listByModelProvider: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    options?: AiGatewayModelResourcesListByModelProviderOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayModelResource>;
  /** Delete a AiGatewayModelResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    modelName: string,
    ifMatch: string,
    options?: AiGatewayModelResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGatewayModelResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    modelName: string,
    ifMatch: string,
    properties: AiGatewayModelUpdateParameters,
    options?: AiGatewayModelResourcesUpdateOptionalParams,
  ) => Promise<AiGatewayModelResource>;
  /** Create a AiGatewayModelResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    modelName: string,
    resource: AiGatewayModelResource,
    options?: AiGatewayModelResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AiGatewayModelResource>;
  /** Get a AiGatewayModelResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    modelName: string,
    options?: AiGatewayModelResourcesGetOptionalParams,
  ) => Promise<AiGatewayModelResource>;
  /** Check for the existence of a AiGatewayModelResource */
  checkExistence: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    modelProviderName: string,
    modelName: string,
    options?: AiGatewayModelResourcesCheckExistenceOptionalParams,
  ) => Promise<void>;
}

function _getAiGatewayModelResources(context: ApiManagementContext) {
  return {
    listByModelProvider: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      options?: AiGatewayModelResourcesListByModelProviderOptionalParams,
    ) =>
      listByModelProvider(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      modelName: string,
      ifMatch: string,
      options?: AiGatewayModelResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        modelName,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      modelName: string,
      ifMatch: string,
      properties: AiGatewayModelUpdateParameters,
      options?: AiGatewayModelResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        modelName,
        ifMatch,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      modelName: string,
      resource: AiGatewayModelResource,
      options?: AiGatewayModelResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        modelName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      modelName: string,
      options?: AiGatewayModelResourcesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        modelName,
        options,
      ),
    checkExistence: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      modelProviderName: string,
      modelName: string,
      options?: AiGatewayModelResourcesCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        modelName,
        options,
      ),
  };
}

export function _getAiGatewayModelResourcesOperations(
  context: ApiManagementContext,
): AiGatewayModelResourcesOperations {
  return {
    ..._getAiGatewayModelResources(context),
  };
}
