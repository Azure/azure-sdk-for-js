// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  $delete,
  listBySubscription,
  listByResourceGroup,
  update,
  createOrUpdate,
  get,
} from "../../api/contexts/operations.js";
import {
  ContextsDeleteOptionalParams,
  ContextsListBySubscriptionOptionalParams,
  ContextsListByResourceGroupOptionalParams,
  ContextsUpdateOptionalParams,
  ContextsCreateOrUpdateOptionalParams,
  ContextsGetOptionalParams,
} from "../../api/contexts/options.js";
import { Context, ContextUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Contexts operations. */
export interface ContextsOperations {
  /** Delete Context Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    contextName: string,
    options?: ContextsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List by subscription */
  listBySubscription: (
    options?: ContextsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Context>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContextsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Context>;
  /** update an Context Resource */
  update: (
    resourceGroupName: string,
    contextName: string,
    properties: ContextUpdate,
    options?: ContextsUpdateOptionalParams,
  ) => PollerLike<OperationState<Context>, Context>;
  /** Create or update Context Resource */
  createOrUpdate: (
    resourceGroupName: string,
    contextName: string,
    resource: Context,
    options?: ContextsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Context>, Context>;
  /** Get Context Resource */
  get: (
    resourceGroupName: string,
    contextName: string,
    options?: ContextsGetOptionalParams,
  ) => Promise<Context>;
}

function _getContexts(context: WorkloadOrchestrationManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      contextName: string,
      options?: ContextsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextName, options),
    listBySubscription: (options?: ContextsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContextsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      contextName: string,
      properties: ContextUpdate,
      options?: ContextsUpdateOptionalParams,
    ) => update(context, resourceGroupName, contextName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      contextName: string,
      resource: Context,
      options?: ContextsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, contextName, resource, options),
    get: (resourceGroupName: string, contextName: string, options?: ContextsGetOptionalParams) =>
      get(context, resourceGroupName, contextName, options),
  };
}

export function _getContextsOperations(
  context: WorkloadOrchestrationManagementContext,
): ContextsOperations {
  return {
    ..._getContexts(context),
  };
}
