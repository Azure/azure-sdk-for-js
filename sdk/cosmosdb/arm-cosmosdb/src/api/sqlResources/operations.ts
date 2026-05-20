// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  SqlDatabaseGetResults,
  SqlDatabaseCreateUpdateParameters,
  _SqlDatabaseListResult,
  MergeParameters,
  PhysicalPartitionStorageInfoCollection,
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  RetrieveThroughputParameters,
  PhysicalPartitionThroughputInfoResult,
  RedistributeThroughputParameters,
  ClientEncryptionKeyGetResults,
  ClientEncryptionKeyCreateUpdateParameters,
  _ClientEncryptionKeysListResult,
  SqlContainerGetResults,
  SqlContainerCreateUpdateParameters,
  _SqlContainerListResult,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  SqlStoredProcedureGetResults,
  SqlStoredProcedureCreateUpdateParameters,
  _SqlStoredProcedureListResult,
  SqlUserDefinedFunctionGetResults,
  SqlUserDefinedFunctionCreateUpdateParameters,
  _SqlUserDefinedFunctionListResult,
  SqlTriggerGetResults,
  SqlTriggerCreateUpdateParameters,
  _SqlTriggerListResult,
  SqlRoleDefinitionGetResults,
  SqlRoleDefinitionCreateUpdateParameters,
  _SqlRoleDefinitionListResult,
  SqlRoleAssignmentGetResults,
  SqlRoleAssignmentCreateUpdateParameters,
  _SqlRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  sqlDatabaseGetResultsDeserializer,
  sqlDatabaseCreateUpdateParametersSerializer,
  _sqlDatabaseListResultDeserializer,
  mergeParametersSerializer,
  physicalPartitionStorageInfoCollectionDeserializer,
  throughputSettingsGetResultsDeserializer,
  throughputSettingsUpdateParametersSerializer,
  retrieveThroughputParametersSerializer,
  physicalPartitionThroughputInfoResultDeserializer,
  redistributeThroughputParametersSerializer,
  clientEncryptionKeyGetResultsDeserializer,
  clientEncryptionKeyCreateUpdateParametersSerializer,
  _clientEncryptionKeysListResultDeserializer,
  sqlContainerGetResultsDeserializer,
  sqlContainerCreateUpdateParametersSerializer,
  _sqlContainerListResultDeserializer,
  continuousBackupRestoreLocationSerializer,
  backupInformationDeserializer,
  sqlStoredProcedureGetResultsDeserializer,
  sqlStoredProcedureCreateUpdateParametersSerializer,
  _sqlStoredProcedureListResultDeserializer,
  sqlUserDefinedFunctionGetResultsDeserializer,
  sqlUserDefinedFunctionCreateUpdateParametersSerializer,
  _sqlUserDefinedFunctionListResultDeserializer,
  sqlTriggerGetResultsDeserializer,
  sqlTriggerCreateUpdateParametersSerializer,
  _sqlTriggerListResultDeserializer,
  sqlRoleDefinitionGetResultsDeserializer,
  sqlRoleDefinitionCreateUpdateParametersSerializer,
  _sqlRoleDefinitionListResultDeserializer,
  sqlRoleAssignmentGetResultsDeserializer,
  sqlRoleAssignmentCreateUpdateParametersSerializer,
  _sqlRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSqlRoleAssignmentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlRoleAssignmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments{?api%2Dversion}",
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

export async function _listSqlRoleAssignmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _sqlRoleAssignmentListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB SQL Role Assignments. */
export function listSqlRoleAssignments(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlRoleAssignmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlRoleAssignmentGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listSqlRoleAssignmentsSend(context, resourceGroupName, accountName, options),
    _listSqlRoleAssignmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: SqlResourcesDeleteSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleAssignmentId: roleAssignmentId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlRoleAssignmentDeserialize(
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

/** Deletes an existing Azure Cosmos DB SQL Role Assignment. */
export function deleteSqlRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: SqlResourcesDeleteSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSqlRoleAssignmentDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSqlRoleAssignmentSend(
        context,
        resourceGroupName,
        accountName,
        roleAssignmentId,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleAssignmentId: roleAssignmentId,
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
    body: sqlRoleAssignmentCreateUpdateParametersSerializer(
      createUpdateSqlRoleAssignmentParameters,
    ),
  });
}

