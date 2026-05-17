// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getPeeringStats,
  listRoutesTableSummary,
  listRoutesTable,
  listArpTable,
  stopCircuitLinkFailoverTest,
  startCircuitLinkFailoverTest,
  getCircuitLinkFailoverSingleTestDetails,
  getCircuitLinkFailoverAllTestsDetails,
  getStats,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRouteCircuits/operations.js";
import {
  ExpressRouteCircuitsGetPeeringStatsOptionalParams,
  ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ExpressRouteCircuitsListRoutesTableOptionalParams,
  ExpressRouteCircuitsListArpTableOptionalParams,
  ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
  ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
  ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
  ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
  ExpressRouteCircuitsGetStatsOptionalParams,
  ExpressRouteCircuitsListAllOptionalParams,
  ExpressRouteCircuitsListOptionalParams,
  ExpressRouteCircuitsDeleteOptionalParams,
  ExpressRouteCircuitsUpdateTagsOptionalParams,
  ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitsGetOptionalParams,
} from "../../api/expressRouteCircuits/options.js";
import {
  TagsObject,
  ExpressRouteCircuit,
  ExpressRouteCircuitStats,
  ExpressRouteLinkFailoverAllTestsDetails,
  ExpressRouteLinkFailoverSingleTestDetails,
  ExpressRouteLinkFailoverStopApiParameters,
  ExpressRouteCircuitsArpTableListResult,
  ExpressRouteCircuitsRoutesTableListResult,
  ExpressRouteCircuitsRoutesTableSummaryListResult,
} from "../../models/microsoft/network/models.js";
import {
  ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse,
  ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** Stops link failover simulation on the express route circuit. */
  stopCircuitLinkFailoverTest: (
    resourceGroupName: string,
    circuitName: string,
    body: {
      stopParameters: ExpressRouteLinkFailoverStopApiParameters;
    },
    options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse>,
    ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse
  >;
  /** @deprecated use stopCircuitLinkFailoverTest instead */
  beginStopCircuitLinkFailoverTest: (
    resourceGroupName: string,
    circuitName: string,
    body: {
      stopParameters: ExpressRouteLinkFailoverStopApiParameters;
    },
    options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse>,
      ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse
    >
  >;
  /** @deprecated use stopCircuitLinkFailoverTest instead */
  beginStopCircuitLinkFailoverTestAndWait: (
    resourceGroupName: string,
    circuitName: string,
    body: {
      stopParameters: ExpressRouteLinkFailoverStopApiParameters;
    },
    options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
  ) => Promise<ExpressRouteCircuitsStopCircuitLinkFailoverTestResponse>;
  /** Starts link failover simulation on the express route circuit for the specified link type and test category. */
  startCircuitLinkFailoverTest: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse>,
    ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse
  >;
  /** @deprecated use startCircuitLinkFailoverTest instead */
  beginStartCircuitLinkFailoverTest: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse>,
      ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse
    >
  >;
  /** @deprecated use startCircuitLinkFailoverTest instead */
  beginStartCircuitLinkFailoverTestAndWait: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
  ) => Promise<ExpressRouteCircuitsStartCircuitLinkFailoverTestResponse>;
  /** Retrieves the details of a particular link failover test performed on the express route circuit. */
  getCircuitLinkFailoverSingleTestDetails: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    failoverTestId: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteLinkFailoverSingleTestDetails[]>,
    ExpressRouteLinkFailoverSingleTestDetails[]
  >;
  /** @deprecated use getCircuitLinkFailoverSingleTestDetails instead */
  beginGetCircuitLinkFailoverSingleTestDetails: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    failoverTestId: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteLinkFailoverSingleTestDetails[]>,
      ExpressRouteLinkFailoverSingleTestDetails[]
    >
  >;
  /** @deprecated use getCircuitLinkFailoverSingleTestDetails instead */
  beginGetCircuitLinkFailoverSingleTestDetailsAndWait: (
    resourceGroupName: string,
    circuitName: string,
    linkType: string,
    circuitTestCategory: string,
    failoverTestId: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
  ) => Promise<ExpressRouteLinkFailoverSingleTestDetails[]>;
  /** Retrieves the details of all the link failover tests performed on the express route circuit. */
  getCircuitLinkFailoverAllTestsDetails: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteLinkFailoverAllTestsDetails[]>,
    ExpressRouteLinkFailoverAllTestsDetails[]
  >;
  /** @deprecated use getCircuitLinkFailoverAllTestsDetails instead */
  beginGetCircuitLinkFailoverAllTestsDetails: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteLinkFailoverAllTestsDetails[]>,
      ExpressRouteLinkFailoverAllTestsDetails[]
    >
  >;
  /** @deprecated use getCircuitLinkFailoverAllTestsDetails instead */
  beginGetCircuitLinkFailoverAllTestsDetailsAndWait: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
  ) => Promise<ExpressRouteLinkFailoverAllTestsDetails[]>;
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
    stopCircuitLinkFailoverTest: (
      resourceGroupName: string,
      circuitName: string,
      body: {
        stopParameters: ExpressRouteLinkFailoverStopApiParameters;
      },
      options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
    ) => stopCircuitLinkFailoverTest(context, resourceGroupName, circuitName, body, options),
    beginStopCircuitLinkFailoverTest: async (
      resourceGroupName: string,
      circuitName: string,
      body: {
        stopParameters: ExpressRouteLinkFailoverStopApiParameters;
      },
      options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
    ) => {
      const poller = stopCircuitLinkFailoverTest(
        context,
        resourceGroupName,
        circuitName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopCircuitLinkFailoverTestAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      body: {
        stopParameters: ExpressRouteLinkFailoverStopApiParameters;
      },
      options?: ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
    ) => {
      return await stopCircuitLinkFailoverTest(
        context,
        resourceGroupName,
        circuitName,
        body,
        options,
      );
    },
    startCircuitLinkFailoverTest: (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
    ) =>
      startCircuitLinkFailoverTest(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        options,
      ),
    beginStartCircuitLinkFailoverTest: async (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
    ) => {
      const poller = startCircuitLinkFailoverTest(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartCircuitLinkFailoverTestAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      options?: ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
    ) => {
      return await startCircuitLinkFailoverTest(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        options,
      );
    },
    getCircuitLinkFailoverSingleTestDetails: (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      failoverTestId: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
    ) =>
      getCircuitLinkFailoverSingleTestDetails(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        failoverTestId,
        options,
      ),
    beginGetCircuitLinkFailoverSingleTestDetails: async (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      failoverTestId: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
    ) => {
      const poller = getCircuitLinkFailoverSingleTestDetails(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        failoverTestId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetCircuitLinkFailoverSingleTestDetailsAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      linkType: string,
      circuitTestCategory: string,
      failoverTestId: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
    ) => {
      return await getCircuitLinkFailoverSingleTestDetails(
        context,
        resourceGroupName,
        circuitName,
        linkType,
        circuitTestCategory,
        failoverTestId,
        options,
      );
    },
    getCircuitLinkFailoverAllTestsDetails: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
    ) => getCircuitLinkFailoverAllTestsDetails(context, resourceGroupName, circuitName, options),
    beginGetCircuitLinkFailoverAllTestsDetails: async (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
    ) => {
      const poller = getCircuitLinkFailoverAllTestsDetails(
        context,
        resourceGroupName,
        circuitName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetCircuitLinkFailoverAllTestsDetailsAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
    ) => {
      return await getCircuitLinkFailoverAllTestsDetails(
        context,
        resourceGroupName,
        circuitName,
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
