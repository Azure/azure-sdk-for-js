// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext } from "../../api/appContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/agentSpaces/operations.js";
import type {
  AgentSpacesListBySubscriptionOptionalParams,
  AgentSpacesListByResourceGroupOptionalParams,
  AgentSpacesDeleteOptionalParams,
  AgentSpacesUpdateOptionalParams,
  AgentSpacesCreateOrUpdateOptionalParams,
  AgentSpacesGetOptionalParams,
} from "../../api/agentSpaces/options.js";
import type { AgentSpace, AgentSpacePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentSpaces operations. */
export interface AgentSpacesOperations {
  /** Get all agent spaces for a subscription */
  listBySubscription: (
    options?: AgentSpacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSpace>;
  /** Get all the agent spaces in a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AgentSpacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSpace>;
  /** Delete an Agent Space */
  delete: (
    resourceGroupName: string,
    agentSpaceName: string,
    options?: AgentSpacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Agent Space's properties */
  update: (
    resourceGroupName: string,
    agentSpaceName: string,
    properties: AgentSpacePatch,
    options?: AgentSpacesUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentSpace>, AgentSpace>;
  /** Creates or updates an Agent Space */
  createOrUpdate: (
    resourceGroupName: string,
    agentSpaceName: string,
    resource: AgentSpace,
    options?: AgentSpacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentSpace>, AgentSpace>;
  /** Get the properties of an Agent Space */
  get: (
    resourceGroupName: string,
    agentSpaceName: string,
    options?: AgentSpacesGetOptionalParams,
  ) => Promise<AgentSpace>;
}

function _getAgentSpaces(context: AppContext) {
  return {
    listBySubscription: (options?: AgentSpacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AgentSpacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      agentSpaceName: string,
      options?: AgentSpacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentSpaceName, options),
    update: (
      resourceGroupName: string,
      agentSpaceName: string,
      properties: AgentSpacePatch,
      options?: AgentSpacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, agentSpaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentSpaceName: string,
      resource: AgentSpace,
      options?: AgentSpacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, agentSpaceName, resource, options),
    get: (
      resourceGroupName: string,
      agentSpaceName: string,
      options?: AgentSpacesGetOptionalParams,
    ) => get(context, resourceGroupName, agentSpaceName, options),
  };
}

export function _getAgentSpacesOperations(context: AppContext): AgentSpacesOperations {
  return {
    ..._getAgentSpaces(context),
  };
}
