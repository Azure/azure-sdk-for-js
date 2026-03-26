// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/routes/operations.js";
import type {
  RoutesListOptionalParams,
  RoutesDeleteOptionalParams,
  RoutesCreateOrUpdateOptionalParams,
  RoutesGetOptionalParams,
} from "../../api/routes/options.js";
import type { Route } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Routes operations. */
export interface RoutesOperations {
  /** Gets all routes in a route table. */
  list: (
    resourceGroupName: string,
    routeTableName: string,
    options?: RoutesListOptionalParams,
  ) => PagedAsyncIterableIterator<Route>;
  /** Deletes the specified route from a route table. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a route in the specified route table. */
  createOrUpdate: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    routeParameters: Route,
    options?: RoutesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Route>, Route>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    routeParameters: Route,
    options?: RoutesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Route>, Route>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    routeParameters: Route,
    options?: RoutesCreateOrUpdateOptionalParams,
  ) => Promise<Route>;
  /** Gets the specified route from a route table. */
  get: (
    resourceGroupName: string,
    routeTableName: string,
    routeName: string,
    options?: RoutesGetOptionalParams,
  ) => Promise<Route>;
}

function _getRoutes(context: NetworkManagementContext) {
  return {
    list: (resourceGroupName: string, routeTableName: string, options?: RoutesListOptionalParams) =>
      list(context, resourceGroupName, routeTableName, options),
    delete: (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routeTableName, routeName, options),
    beginDelete: async (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, routeTableName, routeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, routeTableName, routeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      routeParameters: Route,
      options?: RoutesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        routeTableName,
        routeName,
        routeParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      routeParameters: Route,
      options?: RoutesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        routeTableName,
        routeName,
        routeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      routeParameters: Route,
      options?: RoutesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        routeTableName,
        routeName,
        routeParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      routeTableName: string,
      routeName: string,
      options?: RoutesGetOptionalParams,
    ) => get(context, resourceGroupName, routeTableName, routeName, options),
  };
}

export function _getRoutesOperations(context: NetworkManagementContext): RoutesOperations {
  return {
    ..._getRoutes(context),
  };
}
