// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementContext } from "../../api/edgeActionsManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/edgeActions/operations.js";
import {
  EdgeActionsListBySubscriptionOptionalParams,
  EdgeActionsListByResourceGroupOptionalParams,
  EdgeActionsDeleteOptionalParams,
  EdgeActionsUpdateOptionalParams,
  EdgeActionsCreateOptionalParams,
  EdgeActionsGetOptionalParams,
} from "../../api/edgeActions/options.js";
import { EdgeAction, EdgeActionUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeActions operations. */
export interface EdgeActionsOperations {
  /** List EdgeAction resources by subscription ID */
  listBySubscription: (
    options?: EdgeActionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeAction>;
  /** List EdgeAction resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EdgeActionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeAction>;
  /** Delete a EdgeAction */
  delete: (
    resourceGroupName: string,
    edgeActionName: string,
    options?: EdgeActionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EdgeAction */
  update: (
    resourceGroupName: string,
    edgeActionName: string,
    properties: EdgeActionUpdate,
    options?: EdgeActionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeAction>, EdgeAction>;
  /** Create a EdgeAction */
  create: (
    resourceGroupName: string,
    edgeActionName: string,
    resource: EdgeAction,
    options?: EdgeActionsCreateOptionalParams,
  ) => PollerLike<OperationState<EdgeAction>, EdgeAction>;
  /** Get a EdgeAction */
  get: (
    resourceGroupName: string,
    edgeActionName: string,
    options?: EdgeActionsGetOptionalParams,
  ) => Promise<EdgeAction>;
}

function _getEdgeActions(context: EdgeActionsManagementContext) {
  return {
    listBySubscription: (options?: EdgeActionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EdgeActionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      edgeActionName: string,
      options?: EdgeActionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeActionName, options),
    update: (
      resourceGroupName: string,
      edgeActionName: string,
      properties: EdgeActionUpdate,
      options?: EdgeActionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeActionName, properties, options),
    create: (
      resourceGroupName: string,
      edgeActionName: string,
      resource: EdgeAction,
      options?: EdgeActionsCreateOptionalParams,
    ) => create(context, resourceGroupName, edgeActionName, resource, options),
    get: (
      resourceGroupName: string,
      edgeActionName: string,
      options?: EdgeActionsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeActionName, options),
  };
}

export function _getEdgeActionsOperations(
  context: EdgeActionsManagementContext,
): EdgeActionsOperations {
  return {
    ..._getEdgeActions(context),
  };
}
