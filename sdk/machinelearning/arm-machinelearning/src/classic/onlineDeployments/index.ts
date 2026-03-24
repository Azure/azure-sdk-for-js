// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  listSkus,
  getLogs,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/onlineDeployments/operations.js";
import type {
  OnlineDeploymentsListSkusOptionalParams,
  OnlineDeploymentsGetLogsOptionalParams,
  OnlineDeploymentsListOptionalParams,
  OnlineDeploymentsDeleteOptionalParams,
  OnlineDeploymentsUpdateOptionalParams,
  OnlineDeploymentsCreateOrUpdateOptionalParams,
  OnlineDeploymentsGetOptionalParams,
} from "../../api/onlineDeployments/options.js";
import type {
  OnlineDeployment,
  PartialMinimalTrackedResourceWithSku,
  DeploymentLogsRequest,
  DeploymentLogs,
  SkuResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OnlineDeployments operations. */
export interface OnlineDeploymentsOperations {
  /** List Inference Endpoint Deployment Skus. */
  listSkus: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Polls an Endpoint operation. */
  getLogs: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: DeploymentLogsRequest,
    options?: OnlineDeploymentsGetLogsOptionalParams,
  ) => Promise<DeploymentLogs>;
  /** List Inference Endpoint Deployments. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineDeployment>;
  /** Delete Inference Endpoint Deployment (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Online Deployment (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: OnlineDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineDeployment>, OnlineDeployment>;
  /** Create or update Inference Endpoint Deployment (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: OnlineDeployment,
    options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineDeployment>, OnlineDeployment>;
  /** Get Inference Deployment Deployment. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsGetOptionalParams,
  ) => Promise<OnlineDeployment>;
}

function _getOnlineDeployments(context: AzureMachineLearningServicesManagementContext) {
  return {
    listSkus: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: OnlineDeploymentsListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
    getLogs: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: DeploymentLogsRequest,
      options?: OnlineDeploymentsGetLogsOptionalParams,
    ) =>
      getLogs(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, endpointName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: OnlineDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: PartialMinimalTrackedResourceWithSku,
      options?: OnlineDeploymentsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: OnlineDeployment,
      options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
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
      options?: OnlineDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
  };
}

export function _getOnlineDeploymentsOperations(
  context: AzureMachineLearningServicesManagementContext,
): OnlineDeploymentsOperations {
  return {
    ..._getOnlineDeployments(context),
  };
}
