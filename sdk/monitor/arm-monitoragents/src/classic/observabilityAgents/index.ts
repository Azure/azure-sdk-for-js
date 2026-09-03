// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/observabilityAgents/operations.js";
import type {
  ObservabilityAgentsListBySubscriptionOptionalParams,
  ObservabilityAgentsListByResourceGroupOptionalParams,
  ObservabilityAgentsDeleteOptionalParams,
  ObservabilityAgentsUpdateOptionalParams,
  ObservabilityAgentsCreateOrUpdateOptionalParams,
  ObservabilityAgentsGetOptionalParams,
} from "../../api/observabilityAgents/options.js";
import type { ObservabilityAgentResource, ObservabilityAgentPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ObservabilityAgents operations. */
export interface ObservabilityAgentsOperations {
  /** Lists observability agents in the specified subscription. */
  listBySubscription: (
    options?: ObservabilityAgentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ObservabilityAgentResource>;
  /** Lists observability agents in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ObservabilityAgentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ObservabilityAgentResource>;
  /** Deletes an observability agent. */
  delete: (
    resourceGroupName: string,
    observabilityAgentName: string,
    options?: ObservabilityAgentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates part of an observability agent. */
  update: (
    resourceGroupName: string,
    observabilityAgentName: string,
    properties: ObservabilityAgentPatch,
    options?: ObservabilityAgentsUpdateOptionalParams,
  ) => Promise<ObservabilityAgentResource>;
  /** Creates or updates an observability agent. */
  createOrUpdate: (
    resourceGroupName: string,
    observabilityAgentName: string,
    resource: ObservabilityAgentResource,
    options?: ObservabilityAgentsCreateOrUpdateOptionalParams,
  ) => Promise<ObservabilityAgentResource>;
  /** Returns the specified observability agent. */
  get: (
    resourceGroupName: string,
    observabilityAgentName: string,
    options?: ObservabilityAgentsGetOptionalParams,
  ) => Promise<ObservabilityAgentResource>;
}

function _getObservabilityAgents(context: MonitorContext) {
  return {
    listBySubscription: (options?: ObservabilityAgentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ObservabilityAgentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      observabilityAgentName: string,
      options?: ObservabilityAgentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, observabilityAgentName, options),
    update: (
      resourceGroupName: string,
      observabilityAgentName: string,
      properties: ObservabilityAgentPatch,
      options?: ObservabilityAgentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, observabilityAgentName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      observabilityAgentName: string,
      resource: ObservabilityAgentResource,
      options?: ObservabilityAgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, observabilityAgentName, resource, options),
    get: (
      resourceGroupName: string,
      observabilityAgentName: string,
      options?: ObservabilityAgentsGetOptionalParams,
    ) => get(context, resourceGroupName, observabilityAgentName, options),
  };
}

export function _getObservabilityAgentsOperations(
  context: MonitorContext,
): ObservabilityAgentsOperations {
  return {
    ..._getObservabilityAgents(context),
  };
}
