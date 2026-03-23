// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/tools/operations.js";
import type {
  ToolsListBySubscriptionOptionalParams,
  ToolsListByResourceGroupOptionalParams,
  ToolsDeleteOptionalParams,
  ToolsUpdateOptionalParams,
  ToolsCreateOrUpdateOptionalParams,
  ToolsGetOptionalParams,
} from "../../api/tools/options.js";
import type { Tool, ToolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tools operations. */
export interface ToolsOperations {
  /** List Tool resources by subscription ID */
  listBySubscription: (
    options?: ToolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Tool>;
  /** List Tool resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ToolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Tool>;
  /** Delete a Tool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    toolName: string,
    options?: ToolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Tool */
  update: (
    resourceGroupName: string,
    toolName: string,
    properties: ToolUpdate,
    options?: ToolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Tool>, Tool>;
  /** Create a Tool */
  createOrUpdate: (
    resourceGroupName: string,
    toolName: string,
    resource: Tool,
    options?: ToolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Tool>, Tool>;
  /** Get a Tool */
  get: (
    resourceGroupName: string,
    toolName: string,
    options?: ToolsGetOptionalParams,
  ) => Promise<Tool>;
}

function _getTools(context: DiscoveryContext) {
  return {
    listBySubscription: (options?: ToolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ToolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, toolName: string, options?: ToolsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, toolName, options),
    update: (
      resourceGroupName: string,
      toolName: string,
      properties: ToolUpdate,
      options?: ToolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, toolName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      toolName: string,
      resource: Tool,
      options?: ToolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, toolName, resource, options),
    get: (resourceGroupName: string, toolName: string, options?: ToolsGetOptionalParams) =>
      get(context, resourceGroupName, toolName, options),
  };
}

export function _getToolsOperations(context: DiscoveryContext): ToolsOperations {
  return {
    ..._getTools(context),
  };
}
