// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listCassandraRoleAssignments,
  deleteCassandraRoleAssignment,
  createUpdateCassandraRoleAssignment,
  getCassandraRoleAssignment,
  listCassandraRoleDefinitions,
  deleteCassandraRoleDefinition,
  createUpdateCassandraRoleDefinition,
  getCassandraRoleDefinition,
  listCassandraTables,
  deleteCassandraTable,
  createUpdateCassandraTable,
  getCassandraTable,
  listCassandraKeyspaces,
  deleteCassandraKeyspace,
  createUpdateCassandraKeyspace,
  getCassandraKeyspace,
  migrateCassandraTableToManualThroughput,
  migrateCassandraTableToAutoscale,
  updateCassandraTableThroughput,
  getCassandraTableThroughput,
  migrateCassandraKeyspaceToManualThroughput,
  migrateCassandraKeyspaceToAutoscale,
  updateCassandraKeyspaceThroughput,
  getCassandraKeyspaceThroughput,
} from "../../api/cassandraResources/operations.js";
import type {
  CassandraResourcesListCassandraRoleAssignmentsOptionalParams,
  CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
  CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
  CassandraResourcesGetCassandraRoleAssignmentOptionalParams,
  CassandraResourcesListCassandraRoleDefinitionsOptionalParams,
  CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
  CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
  CassandraResourcesGetCassandraRoleDefinitionOptionalParams,
  CassandraResourcesListCassandraTablesOptionalParams,
  CassandraResourcesDeleteCassandraTableOptionalParams,
  CassandraResourcesCreateUpdateCassandraTableOptionalParams,
  CassandraResourcesGetCassandraTableOptionalParams,
  CassandraResourcesListCassandraKeyspacesOptionalParams,
  CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
  CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
  CassandraResourcesGetCassandraKeyspaceOptionalParams,
  CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
  CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
  CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
  CassandraResourcesGetCassandraTableThroughputOptionalParams,
  CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
  CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
  CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
  CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams,
} from "../../api/cassandraResources/options.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  CassandraKeyspaceGetResults,
  CassandraKeyspaceCreateUpdateParameters,
  CassandraTableGetResults,
  CassandraTableCreateUpdateParameters,
  CassandraRoleDefinitionResource,
  CassandraRoleAssignmentResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CassandraResources operations. */
