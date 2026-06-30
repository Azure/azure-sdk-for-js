// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  listDeployments,
  deleteDeployment,
  createOrUpdateDeployment,
  getDeployment,
  getModels,
  getAllModels,
} from "../../api/connection/operations.js";
import type {
  ConnectionListDeploymentsOptionalParams,
  ConnectionDeleteDeploymentOptionalParams,
  ConnectionCreateOrUpdateDeploymentOptionalParams,
  ConnectionGetDeploymentOptionalParams,
  ConnectionGetModelsOptionalParams,
  ConnectionGetAllModelsOptionalParams,
} from "../../api/connection/options.js";
import type {
  EndpointDeploymentResourcePropertiesBasicResource,
  EndpointModels,
  EndpointModelProperties,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connection operations. */
export interface ConnectionOperations {
  /** Get all the deployments under the Azure OpenAI connection. */
  listDeployments: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionListDeploymentsOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Delete Azure OpenAI connection deployment resource by name */
  deleteDeployment: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    options?: ConnectionDeleteDeploymentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteDeployment instead */
  beginDeleteDeployment: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    options?: ConnectionDeleteDeploymentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteDeployment instead */
  beginDeleteDeploymentAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    options?: ConnectionDeleteDeploymentOptionalParams,
  ) => Promise<void>;
  /** Create or update Azure OpenAI connection deployment resource with the specified parameters */
  createOrUpdateDeployment: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
  ) => PollerLike<
    OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
    EndpointDeploymentResourcePropertiesBasicResource
  >;
  /** @deprecated use createOrUpdateDeployment instead */
  beginCreateOrUpdateDeployment: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
      EndpointDeploymentResourcePropertiesBasicResource
    >
  >;
  /** @deprecated use createOrUpdateDeployment instead */
  beginCreateOrUpdateDeploymentAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
  ) => Promise<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Get deployments under the Azure OpenAI connection by name. */
  getDeployment: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    deploymentName: string,
    options?: ConnectionGetDeploymentOptionalParams,
  ) => Promise<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Get available models under the Azure OpenAI connection. */
  getModels: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionGetModelsOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointModelProperties>;
  /** Get models under the Azure ML workspace for all Azure OpenAI connections that the user can deploy. */
  getAllModels: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ConnectionGetAllModelsOptionalParams,
  ) => Promise<EndpointModels>;
}

function _getConnection(context: AzureMachineLearningServicesManagementContext) {
  return {
    listDeployments: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionListDeploymentsOptionalParams,
    ) => listDeployments(context, resourceGroupName, workspaceName, connectionName, options),
    deleteDeployment: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      options?: ConnectionDeleteDeploymentOptionalParams,
    ) =>
      deleteDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        options,
      ),
    beginDeleteDeployment: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      options?: ConnectionDeleteDeploymentOptionalParams,
    ) => {
      const poller = deleteDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteDeploymentAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      options?: ConnectionDeleteDeploymentOptionalParams,
    ) => {
      return await deleteDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        options,
      );
    },
    createOrUpdateDeployment: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
    ) =>
      createOrUpdateDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        body,
        options,
      ),
    beginCreateOrUpdateDeployment: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
    ) => {
      const poller = createOrUpdateDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateDeploymentAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: ConnectionCreateOrUpdateDeploymentOptionalParams,
    ) => {
      return await createOrUpdateDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        body,
        options,
      );
    },
    getDeployment: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      deploymentName: string,
      options?: ConnectionGetDeploymentOptionalParams,
    ) =>
      getDeployment(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        options,
      ),
    getModels: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionGetModelsOptionalParams,
    ) => getModels(context, resourceGroupName, workspaceName, connectionName, options),
    getAllModels: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ConnectionGetAllModelsOptionalParams,
    ) => getAllModels(context, resourceGroupName, workspaceName, options),
  };
}

export function _getConnectionOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionOperations {
  return {
    ..._getConnection(context),
  };
}
