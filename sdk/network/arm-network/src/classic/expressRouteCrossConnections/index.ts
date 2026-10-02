// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  rollbackCircuitMigration,
  commitCircuitMigration,
  migrateCircuit,
  restoreBgpForCircuitMigration,
  shutDownBgpForCircuitMigration,
  prepareCircuitMigration,
  getCircuitMigrationInfo,
  validateCircuitMigration,
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
  ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
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
  MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  MigrateExpressRouteCircuitValidateResponse,
  MigrateExpressRouteCircuitHealthCheckResponse,
  MigrateExpressRouteCircuitRequest,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCrossConnections operations. */
export interface ExpressRouteCrossConnectionsOperations {
  /** Rolls back the express route circuit migration for a cross connection. */
  rollbackCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use rollbackCircuitMigration instead */
  beginRollbackCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use rollbackCircuitMigration instead */
  beginRollbackCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Commits the express route circuit migration for a cross connection. */
  commitCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use commitCircuitMigration instead */
  beginCommitCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use commitCircuitMigration instead */
  beginCommitCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Executes the express route circuit migration for a cross connection. */
  migrateCircuit: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use migrateCircuit instead */
  beginMigrateCircuit: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use migrateCircuit instead */
  beginMigrateCircuitAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Restores BGP sessions as part of an express route circuit migration for a cross connection. */
  restoreBgpForCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use restoreBgpForCircuitMigration instead */
  beginRestoreBgpForCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use restoreBgpForCircuitMigration instead */
  beginRestoreBgpForCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Shuts down BGP sessions as part of an express route circuit migration for a cross connection. */
  shutDownBgpForCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use shutDownBgpForCircuitMigration instead */
  beginShutDownBgpForCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use shutDownBgpForCircuitMigration instead */
  beginShutDownBgpForCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Prepares an express route circuit migration for a cross connection. */
  prepareCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use prepareCircuitMigration instead */
  beginPrepareCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use prepareCircuitMigration instead */
  beginPrepareCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitRequest,
    options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Gets migration health information for an express route circuit cross connection. */
  getCircuitMigrationInfo: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
  /** @deprecated use getCircuitMigrationInfo instead */
  beginGetCircuitMigrationInfo: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
      MigrateExpressRouteCircuitHealthCheckResponse
    >
  >;
  /** @deprecated use getCircuitMigrationInfo instead */
  beginGetCircuitMigrationInfoAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitHealthCheckResponse>;
  /** Validates express route circuit migration for a cross connection. */
  validateCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
  ) => PollerLike<
    OperationState<MigrateExpressRouteCircuitValidateResponse>,
    MigrateExpressRouteCircuitValidateResponse
  >;
  /** @deprecated use validateCircuitMigration instead */
  beginValidateCircuitMigration: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MigrateExpressRouteCircuitValidateResponse>,
      MigrateExpressRouteCircuitValidateResponse
    >
  >;
  /** @deprecated use validateCircuitMigration instead */
  beginValidateCircuitMigrationAndWait: (
    resourceGroupName: string,
    crossConnectionName: string,
    parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
    options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
  ) => Promise<MigrateExpressRouteCircuitValidateResponse>;
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
    rollbackCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
    ) =>
      rollbackCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    beginRollbackCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
    ) => {
      const poller = rollbackCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRollbackCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
    ) => {
      return await rollbackCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    commitCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
    ) =>
      commitCircuitMigration(context, resourceGroupName, crossConnectionName, parameters, options),
    beginCommitCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
    ) => {
      const poller = commitCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
    ) => {
      return await commitCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    migrateCircuit: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
    ) => migrateCircuit(context, resourceGroupName, crossConnectionName, parameters, options),
    beginMigrateCircuit: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
    ) => {
      const poller = migrateCircuit(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateCircuitAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
    ) => {
      return await migrateCircuit(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    restoreBgpForCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
    ) =>
      restoreBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    beginRestoreBgpForCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
    ) => {
      const poller = restoreBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreBgpForCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
    ) => {
      return await restoreBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    shutDownBgpForCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
    ) =>
      shutDownBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    beginShutDownBgpForCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
    ) => {
      const poller = shutDownBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginShutDownBgpForCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
    ) => {
      return await shutDownBgpForCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    prepareCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
    ) =>
      prepareCircuitMigration(context, resourceGroupName, crossConnectionName, parameters, options),
    beginPrepareCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
    ) => {
      const poller = prepareCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPrepareCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitRequest,
      options?: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
    ) => {
      return await prepareCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    getCircuitMigrationInfo: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
    ) =>
      getCircuitMigrationInfo(context, resourceGroupName, crossConnectionName, parameters, options),
    beginGetCircuitMigrationInfo: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
    ) => {
      const poller = getCircuitMigrationInfo(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetCircuitMigrationInfoAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
    ) => {
      return await getCircuitMigrationInfo(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
    validateCircuitMigration: (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
    ) =>
      validateCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    beginValidateCircuitMigration: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
    ) => {
      const poller = validateCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateCircuitMigrationAndWait: async (
      resourceGroupName: string,
      crossConnectionName: string,
      parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
      options?: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
    ) => {
      return await validateCircuitMigration(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      );
    },
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
