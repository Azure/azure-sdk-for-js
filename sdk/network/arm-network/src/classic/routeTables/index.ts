// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/routeTables/operations.js";
import type {
  RouteTablesListAllOptionalParams,
  RouteTablesListOptionalParams,
  RouteTablesDeleteOptionalParams,
  RouteTablesUpdateTagsOptionalParams,
  RouteTablesCreateOrUpdateOptionalParams,
  RouteTablesGetOptionalParams,
} from "../../api/routeTables/options.js";
import type { RouteTable, TagsObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RouteTables operations. */
export interface RouteTablesOperations {
  /** Gets all route tables in a subscription. */
  listAll: (options?: RouteTablesListAllOptionalParams) => PagedAsyncIterableIterator<RouteTable>;
  /** Gets all route tables in a resource group. */
  list: (
    resourceGroupName: string,
    options?: RouteTablesListOptionalParams,
  ) => PagedAsyncIterableIterator<RouteTable>;
  /** Deletes the specified route table. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    routeTableName: string,
    options?: RouteTablesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    routeTableName: string,
    options?: RouteTablesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    routeTableName: string,
    options?: RouteTablesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a route table tags. */
  updateTags: (
    resourceGroupName: string,
    routeTableName: string,
    parameters: TagsObject,
    options?: RouteTablesUpdateTagsOptionalParams,
  ) => Promise<RouteTable>;
  /** Create or updates a route table in a specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    routeTableName: string,
    parameters: RouteTable,
    options?: RouteTablesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RouteTable>, RouteTable>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    routeTableName: string,
    parameters: RouteTable,
    options?: RouteTablesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RouteTable>, RouteTable>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    routeTableName: string,
    parameters: RouteTable,
    options?: RouteTablesCreateOrUpdateOptionalParams,
  ) => Promise<RouteTable>;
  /** Gets the specified route table. */
  get: (
    resourceGroupName: string,
    routeTableName: string,
    options?: RouteTablesGetOptionalParams,
  ) => Promise<RouteTable>;
}

function _getRouteTables(context: NetworkManagementContext) {
  return {
    listAll: (options?: RouteTablesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: RouteTablesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      routeTableName: string,
      options?: RouteTablesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routeTableName, options),
    beginDelete: async (
      resourceGroupName: string,
      routeTableName: string,
      options?: RouteTablesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, routeTableName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      routeTableName: string,
      options?: RouteTablesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, routeTableName, options);
    },
    updateTags: (
      resourceGroupName: string,
      routeTableName: string,
      parameters: TagsObject,
      options?: RouteTablesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, routeTableName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      routeTableName: string,
      parameters: RouteTable,
      options?: RouteTablesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, routeTableName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      routeTableName: string,
      parameters: RouteTable,
      options?: RouteTablesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        routeTableName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      routeTableName: string,
      parameters: RouteTable,
      options?: RouteTablesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, routeTableName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      routeTableName: string,
      options?: RouteTablesGetOptionalParams,
    ) => get(context, resourceGroupName, routeTableName, options),
  };
}

export function _getRouteTablesOperations(
  context: NetworkManagementContext,
): RouteTablesOperations {
  return {
    ..._getRouteTables(context),
  };
}
