// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getPeeringStats,
  listRoutesTableSummary,
  listRoutesTable,
  listArpTable,
  getStats,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRouteCircuits/operations.js";
import type {
  ExpressRouteCircuitsGetPeeringStatsOptionalParams,
  ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ExpressRouteCircuitsListRoutesTableOptionalParams,
  ExpressRouteCircuitsListArpTableOptionalParams,
  ExpressRouteCircuitsGetStatsOptionalParams,
  ExpressRouteCircuitsListAllOptionalParams,
  ExpressRouteCircuitsListOptionalParams,
  ExpressRouteCircuitsDeleteOptionalParams,
  ExpressRouteCircuitsUpdateTagsOptionalParams,
  ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitsGetOptionalParams,
} from "../../api/expressRouteCircuits/options.js";
import type {
  TagsObject,
  ExpressRouteCircuit,
  ExpressRouteCircuitStats,
  ExpressRouteCircuitsArpTableListResult,
  ExpressRouteCircuitsRoutesTableListResult,
  ExpressRouteCircuitsRoutesTableSummaryListResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCircuits operations. */
export interface ExpressRouteCircuitsOperations {
  /** Gets all stats from an express route circuit in a resource group. */
  getPeeringStats: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: ExpressRouteCircuitsGetPeeringStatsOptionalParams,
  ) => Promise<ExpressRouteCircuitStats>;
  /** Gets the currently advertised routes table summary associated with the express route circuit in a resource group. */
  listRoutesTableSummary: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableSummaryListResult>,
    ExpressRouteCircuitsRoutesTableSummaryListResult
  >;
  /** @deprecated use listRoutesTableSummary instead */
  beginListRoutesTableSummary: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsRoutesTableSummaryListResult>,
      ExpressRouteCircuitsRoutesTableSummaryListResult
    >
  >;
  /** @deprecated use listRoutesTableSummary instead */
  beginListRoutesTableSummaryAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ) => Promise<ExpressRouteCircuitsRoutesTableSummaryListResult>;
  /** Gets the currently advertised routes table associated with the express route circuit in a resource group. */
  listRoutesTable: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableListResult>,
    ExpressRouteCircuitsRoutesTableListResult
  >;
  /** @deprecated use listRoutesTable instead */
  beginListRoutesTable: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsRoutesTableListResult>,
      ExpressRouteCircuitsRoutesTableListResult
    >
  >;
  /** @deprecated use listRoutesTable instead */
  beginListRoutesTableAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
  ) => Promise<ExpressRouteCircuitsRoutesTableListResult>;
  /** Gets the currently advertised ARP table associated with the express route circuit in a resource group. */
  listArpTable: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListArpTableOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsArpTableListResult>,
    ExpressRouteCircuitsArpTableListResult
  >;
  /** @deprecated use listArpTable instead */
  beginListArpTable: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListArpTableOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsArpTableListResult>,
      ExpressRouteCircuitsArpTableListResult
    >
  >;
  /** @deprecated use listArpTable instead */
  beginListArpTableAndWait: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    devicePath: string,
    options?: ExpressRouteCircuitsListArpTableOptionalParams,
  ) => Promise<ExpressRouteCircuitsArpTableListResult>;
  /** Gets all the stats from an express route circuit in a resource group. */
  getStats: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsGetStatsOptionalParams,
  ) => Promise<ExpressRouteCircuitStats>;
  /** Gets all the express route circuits in a subscription. */
  listAll: (
    options?: ExpressRouteCircuitsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCircuit>;
  /** Gets all the express route circuits in a resource group. */
  list: (
    resourceGroupName: string,
    options?: ExpressRouteCircuitsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCircuit>;
  /** Deletes the specified express route circuit. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an express route circuit tags. */
  updateTags: (
    resourceGroupName: string,
    circuitName: string,
    parameters: TagsObject,
    options?: ExpressRouteCircuitsUpdateTagsOptionalParams,
  ) => Promise<ExpressRouteCircuit>;
  /** Creates or updates an express route circuit. */
  createOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    parameters: ExpressRouteCircuit,
    options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteCircuit>, ExpressRouteCircuit>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    parameters: ExpressRouteCircuit,
    options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteCircuit>, ExpressRouteCircuit>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    circuitName: string,
    parameters: ExpressRouteCircuit,
    options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCircuit>;
  /** Gets information about the specified express route circuit. */
  get: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsGetOptionalParams,
  ) => Promise<ExpressRouteCircuit>;
}

function _getExpressRouteCircuits(context: NetworkManagementContext) {
  return {
    getPeeringStats: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: ExpressRouteCircuitsGetPeeringStatsOptionalParams,
    ) => getPeeringStats(context, resourceGroupName, circuitName, peeringName, options),
    listRoutesTableSummary: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
    ) =>
      listRoutesTableSummary(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      ),
    beginListRoutesTableSummary: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
    ) => {
      const poller = listRoutesTableSummary(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListRoutesTableSummaryAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
    ) => {
      return await listRoutesTableSummary(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
    },
    listRoutesTable: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
    ) => listRoutesTable(context, resourceGroupName, circuitName, peeringName, devicePath, options),
    beginListRoutesTable: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
    ) => {
      const poller = listRoutesTable(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListRoutesTableAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListRoutesTableOptionalParams,
    ) => {
      return await listRoutesTable(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
    },
    listArpTable: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListArpTableOptionalParams,
    ) => listArpTable(context, resourceGroupName, circuitName, peeringName, devicePath, options),
    beginListArpTable: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListArpTableOptionalParams,
    ) => {
      const poller = listArpTable(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListArpTableAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      devicePath: string,
      options?: ExpressRouteCircuitsListArpTableOptionalParams,
    ) => {
      return await listArpTable(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      );
    },
    getStats: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsGetStatsOptionalParams,
    ) => getStats(context, resourceGroupName, circuitName, options),
    listAll: (options?: ExpressRouteCircuitsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: ExpressRouteCircuitsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, circuitName, options),
    beginDelete: async (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, circuitName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, circuitName, options);
    },
    updateTags: (
      resourceGroupName: string,
      circuitName: string,
      parameters: TagsObject,
      options?: ExpressRouteCircuitsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, circuitName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      circuitName: string,
      parameters: ExpressRouteCircuit,
      options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, circuitName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      circuitName: string,
      parameters: ExpressRouteCircuit,
      options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, circuitName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      parameters: ExpressRouteCircuit,
      options?: ExpressRouteCircuitsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, circuitName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsGetOptionalParams,
    ) => get(context, resourceGroupName, circuitName, options),
  };
}

export function _getExpressRouteCircuitsOperations(
  context: NetworkManagementContext,
): ExpressRouteCircuitsOperations {
  return {
    ..._getExpressRouteCircuits(context),
  };
}
