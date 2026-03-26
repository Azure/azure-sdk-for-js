// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/routeMaps/operations.js";
import type {
  RouteMapsListOptionalParams,
  RouteMapsDeleteOptionalParams,
  RouteMapsCreateOrUpdateOptionalParams,
  RouteMapsGetOptionalParams,
} from "../../api/routeMaps/options.js";
import type { RouteMap } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RouteMaps operations. */
export interface RouteMapsOperations {
  /** Retrieves the details of all RouteMaps. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: RouteMapsListOptionalParams,
  ) => PagedAsyncIterableIterator<RouteMap>;
  /** Deletes a RouteMap. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    options?: RouteMapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    options?: RouteMapsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    options?: RouteMapsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a RouteMap if it doesn't exist else updates the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    routeMapParameters: RouteMap,
    options?: RouteMapsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RouteMap>, RouteMap>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    routeMapParameters: RouteMap,
    options?: RouteMapsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RouteMap>, RouteMap>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    routeMapParameters: RouteMap,
    options?: RouteMapsCreateOrUpdateOptionalParams,
  ) => Promise<RouteMap>;
  /** Retrieves the details of a RouteMap. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    routeMapName: string,
    options?: RouteMapsGetOptionalParams,
  ) => Promise<RouteMap>;
}

function _getRouteMaps(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: RouteMapsListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      options?: RouteMapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, routeMapName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      options?: RouteMapsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, routeMapName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      options?: RouteMapsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, routeMapName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      routeMapParameters: RouteMap,
      options?: RouteMapsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeMapName,
        routeMapParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      routeMapParameters: RouteMap,
      options?: RouteMapsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeMapName,
        routeMapParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      routeMapParameters: RouteMap,
      options?: RouteMapsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeMapName,
        routeMapParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      routeMapName: string,
      options?: RouteMapsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, routeMapName, options),
  };
}

export function _getRouteMapsOperations(context: NetworkManagementContext): RouteMapsOperations {
  return {
    ..._getRouteMaps(context),
  };
}