export interface CassandraResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB Cassandra Role Assignments. */
  listCassandraRoleAssignments: (
    resourceGroupName: string,
    accountName: string,
    options?: CassandraResourcesListCassandraRoleAssignmentsOptionalParams,
  ) => PagedAsyncIterableIterator<CassandraRoleAssignmentResource>;
  /** Deletes an existing Azure Cosmos DB Cassandra Role Assignment. */
  deleteCassandraRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteCassandraRoleAssignment instead */
  beginDeleteCassandraRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteCassandraRoleAssignment instead */
  beginDeleteCassandraRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Cassandra Role Assignment. */
  createUpdateCassandraRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<CassandraRoleAssignmentResource>, CassandraRoleAssignmentResource>;
  /** @deprecated use createUpdateCassandraRoleAssignment instead */
  beginCreateUpdateCassandraRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CassandraRoleAssignmentResource>,
      CassandraRoleAssignmentResource
    >
  >;
  /** @deprecated use createUpdateCassandraRoleAssignment instead */
  beginCreateUpdateCassandraRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
  ) => Promise<CassandraRoleAssignmentResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id. */
  getCassandraRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: CassandraResourcesGetCassandraRoleAssignmentOptionalParams,
  ) => Promise<CassandraRoleAssignmentResource>;
  /** Retrieves the list of all Azure Cosmos DB Cassandra Role Definitions. */
  listCassandraRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: CassandraResourcesListCassandraRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<CassandraRoleDefinitionResource>;
  /** Deletes an existing Azure Cosmos DB Cassandra Role Definition. */
  deleteCassandraRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteCassandraRoleDefinition instead */
  beginDeleteCassandraRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteCassandraRoleDefinition instead */
  beginDeleteCassandraRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Cassandra Role Definition. */
  createUpdateCassandraRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<CassandraRoleDefinitionResource>, CassandraRoleDefinitionResource>;
  /** @deprecated use createUpdateCassandraRoleDefinition instead */
  beginCreateUpdateCassandraRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CassandraRoleDefinitionResource>,
      CassandraRoleDefinitionResource
    >
  >;
  /** @deprecated use createUpdateCassandraRoleDefinition instead */
  beginCreateUpdateCassandraRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
    options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
  ) => Promise<CassandraRoleDefinitionResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Cassandra Role Definition with the given Id. */
  getCassandraRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: CassandraResourcesGetCassandraRoleDefinitionOptionalParams,
  ) => Promise<CassandraRoleDefinitionResource>;
  /** Lists the Cassandra table under an existing Azure Cosmos DB database account. */
  listCassandraTables: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesListCassandraTablesOptionalParams,
  ) => PagedAsyncIterableIterator<CassandraTableGetResults>;
  /** Deletes an existing Azure Cosmos DB Cassandra table. */
  deleteCassandraTable: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesDeleteCassandraTableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteCassandraTable instead */
  beginDeleteCassandraTable: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesDeleteCassandraTableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteCassandraTable instead */
  beginDeleteCassandraTableAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesDeleteCassandraTableOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Cassandra Table */
  createUpdateCassandraTable: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
  ) => PollerLike<OperationState<CassandraTableGetResults>, CassandraTableGetResults>;
  /** @deprecated use createUpdateCassandraTable instead */
  beginCreateUpdateCassandraTable: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<CassandraTableGetResults>, CassandraTableGetResults>
  >;
  /** @deprecated use createUpdateCassandraTable instead */
  beginCreateUpdateCassandraTableAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
  ) => Promise<CassandraTableGetResults>;
  /** Gets the Cassandra table under an existing Azure Cosmos DB database account. */
  getCassandraTable: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesGetCassandraTableOptionalParams,
  ) => Promise<CassandraTableGetResults>;
  /** Lists the Cassandra keyspaces under an existing Azure Cosmos DB database account. */
  listCassandraKeyspaces: (
    resourceGroupName: string,
    accountName: string,
    options?: CassandraResourcesListCassandraKeyspacesOptionalParams,
  ) => PagedAsyncIterableIterator<CassandraKeyspaceGetResults>;
  /** Deletes an existing Azure Cosmos DB Cassandra keyspace. */
  deleteCassandraKeyspace: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteCassandraKeyspace instead */
  beginDeleteCassandraKeyspace: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteCassandraKeyspace instead */
  beginDeleteCassandraKeyspaceAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Cassandra keyspace */
  createUpdateCassandraKeyspace: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
  ) => PollerLike<OperationState<CassandraKeyspaceGetResults>, CassandraKeyspaceGetResults>;
  /** @deprecated use createUpdateCassandraKeyspace instead */
  beginCreateUpdateCassandraKeyspace: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<CassandraKeyspaceGetResults>, CassandraKeyspaceGetResults>
  >;
  /** @deprecated use createUpdateCassandraKeyspace instead */
  beginCreateUpdateCassandraKeyspaceAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
    options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
  ) => Promise<CassandraKeyspaceGetResults>;
  /** Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name. */
  getCassandraKeyspace: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesGetCassandraKeyspaceOptionalParams,
  ) => Promise<CassandraKeyspaceGetResults>;
  /** Migrate an Azure Cosmos DB Cassandra table from autoscale to manual throughput */
  migrateCassandraTableToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateCassandraTableToManualThroughput instead */
  beginMigrateCassandraTableToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateCassandraTableToManualThroughput instead */
  beginMigrateCassandraTableToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale */
  migrateCassandraTableToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateCassandraTableToAutoscale instead */
  beginMigrateCassandraTableToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateCassandraTableToAutoscale instead */
  beginMigrateCassandraTableToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB Cassandra table */
  updateCassandraTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateCassandraTableThroughput instead */
  beginUpdateCassandraTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateCassandraTableThroughput instead */
  beginUpdateCassandraTableThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name. */
  getCassandraTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    tableName: string,
    options?: CassandraResourcesGetCassandraTableThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Cassandra Keyspace from autoscale to manual throughput */
  migrateCassandraKeyspaceToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateCassandraKeyspaceToManualThroughput instead */
  beginMigrateCassandraKeyspaceToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateCassandraKeyspaceToManualThroughput instead */
  beginMigrateCassandraKeyspaceToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Cassandra Keyspace from manual throughput to autoscale */
  migrateCassandraKeyspaceToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateCassandraKeyspaceToAutoscale instead */
  beginMigrateCassandraKeyspaceToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateCassandraKeyspaceToAutoscale instead */
  beginMigrateCassandraKeyspaceToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB Cassandra Keyspace */
  updateCassandraKeyspaceThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateCassandraKeyspaceThroughput instead */
  beginUpdateCassandraKeyspaceThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateCassandraKeyspaceThroughput instead */
  beginUpdateCassandraKeyspaceThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name. */
  getCassandraKeyspaceThroughput: (
    resourceGroupName: string,
    accountName: string,
    keyspaceName: string,
    options?: CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
}

