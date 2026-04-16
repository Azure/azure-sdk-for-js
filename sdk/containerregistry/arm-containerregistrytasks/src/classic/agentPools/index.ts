// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext } from "../../api/containerRegistryTasksManagementContext.js";
import {
  getQueueStatus,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/agentPools/operations.js";
import type {
  AgentPoolsGetQueueStatusOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsUpdateOptionalParams,
  AgentPoolsCreateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "../../api/agentPools/options.js";
import type {
  AgentPool,
  AgentPoolUpdateParameters,
  AgentPoolQueueStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentPools operations. */
export interface AgentPoolsOperations {
  /** Gets the count of queued runs for a given agent pool. */
  getQueueStatus: (
    resourceGroupName: string,
    registryName: string,
    agentPoolName: string,
    options?: AgentPoolsGetQueueStatusOptionalParams,
  ) => Promise<AgentPoolQueueStatus>;
  /** Lists all the agent pools for a specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: AgentPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentPool>;
  /** Deletes a specified agent pool resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an agent pool with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    agentPoolName: string,
    updateParameters: AgentPoolUpdateParameters,
    options?: AgentPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** Creates an agent pool for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    agentPoolName: string,
    agentPool: AgentPool,
    options?: AgentPoolsCreateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** Gets the detailed information for a given agent pool. */
  get: (
    resourceGroupName: string,
    registryName: string,
    agentPoolName: string,
    options?: AgentPoolsGetOptionalParams,
  ) => Promise<AgentPool>;
}

function _getAgentPools(context: ContainerRegistryTasksManagementContext) {
  return {
    getQueueStatus: (
      resourceGroupName: string,
      registryName: string,
      agentPoolName: string,
      options?: AgentPoolsGetQueueStatusOptionalParams,
    ) => getQueueStatus(context, resourceGroupName, registryName, agentPoolName, options),
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: AgentPoolsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, agentPoolName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      agentPoolName: string,
      updateParameters: AgentPoolUpdateParameters,
      options?: AgentPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, agentPoolName, updateParameters, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      agentPoolName: string,
      agentPool: AgentPool,
      options?: AgentPoolsCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, agentPoolName, agentPool, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      agentPoolName: string,
      options?: AgentPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, agentPoolName, options),
  };
}

export function _getAgentPoolsOperations(
  context: ContainerRegistryTasksManagementContext,
): AgentPoolsOperations {
  return {
    ..._getAgentPools(context),
  };
}
