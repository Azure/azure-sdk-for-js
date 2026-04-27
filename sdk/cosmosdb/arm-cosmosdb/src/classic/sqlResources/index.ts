// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listSqlRoleAssignments,
  deleteSqlRoleAssignment,
  createUpdateSqlRoleAssignment,
  getSqlRoleAssignment,
  listSqlRoleDefinitions,
  deleteSqlRoleDefinition,
  createUpdateSqlRoleDefinition,
  getSqlRoleDefinition,
  listSqlTriggers,
  deleteSqlTrigger,
  createUpdateSqlTrigger,
  getSqlTrigger,
  listSqlUserDefinedFunctions,
  deleteSqlUserDefinedFunction,
  createUpdateSqlUserDefinedFunction,
  getSqlUserDefinedFunction,
  listSqlStoredProcedures,
  deleteSqlStoredProcedure,
  createUpdateSqlStoredProcedure,
  getSqlStoredProcedure,
  retrieveContinuousBackupInformation,
  listSqlContainerPartitionMerge,
  listSqlContainers,
  deleteSqlContainer,
  createUpdateSqlContainer,
  getSqlContainer,
  listClientEncryptionKeys,
  createUpdateClientEncryptionKey,
  getClientEncryptionKey,
  sqlContainerRedistributeThroughput,
  sqlContainerRetrieveThroughputDistribution,
  migrateSqlContainerToManualThroughput,
  migrateSqlContainerToAutoscale,
  updateSqlContainerThroughput,
  getSqlContainerThroughput,
  sqlDatabaseRedistributeThroughput,
  sqlDatabaseRetrieveThroughputDistribution,
  migrateSqlDatabaseToManualThroughput,
  migrateSqlDatabaseToAutoscale,
  updateSqlDatabaseThroughput,
  getSqlDatabaseThroughput,
  sqlDatabasePartitionMerge,
  listSqlDatabases,
  deleteSqlDatabase,
  createUpdateSqlDatabase,
  getSqlDatabase,
} from "../../api/sqlResources/operations.js";
import type {
  SqlResourcesListSqlRoleAssignmentsOptionalParams,
  SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
  SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
  SqlResourcesGetSqlRoleAssignmentOptionalParams,
  SqlResourcesListSqlRoleDefinitionsOptionalParams,
  SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
  SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
  SqlResourcesGetSqlRoleDefinitionOptionalParams,
  SqlResourcesListSqlTriggersOptionalParams,
  SqlResourcesDeleteSqlTriggerOptionalParams,
  SqlResourcesCreateUpdateSqlTriggerOptionalParams,
  SqlResourcesGetSqlTriggerOptionalParams,
  SqlResourcesListSqlUserDefinedFunctionsOptionalParams,
  SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
  SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
  SqlResourcesGetSqlUserDefinedFunctionOptionalParams,
  SqlResourcesListSqlStoredProceduresOptionalParams,
  SqlResourcesDeleteSqlStoredProcedureOptionalParams,
  SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
  SqlResourcesGetSqlStoredProcedureOptionalParams,
  SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
  SqlResourcesListSqlContainerPartitionMergeOptionalParams,
  SqlResourcesListSqlContainersOptionalParams,
  SqlResourcesDeleteSqlContainerOptionalParams,
  SqlResourcesCreateUpdateSqlContainerOptionalParams,
  SqlResourcesGetSqlContainerOptionalParams,
  SqlResourcesListClientEncryptionKeysOptionalParams,
  SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
  SqlResourcesGetClientEncryptionKeyOptionalParams,
  SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
  SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
  SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
  SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
  SqlResourcesUpdateSqlContainerThroughputOptionalParams,
  SqlResourcesGetSqlContainerThroughputOptionalParams,
  SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
  SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
  SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
  SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
  SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
  SqlResourcesGetSqlDatabaseThroughputOptionalParams,
  SqlResourcesSqlDatabasePartitionMergeOptionalParams,
  SqlResourcesListSqlDatabasesOptionalParams,
  SqlResourcesDeleteSqlDatabaseOptionalParams,
  SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
  SqlResourcesGetSqlDatabaseOptionalParams,
} from "../../api/sqlResources/options.js";
import type {
  SqlDatabaseGetResults,
  SqlDatabaseCreateUpdateParameters,
  MergeParameters,
  PhysicalPartitionStorageInfoCollection,
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  RetrieveThroughputParameters,
  PhysicalPartitionThroughputInfoResult,
  RedistributeThroughputParameters,
  ClientEncryptionKeyGetResults,
  ClientEncryptionKeyCreateUpdateParameters,
  SqlContainerGetResults,
  SqlContainerCreateUpdateParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  SqlStoredProcedureGetResults,
  SqlStoredProcedureCreateUpdateParameters,
  SqlUserDefinedFunctionGetResults,
  SqlUserDefinedFunctionCreateUpdateParameters,
  SqlTriggerGetResults,
  SqlTriggerCreateUpdateParameters,
  SqlRoleDefinitionGetResults,
  SqlRoleDefinitionCreateUpdateParameters,
  SqlRoleAssignmentGetResults,
  SqlRoleAssignmentCreateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlResources operations. */
export interface SqlResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB SQL Role Assignments. */
  listSqlRoleAssignments: (
    resourceGroupName: string,
    accountName: string,
    options?: SqlResourcesListSqlRoleAssignmentsOptionalParams,
  ) => PagedAsyncIterableIterator<SqlRoleAssignmentGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL Role Assignment. */
  deleteSqlRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlRoleAssignment instead */
  beginDeleteSqlRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlRoleAssignment instead */
  beginDeleteSqlRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB SQL Role Assignment. */
  createUpdateSqlRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
  ) => PollerLike<OperationState<SqlRoleAssignmentGetResults>, SqlRoleAssignmentGetResults>;
  /** @deprecated use createUpdateSqlRoleAssignment instead */
  beginCreateUpdateSqlRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SqlRoleAssignmentGetResults>, SqlRoleAssignmentGetResults>
  >;
  /** @deprecated use createUpdateSqlRoleAssignment instead */
  beginCreateUpdateSqlRoleAssignmentAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
  ) => Promise<SqlRoleAssignmentGetResults>;
  /** Retrieves the properties of an existing Azure Cosmos DB SQL Role Assignment with the given Id. */
  getSqlRoleAssignment: (
    resourceGroupName: string,
    accountName: string,
    roleAssignmentId: string,
    options?: SqlResourcesGetSqlRoleAssignmentOptionalParams,
  ) => Promise<SqlRoleAssignmentGetResults>;
  /** Retrieves the list of all Azure Cosmos DB SQL Role Definitions. */
  listSqlRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: SqlResourcesListSqlRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<SqlRoleDefinitionGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL Role Definition. */
  deleteSqlRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlRoleDefinition instead */
  beginDeleteSqlRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlRoleDefinition instead */
  beginDeleteSqlRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB SQL Role Definition. */
  createUpdateSqlRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<SqlRoleDefinitionGetResults>, SqlRoleDefinitionGetResults>;
  /** @deprecated use createUpdateSqlRoleDefinition instead */
  beginCreateUpdateSqlRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SqlRoleDefinitionGetResults>, SqlRoleDefinitionGetResults>
  >;
  /** @deprecated use createUpdateSqlRoleDefinition instead */
  beginCreateUpdateSqlRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
  ) => Promise<SqlRoleDefinitionGetResults>;
  /** Retrieves the properties of an existing Azure Cosmos DB SQL Role Definition with the given Id. */
  getSqlRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    roleDefinitionId: string,
    options?: SqlResourcesGetSqlRoleDefinitionOptionalParams,
  ) => Promise<SqlRoleDefinitionGetResults>;
  /** Lists the SQL trigger under an existing Azure Cosmos DB database account. */
  listSqlTriggers: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesListSqlTriggersOptionalParams,
  ) => PagedAsyncIterableIterator<SqlTriggerGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL trigger. */
  deleteSqlTrigger: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    options?: SqlResourcesDeleteSqlTriggerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlTrigger instead */
  beginDeleteSqlTrigger: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    options?: SqlResourcesDeleteSqlTriggerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlTrigger instead */
  beginDeleteSqlTriggerAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    options?: SqlResourcesDeleteSqlTriggerOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB SQL trigger */
  createUpdateSqlTrigger: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
  ) => PollerLike<OperationState<SqlTriggerGetResults>, SqlTriggerGetResults>;
  /** @deprecated use createUpdateSqlTrigger instead */
  beginCreateUpdateSqlTrigger: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlTriggerGetResults>, SqlTriggerGetResults>>;
  /** @deprecated use createUpdateSqlTrigger instead */
  beginCreateUpdateSqlTriggerAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
  ) => Promise<SqlTriggerGetResults>;
  /** Gets the SQL trigger under an existing Azure Cosmos DB database account. */
  getSqlTrigger: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    triggerName: string,
    options?: SqlResourcesGetSqlTriggerOptionalParams,
  ) => Promise<SqlTriggerGetResults>;
  /** Lists the SQL userDefinedFunction under an existing Azure Cosmos DB database account. */
  listSqlUserDefinedFunctions: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesListSqlUserDefinedFunctionsOptionalParams,
  ) => PagedAsyncIterableIterator<SqlUserDefinedFunctionGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL userDefinedFunction. */
  deleteSqlUserDefinedFunction: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlUserDefinedFunction instead */
  beginDeleteSqlUserDefinedFunction: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlUserDefinedFunction instead */
  beginDeleteSqlUserDefinedFunctionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB SQL userDefinedFunction */
  createUpdateSqlUserDefinedFunction: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
  ) => PollerLike<
    OperationState<SqlUserDefinedFunctionGetResults>,
    SqlUserDefinedFunctionGetResults
  >;
  /** @deprecated use createUpdateSqlUserDefinedFunction instead */
  beginCreateUpdateSqlUserDefinedFunction: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SqlUserDefinedFunctionGetResults>,
      SqlUserDefinedFunctionGetResults
    >
  >;
  /** @deprecated use createUpdateSqlUserDefinedFunction instead */
  beginCreateUpdateSqlUserDefinedFunctionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
  ) => Promise<SqlUserDefinedFunctionGetResults>;
  /** Gets the SQL userDefinedFunction under an existing Azure Cosmos DB database account. */
  getSqlUserDefinedFunction: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    userDefinedFunctionName: string,
    options?: SqlResourcesGetSqlUserDefinedFunctionOptionalParams,
  ) => Promise<SqlUserDefinedFunctionGetResults>;
  /** Lists the SQL storedProcedure under an existing Azure Cosmos DB database account. */
  listSqlStoredProcedures: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesListSqlStoredProceduresOptionalParams,
  ) => PagedAsyncIterableIterator<SqlStoredProcedureGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL storedProcedure. */
  deleteSqlStoredProcedure: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlStoredProcedure instead */
  beginDeleteSqlStoredProcedure: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlStoredProcedure instead */
  beginDeleteSqlStoredProcedureAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB SQL storedProcedure */
  createUpdateSqlStoredProcedure: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
  ) => PollerLike<OperationState<SqlStoredProcedureGetResults>, SqlStoredProcedureGetResults>;
  /** @deprecated use createUpdateSqlStoredProcedure instead */
  beginCreateUpdateSqlStoredProcedure: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SqlStoredProcedureGetResults>, SqlStoredProcedureGetResults>
  >;
  /** @deprecated use createUpdateSqlStoredProcedure instead */
  beginCreateUpdateSqlStoredProcedureAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
  ) => Promise<SqlStoredProcedureGetResults>;
  /** Gets the SQL storedProcedure under an existing Azure Cosmos DB database account. */
  getSqlStoredProcedure: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    storedProcedureName: string,
    options?: SqlResourcesGetSqlStoredProcedureOptionalParams,
  ) => Promise<SqlStoredProcedureGetResults>;
  /** Retrieves continuous backup information for a container resource. */
  retrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    location: ContinuousBackupRestoreLocation,
    options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => PollerLike<OperationState<BackupInformation>, BackupInformation>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    location: ContinuousBackupRestoreLocation,
    options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BackupInformation>, BackupInformation>>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformationAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    location: ContinuousBackupRestoreLocation,
    options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<BackupInformation>;
  /** Merges the partitions of a SQL Container */
  listSqlContainerPartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
  /** @deprecated use listSqlContainerPartitionMerge instead */
  beginListSqlContainerPartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionStorageInfoCollection>,
      PhysicalPartitionStorageInfoCollection
    >
  >;
  /** @deprecated use listSqlContainerPartitionMerge instead */
  beginListSqlContainerPartitionMergeAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
  ) => Promise<PhysicalPartitionStorageInfoCollection>;
  /** Lists the SQL container under an existing Azure Cosmos DB database account. */
  listSqlContainers: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesListSqlContainersOptionalParams,
  ) => PagedAsyncIterableIterator<SqlContainerGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL container. */
  deleteSqlContainer: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesDeleteSqlContainerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlContainer instead */
  beginDeleteSqlContainer: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesDeleteSqlContainerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlContainer instead */
  beginDeleteSqlContainerAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesDeleteSqlContainerOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB SQL container */
  createUpdateSqlContainer: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
  ) => PollerLike<OperationState<SqlContainerGetResults>, SqlContainerGetResults>;
  /** @deprecated use createUpdateSqlContainer instead */
  beginCreateUpdateSqlContainer: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlContainerGetResults>, SqlContainerGetResults>>;
  /** @deprecated use createUpdateSqlContainer instead */
  beginCreateUpdateSqlContainerAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
  ) => Promise<SqlContainerGetResults>;
  /** Gets the SQL container under an existing Azure Cosmos DB database account. */
  getSqlContainer: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesGetSqlContainerOptionalParams,
  ) => Promise<SqlContainerGetResults>;
  /** Lists the ClientEncryptionKeys under an existing Azure Cosmos DB SQL database. */
  listClientEncryptionKeys: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesListClientEncryptionKeysOptionalParams,
  ) => PagedAsyncIterableIterator<ClientEncryptionKeyGetResults>;
  /** Create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly). */
  createUpdateClientEncryptionKey: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    clientEncryptionKeyName: string,
    createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
  ) => PollerLike<OperationState<ClientEncryptionKeyGetResults>, ClientEncryptionKeyGetResults>;
  /** @deprecated use createUpdateClientEncryptionKey instead */
  beginCreateUpdateClientEncryptionKey: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    clientEncryptionKeyName: string,
    createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ClientEncryptionKeyGetResults>, ClientEncryptionKeyGetResults>
  >;
  /** @deprecated use createUpdateClientEncryptionKey instead */
  beginCreateUpdateClientEncryptionKeyAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    clientEncryptionKeyName: string,
    createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
  ) => Promise<ClientEncryptionKeyGetResults>;
  /** Gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database. */
  getClientEncryptionKey: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    clientEncryptionKeyName: string,
    options?: SqlResourcesGetClientEncryptionKeyOptionalParams,
  ) => Promise<ClientEncryptionKeyGetResults>;
  /** Redistribute throughput for an Azure Cosmos DB SQL container */
  sqlContainerRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use sqlContainerRedistributeThroughput instead */
  beginSqlContainerRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use sqlContainerRedistributeThroughput instead */
  beginSqlContainerRedistributeThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Retrieve throughput distribution for an Azure Cosmos DB SQL container */
  sqlContainerRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use sqlContainerRetrieveThroughputDistribution instead */
  beginSqlContainerRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use sqlContainerRetrieveThroughputDistribution instead */
  beginSqlContainerRetrieveThroughputDistributionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Migrate an Azure Cosmos DB SQL container from autoscale to manual throughput */
  migrateSqlContainerToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateSqlContainerToManualThroughput instead */
  beginMigrateSqlContainerToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateSqlContainerToManualThroughput instead */
  beginMigrateSqlContainerToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB SQL container from manual throughput to autoscale */
  migrateSqlContainerToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateSqlContainerToAutoscale instead */
  beginMigrateSqlContainerToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateSqlContainerToAutoscale instead */
  beginMigrateSqlContainerToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB SQL container */
  updateSqlContainerThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateSqlContainerThroughput instead */
  beginUpdateSqlContainerThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateSqlContainerThroughput instead */
  beginUpdateSqlContainerThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the SQL container under an existing Azure Cosmos DB database account. */
  getSqlContainerThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SqlResourcesGetSqlContainerThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Redistribute throughput for an Azure Cosmos DB SQL database */
  sqlDatabaseRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use sqlDatabaseRedistributeThroughput instead */
  beginSqlDatabaseRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use sqlDatabaseRedistributeThroughput instead */
  beginSqlDatabaseRedistributeThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Retrieve throughput distribution for an Azure Cosmos DB SQL database */
  sqlDatabaseRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use sqlDatabaseRetrieveThroughputDistribution instead */
  beginSqlDatabaseRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use sqlDatabaseRetrieveThroughputDistribution instead */
  beginSqlDatabaseRetrieveThroughputDistributionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Migrate an Azure Cosmos DB SQL database from autoscale to manual throughput */
  migrateSqlDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateSqlDatabaseToManualThroughput instead */
  beginMigrateSqlDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateSqlDatabaseToManualThroughput instead */
  beginMigrateSqlDatabaseToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB SQL database from manual throughput to autoscale */
  migrateSqlDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateSqlDatabaseToAutoscale instead */
  beginMigrateSqlDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateSqlDatabaseToAutoscale instead */
  beginMigrateSqlDatabaseToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of an Azure Cosmos DB SQL database */
  updateSqlDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateSqlDatabaseThroughput instead */
  beginUpdateSqlDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateSqlDatabaseThroughput instead */
  beginUpdateSqlDatabaseThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the SQL database under an existing Azure Cosmos DB database account with the provided name. */
  getSqlDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesGetSqlDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Merges the partitions of a SQL database */
  sqlDatabasePartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
  /** @deprecated use sqlDatabasePartitionMerge instead */
  beginSqlDatabasePartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionStorageInfoCollection>,
      PhysicalPartitionStorageInfoCollection
    >
  >;
  /** @deprecated use sqlDatabasePartitionMerge instead */
  beginSqlDatabasePartitionMergeAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
  ) => Promise<PhysicalPartitionStorageInfoCollection>;
  /** Lists the SQL databases under an existing Azure Cosmos DB database account. */
  listSqlDatabases: (
    resourceGroupName: string,
    accountName: string,
    options?: SqlResourcesListSqlDatabasesOptionalParams,
  ) => PagedAsyncIterableIterator<SqlDatabaseGetResults>;
  /** Deletes an existing Azure Cosmos DB SQL database. */
  deleteSqlDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSqlDatabase instead */
  beginDeleteSqlDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSqlDatabase instead */
  beginDeleteSqlDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB SQL database */
  createUpdateSqlDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
  ) => PollerLike<OperationState<SqlDatabaseGetResults>, SqlDatabaseGetResults>;
  /** @deprecated use createUpdateSqlDatabase instead */
  beginCreateUpdateSqlDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlDatabaseGetResults>, SqlDatabaseGetResults>>;
  /** @deprecated use createUpdateSqlDatabase instead */
  beginCreateUpdateSqlDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
    options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
  ) => Promise<SqlDatabaseGetResults>;
  /** Gets the SQL database under an existing Azure Cosmos DB database account with the provided name. */
  getSqlDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: SqlResourcesGetSqlDatabaseOptionalParams,
  ) => Promise<SqlDatabaseGetResults>;
}