function _getCassandraResources(context: CosmosDBManagementContext) {
  return {
    listCassandraRoleAssignments: (
      resourceGroupName: string,
      accountName: string,
      options?: CassandraResourcesListCassandraRoleAssignmentsOptionalParams,
    ) => listCassandraRoleAssignments(context, resourceGroupName, accountName, options),
    deleteCassandraRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
    ) =>
      deleteCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      ),
    beginDeleteCassandraRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
    ) => {
      const poller = deleteCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteCassandraRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
    ) => {
      return await deleteCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
    },
    createUpdateCassandraRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
    ) =>
      createUpdateCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateCassandraRoleAssignmentParameters,
        options,
      ),
    beginCreateUpdateCassandraRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
    ) => {
      const poller = createUpdateCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateCassandraRoleAssignmentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateCassandraRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
    ) => {
      return await createUpdateCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateCassandraRoleAssignmentParameters,
        options,
      );
    },
    getCassandraRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: CassandraResourcesGetCassandraRoleAssignmentOptionalParams,
    ) =>
      getCassandraRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      ),
    listCassandraRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: CassandraResourcesListCassandraRoleDefinitionsOptionalParams,
    ) => listCassandraRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteCassandraRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
    ) =>
      deleteCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      ),
    beginDeleteCassandraRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteCassandraRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
    ) => {
      return await deleteCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
    },
    createUpdateCassandraRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
    ) =>
      createUpdateCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateCassandraRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateCassandraRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateCassandraRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateCassandraRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
      options?: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateCassandraRoleDefinitionParameters,
        options,
      );
    },
    getCassandraRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: CassandraResourcesGetCassandraRoleDefinitionOptionalParams,
    ) =>
      getCassandraRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      ),
    listCassandraTables: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesListCassandraTablesOptionalParams,
    ) => listCassandraTables(context, resourceGroupName, accountName, keyspaceName, options),
    deleteCassandraTable: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesDeleteCassandraTableOptionalParams,
    ) =>
      deleteCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      ),
    beginDeleteCassandraTable: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesDeleteCassandraTableOptionalParams,
    ) => {
      const poller = deleteCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteCassandraTableAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesDeleteCassandraTableOptionalParams,
    ) => {
      return await deleteCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
    },
    createUpdateCassandraTable: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
    ) =>
      createUpdateCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        createUpdateCassandraTableParameters,
        options,
      ),
    beginCreateUpdateCassandraTable: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
    ) => {
      const poller = createUpdateCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        createUpdateCassandraTableParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateCassandraTableAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraTableOptionalParams,
    ) => {
      return await createUpdateCassandraTable(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        createUpdateCassandraTableParameters,
        options,
      );
    },
    getCassandraTable: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesGetCassandraTableOptionalParams,
    ) =>
      getCassandraTable(context, resourceGroupName, accountName, keyspaceName, tableName, options),
    listCassandraKeyspaces: (
      resourceGroupName: string,
      accountName: string,
      options?: CassandraResourcesListCassandraKeyspacesOptionalParams,
    ) => listCassandraKeyspaces(context, resourceGroupName, accountName, options),
    deleteCassandraKeyspace: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
    ) => deleteCassandraKeyspace(context, resourceGroupName, accountName, keyspaceName, options),
    beginDeleteCassandraKeyspace: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
    ) => {
      const poller = deleteCassandraKeyspace(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteCassandraKeyspaceAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
    ) => {
      return await deleteCassandraKeyspace(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
    },
    createUpdateCassandraKeyspace: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
    ) =>
      createUpdateCassandraKeyspace(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        createUpdateCassandraKeyspaceParameters,
        options,
      ),
    beginCreateUpdateCassandraKeyspace: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
    ) => {
      const poller = createUpdateCassandraKeyspace(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        createUpdateCassandraKeyspaceParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateCassandraKeyspaceAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
      options?: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
    ) => {
      return await createUpdateCassandraKeyspace(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        createUpdateCassandraKeyspaceParameters,
        options,
      );
    },
    getCassandraKeyspace: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesGetCassandraKeyspaceOptionalParams,
    ) => getCassandraKeyspace(context, resourceGroupName, accountName, keyspaceName, options),
    migrateCassandraTableToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
    ) =>
      migrateCassandraTableToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      ),
    beginMigrateCassandraTableToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
    ) => {
      const poller = migrateCassandraTableToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateCassandraTableToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
    ) => {
      return await migrateCassandraTableToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
    },
    migrateCassandraTableToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
    ) =>
      migrateCassandraTableToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      ),
    beginMigrateCassandraTableToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
    ) => {
      const poller = migrateCassandraTableToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateCassandraTableToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
    ) => {
      return await migrateCassandraTableToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      );
    },
    updateCassandraTableThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
    ) =>
      updateCassandraTableThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateCassandraTableThroughput: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
    ) => {
      const poller = updateCassandraTableThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateCassandraTableThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
    ) => {
      return await updateCassandraTableThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        updateThroughputParameters,
        options,
      );
    },
    getCassandraTableThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      tableName: string,
      options?: CassandraResourcesGetCassandraTableThroughputOptionalParams,
    ) =>
      getCassandraTableThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      ),
    migrateCassandraKeyspaceToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
    ) =>
      migrateCassandraKeyspaceToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      ),
    beginMigrateCassandraKeyspaceToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
    ) => {
      const poller = migrateCassandraKeyspaceToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateCassandraKeyspaceToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
    ) => {
      return await migrateCassandraKeyspaceToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
    },
    migrateCassandraKeyspaceToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
    ) =>
      migrateCassandraKeyspaceToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      ),
    beginMigrateCassandraKeyspaceToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
    ) => {
      const poller = migrateCassandraKeyspaceToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateCassandraKeyspaceToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
    ) => {
      return await migrateCassandraKeyspaceToAutoscale(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      );
    },
    updateCassandraKeyspaceThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
    ) =>
      updateCassandraKeyspaceThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateCassandraKeyspaceThroughput: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
    ) => {
      const poller = updateCassandraKeyspaceThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateCassandraKeyspaceThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
    ) => {
      return await updateCassandraKeyspaceThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        updateThroughputParameters,
        options,
      );
    },
    getCassandraKeyspaceThroughput: (
      resourceGroupName: string,
      accountName: string,
      keyspaceName: string,
      options?: CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams,
    ) =>
      getCassandraKeyspaceThroughput(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        options,
      ),
  };
}

export function _getCassandraResourcesOperations(
  context: CosmosDBManagementContext,
): CassandraResourcesOperations {
  return {
    ..._getCassandraResources(context),
  };
}
