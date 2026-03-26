// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/hubRouteTables/operations.js";
import type {
  HubRouteTablesListOptionalParams,
  HubRouteTablesDeleteOptionalParams,
  HubRouteTablesCreateOrUpdateOptionalParams,
  HubRouteTablesGetOptionalParams,
} from "../../api/hubRouteTables/options.js";
import type { HubRouteTable } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HubRouteTables operations. */
export interface HubRouteTablesOperations {
  /** Retrieves the details of all RouteTables. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: HubRouteTablesListOptionalParams,
  ) => PagedAsyncIterableIterator<HubRouteTable>;
  /** Deletes a RouteTable. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: HubRouteTablesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: HubRouteTablesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: HubRouteTablesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    routeTableParameters: HubRouteTable,
    options?: HubRouteTablesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HubRouteTable>, HubRouteTable>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    routeTableParameters: HubRouteTable,
    options?: HubRouteTablesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HubRouteTable>, HubRouteTable>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    routeTableParameters: HubRouteTable,
    options?: HubRouteTablesCreateOrUpdateOptionalParams,
  ) => Promise<HubRouteTable>;
  /** Retrieves the details of a RouteTable. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: HubRouteTablesGetOptionalParams,
  ) => Promise<HubRouteTable>;
}

function _getHubRouteTables(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: HubRouteTablesListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: HubRouteTablesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, routeTableName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: HubRouteTablesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, routeTableName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: HubRouteTablesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, routeTableName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      routeTableParameters: HubRouteTable,
      options?: HubRouteTablesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        routeTableParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      routeTableParameters: HubRouteTable,
      options?: HubRouteTablesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        routeTableParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      routeTableParameters: HubRouteTable,
      options?: HubRouteTablesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        routeTableParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: HubRouteTablesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, routeTableName, options),
  };
}

export function _getHubRouteTablesOperations(
  context: NetworkManagementContext,
): HubRouteTablesOperations {
  return {
    ..._getHubRouteTables(context),
  };
}