export async function _createUpdateSqlRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlRoleAssignmentGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sqlRoleAssignmentGetResultsDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB SQL Role Assignment. */
export function createUpdateSqlRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateSqlRoleAssignmentParameters: SqlRoleAssignmentCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlRoleAssignmentGetResults>, SqlRoleAssignmentGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateSqlRoleAssignmentDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateSqlRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          createUpdateSqlRoleAssignmentParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<SqlRoleAssignmentGetResults>, SqlRoleAssignmentGetResults>;
}

export function _getSqlRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: SqlResourcesGetSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleAssignmentId: roleAssignmentId,
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

export async function _getSqlRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlRoleAssignmentGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sqlRoleAssignmentGetResultsDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB SQL Role Assignment with the given Id. */
export async function getSqlRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: SqlResourcesGetSqlRoleAssignmentOptionalParams = { requestOptions: {} },
): Promise<SqlRoleAssignmentGetResults> {
  const result = await _getSqlRoleAssignmentSend(
    context,
    resourceGroupName,
    accountName,
    roleAssignmentId,
    options,
  );
  return _getSqlRoleAssignmentDeserialize(result);
}

export function _listSqlRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions{?api%2Dversion}",
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

export async function _listSqlRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _sqlRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB SQL Role Definitions. */
export function listSqlRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlRoleDefinitionGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listSqlRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listSqlRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: SqlResourcesDeleteSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleDefinitionId: roleDefinitionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlRoleDefinitionDeserialize(
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

/** Deletes an existing Azure Cosmos DB SQL Role Definition. */
export function deleteSqlRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: SqlResourcesDeleteSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSqlRoleDefinitionDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSqlRoleDefinitionSend(
        context,
        resourceGroupName,
        accountName,
        roleDefinitionId,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleDefinitionId: roleDefinitionId,
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
    body: sqlRoleDefinitionCreateUpdateParametersSerializer(
      createUpdateSqlRoleDefinitionParameters,
    ),
  });
}

export async function _createUpdateSqlRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlRoleDefinitionGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sqlRoleDefinitionGetResultsDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB SQL Role Definition. */
export function createUpdateSqlRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateSqlRoleDefinitionParameters: SqlRoleDefinitionCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlRoleDefinitionGetResults>, SqlRoleDefinitionGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateSqlRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateSqlRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          createUpdateSqlRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<SqlRoleDefinitionGetResults>, SqlRoleDefinitionGetResults>;
}

export function _getSqlRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: SqlResourcesGetSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      roleDefinitionId: roleDefinitionId,
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

export async function _getSqlRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlRoleDefinitionGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sqlRoleDefinitionGetResultsDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB SQL Role Definition with the given Id. */
export async function getSqlRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: SqlResourcesGetSqlRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<SqlRoleDefinitionGetResults> {
  const result = await _getSqlRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    roleDefinitionId,
    options,
  );
  return _getSqlRoleDefinitionDeserialize(result);
}

export function _listSqlTriggersSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlTriggersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _listSqlTriggersDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlTriggerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sqlTriggerListResultDeserializer(result.body);
}

/** Lists the SQL trigger under an existing Azure Cosmos DB database account. */
export function listSqlTriggers(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlTriggersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlTriggerGetResults> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSqlTriggersSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    _listSqlTriggersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlTriggerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  options: SqlResourcesDeleteSqlTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlTriggerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB SQL trigger. */
export function deleteSqlTrigger(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  options: SqlResourcesDeleteSqlTriggerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSqlTriggerDeserialize, ["204", "202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSqlTriggerSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlTriggerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      triggerName: triggerName,
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
    body: sqlTriggerCreateUpdateParametersSerializer(createUpdateSqlTriggerParameters),
  });
}

export async function _createUpdateSqlTriggerDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlTriggerGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlTriggerGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB SQL trigger */
export function createUpdateSqlTrigger(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlTriggerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlTriggerGetResults>, SqlTriggerGetResults> {
  return getLongRunningPoller(context, _createUpdateSqlTriggerDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSqlTriggerSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        triggerName,
        createUpdateSqlTriggerParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<SqlTriggerGetResults>, SqlTriggerGetResults>;
}

export function _getSqlTriggerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  options: SqlResourcesGetSqlTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      triggerName: triggerName,
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

export async function _getSqlTriggerDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlTriggerGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlTriggerGetResultsDeserializer(result.body);
}

/** Gets the SQL trigger under an existing Azure Cosmos DB database account. */
export async function getSqlTrigger(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  triggerName: string,
  options: SqlResourcesGetSqlTriggerOptionalParams = { requestOptions: {} },
): Promise<SqlTriggerGetResults> {
  const result = await _getSqlTriggerSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    triggerName,
    options,
  );
  return _getSqlTriggerDeserialize(result);
}

export function _listSqlUserDefinedFunctionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlUserDefinedFunctionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _listSqlUserDefinedFunctionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlUserDefinedFunctionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sqlUserDefinedFunctionListResultDeserializer(result.body);
}

/** Lists the SQL userDefinedFunction under an existing Azure Cosmos DB database account. */
export function listSqlUserDefinedFunctions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlUserDefinedFunctionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlUserDefinedFunctionGetResults> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSqlUserDefinedFunctionsSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    _listSqlUserDefinedFunctionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlUserDefinedFunctionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  options: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      userDefinedFunctionName: userDefinedFunctionName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlUserDefinedFunctionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB SQL userDefinedFunction. */
export function deleteSqlUserDefinedFunction(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  options: SqlResourcesDeleteSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteSqlUserDefinedFunctionDeserialize,
    ["204", "202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteSqlUserDefinedFunctionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          userDefinedFunctionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlUserDefinedFunctionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      userDefinedFunctionName: userDefinedFunctionName,
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
    body: sqlUserDefinedFunctionCreateUpdateParametersSerializer(
      createUpdateSqlUserDefinedFunctionParameters,
    ),
  });
}

export async function _createUpdateSqlUserDefinedFunctionDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlUserDefinedFunctionGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlUserDefinedFunctionGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB SQL userDefinedFunction */
export function createUpdateSqlUserDefinedFunction(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlUserDefinedFunctionGetResults>, SqlUserDefinedFunctionGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateSqlUserDefinedFunctionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateSqlUserDefinedFunctionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          userDefinedFunctionName,
          createUpdateSqlUserDefinedFunctionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlUserDefinedFunctionGetResults>,
    SqlUserDefinedFunctionGetResults
  >;
}

export function _getSqlUserDefinedFunctionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  options: SqlResourcesGetSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      userDefinedFunctionName: userDefinedFunctionName,
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

export async function _getSqlUserDefinedFunctionDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlUserDefinedFunctionGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlUserDefinedFunctionGetResultsDeserializer(result.body);
}

/** Gets the SQL userDefinedFunction under an existing Azure Cosmos DB database account. */
export async function getSqlUserDefinedFunction(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  userDefinedFunctionName: string,
  options: SqlResourcesGetSqlUserDefinedFunctionOptionalParams = { requestOptions: {} },
): Promise<SqlUserDefinedFunctionGetResults> {
  const result = await _getSqlUserDefinedFunctionSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    userDefinedFunctionName,
    options,
  );
  return _getSqlUserDefinedFunctionDeserialize(result);
}

export function _listSqlStoredProceduresSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlStoredProceduresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _listSqlStoredProceduresDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlStoredProcedureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _sqlStoredProcedureListResultDeserializer(result.body);
}

/** Lists the SQL storedProcedure under an existing Azure Cosmos DB database account. */
export function listSqlStoredProcedures(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesListSqlStoredProceduresOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlStoredProcedureGetResults> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSqlStoredProceduresSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    _listSqlStoredProceduresDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlStoredProcedureSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  options: SqlResourcesDeleteSqlStoredProcedureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      storedProcedureName: storedProcedureName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlStoredProcedureDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB SQL storedProcedure. */
export function deleteSqlStoredProcedure(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  options: SqlResourcesDeleteSqlStoredProcedureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteSqlStoredProcedureDeserialize,
    ["204", "202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteSqlStoredProcedureSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          storedProcedureName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlStoredProcedureSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      storedProcedureName: storedProcedureName,
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
    body: sqlStoredProcedureCreateUpdateParametersSerializer(
      createUpdateSqlStoredProcedureParameters,
    ),
  });
}

export async function _createUpdateSqlStoredProcedureDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlStoredProcedureGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlStoredProcedureGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB SQL storedProcedure */
export function createUpdateSqlStoredProcedure(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  createUpdateSqlStoredProcedureParameters: SqlStoredProcedureCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlStoredProcedureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlStoredProcedureGetResults>, SqlStoredProcedureGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateSqlStoredProcedureDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateSqlStoredProcedureSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          storedProcedureName,
          createUpdateSqlStoredProcedureParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<SqlStoredProcedureGetResults>, SqlStoredProcedureGetResults>;
}

