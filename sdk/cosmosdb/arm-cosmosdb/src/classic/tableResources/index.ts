// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listTableRoleAssignments,
  deleteTableRoleAssignment,
  createUpdateTableRoleAssignment,
  getTableRoleAssignment,
  listTableRoleDefinitions,
  deleteTableRoleDefinition,
  createUpdateTableRoleDefinition,
  getTableRoleDefinition,
  retrieveContinuousBackupInformation,
  listTables,
  deleteTable,
  createUpdateTable,
  getTable,
  migrateTableToManualThroughput,
  migrateTableToAutoscale,
  updateTableThroughput,
  getTableThroughput,
} from "../../api/tableResources/operations.js";
import type {
  TableResourcesListTableRoleAssignmentsOptionalParams,
  TableResourcesDeleteTableRoleAssignmentOptionalParams,
  TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
  TableResourcesGetTableRoleAssignmentOptionalParams,
  TableResourcesListTableRoleDefinitionsOptionalParams,
  TableResourcesDeleteTableRoleDefinitionOptionalParams,
  TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
  TableResourcesGetTableRoleDefinitionOptionalParams,
  TableResourcesRetrieveContinuousBackupInformationOptionalParams,
  TableResourcesListTablesOptionalParams,
  TableResourcesDeleteTableOptionalParams,
  TableResourcesCreateUpdateTableOptionalParams,
  TableResourcesGetTableOptionalParams,
  TableResourcesMigrateTableToManualThroughputOptionalParams,
  TableResourcesMigrateTableToAutoscaleOptionalParams,
  TableResourcesUpdateTableThroughputOptionalParams,
  TableResourcesGetTableThroughputOptionalParams,
} from "../../api/tableResources/options.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  TableGetResults,
  TableCreateUpdateParameters,
  TableRoleDefinitionResource,
  TableRoleAssignmentResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TableResources operations. */
