// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
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
  _MongoDBDatabaseListResult,
  MongoDBCollectionGetResults,
  MongoDBCollectionCreateUpdateParameters,
  _MongoDBCollectionListResult,
  MongoRoleDefinitionGetResults,
  MongoRoleDefinitionCreateUpdateParameters,
  _MongoRoleDefinitionListResult,
  MongoUserDefinitionGetResults,
  MongoUserDefinitionCreateUpdateParameters,
  _MongoUserDefinitionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  mergeParametersSerializer,
  physicalPartitionStorageInfoCollectionDeserializer,
  throughputSettingsGetResultsDeserializer,
  throughputSettingsUpdateParametersSerializer,
  retrieveThroughputParametersSerializer,
  physicalPartitionThroughputInfoResultDeserializer,
  redistributeThroughputParametersSerializer,
  continuousBackupRestoreLocationSerializer,
  backupInformationDeserializer,
  mongoDBDatabaseGetResultsDeserializer,
  mongoDBDatabaseCreateUpdateParametersSerializer,
  _mongoDBDatabaseListResultDeserializer,
  mongoDBCollectionGetResultsDeserializer,
  mongoDBCollectionCreateUpdateParametersSerializer,
  _mongoDBCollectionListResultDeserializer,
  mongoRoleDefinitionGetResultsDeserializer,
  mongoRoleDefinitionCreateUpdateParametersSerializer,
  _mongoRoleDefinitionListResultDeserializer,
  mongoUserDefinitionGetResultsDeserializer,
  mongoUserDefinitionCreateUpdateParametersSerializer,
  _mongoUserDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listMongoUserDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoUserDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMongoUserDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoUserDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _mongoUserDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Mongo User Definition. */
export function listMongoUserDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoUserDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoUserDefinitionGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listMongoUserDefinitionsSend(context, resourceGroupName, accountName, options),
    _listMongoUserDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoUserDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  options: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoUserDefinitionId: mongoUserDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMongoUserDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Mongo User Definition. */
export function deleteMongoUserDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  options: MongoDBResourcesDeleteMongoUserDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteMongoUserDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteMongoUserDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          mongoUserDefinitionId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateMongoUserDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoUserDefinitionId: mongoUserDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mongoUserDefinitionCreateUpdateParametersSerializer(
      createUpdateMongoUserDefinitionParameters,
    ),
  });
}

export async function _createUpdateMongoUserDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoUserDefinitionGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mongoUserDefinitionGetResultsDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Mongo User Definition. */
export function createUpdateMongoUserDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoUserDefinitionGetResults>, MongoUserDefinitionGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoUserDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoUserDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          mongoUserDefinitionId,
          createUpdateMongoUserDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoUserDefinitionGetResults>, MongoUserDefinitionGetResults>;
}

export function _getMongoUserDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  options: MongoDBResourcesGetMongoUserDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoUserDefinitionId: mongoUserDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoUserDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoUserDefinitionGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mongoUserDefinitionGetResultsDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Mongo User Definition with the given Id. */
export async function getMongoUserDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoUserDefinitionId: string,
  options: MongoDBResourcesGetMongoUserDefinitionOptionalParams = { requestOptions: {} },
): Promise<MongoUserDefinitionGetResults> {
  const result = await _getMongoUserDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    mongoUserDefinitionId,
    options,
  );
  return _getMongoUserDefinitionDeserialize(result);
}

export function _listMongoRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMongoRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _mongoRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Mongo Role Definitions. */
export function listMongoRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoRoleDefinitionGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listMongoRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listMongoRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  options: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoRoleDefinitionId: mongoRoleDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMongoRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Mongo Role Definition. */
export function deleteMongoRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  options: MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteMongoRoleDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteMongoRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          mongoRoleDefinitionId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateMongoRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoRoleDefinitionId: mongoRoleDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mongoRoleDefinitionCreateUpdateParametersSerializer(
      createUpdateMongoRoleDefinitionParameters,
    ),
  });
}

export async function _createUpdateMongoRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoRoleDefinitionGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mongoRoleDefinitionGetResultsDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Mongo Role Definition. */
export function createUpdateMongoRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoRoleDefinitionGetResults>, MongoRoleDefinitionGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          mongoRoleDefinitionId,
          createUpdateMongoRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoRoleDefinitionGetResults>, MongoRoleDefinitionGetResults>;
}