export function _getSqlStoredProcedureSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  options: SqlResourcesGetSqlStoredProcedureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      storedProcedureName: storedProcedureName,
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

export async function _getSqlStoredProcedureDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlStoredProcedureGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlStoredProcedureGetResultsDeserializer(result.body);
}

/** Gets the SQL storedProcedure under an existing Azure Cosmos DB database account. */
export async function getSqlStoredProcedure(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  storedProcedureName: string,
  options: SqlResourcesGetSqlStoredProcedureOptionalParams = { requestOptions: {} },
): Promise<SqlStoredProcedureGetResults> {
  const result = await _getSqlStoredProcedureSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    storedProcedureName,
    options,
  );
  return _getSqlStoredProcedureDeserialize(result);
}

export function _retrieveContinuousBackupInformationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  location: ContinuousBackupRestoreLocation,
  options: SqlResourcesRetrieveContinuousBackupInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/retrieveContinuousBackupInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

/** Retrieves continuous backup information for a container resource. */
export function retrieveContinuousBackupInformation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  location: ContinuousBackupRestoreLocation,
  options: SqlResourcesRetrieveContinuousBackupInformationOptionalParams = { requestOptions: {} },
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
          containerName,
          location,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<BackupInformation>, BackupInformation>;
}

export function _listSqlContainerPartitionMergeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  mergeParameters: MergeParameters,
  options: SqlResourcesListSqlContainerPartitionMergeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/partitionMerge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _listSqlContainerPartitionMergeDeserialize(
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

/** Merges the partitions of a SQL Container */
export function listSqlContainerPartitionMerge(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  mergeParameters: MergeParameters,
  options: SqlResourcesListSqlContainerPartitionMergeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PhysicalPartitionStorageInfoCollection>,
  PhysicalPartitionStorageInfoCollection
> {
  return getLongRunningPoller(
    context,
    _listSqlContainerPartitionMergeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listSqlContainerPartitionMergeSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
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

export function _listSqlContainersSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesListSqlContainersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers{?api%2Dversion}",
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

export async function _listSqlContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sqlContainerListResultDeserializer(result.body);
}

/** Lists the SQL container under an existing Azure Cosmos DB database account. */
export function listSqlContainers(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesListSqlContainersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlContainerGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listSqlContainersSend(context, resourceGroupName, accountName, databaseName, options),
    _listSqlContainersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlContainerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesDeleteSqlContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSqlContainerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB SQL container. */
export function deleteSqlContainer(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesDeleteSqlContainerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSqlContainerDeserialize, ["204", "202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSqlContainerSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlContainerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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
    body: sqlContainerCreateUpdateParametersSerializer(createUpdateSqlContainerParameters),
  });
}

export async function _createUpdateSqlContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlContainerGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlContainerGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB SQL container */
export function createUpdateSqlContainer(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlContainerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlContainerGetResults>, SqlContainerGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateSqlContainerDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateSqlContainerSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          createUpdateSqlContainerParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<SqlContainerGetResults>, SqlContainerGetResults>;
}

export function _getSqlContainerSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesGetSqlContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _getSqlContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlContainerGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlContainerGetResultsDeserializer(result.body);
}

/** Gets the SQL container under an existing Azure Cosmos DB database account. */
export async function getSqlContainer(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesGetSqlContainerOptionalParams = { requestOptions: {} },
): Promise<SqlContainerGetResults> {
  const result = await _getSqlContainerSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    options,
  );
  return _getSqlContainerDeserialize(result);
}

export function _listClientEncryptionKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesListClientEncryptionKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys{?api%2Dversion}",
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

export async function _listClientEncryptionKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClientEncryptionKeysListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _clientEncryptionKeysListResultDeserializer(result.body);
}

/** Lists the ClientEncryptionKeys under an existing Azure Cosmos DB SQL database. */
export function listClientEncryptionKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesListClientEncryptionKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClientEncryptionKeyGetResults> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listClientEncryptionKeysSend(context, resourceGroupName, accountName, databaseName, options),
    _listClientEncryptionKeysDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _createUpdateClientEncryptionKeySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  clientEncryptionKeyName: string,
  createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
  options: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys/{clientEncryptionKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      clientEncryptionKeyName: clientEncryptionKeyName,
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
    body: clientEncryptionKeyCreateUpdateParametersSerializer(
      createUpdateClientEncryptionKeyParameters,
    ),
  });
}

export async function _createUpdateClientEncryptionKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientEncryptionKeyGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientEncryptionKeyGetResultsDeserializer(result.body);
}

/** Create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly). */
export function createUpdateClientEncryptionKey(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  clientEncryptionKeyName: string,
  createUpdateClientEncryptionKeyParameters: ClientEncryptionKeyCreateUpdateParameters,
  options: SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClientEncryptionKeyGetResults>, ClientEncryptionKeyGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateClientEncryptionKeyDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateClientEncryptionKeySend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          clientEncryptionKeyName,
          createUpdateClientEncryptionKeyParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ClientEncryptionKeyGetResults>, ClientEncryptionKeyGetResults>;
}

export function _getClientEncryptionKeySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  clientEncryptionKeyName: string,
  options: SqlResourcesGetClientEncryptionKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys/{clientEncryptionKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      clientEncryptionKeyName: clientEncryptionKeyName,
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

export async function _getClientEncryptionKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientEncryptionKeyGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientEncryptionKeyGetResultsDeserializer(result.body);
}

/** Gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database. */
export async function getClientEncryptionKey(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  clientEncryptionKeyName: string,
  options: SqlResourcesGetClientEncryptionKeyOptionalParams = { requestOptions: {} },
): Promise<ClientEncryptionKeyGetResults> {
  const result = await _getClientEncryptionKeySend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    clientEncryptionKeyName,
    options,
  );
  return _getClientEncryptionKeyDeserialize(result);
}

