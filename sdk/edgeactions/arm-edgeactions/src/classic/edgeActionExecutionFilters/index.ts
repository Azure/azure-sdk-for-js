// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeActionsManagementContext } from "../../api/edgeActionsManagementContext.js";
import {
  listByEdgeAction,
  $delete,
  update,
  create,
  get,
} from "../../api/edgeActionExecutionFilters/operations.js";
import type {
  EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  EdgeActionExecutionFiltersDeleteOptionalParams,
  EdgeActionExecutionFiltersUpdateOptionalParams,
  EdgeActionExecutionFiltersCreateOptionalParams,
  EdgeActionExecutionFiltersGetOptionalParams,
} from "../../api/edgeActionExecutionFilters/options.js";
import type {
  EdgeActionExecutionFilter,
  EdgeActionExecutionFilterUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeActionExecutionFilters operations. */
export interface EdgeActionExecutionFiltersOperations {
  /** List EdgeActionExecutionFilter resources by EdgeAction */
  listByEdgeAction: (
    resourceGroupName: string,
    edgeActionName: string,
    options?: EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeActionExecutionFilter>;
  /** Delete a EdgeActionExecutionFilter */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    edgeActionName: string,
    executionFilter: string,
    options?: EdgeActionExecutionFiltersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EdgeActionExecutionFilter */
  update: (
    resourceGroupName: string,
    edgeActionName: string,
    executionFilter: string,
    properties: EdgeActionExecutionFilterUpdate,
    options?: EdgeActionExecutionFiltersUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter>;
  /** Create a EdgeActionExecutionFilter */
  create: (
    resourceGroupName: string,
    edgeActionName: string,
    executionFilter: string,
    resource: EdgeActionExecutionFilter,
    options?: EdgeActionExecutionFiltersCreateOptionalParams,
  ) => PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter>;
  /** Get a EdgeActionExecutionFilter */
  get: (
    resourceGroupName: string,
    edgeActionName: string,
    executionFilter: string,
    options?: EdgeActionExecutionFiltersGetOptionalParams,
  ) => Promise<EdgeActionExecutionFilter>;
}

function _getEdgeActionExecutionFilters(context: EdgeActionsManagementContext) {
  return {
    listByEdgeAction: (
      resourceGroupName: string,
      edgeActionName: string,
      options?: EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
    ) => listByEdgeAction(context, resourceGroupName, edgeActionName, options),
    delete: (
      resourceGroupName: string,
      edgeActionName: string,
      executionFilter: string,
      options?: EdgeActionExecutionFiltersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeActionName, executionFilter, options),
    update: (
      resourceGroupName: string,
      edgeActionName: string,
      executionFilter: string,
      properties: EdgeActionExecutionFilterUpdate,
      options?: EdgeActionExecutionFiltersUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeActionName, executionFilter, properties, options),
    create: (
      resourceGroupName: string,
      edgeActionName: string,
      executionFilter: string,
      resource: EdgeActionExecutionFilter,
      options?: EdgeActionExecutionFiltersCreateOptionalParams,
    ) => create(context, resourceGroupName, edgeActionName, executionFilter, resource, options),
    get: (
      resourceGroupName: string,
      edgeActionName: string,
      executionFilter: string,
      options?: EdgeActionExecutionFiltersGetOptionalParams,
    ) => get(context, resourceGroupName, edgeActionName, executionFilter, options),
  };
}

export function _getEdgeActionExecutionFiltersOperations(
  context: EdgeActionsManagementContext,
): EdgeActionExecutionFiltersOperations {
  return {
    ..._getEdgeActionExecutionFilters(context),
  };
}