export function _getMongoRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  options: MongoDBResourcesGetMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      mongoRoleDefinitionId: mongoRoleDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoRoleDefinitionGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mongoRoleDefinitionGetResultsDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Mongo Role Definition with the given Id. */
export async function getMongoRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  mongoRoleDefinitionId: string,
  options: MongoDBResourcesGetMongoRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<MongoRoleDefinitionGetResults> {
  const result = await _getMongoRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    mongoRoleDefinitionId,
    options,
  );
  return _getMongoRoleDefinitionDeserialize(result);
}

export function _retrieveContinuousBackupInformationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  location: ContinuousBackupRestoreLocation,
  options: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/retrieveContinuousBackupInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: continuousBackupRestoreLocationSerializer(location),
  });
}

export async function _retrieveContinuousBackupInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupInformation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return backupInformationDeserializer(result.body);
}

/** Retrieves continuous backup information for a Mongodb collection. */
export function retrieveContinuousBackupInformation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  location: ContinuousBackupRestoreLocation,
  options: MongoDBResourcesRetrieveContinuousBackupInformationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BackupInformation>, BackupInformation> {
  return getLongRunningPoller(
    context,
    _retrieveContinuousBackupInformationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _retrieveContinuousBackupInformationSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          location,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<BackupInformation>, BackupInformation>;
}

export function _listMongoDBCollectionPartitionMergeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  mergeParameters: MergeParameters,
  options: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/partitionMerge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mergeParametersSerializer(mergeParameters),
  });
}

export async function _listMongoDBCollectionPartitionMergeDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionStorageInfoCollection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionStorageInfoCollectionDeserializer(result.body);
}

/** Merges the partitions of a MongoDB Collection */
export function listMongoDBCollectionPartitionMerge(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  mergeParameters: MergeParameters,
  options: MongoDBResourcesListMongoDBCollectionPartitionMergeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionStorageInfoCollection>,
  PhysicalPartitionStorageInfoCollection
> {
  return getLongRunningPoller(
    context,
    _listMongoDBCollectionPartitionMergeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listMongoDBCollectionPartitionMergeSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          mergeParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
}

export function _listMongoDBCollectionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesListMongoDBCollectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMongoDBCollectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoDBCollectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _mongoDBCollectionListResultDeserializer(result.body);
}

/** Lists the MongoDB collection under an existing Azure Cosmos DB database account. */
export function listMongoDBCollections(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesListMongoDBCollectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoDBCollectionGetResults> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMongoDBCollectionsSend(context, resourceGroupName, accountName, databaseName, options),
    _listMongoDBCollectionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoDBCollectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesDeleteMongoDBCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMongoDBCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB MongoDB Collection. */
export function deleteMongoDBCollection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesDeleteMongoDBCollectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteMongoDBCollectionDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteMongoDBCollectionSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        collectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateMongoDBCollectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mongoDBCollectionCreateUpdateParametersSerializer(
      createUpdateMongoDBCollectionParameters,
    ),
  });
}

export async function _createUpdateMongoDBCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoDBCollectionGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoDBCollectionGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB MongoDB Collection */
export function createUpdateMongoDBCollection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoDBCollectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoDBCollectionGetResults>, MongoDBCollectionGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoDBCollectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoDBCollectionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          createUpdateMongoDBCollectionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoDBCollectionGetResults>, MongoDBCollectionGetResults>;
}

export function _getMongoDBCollectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesGetMongoDBCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoDBCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoDBCollectionGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoDBCollectionGetResultsDeserializer(result.body);
}

/** Gets the MongoDB collection under an existing Azure Cosmos DB database account. */
export async function getMongoDBCollection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesGetMongoDBCollectionOptionalParams = { requestOptions: {} },
): Promise<MongoDBCollectionGetResults> {
  const result = await _getMongoDBCollectionSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    collectionName,
    options,
  );
  return _getMongoDBCollectionDeserialize(result);
}

export function _mongoDBDatabasePartitionMergeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  mergeParameters: MergeParameters,
  options: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/partitionMerge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mergeParametersSerializer(mergeParameters),
  });
}

export async function _mongoDBDatabasePartitionMergeDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionStorageInfoCollection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionStorageInfoCollectionDeserializer(result.body);
}

/** Merges the partitions of a MongoDB database */
export function mongoDBDatabasePartitionMerge(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  mergeParameters: MergeParameters,
  options: MongoDBResourcesMongoDBDatabasePartitionMergeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PhysicalPartitionStorageInfoCollection>,
  PhysicalPartitionStorageInfoCollection
> {
  return getLongRunningPoller(
    context,
    _mongoDBDatabasePartitionMergeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _mongoDBDatabasePartitionMergeSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          mergeParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionStorageInfoCollection>,
    PhysicalPartitionStorageInfoCollection
  >;
}

export function _listMongoDBDatabasesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoDBDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMongoDBDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoDBDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _mongoDBDatabaseListResultDeserializer(result.body);
}

/** Lists the MongoDB databases under an existing Azure Cosmos DB database account. */
export function listMongoDBDatabases(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoDBResourcesListMongoDBDatabasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoDBDatabaseGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listMongoDBDatabasesSend(context, resourceGroupName, accountName, options),
    _listMongoDBDatabasesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoDBDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMongoDBDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB MongoDB database. */
export function deleteMongoDBDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesDeleteMongoDBDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteMongoDBDatabaseDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteMongoDBDatabaseSend(context, resourceGroupName, accountName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateMongoDBDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: mongoDBDatabaseCreateUpdateParametersSerializer(createUpdateMongoDBDatabaseParameters),
  });
}

export async function _createUpdateMongoDBDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoDBDatabaseGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoDBDatabaseGetResultsDeserializer(result.body);
}

/** Create or updates Azure Cosmos DB MongoDB database */
export function createUpdateMongoDBDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
  options: MongoDBResourcesCreateUpdateMongoDBDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoDBDatabaseGetResults>, MongoDBDatabaseGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoDBDatabaseDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoDBDatabaseSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          createUpdateMongoDBDatabaseParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoDBDatabaseGetResults>, MongoDBDatabaseGetResults>;
}

export function _getMongoDBDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesGetMongoDBDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoDBDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoDBDatabaseGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoDBDatabaseGetResultsDeserializer(result.body);
}

/** Gets the MongoDB databases under an existing Azure Cosmos DB database account with the provided name. */
export async function getMongoDBDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesGetMongoDBDatabaseOptionalParams = { requestOptions: {} },
): Promise<MongoDBDatabaseGetResults> {
  const result = await _getMongoDBDatabaseSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getMongoDBDatabaseDeserialize(result);
}

export function _migrateMongoDBCollectionToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _migrateMongoDBCollectionToManualThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Migrate an Azure Cosmos DB MongoDB collection from autoscale to manual throughput */
export function migrateMongoDBCollectionToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateMongoDBCollectionToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateMongoDBCollectionToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateMongoDBCollectionToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _migrateMongoDBCollectionToAutoscaleDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Migrate an Azure Cosmos DB MongoDB collection from manual throughput to autoscale */
export function migrateMongoDBCollectionToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateMongoDBCollectionToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateMongoDBCollectionToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _mongoDBContainerRedistributeThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/redistributeThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: redistributeThroughputParametersSerializer(redistributeThroughputParameters),
  });
}

export async function _mongoDBContainerRedistributeThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionThroughputInfoResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionThroughputInfoResultDeserializer(result.body);
}

/** Redistribute throughput for an Azure Cosmos DB MongoDB container */
export function mongoDBContainerRedistributeThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: MongoDBResourcesMongoDBContainerRedistributeThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _mongoDBContainerRedistributeThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _mongoDBContainerRedistributeThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          redistributeThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
}

export function _mongoDBContainerRetrieveThroughputDistributionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/retrieveThroughputDistribution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: retrieveThroughputParametersSerializer(retrieveThroughputParameters),
  });
}

export async function _mongoDBContainerRetrieveThroughputDistributionDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionThroughputInfoResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionThroughputInfoResultDeserializer(result.body);
}

