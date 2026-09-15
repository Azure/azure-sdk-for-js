// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext } from "../../api/appContext.js";
import {
  stop,
  start,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/agents/operations.js";
import type {
  AgentsStopOptionalParams,
  AgentsStartOptionalParams,
  AgentsListBySubscriptionOptionalParams,
  AgentsListByResourceGroupOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateOrUpdateOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import type { Agent, AgentPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Stop an Agent */
  stop: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsStopOptionalParams,
  ) => PollerLike<OperationState<Agent>, Agent>;
  /** Start an Agent */
  start: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsStartOptionalParams,
  ) => PollerLike<OperationState<Agent>, Agent>;
  /** Get all agents for a subscription */
  listBySubscription: (
    options?: AgentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Agent>;
  /** Get all the agents in a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AgentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Agent>;
  /** Delete an Agent */
  delete: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Agent's properties */
  update: (
    resourceGroupName: string,
    agentName: string,
    properties: AgentPatch,
    options?: AgentsUpdateOptionalParams,
  ) => PollerLike<OperationState<Agent>, Agent>;
  /** Creates or updates an Agent */
  createOrUpdate: (
    resourceGroupName: string,
    agentName: string,
    resource: Agent,
    options?: AgentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Agent>, Agent>;
  /** Get the properties of an Agent */
  get: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsGetOptionalParams,
  ) => Promise<Agent>;
}

function _getAgents(context: AppContext) {
  return {
    stop: (resourceGroupName: string, agentName: string, options?: AgentsStopOptionalParams) =>
      stop(context, resourceGroupName, agentName, options),
    start: (resourceGroupName: string, agentName: string, options?: AgentsStartOptionalParams) =>
      start(context, resourceGroupName, agentName, options),
    listBySubscription: (options?: AgentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AgentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, agentName: string, options?: AgentsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, agentName, options),
    update: (
      resourceGroupName: string,
      agentName: string,
      properties: AgentPatch,
      options?: AgentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, agentName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentName: string,
      resource: Agent,
      options?: AgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, agentName, resource, options),
    get: (resourceGroupName: string, agentName: string, options?: AgentsGetOptionalParams) =>
      get(context, resourceGroupName, agentName, options),
  };
}

export function _getAgentsOperations(context: AppContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
