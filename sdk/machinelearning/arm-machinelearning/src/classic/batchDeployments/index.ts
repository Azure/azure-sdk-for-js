// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/batchDeployments/operations.js";
import {
  BatchDeploymentsListOptionalParams,
  BatchDeploymentsDeleteOptionalParams,
  BatchDeploymentsUpdateOptionalParams,
  BatchDeploymentsCreateOrUpdateOptionalParams,
  BatchDeploymentsGetOptionalParams,
} from "../../api/batchDeployments/options.js";
import {
  BatchDeployment,
  PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BatchDeployments operations. */
export interface BatchDeploymentsOperations {
  /** Lists Batch inference deployments in the workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<BatchDeployment>;
  /** Delete Batch Inference deployment (asynchronous). */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: BatchDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a batch inference deployment (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
    options?: BatchDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
  /** Creates/updates a batch inference deployment (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: BatchDeployment,
    options?: BatchDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
  /** Gets a batch inference deployment by id. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: BatchDeploymentsGetOptionalParams,
  ) => Promise<BatchDeployment>;
}

function _getBatchDeployments(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, endpointName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: BatchDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
      options?: BatchDeploymentsUpdateOptionalParams,
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
      body: BatchDeployment,
      options?: BatchDeploymentsCreateOrUpdateOptionalParams,
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
      options?: BatchDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, deploymentName, options),
  };
}

export function _getBatchDeploymentsOperations(
  context: AzureMachineLearningServicesManagementContext,
): BatchDeploymentsOperations {
  return {
    ..._getBatchDeployments(context),
  };
}