function _getSqlResources(context: CosmosDBManagementContext) {
  return {
    listSqlRoleAssignments: (
      resourceGroupName: string,
      accountName: string,
      options?: SqlResourcesListSqlRoleAssignmentsOptionalParams,
    ) => listSqlRoleAssignments(context, resourceGroupName, accountName, options),
    deleteSqlRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
    ) =>
      deleteSqlRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    beginDeleteSqlRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
    ) => {
      const poller = deleteSqlRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: SqlResourcesDeleteSqlRoleAssignmentOptionalParams,
    ) => {
      return await deleteSqlRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      );
    },
    createUpdateSqlRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
    ) =>
      createUpdateSqlRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateSqlRoleAssignmentParameters,
        options,
      ),
    beginCreateUpdateSqlRoleAssignment: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
    ) => {
      const poller = createUpdateSqlRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateSqlRoleAssignmentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlRoleAssignmentAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams,
    ) => {
      return await createUpdateSqlRoleAssignment(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        createUpdateSqlRoleAssignmentParameters,
        options,
      );
    },
    getSqlRoleAssignment: (
      resourceGroupName: string,
      accountName: string,
      roleAssignmentId: string,
      options?: SqlResourcesGetSqlRoleAssignmentOptionalParams,
    ) => getSqlRoleAssignment(context, resourceGroupName, accountName, roleAssignmentId, options),
    listSqlRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: SqlResourcesListSqlRoleDefinitionsOptionalParams,
    ) => listSqlRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteSqlRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
    ) =>
      deleteSqlRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
    beginDeleteSqlRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteSqlRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: SqlResourcesDeleteSqlRoleDefinitionOptionalParams,
    ) => {
      return await deleteSqlRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      );
    },
    createUpdateSqlRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
    ) =>
      createUpdateSqlRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateSqlRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateSqlRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateSqlRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateSqlRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateSqlRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        createUpdateSqlRoleDefinitionParameters,
        options,
      );
    },
    getSqlRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      roleDefinitionId: string,
      options?: SqlResourcesGetSqlRoleDefinitionOptionalParams,
    ) => getSqlRoleDefinition(context, resourceGroupName, accountName, roleDefinitionId, options),
    listSqlTriggers: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesListSqlTriggersOptionalParams,
    ) =>
      listSqlTriggers(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    deleteSqlTrigger: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      options?: SqlResourcesDeleteSqlTriggerOptionalParams,
    ) =>
      deleteSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        options,
      ),
    beginDeleteSqlTrigger: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      options?: SqlResourcesDeleteSqlTriggerOptionalParams,
    ) => {
      const poller = deleteSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlTriggerAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      options?: SqlResourcesDeleteSqlTriggerOptionalParams,
    ) => {
      return await deleteSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        options,
      );
    },
    createUpdateSqlTrigger: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
    ) =>
      createUpdateSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        createUpdateSqlTriggerParameters,
        options,
      ),
    beginCreateUpdateSqlTrigger: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
    ) => {
      const poller = createUpdateSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        createUpdateSqlTriggerParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlTriggerAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlTriggerOptionalParams,
    ) => {
      return await createUpdateSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        createUpdateSqlTriggerParameters,
        options,
      );
    },
    getSqlTrigger: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      triggerName: string,
      options?: SqlResourcesGetSqlTriggerOptionalParams,
    ) =>
      getSqlTrigger(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        options,
      ),
    listSqlUserDefinedFunctions: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesListSqlUserDefinedFunctionsOptionalParams,
    ) =>
      listSqlUserDefinedFunctions(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    deleteSqlUserDefinedFunction: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
    ) =>
      deleteSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        options,
      ),
    beginDeleteSqlUserDefinedFunction: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
    ) => {
      const poller = deleteSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlUserDefinedFunctionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      options?: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams,
    ) => {
      return await deleteSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        options,
      );
    },
    createUpdateSqlUserDefinedFunction: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
    ) =>
      createUpdateSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        createUpdateSqlUserDefinedFunctionParameters,
        options,
      ),
    beginCreateUpdateSqlUserDefinedFunction: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
    ) => {
      const poller = createUpdateSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        createUpdateSqlUserDefinedFunctionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlUserDefinedFunctionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams,
    ) => {
      return await createUpdateSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        createUpdateSqlUserDefinedFunctionParameters,
        options,
      );
    },
    getSqlUserDefinedFunction: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      userDefinedFunctionName: string,
      options?: SqlResourcesGetSqlUserDefinedFunctionOptionalParams,
    ) =>
      getSqlUserDefinedFunction(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        userDefinedFunctionName,
        options,
      ),
    listSqlStoredProcedures: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesListSqlStoredProceduresOptionalParams,
    ) =>
      listSqlStoredProcedures(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    deleteSqlStoredProcedure: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
    ) =>
      deleteSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        options,
      ),
    beginDeleteSqlStoredProcedure: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
    ) => {
      const poller = deleteSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlStoredProcedureAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      options?: SqlResourcesDeleteSqlStoredProcedureOptionalParams,
    ) => {
      return await deleteSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        options,
      );
    },
    createUpdateSqlStoredProcedure: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
    ) =>
      createUpdateSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        createUpdateSqlStoredProcedureParameters,
        options,
      ),
    beginCreateUpdateSqlStoredProcedure: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
    ) => {
      const poller = createUpdateSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        createUpdateSqlStoredProcedureParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlStoredProcedureAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams,
    ) => {
      return await createUpdateSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        createUpdateSqlStoredProcedureParameters,
        options,
      );
    },
    getSqlStoredProcedure: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      storedProcedureName: string,
      options?: SqlResourcesGetSqlStoredProcedureOptionalParams,
    ) =>
      getSqlStoredProcedure(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        storedProcedureName,
        options,
      ),
    retrieveContinuousBackupInformation: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      location: ContinuousBackupRestoreLocation,
      options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) =>
      retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        location,
        options,
      ),
    beginRetrieveContinuousBackupInformation: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      location: ContinuousBackupRestoreLocation,
      options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      const poller = retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
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
      containerName: string,
      location: ContinuousBackupRestoreLocation,
      options?: SqlResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      return await retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        location,
        options,
      );
    },
    listSqlContainerPartitionMerge: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
    ) =>
      listSqlContainerPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        mergeParameters,
        options,
      ),
    beginListSqlContainerPartitionMerge: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
    ) => {
      const poller = listSqlContainerPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        mergeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListSqlContainerPartitionMergeAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesListSqlContainerPartitionMergeOptionalParams,
    ) => {
      return await listSqlContainerPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        mergeParameters,
        options,
      );
    },
    listSqlContainers: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesListSqlContainersOptionalParams,
    ) => listSqlContainers(context, resourceGroupName, accountName, databaseName, options),
    deleteSqlContainer: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesDeleteSqlContainerOptionalParams,
    ) =>
      deleteSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    beginDeleteSqlContainer: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesDeleteSqlContainerOptionalParams,
    ) => {
      const poller = deleteSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlContainerAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesDeleteSqlContainerOptionalParams,
    ) => {
      return await deleteSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
    },
    createUpdateSqlContainer: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
    ) =>
      createUpdateSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        createUpdateSqlContainerParameters,
        options,
      ),
    beginCreateUpdateSqlContainer: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
    ) => {
      const poller = createUpdateSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        createUpdateSqlContainerParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlContainerAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlContainerOptionalParams,
    ) => {
      return await createUpdateSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        createUpdateSqlContainerParameters,
        options,
      );
    },
    getSqlContainer: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesGetSqlContainerOptionalParams,
    ) =>
      getSqlContainer(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    listClientEncryptionKeys: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesListClientEncryptionKeysOptionalParams,
    ) => listClientEncryptionKeys(context, resourceGroupName, accountName, databaseName, options),
    createUpdateClientEncryptionKey: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      clientEncryptionKeyName: string,
      createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
    ) =>
      createUpdateClientEncryptionKey(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        clientEncryptionKeyName,
        createUpdateClientEncryptionKeyParameters,
        options,
      ),
    beginCreateUpdateClientEncryptionKey: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      clientEncryptionKeyName: string,
      createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
    ) => {
      const poller = createUpdateClientEncryptionKey(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        clientEncryptionKeyName,
        createUpdateClientEncryptionKeyParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateClientEncryptionKeyAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      clientEncryptionKeyName: string,
      createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams,
    ) => {
      return await createUpdateClientEncryptionKey(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        clientEncryptionKeyName,
        createUpdateClientEncryptionKeyParameters,
        options,
      );
    },
    getClientEncryptionKey: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      clientEncryptionKeyName: string,
      options?: SqlResourcesGetClientEncryptionKeyOptionalParams,
    ) =>
      getClientEncryptionKey(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        clientEncryptionKeyName,
        options,
      ),
    sqlContainerRedistributeThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
    ) =>
      sqlContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        redistributeThroughputParameters,
        options,
      ),
    beginSqlContainerRedistributeThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
    ) => {
      const poller = sqlContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        redistributeThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSqlContainerRedistributeThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlContainerRedistributeThroughputOptionalParams,
    ) => {
      return await sqlContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        redistributeThroughputParameters,
        options,
      );
    },
    sqlContainerRetrieveThroughputDistribution: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
    ) =>
      sqlContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        retrieveThroughputParameters,
        options,
      ),
    beginSqlContainerRetrieveThroughputDistribution: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
    ) => {
      const poller = sqlContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        retrieveThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSqlContainerRetrieveThroughputDistributionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams,
    ) => {
      return await sqlContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        retrieveThroughputParameters,
        options,
      );
    },
    migrateSqlContainerToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
    ) =>
      migrateSqlContainerToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    beginMigrateSqlContainerToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
    ) => {
      const poller = migrateSqlContainerToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateSqlContainerToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams,
    ) => {
      return await migrateSqlContainerToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
    },
    migrateSqlContainerToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
    ) =>
      migrateSqlContainerToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    beginMigrateSqlContainerToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
    ) => {
      const poller = migrateSqlContainerToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateSqlContainerToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams,
    ) => {
      return await migrateSqlContainerToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      );
    },
    updateSqlContainerThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
    ) =>
      updateSqlContainerThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateSqlContainerThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
    ) => {
      const poller = updateSqlContainerThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateSqlContainerThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlContainerThroughputOptionalParams,
    ) => {
      return await updateSqlContainerThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        updateThroughputParameters,
        options,
      );
    },
    getSqlContainerThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SqlResourcesGetSqlContainerThroughputOptionalParams,
    ) =>
      getSqlContainerThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    sqlDatabaseRedistributeThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
    ) =>
      sqlDatabaseRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        redistributeThroughputParameters,
        options,
      ),
    beginSqlDatabaseRedistributeThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
    ) => {
      const poller = sqlDatabaseRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        redistributeThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSqlDatabaseRedistributeThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams,
    ) => {
      return await sqlDatabaseRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        redistributeThroughputParameters,
        options,
      );
    },
    sqlDatabaseRetrieveThroughputDistribution: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
    ) =>
      sqlDatabaseRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        retrieveThroughputParameters,
        options,
      ),
    beginSqlDatabaseRetrieveThroughputDistribution: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
    ) => {
      const poller = sqlDatabaseRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        retrieveThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSqlDatabaseRetrieveThroughputDistributionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams,
    ) => {
      return await sqlDatabaseRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        retrieveThroughputParameters,
        options,
      );
    },
    migrateSqlDatabaseToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
    ) =>
      migrateSqlDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      ),
    beginMigrateSqlDatabaseToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
    ) => {
      const poller = migrateSqlDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateSqlDatabaseToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams,
    ) => {
      return await migrateSqlDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    migrateSqlDatabaseToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
    ) =>
      migrateSqlDatabaseToAutoscale(context, resourceGroupName, accountName, databaseName, options),
    beginMigrateSqlDatabaseToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
    ) => {
      const poller = migrateSqlDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateSqlDatabaseToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams,
    ) => {
      return await migrateSqlDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    updateSqlDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
    ) =>
      updateSqlDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateSqlDatabaseThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
    ) => {
      const poller = updateSqlDatabaseThroughput(
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
    beginUpdateSqlDatabaseThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams,
    ) => {
      return await updateSqlDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      );
    },
    getSqlDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesGetSqlDatabaseThroughputOptionalParams,
    ) => getSqlDatabaseThroughput(context, resourceGroupName, accountName, databaseName, options),
    sqlDatabasePartitionMerge: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
    ) =>
      sqlDatabasePartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        mergeParameters,
        options,
      ),
    beginSqlDatabasePartitionMerge: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
    ) => {
      const poller = sqlDatabasePartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        mergeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSqlDatabasePartitionMergeAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: SqlResourcesSqlDatabasePartitionMergeOptionalParams,
    ) => {
      return await sqlDatabasePartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        mergeParameters,
        options,
      );
    },
    listSqlDatabases: (
      resourceGroupName: string,
      accountName: string,
      options?: SqlResourcesListSqlDatabasesOptionalParams,
    ) => listSqlDatabases(context, resourceGroupName, accountName, options),
    deleteSqlDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
    ) => deleteSqlDatabase(context, resourceGroupName, accountName, databaseName, options),
    beginDeleteSqlDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
    ) => {
      const poller = deleteSqlDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSqlDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesDeleteSqlDatabaseOptionalParams,
    ) => {
      return await deleteSqlDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    createUpdateSqlDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
    ) =>
      createUpdateSqlDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateSqlDatabaseParameters,
        options,
      ),
    beginCreateUpdateSqlDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
    ) => {
      const poller = createUpdateSqlDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateSqlDatabaseParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateSqlDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
      options?: SqlResourcesCreateUpdateSqlDatabaseOptionalParams,
    ) => {
      return await createUpdateSqlDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateSqlDatabaseParameters,
        options,
      );
    },
    getSqlDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: SqlResourcesGetSqlDatabaseOptionalParams,
    ) => getSqlDatabase(context, resourceGroupName, accountName, databaseName, options),
  };
}

export function _getSqlResourcesOperations(
  context: CosmosDBManagementContext,
): SqlResourcesOperations {
  return {
    ..._getSqlResources(context),
  };
}
