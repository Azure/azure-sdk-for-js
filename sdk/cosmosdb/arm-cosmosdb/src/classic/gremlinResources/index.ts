// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listGremlinRoleAssignments,
  deleteGremlinRoleAssignment,
  createUpdateGremlinRoleAssignment,
  getGremlinRoleAssignment,
  listGremlinRoleDefinitions,
  deleteGremlinRoleDefinition,
  createUpdateGremlinRoleDefinition,
  getGremlinRoleDefinition,
  retrieveContinuousBackupInformation,
  listGremlinGraphs,
  deleteGremlinGraph,
  createUpdateGremlinGraph,
  getGremlinGraph,
  listGremlinDatabases,
  deleteGremlinDatabase,
  createUpdateGremlinDatabase,
  getGremlinDatabase,
  migrateGremlinGraphToManualThroughput,
  migrateGremlinGraphToAutoscale,
  updateGremlinGraphThroughput,
  getGremlinGraphThroughput,
  migrateGremlinDatabaseToManualThroughput,
  migrateGremlinDatabaseToAutoscale,
  updateGremlinDatabaseThroughput,
  getGremlinDatabaseThroughput,
} from "../../api/gremlinResources/operations.js";
import type {
  GremlinResourcesListGremlinRoleAssignmentsOptionalParams,
  GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
  GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
  GremlinResourcesGetGremlinRoleAssignmentOptionalParams,
  GremlinResourcesListGremlinRoleDefinitionsOptionalParams,
  GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
  GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
  GremlinResourcesGetGremlinRoleDefinitionOptionalParams,
  GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
  GremlinResourcesListGremlinGraphsOptionalParams,
  GremlinResourcesDeleteGremlinGraphOptionalParams,
  GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
  GremlinResourcesGetGremlinGraphOptionalParams,
  GremlinResourcesListGremlinDatabasesOptionalParams,
  GremlinResourcesDeleteGremlinDatabaseOptionalParams,
  GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
  GremlinResourcesGetGremlinDatabaseOptionalParams,
  GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
  GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
  GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
  GremlinResourcesGetGremlinGraphThroughputOptionalParams,
  GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
  GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
  GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
  GremlinResourcesGetGremlinDatabaseThroughputOptionalParams,
} from "../../api/gremlinResources/options.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  GremlinDatabaseGetResults,
  GremlinDatabaseCreateUpdateParameters,
  GremlinGraphGetResults,
  GremlinGraphCreateUpdateParameters,
  GremlinRoleDefinitionResource,
  GremlinRoleAssignmentResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GremlinResources operations. */
