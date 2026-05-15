// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/routeFilters/operations.js";
import {
  RouteFiltersListOptionalParams,
  RouteFiltersListByResourceGroupOptionalParams,
  RouteFiltersDeleteOptionalParams,
  RouteFiltersUpdateTagsOptionalParams,
  RouteFiltersCreateOrUpdateOptionalParams,
  RouteFiltersGetOptionalParams,
} from "../../api/routeFilters/options.js";
import { TagsObject, RouteFilter } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RouteFilters operations. */
export interface RouteFiltersOperations {
  /** Gets all route filters in a subscription. */
  list: (options?: RouteFiltersListOptionalParams) => PagedAsyncIterableIterator<RouteFilter>;
  /** Gets all route filters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RouteFiltersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RouteFilter>;
  /** Deletes the specified route filter. */
  delete: (
    resourceGroupName: string,
    routeFilterName: string,
    options?: RouteFiltersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    routeFilterName: string,
    options?: RouteFiltersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    routeFilterName: string,
    options?: RouteFiltersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of a route filter. */
  updateTags: (
    resourceGroupName: string,
    routeFilterName: string,
    parameters: TagsObject,
    options?: RouteFiltersUpdateTagsOptionalParams,
  ) => Promise<RouteFilter>;
  /** Creates or updates a route filter in a specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    routeFilterName: string,
    routeFilterParameters: RouteFilter,
    options?: RouteFiltersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RouteFilter>, RouteFilter>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    routeFilterName: string,
    routeFilterParameters: RouteFilter,
    options?: RouteFiltersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RouteFilter>, RouteFilter>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    routeFilterName: string,
    routeFilterParameters: RouteFilter,
    options?: RouteFiltersCreateOrUpdateOptionalParams,
  ) => Promise<RouteFilter>;
  /** Gets the specified route filter. */
  get: (
    resourceGroupName: string,
    routeFilterName: string,
    options?: RouteFiltersGetOptionalParams,
  ) => Promise<RouteFilter>;
}

function _getRouteFilters(context: NetworkManagementContext) {
  return {
    list: (options?: RouteFiltersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RouteFiltersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      routeFilterName: string,
      options?: RouteFiltersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routeFilterName, options),
    beginDelete: async (
      resourceGroupName: string,
      routeFilterName: string,
      options?: RouteFiltersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, routeFilterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      routeFilterName: string,
      options?: RouteFiltersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, routeFilterName, options);
    },
    updateTags: (
      resourceGroupName: string,
      routeFilterName: string,
      parameters: TagsObject,
      options?: RouteFiltersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, routeFilterName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      routeFilterName: string,
      routeFilterParameters: RouteFilter,
      options?: RouteFiltersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, routeFilterName, routeFilterParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      routeFilterName: string,
      routeFilterParameters: RouteFilter,
      options?: RouteFiltersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        routeFilterName,
        routeFilterParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      routeFilterName: string,
      routeFilterParameters: RouteFilter,
      options?: RouteFiltersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        routeFilterName,
        routeFilterParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      routeFilterName: string,
      options?: RouteFiltersGetOptionalParams,
    ) => get(context, resourceGroupName, routeFilterName, options),
  };
}

export function _getRouteFiltersOperations(
  context: NetworkManagementContext,
): RouteFiltersOperations {
  return {
    ..._getRouteFilters(context),
  };
}