export interface TableResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB Table Role Assignments. */
  listTableRoleAssignments: (
    resourceGroupName: string,
    accountName: string,
    options?: TableResourcesListTableRoleAssignmentsOptionalParams,
  ) => PagedAsyncIterableIterator<TableRoleAssignmentResource>;
  /** Deletes an existing Azure Cosmos DB Table Role Assignment. */
  deleteTableRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteTableRoleAssignment instead */
  beginDeleteTableRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteTableRoleAssignment instead */
  beginDeleteTableRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Table Role Assignment. */
  createUpdateTableRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
    options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<TableRoleAssignmentResource>, TableRoleAssignmentResource>;
  /** @deprecated use createUpdateTableRoleAssignment instead */
  beginCreateUpdateTableRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
    options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<TableRoleAssignmentResource>, TableRoleAssignmentResource>
  >;
  /** @deprecated use createUpdateTableRoleAssignment instead */
  beginCreateUpdateTableRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
    options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
  ) => Promise<TableRoleAssignmentResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Table Role Assignment with the given Id. */
  getTableRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: TableResourcesGetTableRoleAssignmentOptionalParams,
  ) => Promise<TableRoleAssignmentResource>;
  /** Retrieves the list of all Azure Cosmos DB Table Role Definitions. */
  listTableRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: TableResourcesListTableRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<TableRoleDefinitionResource>;
  /** Deletes an existing Azure Cosmos DB Table Role Definition. */
  deleteTableRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteTableRoleDefinition instead */
  beginDeleteTableRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteTableRoleDefinition instead */
  beginDeleteTableRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Table Role Definition. */
  createUpdateTableRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
    options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<TableRoleDefinitionResource>, TableRoleDefinitionResource>;
  /** @deprecated use createUpdateTableRoleDefinition instead */
  beginCreateUpdateTableRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
    options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<TableRoleDefinitionResource>, TableRoleDefinitionResource>
  >;
  /** @deprecated use createUpdateTableRoleDefinition instead */
  beginCreateUpdateTableRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
    options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
  ) => Promise<TableRoleDefinitionResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Table Role Definition with the given Id. */
  getTableRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: TableResourcesGetTableRoleDefinitionOptionalParams,
  ) => Promise<TableRoleDefinitionResource>;
  /** Retrieves continuous backup information for a table. */
  retrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    location: ContinuousBackupRestoreLocation,
    options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => PollerLike<OperationState<BackupInformation>, BackupInformation>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    location: ContinuousBackupRestoreLocation,
    options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BackupInformation>, BackupInformation>>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformationAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    location: ContinuousBackupRestoreLocation,
    options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<BackupInformation>;
  /** Lists the Tables under an existing Azure Cosmos DB database account. */
  listTables: (
    resourceGroupName: string,
    accountName: string,
    options?: TableResourcesListTablesOptionalParams,
  ) => PagedAsyncIterableIterator<TableGetResults>;
  /** Deletes an existing Azure Cosmos DB Table. */
  deleteTable: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesDeleteTableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteTable instead */
  beginDeleteTable: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesDeleteTableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteTable instead */
  beginDeleteTableAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesDeleteTableOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Table */
  createUpdateTable: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    createUpdateTableParameters: TableCreateUpdateParameters,
    options?: TableResourcesCreateUpdateTableOptionalParams,
  ) => PollerLike<OperationState<TableGetResults>, TableGetResults>;
  /** @deprecated use createUpdateTable instead */
  beginCreateUpdateTable: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    createUpdateTableParameters: TableCreateUpdateParameters,
    options?: TableResourcesCreateUpdateTableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TableGetResults>, TableGetResults>>;
  /** @deprecated use createUpdateTable instead */
  beginCreateUpdateTableAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    createUpdateTableParameters: TableCreateUpdateParameters,
    options?: TableResourcesCreateUpdateTableOptionalParams,
  ) => Promise<TableGetResults>;
  /** Gets the Tables under an existing Azure Cosmos DB database account with the provided name. */
  getTable: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesGetTableOptionalParams,
  ) => Promise<TableGetResults>;
  /** Migrate an Azure Cosmos DB Table from autoscale to manual throughput */
  migrateTableToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateTableToManualThroughput instead */
  beginMigrateTableToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateTableToManualThroughput instead */
  beginMigrateTableToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB Table from manual throughput to autoscale */
  migrateTableToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateTableToAutoscale instead */
  beginMigrateTableToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateTableToAutoscale instead */
  beginMigrateTableToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB Table */
  updateTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: TableResourcesUpdateTableThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateTableThroughput instead */
  beginUpdateTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: TableResourcesUpdateTableThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateTableThroughput instead */
  beginUpdateTableThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: TableResourcesUpdateTableThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the Table under an existing Azure Cosmos DB database account with the provided name. */
  getTableThroughput: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableResourcesGetTableThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
}