export interface GremlinResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB Gremlin Role Assignments. */
  listGremlinRoleAssignments: (
    resourceGroupName: string,
    accountName: string,
    options?: GremlinResourcesListGremlinRoleAssignmentsOptionalParams,
  ) => PagedAsyncIterableIterator<GremlinRoleAssignmentResource>;
  /** Deletes an existing Azure Cosmos DB Gremlin Role Assignment. */
  deleteGremlinRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteGremlinRoleAssignment instead */
  beginDeleteGremlinRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteGremlinRoleAssignment instead */
  beginDeleteGremlinRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Gremlin Role Assignment. */
  createUpdateGremlinRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<GremlinRoleAssignmentResource>, GremlinRoleAssignmentResource>;
  /** @deprecated use createUpdateGremlinRoleAssignment instead */
  beginCreateUpdateGremlinRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GremlinRoleAssignmentResource>, GremlinRoleAssignmentResource>
  >;
  /** @deprecated use createUpdateGremlinRoleAssignment instead */
  beginCreateUpdateGremlinRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
  ) => Promise<GremlinRoleAssignmentResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Assignment with the given Id. */
  getGremlinRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: GremlinResourcesGetGremlinRoleAssignmentOptionalParams,
  ) => Promise<GremlinRoleAssignmentResource>;
  /** Retrieves the list of all Azure Cosmos DB Gremlin Role Definitions. */
  listGremlinRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: GremlinResourcesListGremlinRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<GremlinRoleDefinitionResource>;
  /** Deletes an existing Azure Cosmos DB Gremlin Role Definition. */
  deleteGremlinRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteGremlinRoleDefinition instead */
  beginDeleteGremlinRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteGremlinRoleDefinition instead */
  beginDeleteGremlinRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Gremlin Role Definition. */
  createUpdateGremlinRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<GremlinRoleDefinitionResource>, GremlinRoleDefinitionResource>;
  /** @deprecated use createUpdateGremlinRoleDefinition instead */
  beginCreateUpdateGremlinRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GremlinRoleDefinitionResource>, GremlinRoleDefinitionResource>
  >;
  /** @deprecated use createUpdateGremlinRoleDefinition instead */
  beginCreateUpdateGremlinRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
    options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
  ) => Promise<GremlinRoleDefinitionResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Definition with the given Id. */
  getGremlinRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: GremlinResourcesGetGremlinRoleDefinitionOptionalParams,
  ) => Promise<GremlinRoleDefinitionResource>;
  /** Retrieves continuous backup information for a gremlin graph. */
  retrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    location: ContinuousBackupRestoreLocation,
    options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => PollerLike<OperationState<BackupInformation>, BackupInformation>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    location: ContinuousBackupRestoreLocation,
    options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BackupInformation>, BackupInformation>>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformationAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    location: ContinuousBackupRestoreLocation,
    options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<BackupInformation>;
  /** Lists the Gremlin graph under an existing Azure Cosmos DB database account. */
  listGremlinGraphs: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesListGremlinGraphsOptionalParams,
  ) => PagedAsyncIterableIterator<GremlinGraphGetResults>;
  /** Deletes an existing Azure Cosmos DB Gremlin graph. */
  deleteGremlinGraph: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteGremlinGraph instead */
  beginDeleteGremlinGraph: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteGremlinGraph instead */
  beginDeleteGremlinGraphAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Gremlin graph */
  createUpdateGremlinGraph: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
  ) => PollerLike<OperationState<GremlinGraphGetResults>, GremlinGraphGetResults>;
  /** @deprecated use createUpdateGremlinGraph instead */
  beginCreateUpdateGremlinGraph: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GremlinGraphGetResults>, GremlinGraphGetResults>>;
  /** @deprecated use createUpdateGremlinGraph instead */
  beginCreateUpdateGremlinGraphAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
  ) => Promise<GremlinGraphGetResults>;
  /** Gets the Gremlin graph under an existing Azure Cosmos DB database account. */
  getGremlinGraph: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesGetGremlinGraphOptionalParams,
  ) => Promise<GremlinGraphGetResults>;
  /** Lists the Gremlin databases under an existing Azure Cosmos DB database account. */
  listGremlinDatabases: (
    resourceGroupName: string,
    accountName: string,
    options?: GremlinResourcesListGremlinDatabasesOptionalParams,
  ) => PagedAsyncIterableIterator<GremlinDatabaseGetResults>;
  /** Deletes an existing Azure Cosmos DB Gremlin database. */
  deleteGremlinDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteGremlinDatabase instead */
  beginDeleteGremlinDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteGremlinDatabase instead */
  beginDeleteGremlinDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Gremlin database */
  createUpdateGremlinDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
  ) => PollerLike<OperationState<GremlinDatabaseGetResults>, GremlinDatabaseGetResults>;
  /** @deprecated use createUpdateGremlinDatabase instead */
  beginCreateUpdateGremlinDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GremlinDatabaseGetResults>, GremlinDatabaseGetResults>
  >;
  /** @deprecated use createUpdateGremlinDatabase instead */
  beginCreateUpdateGremlinDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
    options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
  ) => Promise<GremlinDatabaseGetResults>;
  /** Gets the Gremlin databases under an existing Azure Cosmos DB database account with the provided name. */
  getGremlinDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesGetGremlinDatabaseOptionalParams,
  ) => Promise<GremlinDatabaseGetResults>;
  /** Migrate an Azure Cosmos DB Gremlin graph from autoscale to manual throughput */
  migrateGremlinGraphToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateGremlinGraphToManualThroughput instead */
  beginMigrateGremlinGraphToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateGremlinGraphToManualThroughput instead */
  beginMigrateGremlinGraphToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale */
  migrateGremlinGraphToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateGremlinGraphToAutoscale instead */
  beginMigrateGremlinGraphToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateGremlinGraphToAutoscale instead */
  beginMigrateGremlinGraphToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB Gremlin graph */
  updateGremlinGraphThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateGremlinGraphThroughput instead */
  beginUpdateGremlinGraphThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateGremlinGraphThroughput instead */
  beginUpdateGremlinGraphThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name. */
  getGremlinGraphThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: GremlinResourcesGetGremlinGraphThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Gremlin database from autoscale to manual throughput */
  migrateGremlinDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateGremlinDatabaseToManualThroughput instead */
  beginMigrateGremlinDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateGremlinDatabaseToManualThroughput instead */
  beginMigrateGremlinDatabaseToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Gremlin database from manual throughput to autoscale */
  migrateGremlinDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateGremlinDatabaseToAutoscale instead */
  beginMigrateGremlinDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateGremlinDatabaseToAutoscale instead */
  beginMigrateGremlinDatabaseToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB Gremlin database */
  updateGremlinDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateGremlinDatabaseThroughput instead */
  beginUpdateGremlinDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateGremlinDatabaseThroughput instead */
  beginUpdateGremlinDatabaseThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the Gremlin database under an existing Azure Cosmos DB database account with the provided name. */
  getGremlinDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: GremlinResourcesGetGremlinDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
}

