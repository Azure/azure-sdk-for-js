// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  getInWorkspace,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/endpointDeployment/operations.js";
import type {
  EndpointDeploymentGetInWorkspaceOptionalParams,
  EndpointDeploymentListOptionalParams,
  EndpointDeploymentDeleteOptionalParams,
  EndpointDeploymentCreateOrUpdateOptionalParams,
  EndpointDeploymentGetOptionalParams,
} from "../../api/endpointDeployment/options.js";
import type { EndpointDeploymentResourcePropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EndpointDeployment operations. */
export interface EndpointDeploymentOperations {
  /** Get all the deployments under the workspace scope. */
  getInWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EndpointDeploymentGetInWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Get all the deployments under the endpoint resource scope */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: EndpointDeploymentListOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Delete  endpoint deployment resource by name */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: EndpointDeploymentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: EndpointDeploymentDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: EndpointDeploymentDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update endpoint deployment resource with the specified parameters */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: EndpointDeploymentCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
    EndpointDeploymentResourcePropertiesBasicResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: EndpointDeploymentCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
      EndpointDeploymentResourcePropertiesBasicResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: EndpointDeploymentResourcePropertiesBasicResource,
    options?: EndpointDeploymentCreateOrUpdateOptionalParams,
  ) => Promise<EndpointDeploymentResourcePropertiesBasicResource>;
  /** Get deployments under endpoint resource by name */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: EndpointDeploymentGetOptionalParams,
  ) => Promise<EndpointDeploymentResourcePropertiesBasicResource>;
}

function _getEndpointDeployment(context: AzureMachineLearningServicesManagementContext) {
  return {
    getInWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EndpointDeploymentGetInWorkspaceOptionalParams,
    ) => getInWorkspace(context, resourceGroupName, workspaceName, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: EndpointDeploymentListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, endpointName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: EndpointDeploymentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: EndpointDeploymentDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: EndpointDeploymentDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: EndpointDeploymentCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: EndpointDeploymentCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
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
      deploymentName: string,
      body: EndpointDeploymentResourcePropertiesBasicResource,
      options?: EndpointDeploymentCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: EndpointDeploymentGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
  };
}

export function _getEndpointDeploymentOperations(
  context: AzureMachineLearningServicesManagementContext,
): EndpointDeploymentOperations {
  return {
    ..._getEndpointDeployment(context),
  };
}
