// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listRoutesTable,
  listRoutesTableSummary,
  listArpTable,
  list,
  listByResourceGroup,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRouteCrossConnections/operations.js";
import type {
  ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ExpressRouteCrossConnectionsListOptionalParams,
  ExpressRouteCrossConnectionsListByResourceGroupOptionalParams,
  ExpressRouteCrossConnectionsUpdateTagsOptionalParams,
  ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ExpressRouteCrossConnectionsGetOptionalParams,
} from "../../api/expressRouteCrossConnections/options.js";
import type {
  TagsObject,
  ExpressRouteCircuitsArpTableListResult,
  ExpressRouteCircuitsRoutesTableListResult,
  ExpressRouteCrossConnection,
  ExpressRouteCrossConnectionsRoutesTableSummaryListResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCrossConnections operations. */
export interface ExpressRouteCrossConnectionsOperations {
  /** Gets the currently advertised routes table associated with the express route cross connection in a resource group. */
  listRoutesTable: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableListResult>,
    ExpressRouteCircuitsRoutesTableListResult
  >;
  /** @deprecated use listRoutesTable instead */
  beginListRoutesTable: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsRoutesTableListResult>,
      ExpressRouteCircuitsRoutesTableListResult
    >
  >;
  /** @deprecated use listRoutesTable instead */
  beginListRoutesTableAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ) => Promise<ExpressRouteCircuitsRoutesTableListResult>;
  /** Gets the route table summary associated with the express route cross connection in a resource group. */
  listRoutesTableSummary: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCrossConnectionsRoutesTableSummaryListResult>,
    ExpressRouteCrossConnectionsRoutesTableSummaryListResult
  >;
  /** @deprecated use listRoutesTableSummary instead */
  beginListRoutesTableSummary: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCrossConnectionsRoutesTableSummaryListResult>,
      ExpressRouteCrossConnectionsRoutesTableSummaryListResult
    >
  >;
  /** @deprecated use listRoutesTableSummary instead */
  beginListRoutesTableSummaryAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ) => Promise<ExpressRouteCrossConnectionsRoutesTableSummaryListResult>;
  /** Gets the currently advertised ARP table associated with the express route cross connection in a resource group. */
  listArpTable: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsArpTableListResult>,
    ExpressRouteCircuitsArpTableListResult
  >;
  /** @deprecated use listArpTable instead */
  beginListArpTable: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsArpTableListResult>,
      ExpressRouteCircuitsArpTableListResult
    >
  >;
  /** @deprecated use listArpTable instead */
  beginListArpTableAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ) => Promise<ExpressRouteCircuitsArpTableListResult>;
  /** Retrieves all the ExpressRouteCrossConnections in a subscription. */
  list: (
    options?: ExpressRouteCrossConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCrossConnection>;
  /** Retrieves all the ExpressRouteCrossConnections in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExpressRouteCrossConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCrossConnection>;
  /** Updates an express route cross connection tags. */
  updateTags: (
    resourceGroupName: string,
    crossConnectionName: string,
    crossConnectionParameters: TagsObject,
    options?: ExpressRouteCrossConnectionsUpdateTagsOptionalParams,
  ) => Promise<ExpressRouteCrossConnection>;
  /** Update the specified ExpressRouteCrossConnection. */
  createOrUpdate: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: ExpressRouteCrossConnection,
    options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteCrossConnection>, ExpressRouteCrossConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: ExpressRouteCrossConnection,
    options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ExpressRouteCrossConnection>, ExpressRouteCrossConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: ExpressRouteCrossConnection,
    options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCrossConnection>;
  /** Gets details about the specified ExpressRouteCrossConnection. */
  get: (
    resourceGroupName: string,
    crossConnectionName: string,
    options?: ExpressRouteCrossConnectionsGetOptionalParams,
  ) => Promise<ExpressRouteCrossConnection>;
}

function _getExpressRouteCrossConnections(context: NetworkManagementContext) {
  return {
    listRoutesTable: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
    ) =>
      listRoutesTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    beginListRoutesTable: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
    ) => {
      const poller = listRoutesTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListRoutesTableAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
    ) => {
      return await listRoutesTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
    },
    listRoutesTableSummary: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
    ) =>
      listRoutesTableSummary(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    beginListRoutesTableSummary: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
    ) => {
      const poller = listRoutesTableSummary(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListRoutesTableSummaryAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
    ) => {
      return await listRoutesTableSummary(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
    },
    listArpTable: (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
    ) =>
      listArpTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    beginListArpTable: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
    ) => {
      const poller = listArpTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListArpTableAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCrossConnectionsListArpTableOptionalParams,
    ) => {
      return await listArpTable(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      );
    },
    list: (options?: ExpressRouteCrossConnectionsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExpressRouteCrossConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    updateTags: (
      resourceGroupName: string,
      crossConnectionName: string,
      crossConnectionParameters: TagsObject,
      options?: ExpressRouteCrossConnectionsUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        crossConnectionName,
        crossConnectionParameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: ExpressRouteCrossConnection,
      options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, crossConnectionName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: ExpressRouteCrossConnection,
      options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: ExpressRouteCrossConnection,
      options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      crossConnectionName: string,
      options?: ExpressRouteCrossConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, crossConnectionName, options),
  };
}

export function _getExpressRouteCrossConnectionsOperations(
  context: NetworkManagementContext,
): ExpressRouteCrossConnectionsOperations {
  return {
    ..._getExpressRouteCrossConnections(context),
  };
}
