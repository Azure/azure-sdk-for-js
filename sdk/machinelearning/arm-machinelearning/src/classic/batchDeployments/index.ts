// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/batchDeployments/operations.js";
import type {
  BatchDeploymentsListOptionalParams,
  BatchDeploymentsDeleteOptionalParams,
  BatchDeploymentsUpdateOptionalParams,
  BatchDeploymentsCreateOrUpdateOptionalParams,
  BatchDeploymentsGetOptionalParams,
} from "../../api/batchDeployments/options.js";
import type {
  BatchDeployment,
  PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: BatchDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: BatchDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a batch inference deployment (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
    options?: BatchDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
    options?: BatchDeploymentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BatchDeployment>, BatchDeployment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
    options?: BatchDeploymentsUpdateOptionalParams,
  ) => Promise<BatchDeployment>;
  /** Creates/updates a batch inference deployment (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: BatchDeployment,
    options?: BatchDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: BatchDeployment,
    options?: BatchDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BatchDeployment>, BatchDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: BatchDeployment,
    options?: BatchDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<BatchDeployment>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: BatchDeploymentsDeleteOptionalParams,
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
      options?: BatchDeploymentsDeleteOptionalParams,
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
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
      options?: BatchDeploymentsUpdateOptionalParams,
    ) => {
      const poller = update(
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
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
      options?: BatchDeploymentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: BatchDeployment,
      options?: BatchDeploymentsCreateOrUpdateOptionalParams,
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
      body: BatchDeployment,
      options?: BatchDeploymentsCreateOrUpdateOptionalParams,
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
