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
  PartialMinimalTrackedResourceWithSku,
  SkuResource,
  OnlineDeployment,
  DeploymentLogsRequest,
  DeploymentLogs,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    options?: OnlineDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Online Deployment (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: OnlineDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineDeployment>, OnlineDeployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: OnlineDeploymentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OnlineDeployment>, OnlineDeployment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: OnlineDeploymentsUpdateOptionalParams,
  ) => Promise<OnlineDeployment>;
  /** Create or update Inference Endpoint Deployment (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: OnlineDeployment,
    options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineDeployment>, OnlineDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: OnlineDeployment,
    options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OnlineDeployment>, OnlineDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    deploymentName: string,
    body: OnlineDeployment,
    options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<OnlineDeployment>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      options?: OnlineDeploymentsDeleteOptionalParams,
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
      options?: OnlineDeploymentsDeleteOptionalParams,
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
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: PartialMinimalTrackedResourceWithSku,
      options?: OnlineDeploymentsUpdateOptionalParams,
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
      body: PartialMinimalTrackedResourceWithSku,
      options?: OnlineDeploymentsUpdateOptionalParams,
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      deploymentName: string,
      body: OnlineDeployment,
      options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
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
      body: OnlineDeployment,
      options?: OnlineDeploymentsCreateOrUpdateOptionalParams,
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
