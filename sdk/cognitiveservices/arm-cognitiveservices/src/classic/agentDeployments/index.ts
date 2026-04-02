// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  stop,
  start,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentDeployments/operations.js";
import type {
  AgentDeploymentsStopOptionalParams,
  AgentDeploymentsStartOptionalParams,
  AgentDeploymentsListOptionalParams,
  AgentDeploymentsDeleteOptionalParams,
  AgentDeploymentsCreateOrUpdateOptionalParams,
  AgentDeploymentsGetOptionalParams,
} from "../../api/agentDeployments/options.js";
import type { AgentDeployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentDeployments operations. */
export interface AgentDeploymentsOperations {
  /** Stops an Agent Deployment. */
  stop: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsStopOptionalParams,
  ) => Promise<void>;
  /** Starts an Agent Deployment. */
  start: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsStartOptionalParams,
  ) => Promise<void>;
  /** Lists Agent Deployments in the application. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    options?: AgentDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentDeployment>;
  /** Delete Agent Deployment. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Agent Deployment (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    body: AgentDeployment,
    options?: AgentDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentDeployment>, AgentDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    body: AgentDeployment,
    options?: AgentDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentDeployment>, AgentDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    body: AgentDeployment,
    options?: AgentDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<AgentDeployment>;
  /** Gets an Agent Deployment by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    appName: string,
    deploymentName: string,
    options?: AgentDeploymentsGetOptionalParams,
  ) => Promise<AgentDeployment>;
}

function _getAgentDeployments(context: CognitiveServicesManagementContext) {
  return {
    stop: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsStopOptionalParams,
    ) =>
      stop(context, resourceGroupName, accountName, projectName, appName, deploymentName, options),
    start: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsStartOptionalParams,
    ) =>
      start(context, resourceGroupName, accountName, projectName, appName, deploymentName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      options?: AgentDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, appName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      body: AgentDeployment,
      options?: AgentDeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      body: AgentDeployment,
      options?: AgentDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      body: AgentDeployment,
      options?: AgentDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        appName,
        deploymentName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      appName: string,
      deploymentName: string,
      options?: AgentDeploymentsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, accountName, projectName, appName, deploymentName, options),
  };
}

export function _getAgentDeploymentsOperations(
  context: CognitiveServicesManagementContext,
): AgentDeploymentsOperations {
  return {
    ..._getAgentDeployments(context),
  };
}
