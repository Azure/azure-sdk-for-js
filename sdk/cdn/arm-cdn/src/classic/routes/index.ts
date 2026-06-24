// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByEndpoint, $delete, update, create, get } from "../../api/routes/operations.js";
import type {
  RoutesListByEndpointOptionalParams,
  RoutesDeleteOptionalParams,
  RoutesUpdateOptionalParams,
  RoutesCreateOptionalParams,
  RoutesGetOptionalParams,
} from "../../api/routes/options.js";
import type { Route, RouteUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Routes operations. */
export interface RoutesOperations {
  /** Lists all of the existing origins within a profile. */
  listByEndpoint: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: RoutesListByEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<Route>;
  /** Deletes an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    options?: RoutesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    routeUpdateProperties: RouteUpdateParameters,
    options?: RoutesUpdateOptionalParams,
  ) => PollerLike<OperationState<Route>, Route>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    routeUpdateProperties: RouteUpdateParameters,
    options?: RoutesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Route>, Route>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    routeUpdateProperties: RouteUpdateParameters,
    options?: RoutesUpdateOptionalParams,
  ) => Promise<Route>;
  /** Creates a new route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    route: Route,
    options?: RoutesCreateOptionalParams,
  ) => PollerLike<OperationState<Route>, Route>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    route: Route,
    options?: RoutesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Route>, Route>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    route: Route,
    options?: RoutesCreateOptionalParams,
  ) => Promise<Route>;
  /** Gets an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    routeName: string,
    options?: RoutesGetOptionalParams,
  ) => Promise<Route>;
}

function _getRoutes(context: CdnManagementContext) {
  return {
    listByEndpoint: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: RoutesListByEndpointOptionalParams,
    ) => listByEndpoint(context, resourceGroupName, profileName, endpointName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, routeName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      options?: RoutesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      routeUpdateProperties: RouteUpdateParameters,
      options?: RoutesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        routeUpdateProperties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      routeUpdateProperties: RouteUpdateParameters,
      options?: RoutesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        routeUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      routeUpdateProperties: RouteUpdateParameters,
      options?: RoutesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        routeUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      route: Route,
      options?: RoutesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, endpointName, routeName, route, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      route: Route,
      options?: RoutesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        route,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      route: Route,
      options?: RoutesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        route,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      routeName: string,
      options?: RoutesGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, routeName, options),
  };
}

export function _getRoutesOperations(context: CdnManagementContext): RoutesOperations {
  return {
    ..._getRoutes(context),
  };
}