export function _sqlContainerRedistributeThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: SqlResourcesSqlContainerRedistributeThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/redistributeThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _sqlContainerRedistributeThroughputDeserialize(
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

/** Redistribute throughput for an Azure Cosmos DB SQL container */
export function sqlContainerRedistributeThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: SqlResourcesSqlContainerRedistributeThroughputOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _sqlContainerRedistributeThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sqlContainerRedistributeThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
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

export function _sqlContainerRetrieveThroughputDistributionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/retrieveThroughputDistribution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _sqlContainerRetrieveThroughputDistributionDeserialize(
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

/** Retrieve throughput distribution for an Azure Cosmos DB SQL container */
export function sqlContainerRetrieveThroughputDistribution(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: SqlResourcesSqlContainerRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _sqlContainerRetrieveThroughputDistributionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sqlContainerRetrieveThroughputDistributionSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
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

export function _migrateSqlContainerToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _migrateSqlContainerToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB SQL container from autoscale to manual throughput */
export function migrateSqlContainerToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesMigrateSqlContainerToManualThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateSqlContainerToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateSqlContainerToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateSqlContainerToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _migrateSqlContainerToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB SQL container from manual throughput to autoscale */
export function migrateSqlContainerToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesMigrateSqlContainerToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateSqlContainerToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateSqlContainerToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateSqlContainerThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: SqlResourcesUpdateSqlContainerThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _updateSqlContainerThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB SQL container */
export function updateSqlContainerThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: SqlResourcesUpdateSqlContainerThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateSqlContainerThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateSqlContainerThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          containerName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getSqlContainerThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesGetSqlContainerThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

export async function _getSqlContainerThroughputDeserialize(
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

/** Gets the RUs per second of the SQL container under an existing Azure Cosmos DB database account. */
export async function getSqlContainerThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SqlResourcesGetSqlContainerThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getSqlContainerThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    options,
  );
  return _getSqlContainerThroughputDeserialize(result);
}

export function _sqlDatabaseRedistributeThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/redistributeThroughput{?api%2Dversion}",
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

export async function _sqlDatabaseRedistributeThroughputDeserialize(
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

/** Redistribute throughput for an Azure Cosmos DB SQL database */
export function sqlDatabaseRedistributeThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  redistributeThroughputParameters: RedistributeThroughputParameters,
  options: SqlResourcesSqlDatabaseRedistributeThroughputOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _sqlDatabaseRedistributeThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sqlDatabaseRedistributeThroughputSend(
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

export function _sqlDatabaseRetrieveThroughputDistributionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/retrieveThroughputDistribution{?api%2Dversion}",
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

export async function _sqlDatabaseRetrieveThroughputDistributionDeserialize(
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

/** Retrieve throughput distribution for an Azure Cosmos DB SQL database */
export function sqlDatabaseRetrieveThroughputDistribution(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  retrieveThroughputParameters: RetrieveThroughputParameters,
  options: SqlResourcesSqlDatabaseRetrieveThroughputDistributionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PhysicalPartitionThroughputInfoResult>,
  PhysicalPartitionThroughputInfoResult
> {
  return getLongRunningPoller(
    context,
    _sqlDatabaseRetrieveThroughputDistributionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sqlDatabaseRetrieveThroughputDistributionSend(
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

export function _migrateSqlDatabaseToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
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

export async function _migrateSqlDatabaseToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB SQL database from autoscale to manual throughput */
export function migrateSqlDatabaseToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesMigrateSqlDatabaseToManualThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateSqlDatabaseToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateSqlDatabaseToManualThroughputSend(
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

export function _migrateSqlDatabaseToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
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

export async function _migrateSqlDatabaseToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB SQL database from manual throughput to autoscale */
export function migrateSqlDatabaseToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesMigrateSqlDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateSqlDatabaseToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateSqlDatabaseToAutoscaleSend(
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

export function _updateSqlDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
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

export async function _updateSqlDatabaseThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB SQL database */
export function updateSqlDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: SqlResourcesUpdateSqlDatabaseThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateSqlDatabaseThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateSqlDatabaseThroughputSend(
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

export function _getSqlDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesGetSqlDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
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

export async function _getSqlDatabaseThroughputDeserialize(
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

/** Gets the RUs per second of the SQL database under an existing Azure Cosmos DB database account with the provided name. */
export async function getSqlDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesGetSqlDatabaseThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getSqlDatabaseThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getSqlDatabaseThroughputDeserialize(result);
}

export function _sqlDatabasePartitionMergeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  mergeParameters: MergeParameters,
  options: SqlResourcesSqlDatabasePartitionMergeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/partitionMerge{?api%2Dversion}",
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

export async function _sqlDatabasePartitionMergeDeserialize(
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

/** Merges the partitions of a SQL database */
export function sqlDatabasePartitionMerge(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  mergeParameters: MergeParameters,
  options: SqlResourcesSqlDatabasePartitionMergeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PhysicalPartitionStorageInfoCollection>,
  PhysicalPartitionStorageInfoCollection
> {
  return getLongRunningPoller(
    context,
    _sqlDatabasePartitionMergeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sqlDatabasePartitionMergeSend(
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

export function _listSqlDatabasesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases{?api%2Dversion}",
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

export async function _listSqlDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sqlDatabaseListResultDeserializer(result.body);
}

/** Lists the SQL databases under an existing Azure Cosmos DB database account. */
export function listSqlDatabases(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SqlResourcesListSqlDatabasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlDatabaseGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listSqlDatabasesSend(context, resourceGroupName, accountName, options),
    _listSqlDatabasesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteSqlDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesDeleteSqlDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}{?api%2Dversion}",
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

export async function _deleteSqlDatabaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB SQL database. */
export function deleteSqlDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesDeleteSqlDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSqlDatabaseDeserialize, ["204", "202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSqlDatabaseSend(context, resourceGroupName, accountName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSqlDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}{?api%2Dversion}",
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
    body: sqlDatabaseCreateUpdateParametersSerializer(createUpdateSqlDatabaseParameters),
  });
}

export async function _createUpdateSqlDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlDatabaseGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlDatabaseGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB SQL database */
export function createUpdateSqlDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateSqlDatabaseParameters: SqlDatabaseCreateUpdateParameters,
  options: SqlResourcesCreateUpdateSqlDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlDatabaseGetResults>, SqlDatabaseGetResults> {
  return getLongRunningPoller(context, _createUpdateSqlDatabaseDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSqlDatabaseSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        createUpdateSqlDatabaseParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<SqlDatabaseGetResults>, SqlDatabaseGetResults>;
}

export function _getSqlDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesGetSqlDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}{?api%2Dversion}",
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

export async function _getSqlDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlDatabaseGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sqlDatabaseGetResultsDeserializer(result.body);
}

/** Gets the SQL database under an existing Azure Cosmos DB database account with the provided name. */
export async function getSqlDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: SqlResourcesGetSqlDatabaseOptionalParams = { requestOptions: {} },
): Promise<SqlDatabaseGetResults> {
  const result = await _getSqlDatabaseSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getSqlDatabaseDeserialize(result);
}