function _getGremlinResources(context: CosmosDBManagementContext) {
  return {
    listGremlinRoleAssignments: (
      resourceGroupName: string,
      accountName: string,
      options?: GremlinResourcesListGremlinRoleAssignmentsOptionalParams,
    ) => listGremlinRoleAssignments(context, resourceGroupName, accountName, options),
    deleteGremlinRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
    ) =>
      deleteGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      ),
    beginDeleteGremlinRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
    ) => {
      const poller = deleteGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteGremlinRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams,
    ) => {
      return await deleteGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
    },
    createUpdateGremlinRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
    ) =>
      createUpdateGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateGremlinRoleAssignmentParameters,
        options,
      ),
    beginCreateUpdateGremlinRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
    ) => {
      const poller = createUpdateGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateGremlinRoleAssignmentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateGremlinRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams,
    ) => {
      return await createUpdateGremlinRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateGremlinRoleAssignmentParameters,
        options,
      );
    },
    getGremlinRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: GremlinResourcesGetGremlinRoleAssignmentOptionalParams,
    ) =>
      getGremlinRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    listGremlinRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: GremlinResourcesListGremlinRoleDefinitionsOptionalParams,
    ) => listGremlinRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteGremlinRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
    ) =>
      deleteGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      ),
    beginDeleteGremlinRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteGremlinRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams,
    ) => {
      return await deleteGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
    },
    createUpdateGremlinRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
    ) =>
      createUpdateGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateGremlinRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateGremlinRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateGremlinRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateGremlinRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
      options?: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateGremlinRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateGremlinRoleDefinitionParameters,
        options,
      );
    },
    getGremlinRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: GremlinResourcesGetGremlinRoleDefinitionOptionalParams,
    ) =>
      getGremlinRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
    retrieveContinuousBackupInformation: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      location: ContinuousBackupRestoreLocation,
      options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) =>
      retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        location,
        options,
      ),
    beginRetrieveContinuousBackupInformation: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      location: ContinuousBackupRestoreLocation,
      options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      const poller = retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        location,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRetrieveContinuousBackupInformationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      location: ContinuousBackupRestoreLocation,
      options?: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      return await retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        location,
        options,
      );
    },
    listGremlinGraphs: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesListGremlinGraphsOptionalParams,
    ) => listGremlinGraphs(context, resourceGroupName, accountName, databaseName, options),
    deleteGremlinGraph: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
    ) =>
      deleteGremlinGraph(context, resourceGroupName, accountName, databaseName, graphName, options),
    beginDeleteGremlinGraph: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
    ) => {
      const poller = deleteGremlinGraph(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteGremlinGraphAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesDeleteGremlinGraphOptionalParams,
    ) => {
      return await deleteGremlinGraph(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
    },
    createUpdateGremlinGraph: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
    ) =>
      createUpdateGremlinGraph(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        createUpdateGremlinGraphParameters,
        options,
      ),
    beginCreateUpdateGremlinGraph: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
    ) => {
      const poller = createUpdateGremlinGraph(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        createUpdateGremlinGraphParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateGremlinGraphAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinGraphOptionalParams,
    ) => {
      return await createUpdateGremlinGraph(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        createUpdateGremlinGraphParameters,
        options,
      );
    },
    getGremlinGraph: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesGetGremlinGraphOptionalParams,
    ) => getGremlinGraph(context, resourceGroupName, accountName, databaseName, graphName, options),
    listGremlinDatabases: (
      resourceGroupName: string,
      accountName: string,
      options?: GremlinResourcesListGremlinDatabasesOptionalParams,
    ) => listGremlinDatabases(context, resourceGroupName, accountName, options),
    deleteGremlinDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
    ) => deleteGremlinDatabase(context, resourceGroupName, accountName, databaseName, options),
    beginDeleteGremlinDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
    ) => {
      const poller = deleteGremlinDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteGremlinDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesDeleteGremlinDatabaseOptionalParams,
    ) => {
      return await deleteGremlinDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    createUpdateGremlinDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
    ) =>
      createUpdateGremlinDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateGremlinDatabaseParameters,
        options,
      ),
    beginCreateUpdateGremlinDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
    ) => {
      const poller = createUpdateGremlinDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateGremlinDatabaseParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateGremlinDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
      options?: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams,
    ) => {
      return await createUpdateGremlinDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateGremlinDatabaseParameters,
        options,
      );
    },
    getGremlinDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesGetGremlinDatabaseOptionalParams,
    ) => getGremlinDatabase(context, resourceGroupName, accountName, databaseName, options),
    migrateGremlinGraphToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
    ) =>
      migrateGremlinGraphToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      ),
    beginMigrateGremlinGraphToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
    ) => {
      const poller = migrateGremlinGraphToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateGremlinGraphToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams,
    ) => {
      return await migrateGremlinGraphToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
    },
    migrateGremlinGraphToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
    ) =>
      migrateGremlinGraphToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      ),
    beginMigrateGremlinGraphToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
    ) => {
      const poller = migrateGremlinGraphToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateGremlinGraphToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams,
    ) => {
      return await migrateGremlinGraphToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      );
    },
    updateGremlinGraphThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
    ) =>
      updateGremlinGraphThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateGremlinGraphThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
    ) => {
      const poller = updateGremlinGraphThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateGremlinGraphThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams,
    ) => {
      return await updateGremlinGraphThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        updateThroughputParameters,
        options,
      );
    },
    getGremlinGraphThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      graphName: string,
      options?: GremlinResourcesGetGremlinGraphThroughputOptionalParams,
    ) =>
      getGremlinGraphThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      ),
    migrateGremlinDatabaseToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
    ) =>
      migrateGremlinDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      ),
    beginMigrateGremlinDatabaseToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
    ) => {
      const poller = migrateGremlinDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateGremlinDatabaseToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams,
    ) => {
      return await migrateGremlinDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    migrateGremlinDatabaseToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
    ) =>
      migrateGremlinDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      ),
    beginMigrateGremlinDatabaseToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
    ) => {
      const poller = migrateGremlinDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateGremlinDatabaseToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams,
    ) => {
      return await migrateGremlinDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    updateGremlinDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
    ) =>
      updateGremlinDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateGremlinDatabaseThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
    ) => {
      const poller = updateGremlinDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateGremlinDatabaseThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams,
    ) => {
      return await updateGremlinDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      );
    },
    getGremlinDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: GremlinResourcesGetGremlinDatabaseThroughputOptionalParams,
    ) =>
      getGremlinDatabaseThroughput(context, resourceGroupName, accountName, databaseName, options),
  };
}

export function _getGremlinResourcesOperations(
  context: CosmosDBManagementContext,
): GremlinResourcesOperations {
  return {
    ..._getGremlinResources(context),
  };
}
