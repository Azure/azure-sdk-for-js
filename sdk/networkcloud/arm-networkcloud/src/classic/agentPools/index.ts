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
  /** Patch the properties of the provided Kubernetes cluster agent pool, or update the tags associated with the Kubernetes cluster agent pool. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    options?: AgentPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** Create a new Kubernetes cluster agent pool or update the properties of the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    agentPoolName: string,
    agentPoolParameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
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
    update: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      agentPoolName: string,
      options?: AgentPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
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
