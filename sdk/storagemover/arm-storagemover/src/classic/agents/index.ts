// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/agents/operations.js";
import {
  AgentsListOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateOrUpdateOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import { Agent, AgentUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Lists all Agents in a Storage Mover. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: AgentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Agent>;
  /** Deletes an Agent resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    agentName: string,
    options?: AgentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an Agent resource. */
  update: (
    resourceGroupName: string,
    storageMoverName: string,
    agentName: string,
    agent: AgentUpdateParameters,
    options?: AgentsUpdateOptionalParams,
  ) => Promise<Agent>;
  /** Creates or updates an Agent resource, which references a hybrid compute machine that can run jobs. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    agentName: string,
    agent: Agent,
    options?: AgentsCreateOrUpdateOptionalParams,
  ) => Promise<Agent>;
  /** Gets an Agent resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    agentName: string,
    options?: AgentsGetOptionalParams,
  ) => Promise<Agent>;
}

function _getAgents(context: StorageMoverContext) {
  return {
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: AgentsListOptionalParams,
    ) => list(context, resourceGroupName, storageMoverName, options),
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      agentName: string,
      options?: AgentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageMoverName, agentName, options),
    update: (
      resourceGroupName: string,
      storageMoverName: string,
      agentName: string,
      agent: AgentUpdateParameters,
      options?: AgentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageMoverName, agentName, agent, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      agentName: string,
      agent: Agent,
      options?: AgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, storageMoverName, agentName, agent, options),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      agentName: string,
      options?: AgentsGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, agentName, options),
  };
}

export function _getAgentsOperations(context: StorageMoverContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
