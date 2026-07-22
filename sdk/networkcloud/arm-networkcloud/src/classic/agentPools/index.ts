// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByKubernetesCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/agentPools/operations.js";
import {
  AgentPoolsListByKubernetesClusterOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsUpdateOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "../../api/agentPools/options.js";
import { OperationStatusResult, AgentPool } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentPools operations. */
export interface AgentPoolsOperations {
  /** Get a list of agent pools for the provided Kubernetes cluster. */
  listByKubernetesCluster: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: AgentPoolsListByKubernetesClusterOptionalParams,
  ) => PagedAsyncIterableIterator<AgentPool>;
  /** Delete the provided Kubernetes cluster agent pool. */
  delete: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch the properties of the provided Kubernetes cluster agent pool, or update the tags associated with the Kubernetes cluster agent pool. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentPool>, AgentPool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsUpdateOptionalParams,
  ) => Promise<AgentPool>;
  /** Create a new Kubernetes cluster agent pool or update the properties of the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    agentPoolParameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    agentPoolParameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentPool>, AgentPool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    agentPoolParameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => Promise<AgentPool>;
  /** Get properties of the provided Kubernetes cluster agent pool. */
  get: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsGetOptionalParams,
  ) => Promise<AgentPool>;
}

function _getAgentPools(context: NetworkCloudContext) {
  return {
    listByKubernetesCluster: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: AgentPoolsListByKubernetesClusterOptionalParams,
    ) => listByKubernetesCluster(context, resourceGroupName, kubernetesClusterName, options),
    delete: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
    beginUpdate: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      agentPoolParameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        agentPoolParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      agentPoolParameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        agentPoolParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      agentPoolParameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        agentPoolParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
  };
}

export function _getAgentPoolsOperations(context: NetworkCloudContext): AgentPoolsOperations {
  return {
    ..._getAgentPools(context),
  };
}
