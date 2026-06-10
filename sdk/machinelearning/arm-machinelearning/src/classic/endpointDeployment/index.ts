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