/** Retrieve throughput distribution for an Azure Cosmos DB MongoDB container */
export function mongoDBContainerRetrieveThroughputDistribution(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: MongoDBResourcesMongoDBContainerRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _mongoDBContainerRetrieveThroughputDistributionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _mongoDBContainerRetrieveThroughputDistributionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          retrieveThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
}

export function _updateMongoDBCollectionThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: throughputSettingsUpdateParametersSerializer(updateThroughputParameters),
  });
}

export async function _updateMongoDBCollectionThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Update the RUs per second of an Azure Cosmos DB MongoDB collection */
export function updateMongoDBCollectionThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: MongoDBResourcesUpdateMongoDBCollectionThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateMongoDBCollectionThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateMongoDBCollectionThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          collectionName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getMongoDBCollectionThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesGetMongoDBCollectionThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      collectionName: collectionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoDBCollectionThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account with the provided name. */
export async function getMongoDBCollectionThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  collectionName: string,
  options: MongoDBResourcesGetMongoDBCollectionThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getMongoDBCollectionThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    collectionName,
    options,
  );
  return _getMongoDBCollectionThroughputDeserialize(result);
}

export function _mongoDBDatabaseRedistributeThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/redistributeThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: redistributeThroughputParametersSerializer(redistributeThroughputParameters),
  });
}

export async function _mongoDBDatabaseRedistributeThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionThroughputInfoResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionThroughputInfoResultDeserializer(result.body);
}

/** Redistribute throughput for an Azure Cosmos DB MongoDB database */
export function mongoDBDatabaseRedistributeThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: MongoDBResourcesMongoDBDatabaseRedistributeThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _mongoDBDatabaseRedistributeThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _mongoDBDatabaseRedistributeThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          redistributeThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
}

export function _mongoDBDatabaseRetrieveThroughputDistributionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/retrieveThroughputDistribution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: retrieveThroughputParametersSerializer(retrieveThroughputParameters),
  });
}

export async function _mongoDBDatabaseRetrieveThroughputDistributionDeserialize(
  result: PathUncheckedResponse,
): Promise<PhysicalPartitionThroughputInfoResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return physicalPartitionThroughputInfoResultDeserializer(result.body);
}

/** Retrieve throughput distribution for an Azure Cosmos DB MongoDB database */
export function mongoDBDatabaseRetrieveThroughputDistribution(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: MongoDBResourcesMongoDBDatabaseRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _mongoDBDatabaseRetrieveThroughputDistributionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _mongoDBDatabaseRetrieveThroughputDistributionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          retrieveThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<PhysicalPartitionThroughputInfoResult>,
    PhysicalPartitionThroughputInfoResult
  >;
}

export function _migrateMongoDBDatabaseToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _migrateMongoDBDatabaseToManualThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Migrate an Azure Cosmos DB MongoDB database from autoscale to manual throughput */
export function migrateMongoDBDatabaseToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateMongoDBDatabaseToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateMongoDBDatabaseToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateMongoDBDatabaseToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _migrateMongoDBDatabaseToAutoscaleDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Migrate an Azure Cosmos DB MongoDB database from manual throughput to autoscale */
export function migrateMongoDBDatabaseToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateMongoDBDatabaseToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateMongoDBDatabaseToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateMongoDBDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: throughputSettingsUpdateParametersSerializer(updateThroughputParameters),
  });
}

export async function _updateMongoDBDatabaseThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Update RUs per second of the an Azure Cosmos DB MongoDB database */
export function updateMongoDBDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: MongoDBResourcesUpdateMongoDBDatabaseThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateMongoDBDatabaseThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateMongoDBDatabaseThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getMongoDBDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesGetMongoDBDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMongoDBDatabaseThroughputDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputSettingsGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return throughputSettingsGetResultsDeserializer(result.body);
}

/** Gets the RUs per second of the MongoDB database under an existing Azure Cosmos DB database account with the provided name. */
export async function getMongoDBDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: MongoDBResourcesGetMongoDBDatabaseThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getMongoDBDatabaseThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getMongoDBDatabaseThroughputDeserialize(result);
}