function _getTableResources(context: CosmosDBManagementContext) {
  return {
    listTableRoleAssignments: (
      resourceGroupName: string,
      accountName: string,
      options?: TableResourcesListTableRoleAssignmentsOptionalParams,
    ) => listTableRoleAssignments(context, resourceGroupName, accountName, options),
    deleteTableRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
    ) =>
      deleteTableRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    beginDeleteTableRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
    ) => {
      const poller = deleteTableRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteTableRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: TableResourcesDeleteTableRoleAssignmentOptionalParams,
    ) => {
      return await deleteTableRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
    },
    createUpdateTableRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
      options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
    ) =>
      createUpdateTableRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateTableRoleAssignmentParameters,
        options,
      ),
    beginCreateUpdateTableRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
      options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
    ) => {
      const poller = createUpdateTableRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateTableRoleAssignmentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateTableRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
      options?: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams,
    ) => {
      return await createUpdateTableRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateTableRoleAssignmentParameters,
        options,
      );
    },
    getTableRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: TableResourcesGetTableRoleAssignmentOptionalParams,
    ) => getTableRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    listTableRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: TableResourcesListTableRoleDefinitionsOptionalParams,
    ) => listTableRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteTableRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
    ) =>
      deleteTableRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
    beginDeleteTableRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteTableRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteTableRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: TableResourcesDeleteTableRoleDefinitionOptionalParams,
    ) => {
      return await deleteTableRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
    },
    createUpdateTableRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
      options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
    ) =>
      createUpdateTableRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateTableRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateTableRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
      options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateTableRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateTableRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateTableRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
      options?: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateTableRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateTableRoleDefinitionParameters,
        options,
      );
    },
    getTableRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: TableResourcesGetTableRoleDefinitionOptionalParams,
    ) => getTableRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
    retrieveContinuousBackupInformation: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      location: ContinuousBackupRestoreLocation,
      options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) =>
      retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        tableName,
        location,
        options,
      ),
    beginRetrieveContinuousBackupInformation: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      location: ContinuousBackupRestoreLocation,
      options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      const poller = retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        tableName,
        location,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRetrieveContinuousBackupInformationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      location: ContinuousBackupRestoreLocation,
      options?: TableResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      return await retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        tableName,
        location,
        options,
      );
    },
    listTables: (
      resourceGroupName: string,
      accountName: string,
      options?: TableResourcesListTablesOptionalParams,
    ) => listTables(context, resourceGroupName, accountName, options),
    deleteTable: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesDeleteTableOptionalParams,
    ) => deleteTable(context, resourceGroupName, accountName, tableName, options),
    beginDeleteTable: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesDeleteTableOptionalParams,
    ) => {
      const poller = deleteTable(context, resourceGroupName, accountName, tableName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteTableAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesDeleteTableOptionalParams,
    ) => {
      return await deleteTable(context, resourceGroupName, accountName, tableName, options);
    },
    createUpdateTable: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      createUpdateTableParameters: TableCreateUpdateParameters,
      options?: TableResourcesCreateUpdateTableOptionalParams,
    ) =>
      createUpdateTable(
        context,
        resourceGroupName,
        accountName,
        tableName,
        createUpdateTableParameters,
        options,
      ),
    beginCreateUpdateTable: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      createUpdateTableParameters: TableCreateUpdateParameters,
      options?: TableResourcesCreateUpdateTableOptionalParams,
    ) => {
      const poller = createUpdateTable(
        context,
        resourceGroupName,
        accountName,
        tableName,
        createUpdateTableParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateTableAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      createUpdateTableParameters: TableCreateUpdateParameters,
      options?: TableResourcesCreateUpdateTableOptionalParams,
    ) => {
      return await createUpdateTable(
        context,
        resourceGroupName,
        accountName,
        tableName,
        createUpdateTableParameters,
        options,
      );
    },
    getTable: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesGetTableOptionalParams,
    ) => getTable(context, resourceGroupName, accountName, tableName, options),
    migrateTableToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
    ) =>
      migrateTableToManualThroughput(context, resourceGroupName, accountName, tableName, options),
    beginMigrateTableToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
    ) => {
      const poller = migrateTableToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        tableName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateTableToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToManualThroughputOptionalParams,
    ) => {
      return await migrateTableToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        tableName,
        options,
      );
    },
    migrateTableToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
    ) => migrateTableToAutoscale(context, resourceGroupName, accountName, tableName, options),
    beginMigrateTableToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
    ) => {
      const poller = migrateTableToAutoscale(
        context,
        resourceGroupName,
        accountName,
        tableName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateTableToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesMigrateTableToAutoscaleOptionalParams,
    ) => {
      return await migrateTableToAutoscale(
        context,
        resourceGroupName,
        accountName,
        tableName,
        options,
      );
    },
    updateTableThroughput: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: TableResourcesUpdateTableThroughputOptionalParams,
    ) =>
      updateTableThroughput(
        context,
        resourceGroupName,
        accountName,
        tableName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateTableThroughput: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: TableResourcesUpdateTableThroughputOptionalParams,
    ) => {
      const poller = updateTableThroughput(
        context,
        resourceGroupName,
        accountName,
        tableName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTableThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: TableResourcesUpdateTableThroughputOptionalParams,
    ) => {
      return await updateTableThroughput(
        context,
        resourceGroupName,
        accountName,
        tableName,
        updateThroughputParameters,
        options,
      );
    },
    getTableThroughput: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableResourcesGetTableThroughputOptionalParams,
    ) => getTableThroughput(context, resourceGroupName, accountName, tableName, options),
  };
}

export function _getTableResourcesOperations(
  context: CosmosDBManagementContext,
): TableResourcesOperations {
  return {
    ..._getTableResources(context),
  };
}
