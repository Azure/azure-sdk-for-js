// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listMongoUserDefinitions,
  deleteMongoUserDefinition,
  createUpdateMongoUserDefinition,
  getMongoUserDefinition,
  listMongoRoleDefinitions,
  deleteMongoRoleDefinition,
  createUpdateMongoRoleDefinition,
  getMongoRoleDefinition,
  retrieveContinuousBackupInformation,
  listMongoDBCollectionPartitionMerge,
  listMongoDBCollections,
  deleteMongoDBCollection,
  createUpdateMongoDBCollection,
  getMongoDBCollection,
  mongoDBDatabasePartitionMerge,
  listMongoDBDatabases,
  deleteMongoDBDatabase,
  createUpdateMongoDBDatabase,
  getMongoDBDatabase,
  migrateMongoDBCollectionToManualThroughput,
  migrateMongoDBCollectionToAutoscale,
  mongoDBContainerRedistributeThroughput,
  mongoDBContainerRetrieveThroughputDistribution,
  updateMongoDBCollectionThroughput,
  getMongoDBCollectionThroughput,
  mongoDBDatabaseRedistributeThroughput,
  mongoDBDatabaseRetrieveThroughputDistribution,
  migrateMongoDBDatabaseToManualThroughput,
  migrateMongoDBDatabaseToAutoscale,
  updateMongoDBDatabaseThroughput,
  getMongoDBDatabaseThroughput,
} from "../../api/mongoDBResources/operations.js";
import type {
  MongoDBResourcesListMongoUserDefinitionsOptionalParams,
  MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
  MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
  MongoDBResourcesGetMongoUserDefinitionOptionalParams,
  MongoDBResourcesListMongoRoleDefinitionsOptionalParams,
  MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
  MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
  MongoDBResourcesGetMongoRoleDefinitionOptionalParams,
  MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
  MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
  MongoDBResourcesListMongoDBCollectionsOptionalParams,
  MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
  MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
  MongoDBResourcesGetMongoDBCollectionOptionalParams,
  MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
  MongoDBResourcesListMongoDBDatabasesOptionalParams,
  MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
  MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
  MongoDBResourcesGetMongoDBDatabaseOptionalParams,
  MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
  MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
  MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
  MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
  MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
  MongoDBResourcesGetMongoDBCollectionThroughputOptionalParams,
  MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
  MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
  MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
  MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
  MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
  MongoDBResourcesGetMongoDBDatabaseThroughputOptionalParams,
} from "../../api/mongoDBResources/options.js";
import type {
  MergeParameters,
  PhysicalPartitionStorageInfoCollection,
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  RetrieveThroughputParameters,
  PhysicalPartitionThroughputInfoResult,
  RedistributeThroughputParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  MongoDBDatabaseGetResults,
  MongoDBDatabaseCreateUpdateParameters,
  MongoDBCollectionGetResults,
  MongoDBCollectionCreateUpdateParameters,
  MongoRoleDefinitionGetResults,
  MongoRoleDefinitionCreateUpdateParameters,
  MongoUserDefinitionGetResults,
  MongoUserDefinitionCreateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MongoDBResources operations. */
export interface MongoDBResourcesOperations {
  /** Retrieves the list of all Azure Cosmos DB Mongo User Definition. */
  listMongoUserDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: MongoDBResourcesListMongoUserDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MongoUserDefinitionGetResults>;
  /** Deletes an existing Azure Cosmos DB Mongo User Definition. */
  deleteMongoUserDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoUserDefinition instead */
  beginDeleteMongoUserDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoUserDefinition instead */
  beginDeleteMongoUserDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Mongo User Definition. */
  createUpdateMongoUserDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
  ) => PollerLike<OperationState<MongoUserDefinitionGetResults>, MongoUserDefinitionGetResults>;
  /** @deprecated use createUpdateMongoUserDefinition instead */
  beginCreateUpdateMongoUserDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoUserDefinitionGetResults>, MongoUserDefinitionGetResults>
  >;
  /** @deprecated use createUpdateMongoUserDefinition instead */
  beginCreateUpdateMongoUserDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
  ) => Promise<MongoUserDefinitionGetResults>;
  /** Retrieves the properties of an existing Azure Cosmos DB Mongo User Definition with the given Id. */
  getMongoUserDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoUserDefinitionId: string,
    options?: MongoDBResourcesGetMongoUserDefinitionOptionalParams,
  ) => Promise<MongoUserDefinitionGetResults>;
  /** Retrieves the list of all Azure Cosmos DB Mongo Role Definitions. */
  listMongoRoleDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: MongoDBResourcesListMongoRoleDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MongoRoleDefinitionGetResults>;
  /** Deletes an existing Azure Cosmos DB Mongo Role Definition. */
  deleteMongoRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoRoleDefinition instead */
  beginDeleteMongoRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoRoleDefinition instead */
  beginDeleteMongoRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB Mongo Role Definition. */
  createUpdateMongoRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
  ) => PollerLike<OperationState<MongoRoleDefinitionGetResults>, MongoRoleDefinitionGetResults>;
  /** @deprecated use createUpdateMongoRoleDefinition instead */
  beginCreateUpdateMongoRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoRoleDefinitionGetResults>, MongoRoleDefinitionGetResults>
  >;
  /** @deprecated use createUpdateMongoRoleDefinition instead */
  beginCreateUpdateMongoRoleDefinitionAndWait: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
  ) => Promise<MongoRoleDefinitionGetResults>;
  /** Retrieves the properties of an existing Azure Cosmos DB Mongo Role Definition with the given Id. */
  getMongoRoleDefinition: (
    resourceGroupName: string,
    accountName: string,
    mongoRoleDefinitionId: string,
    options?: MongoDBResourcesGetMongoRoleDefinitionOptionalParams,
  ) => Promise<MongoRoleDefinitionGetResults>;
  /** Retrieves continuous backup information for a Mongodb collection. */
  retrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    location: ContinuousBackupRestoreLocation,
    options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => PollerLike<OperationState<BackupInformation>, BackupInformation>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformation: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    location: ContinuousBackupRestoreLocation,
    options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BackupInformation>, BackupInformation>>;
  /** @deprecated use retrieveContinuousBackupInformation instead */
  beginRetrieveContinuousBackupInformationAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    location: ContinuousBackupRestoreLocation,
    options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
  ) => Promise<BackupInformation>;
  /** Merges the partitions of a MongoDB Collection */
  listMongoDBCollectionPartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
  /** @deprecated use listMongoDBCollectionPartitionMerge instead */
  beginListMongoDBCollectionPartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionStorageInfoCollection>,
      PhysicalPartitionStorageInfoCollection
    >
  >;
  /** @deprecated use listMongoDBCollectionPartitionMerge instead */
  beginListMongoDBCollectionPartitionMergeAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
  ) => Promise<PhysicalPartitionStorageInfoCollection>;
  /** Lists the MongoDB collection under an existing Azure Cosmos DB database account. */
  listMongoDBCollections: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesListMongoDBCollectionsOptionalParams,
  ) => PagedAsyncIterableIterator<MongoDBCollectionGetResults>;
  /** Deletes an existing Azure Cosmos DB MongoDB Collection. */
  deleteMongoDBCollection: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoDBCollection instead */
  beginDeleteMongoDBCollection: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoDBCollection instead */
  beginDeleteMongoDBCollectionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB MongoDB Collection */
  createUpdateMongoDBCollection: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
  ) => PollerLike<OperationState<MongoDBCollectionGetResults>, MongoDBCollectionGetResults>;
  /** @deprecated use createUpdateMongoDBCollection instead */
  beginCreateUpdateMongoDBCollection: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoDBCollectionGetResults>, MongoDBCollectionGetResults>
  >;
  /** @deprecated use createUpdateMongoDBCollection instead */
  beginCreateUpdateMongoDBCollectionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
  ) => Promise<MongoDBCollectionGetResults>;
  /** Gets the MongoDB collection under an existing Azure Cosmos DB database account. */
  getMongoDBCollection: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesGetMongoDBCollectionOptionalParams,
  ) => Promise<MongoDBCollectionGetResults>;
  /** Merges the partitions of a MongoDB database */
  mongoDBDatabasePartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
  /** @deprecated use mongoDBDatabasePartitionMerge instead */
  beginMongoDBDatabasePartitionMerge: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionStorageInfoCollection>,
      PhysicalPartitionStorageInfoCollection
    >
  >;
  /** @deprecated use mongoDBDatabasePartitionMerge instead */
  beginMongoDBDatabasePartitionMergeAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    mergeParameters: MergeParameters,
    options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
  ) => Promise<PhysicalPartitionStorageInfoCollection>;
  /** Lists the MongoDB databases under an existing Azure Cosmos DB database account. */
  listMongoDBDatabases: (
    resourceGroupName: string,
    accountName: string,
    options?: MongoDBResourcesListMongoDBDatabasesOptionalParams,
  ) => PagedAsyncIterableIterator<MongoDBDatabaseGetResults>;
  /** Deletes an existing Azure Cosmos DB MongoDB database. */
  deleteMongoDBDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMongoDBDatabase instead */
  beginDeleteMongoDBDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMongoDBDatabase instead */
  beginDeleteMongoDBDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
  ) => Promise<void>;
  /** Create or updates Azure Cosmos DB MongoDB database */
  createUpdateMongoDBDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
  ) => PollerLike<OperationState<MongoDBDatabaseGetResults>, MongoDBDatabaseGetResults>;
  /** @deprecated use createUpdateMongoDBDatabase instead */
  beginCreateUpdateMongoDBDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MongoDBDatabaseGetResults>, MongoDBDatabaseGetResults>
  >;
  /** @deprecated use createUpdateMongoDBDatabase instead */
  beginCreateUpdateMongoDBDatabaseAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
    options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
  ) => Promise<MongoDBDatabaseGetResults>;
  /** Gets the MongoDB databases under an existing Azure Cosmos DB database account with the provided name. */
  getMongoDBDatabase: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesGetMongoDBDatabaseOptionalParams,
  ) => Promise<MongoDBDatabaseGetResults>;
  /** Migrate an Azure Cosmos DB MongoDB collection from autoscale to manual throughput */
  migrateMongoDBCollectionToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateMongoDBCollectionToManualThroughput instead */
  beginMigrateMongoDBCollectionToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateMongoDBCollectionToManualThroughput instead */
  beginMigrateMongoDBCollectionToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB MongoDB collection from manual throughput to autoscale */
  migrateMongoDBCollectionToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateMongoDBCollectionToAutoscale instead */
  beginMigrateMongoDBCollectionToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateMongoDBCollectionToAutoscale instead */
  beginMigrateMongoDBCollectionToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Redistribute throughput for an Azure Cosmos DB MongoDB container */
  mongoDBContainerRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use mongoDBContainerRedistributeThroughput instead */
  beginMongoDBContainerRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use mongoDBContainerRedistributeThroughput instead */
  beginMongoDBContainerRedistributeThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Retrieve throughput distribution for an Azure Cosmos DB MongoDB container */
  mongoDBContainerRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use mongoDBContainerRetrieveThroughputDistribution instead */
  beginMongoDBContainerRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use mongoDBContainerRetrieveThroughputDistribution instead */
  beginMongoDBContainerRetrieveThroughputDistributionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Update the RUs per second of an Azure Cosmos DB MongoDB collection */
  updateMongoDBCollectionThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateMongoDBCollectionThroughput instead */
  beginUpdateMongoDBCollectionThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateMongoDBCollectionThroughput instead */
  beginUpdateMongoDBCollectionThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account with the provided name. */
  getMongoDBCollectionThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: MongoDBResourcesGetMongoDBCollectionThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Redistribute throughput for an Azure Cosmos DB MongoDB database */
  mongoDBDatabaseRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use mongoDBDatabaseRedistributeThroughput instead */
  beginMongoDBDatabaseRedistributeThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use mongoDBDatabaseRedistributeThroughput instead */
  beginMongoDBDatabaseRedistributeThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    redistributeThroughputParameters: RedistributeThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Retrieve throughput distribution for an Azure Cosmos DB MongoDB database */
  mongoDBDatabaseRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
  /** @deprecated use mongoDBDatabaseRetrieveThroughputDistribution instead */
  beginMongoDBDatabaseRetrieveThroughputDistribution: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PhysicalPartitionThroughputInfoResult>,
      PhysicalPartitionThroughputInfoResult
    >
  >;
  /** @deprecated use mongoDBDatabaseRetrieveThroughputDistribution instead */
  beginMongoDBDatabaseRetrieveThroughputDistributionAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    retrieveThroughputParameters: RetrieveThroughputParameters,
    options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
  ) => Promise<PhysicalPartitionThroughputInfoResult>;
  /** Migrate an Azure Cosmos DB MongoDB database from autoscale to manual throughput */
  migrateMongoDBDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateMongoDBDatabaseToManualThroughput instead */
  beginMigrateMongoDBDatabaseToManualThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateMongoDBDatabaseToManualThroughput instead */
  beginMigrateMongoDBDatabaseToManualThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Migrate an Azure Cosmos DB MongoDB database from manual throughput to autoscale */
  migrateMongoDBDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use migrateMongoDBDatabaseToAutoscale instead */
  beginMigrateMongoDBDatabaseToAutoscale: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use migrateMongoDBDatabaseToAutoscale instead */
  beginMigrateMongoDBDatabaseToAutoscaleAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Update RUs per second of the an Azure Cosmos DB MongoDB database */
  updateMongoDBDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
  ) => PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
  /** @deprecated use updateMongoDBDatabaseThroughput instead */
  beginUpdateMongoDBDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>
  >;
  /** @deprecated use updateMongoDBDatabaseThroughput instead */
  beginUpdateMongoDBDatabaseThroughputAndWait: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
  /** Gets the RUs per second of the MongoDB database under an existing Azure Cosmos DB database account with the provided name. */
  getMongoDBDatabaseThroughput: (
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: MongoDBResourcesGetMongoDBDatabaseThroughputOptionalParams,
  ) => Promise<ThroughputSettingsGetResults>;
}

