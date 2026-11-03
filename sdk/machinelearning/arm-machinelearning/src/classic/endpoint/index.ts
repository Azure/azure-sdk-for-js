// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  regenerateKeys,
  getModels,
  listKeys,
  list,
  createOrUpdate,
  get,
} from "../../api/endpoint/operations.js";
import type {
  EndpointRegenerateKeysOptionalParams,
  EndpointGetModelsOptionalParams,
  EndpointListKeysOptionalParams,
  EndpointListOptionalParams,
  EndpointCreateOrUpdateOptionalParams,
  EndpointGetOptionalParams,
} from "../../api/endpoint/options.js";
import type {
  EndpointModelProperties,
  EndpointResourcePropertiesBasicResource,
  EndpointKeys,
  AccountApiKeys,
  RegenerateServiceAccountKeyContent,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoint operations. */
export interface EndpointOperations {
  /** Regenerate account keys */
  regenerateKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateServiceAccountKeyContent,
    options?: EndpointRegenerateKeysOptionalParams,
  ) => Promise<AccountApiKeys>;
  /** Get available models under the endpoint resource. */
  getModels: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: EndpointGetModelsOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointModelProperties>;
  /** List keys for the endpoint resource. */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: EndpointListKeysOptionalParams,
  ) => Promise<EndpointKeys>;
  /** List All the endpoints under this workspace */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EndpointListOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointResourcePropertiesBasicResource>;
  /** Create or update endpoint resource with the specified parameters */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: EndpointResourcePropertiesBasicResource,
    options?: EndpointCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<EndpointResourcePropertiesBasicResource>,
    EndpointResourcePropertiesBasicResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: EndpointResourcePropertiesBasicResource,
    options?: EndpointCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<EndpointResourcePropertiesBasicResource>,
      EndpointResourcePropertiesBasicResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: EndpointResourcePropertiesBasicResource,
    options?: EndpointCreateOrUpdateOptionalParams,
  ) => Promise<EndpointResourcePropertiesBasicResource>;
  /** Gets endpoint resource */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: EndpointGetOptionalParams,
  ) => Promise<EndpointResourcePropertiesBasicResource>;
}

function _getEndpoint(context: AzureMachineLearningServicesManagementContext) {
  return {
    regenerateKeys: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: RegenerateServiceAccountKeyContent,
      options?: EndpointRegenerateKeysOptionalParams,
    ) => regenerateKeys(context, resourceGroupName, workspaceName, endpointName, body, options),
    getModels: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: EndpointGetModelsOptionalParams,
    ) => getModels(context, resourceGroupName, workspaceName, endpointName, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: EndpointListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, endpointName, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EndpointListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: EndpointResourcePropertiesBasicResource,
      options?: EndpointCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, endpointName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: EndpointResourcePropertiesBasicResource,
      options?: EndpointCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: EndpointResourcePropertiesBasicResource,
      options?: EndpointCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: EndpointGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, options),
  };
}

export function _getEndpointOperations(
  context: AzureMachineLearningServicesManagementContext,
): EndpointOperations {
  return {
    ..._getEndpoint(context),
  };
}