function _getMongoDBResources(context: CosmosDBManagementContext) {
  return {
    listMongoUserDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: MongoDBResourcesListMongoUserDefinitionsOptionalParams,
    ) => listMongoUserDefinitions(context, resourceGroupName, accountName, options),
    deleteMongoUserDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
    ) =>
      deleteMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        options,
      ),
    beginDeleteMongoUserDefinition: async (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
    ) => {
      const poller = deleteMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoUserDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams,
    ) => {
      return await deleteMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        options,
      );
    },
    createUpdateMongoUserDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
    ) =>
      createUpdateMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        createUpdateMongoUserDefinitionParameters,
        options,
      ),
    beginCreateUpdateMongoUserDefinition: async (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
    ) => {
      const poller = createUpdateMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        createUpdateMongoUserDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoUserDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams,
    ) => {
      return await createUpdateMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        createUpdateMongoUserDefinitionParameters,
        options,
      );
    },
    getMongoUserDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoUserDefinitionId: string,
      options?: MongoDBResourcesGetMongoUserDefinitionOptionalParams,
    ) =>
      getMongoUserDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoUserDefinitionId,
        options,
      ),
    listMongoRoleDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: MongoDBResourcesListMongoRoleDefinitionsOptionalParams,
    ) => listMongoRoleDefinitions(context, resourceGroupName, accountName, options),
    deleteMongoRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
    ) =>
      deleteMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        options,
      ),
    beginDeleteMongoRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
    ) => {
      const poller = deleteMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      options?: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams,
    ) => {
      return await deleteMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        options,
      );
    },
    createUpdateMongoRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
    ) =>
      createUpdateMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        createUpdateMongoRoleDefinitionParameters,
        options,
      ),
    beginCreateUpdateMongoRoleDefinition: async (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
    ) => {
      const poller = createUpdateMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        createUpdateMongoRoleDefinitionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoRoleDefinitionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams,
    ) => {
      return await createUpdateMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        createUpdateMongoRoleDefinitionParameters,
        options,
      );
    },
    getMongoRoleDefinition: (
      resourceGroupName: string,
      accountName: string,
      mongoRoleDefinitionId: string,
      options?: MongoDBResourcesGetMongoRoleDefinitionOptionalParams,
    ) =>
      getMongoRoleDefinition(
        context,
        resourceGroupName,
        accountName,
        mongoRoleDefinitionId,
        options,
      ),
    retrieveContinuousBackupInformation: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      location: ContinuousBackupRestoreLocation,
      options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) =>
      retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        location,
        options,
      ),
    beginRetrieveContinuousBackupInformation: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      location: ContinuousBackupRestoreLocation,
      options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      const poller = retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
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
      collectionName: string,
      location: ContinuousBackupRestoreLocation,
      options?: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams,
    ) => {
      return await retrieveContinuousBackupInformation(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        location,
        options,
      );
    },
    listMongoDBCollectionPartitionMerge: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
    ) =>
      listMongoDBCollectionPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        mergeParameters,
        options,
      ),
    beginListMongoDBCollectionPartitionMerge: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
    ) => {
      const poller = listMongoDBCollectionPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        mergeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListMongoDBCollectionPartitionMergeAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams,
    ) => {
      return await listMongoDBCollectionPartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        mergeParameters,
        options,
      );
    },
    listMongoDBCollections: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesListMongoDBCollectionsOptionalParams,
    ) => listMongoDBCollections(context, resourceGroupName, accountName, databaseName, options),
    deleteMongoDBCollection: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
    ) =>
      deleteMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    beginDeleteMongoDBCollection: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
    ) => {
      const poller = deleteMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoDBCollectionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesDeleteMongoDBCollectionOptionalParams,
    ) => {
      return await deleteMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
    },
    createUpdateMongoDBCollection: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
    ) =>
      createUpdateMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        createUpdateMongoDBCollectionParameters,
        options,
      ),
    beginCreateUpdateMongoDBCollection: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
    ) => {
      const poller = createUpdateMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        createUpdateMongoDBCollectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoDBCollectionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams,
    ) => {
      return await createUpdateMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        createUpdateMongoDBCollectionParameters,
        options,
      );
    },
    getMongoDBCollection: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesGetMongoDBCollectionOptionalParams,
    ) =>
      getMongoDBCollection(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    mongoDBDatabasePartitionMerge: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
    ) =>
      mongoDBDatabasePartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        mergeParameters,
        options,
      ),
    beginMongoDBDatabasePartitionMerge: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
    ) => {
      const poller = mongoDBDatabasePartitionMerge(
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
    beginMongoDBDatabasePartitionMergeAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      mergeParameters: MergeParameters,
      options?: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams,
    ) => {
      return await mongoDBDatabasePartitionMerge(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        mergeParameters,
        options,
      );
    },
    listMongoDBDatabases: (
      resourceGroupName: string,
      accountName: string,
      options?: MongoDBResourcesListMongoDBDatabasesOptionalParams,
    ) => listMongoDBDatabases(context, resourceGroupName, accountName, options),
    deleteMongoDBDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
    ) => deleteMongoDBDatabase(context, resourceGroupName, accountName, databaseName, options),
    beginDeleteMongoDBDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
    ) => {
      const poller = deleteMongoDBDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMongoDBDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams,
    ) => {
      return await deleteMongoDBDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    createUpdateMongoDBDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
    ) =>
      createUpdateMongoDBDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateMongoDBDatabaseParameters,
        options,
      ),
    beginCreateUpdateMongoDBDatabase: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
    ) => {
      const poller = createUpdateMongoDBDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateMongoDBDatabaseParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateMongoDBDatabaseAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
      options?: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams,
    ) => {
      return await createUpdateMongoDBDatabase(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateMongoDBDatabaseParameters,
        options,
      );
    },
    getMongoDBDatabase: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesGetMongoDBDatabaseOptionalParams,
    ) => getMongoDBDatabase(context, resourceGroupName, accountName, databaseName, options),
    migrateMongoDBCollectionToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
    ) =>
      migrateMongoDBCollectionToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    beginMigrateMongoDBCollectionToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
    ) => {
      const poller = migrateMongoDBCollectionToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateMongoDBCollectionToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams,
    ) => {
      return await migrateMongoDBCollectionToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
    },
    migrateMongoDBCollectionToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
    ) =>
      migrateMongoDBCollectionToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    beginMigrateMongoDBCollectionToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
    ) => {
      const poller = migrateMongoDBCollectionToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateMongoDBCollectionToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams,
    ) => {
      return await migrateMongoDBCollectionToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      );
    },
    mongoDBContainerRedistributeThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
    ) =>
      mongoDBContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        redistributeThroughputParameters,
        options,
      ),
    beginMongoDBContainerRedistributeThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
    ) => {
      const poller = mongoDBContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        redistributeThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMongoDBContainerRedistributeThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams,
    ) => {
      return await mongoDBContainerRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        redistributeThroughputParameters,
        options,
      );
    },
    mongoDBContainerRetrieveThroughputDistribution: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
    ) =>
      mongoDBContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        retrieveThroughputParameters,
        options,
      ),
    beginMongoDBContainerRetrieveThroughputDistribution: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
    ) => {
      const poller = mongoDBContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        retrieveThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMongoDBContainerRetrieveThroughputDistributionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams,
    ) => {
      return await mongoDBContainerRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        retrieveThroughputParameters,
        options,
      );
    },
    updateMongoDBCollectionThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
    ) =>
      updateMongoDBCollectionThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateMongoDBCollectionThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
    ) => {
      const poller = updateMongoDBCollectionThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        updateThroughputParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateMongoDBCollectionThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams,
    ) => {
      return await updateMongoDBCollectionThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        updateThroughputParameters,
        options,
      );
    },
    getMongoDBCollectionThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      collectionName: string,
      options?: MongoDBResourcesGetMongoDBCollectionThroughputOptionalParams,
    ) =>
      getMongoDBCollectionThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    mongoDBDatabaseRedistributeThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
    ) =>
      mongoDBDatabaseRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        redistributeThroughputParameters,
        options,
      ),
    beginMongoDBDatabaseRedistributeThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
    ) => {
      const poller = mongoDBDatabaseRedistributeThroughput(
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
    beginMongoDBDatabaseRedistributeThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      redistributeThroughputParameters: RedistributeThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams,
    ) => {
      return await mongoDBDatabaseRedistributeThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        redistributeThroughputParameters,
        options,
      );
    },
    mongoDBDatabaseRetrieveThroughputDistribution: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
    ) =>
      mongoDBDatabaseRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        retrieveThroughputParameters,
        options,
      ),
    beginMongoDBDatabaseRetrieveThroughputDistribution: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
    ) => {
      const poller = mongoDBDatabaseRetrieveThroughputDistribution(
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
    beginMongoDBDatabaseRetrieveThroughputDistributionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      retrieveThroughputParameters: RetrieveThroughputParameters,
      options?: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams,
    ) => {
      return await mongoDBDatabaseRetrieveThroughputDistribution(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        retrieveThroughputParameters,
        options,
      );
    },
    migrateMongoDBDatabaseToManualThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
    ) =>
      migrateMongoDBDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      ),
    beginMigrateMongoDBDatabaseToManualThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
    ) => {
      const poller = migrateMongoDBDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateMongoDBDatabaseToManualThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams,
    ) => {
      return await migrateMongoDBDatabaseToManualThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    migrateMongoDBDatabaseToAutoscale: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
    ) =>
      migrateMongoDBDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      ),
    beginMigrateMongoDBDatabaseToAutoscale: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
    ) => {
      const poller = migrateMongoDBDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateMongoDBDatabaseToAutoscaleAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams,
    ) => {
      return await migrateMongoDBDatabaseToAutoscale(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        options,
      );
    },
    updateMongoDBDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
    ) =>
      updateMongoDBDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      ),
    beginUpdateMongoDBDatabaseThroughput: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
    ) => {
      const poller = updateMongoDBDatabaseThroughput(
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
    beginUpdateMongoDBDatabaseThroughputAndWait: async (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      updateThroughputParameters: ThroughputSettingsUpdateParameters,
      options?: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams,
    ) => {
      return await updateMongoDBDatabaseThroughput(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        updateThroughputParameters,
        options,
      );
    },
    getMongoDBDatabaseThroughput: (
      resourceGroupName: string,
      accountName: string,
      databaseName: string,
      options?: MongoDBResourcesGetMongoDBDatabaseThroughputOptionalParams,
    ) =>
      getMongoDBDatabaseThroughput(context, resourceGroupName, accountName, databaseName, options),
  };
}

export function _getMongoDBResourcesOperations(
  context: CosmosDBManagementContext,
): MongoDBResourcesOperations {
  return {
    ..._getMongoDBResources(context),
  };
}
