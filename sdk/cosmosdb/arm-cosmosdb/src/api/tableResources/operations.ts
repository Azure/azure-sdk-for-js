// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  TableGetResults,
  TableCreateUpdateParameters,
  _TableListResult,
  TableRoleDefinitionResource,
  _TableRoleDefinitionListResult,
  TableRoleAssignmentResource,
  _TableRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  throughputSettingsGetResultsDeserializer,
  throughputSettingsUpdateParametersSerializer,
  continuousBackupRestoreLocationSerializer,
  backupInformationDeserializer,
  tableGetResultsDeserializer,
  tableCreateUpdateParametersSerializer,
  _tableListResultDeserializer,
  tableRoleDefinitionResourceSerializer,
  tableRoleDefinitionResourceDeserializer,
  _tableRoleDefinitionListResultDeserializer,
  tableRoleAssignmentResourceSerializer,
  tableRoleAssignmentResourceDeserializer,
  _tableRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listTableRoleAssignmentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTableRoleAssignmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments{?api%2Dversion}",
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

export async function _listTableRoleAssignmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TableRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tableRoleAssignmentListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Table Role Assignments. */
export function listTableRoleAssignments(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTableRoleAssignmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TableRoleAssignmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listTableRoleAssignmentsSend(context, resourceGroupName, accountName, options),
    _listTableRoleAssignmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteTableRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: TableResourcesDeleteTableRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _deleteTableRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Table Role Assignment. */
export function deleteTableRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: TableResourcesDeleteTableRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteTableRoleAssignmentDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteTableRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateTableRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
  options: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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
    body: tableRoleAssignmentResourceSerializer(createUpdateTableRoleAssignmentParameters),
  });
}

export async function _createUpdateTableRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<TableRoleAssignmentResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableRoleAssignmentResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Table Role Assignment. */
export function createUpdateTableRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource,
  options: TableResourcesCreateUpdateTableRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TableRoleAssignmentResource>, TableRoleAssignmentResource> {
  return getLongRunningPoller(
    context,
    _createUpdateTableRoleAssignmentDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateTableRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          createUpdateTableRoleAssignmentParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<TableRoleAssignmentResource>, TableRoleAssignmentResource>;
}

export function _getTableRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: TableResourcesGetTableRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _getTableRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<TableRoleAssignmentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableRoleAssignmentResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Table Role Assignment with the given Id. */
export async function getTableRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: TableResourcesGetTableRoleAssignmentOptionalParams = { requestOptions: {} },
): Promise<TableRoleAssignmentResource> {
  const result = await _getTableRoleAssignmentSend(
    context,
    resourceGroupName,
    accountName,
    roleAssignmentId,
    options,
  );
  return _getTableRoleAssignmentDeserialize(result);
}

export function _listTableRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTableRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions{?api%2Dversion}",
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

export async function _listTableRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TableRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tableRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Table Role Definitions. */
export function listTableRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTableRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TableRoleDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listTableRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listTableRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteTableRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: TableResourcesDeleteTableRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _deleteTableRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Table Role Definition. */
export function deleteTableRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: TableResourcesDeleteTableRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteTableRoleDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteTableRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateTableRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
  options: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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
    body: tableRoleDefinitionResourceSerializer(createUpdateTableRoleDefinitionParameters),
  });
}

export async function _createUpdateTableRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<TableRoleDefinitionResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableRoleDefinitionResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Table Role Definition. */
export function createUpdateTableRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource,
  options: TableResourcesCreateUpdateTableRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TableRoleDefinitionResource>, TableRoleDefinitionResource> {
  return getLongRunningPoller(
    context,
    _createUpdateTableRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateTableRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          createUpdateTableRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<TableRoleDefinitionResource>, TableRoleDefinitionResource>;
}

export function _getTableRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: TableResourcesGetTableRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _getTableRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<TableRoleDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableRoleDefinitionResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Table Role Definition with the given Id. */
export async function getTableRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: TableResourcesGetTableRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<TableRoleDefinitionResource> {
  const result = await _getTableRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    roleDefinitionId,
    options,
  );
  return _getTableRoleDefinitionDeserialize(result);
}

export function _retrieveContinuousBackupInformationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  location: ContinuousBackupRestoreLocation,
  options: TableResourcesRetrieveContinuousBackupInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/retrieveContinuousBackupInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

/** Retrieves continuous backup information for a table. */
export function retrieveContinuousBackupInformation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  location: ContinuousBackupRestoreLocation,
  options: TableResourcesRetrieveContinuousBackupInformationOptionalParams = { requestOptions: {} },
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
          tableName,
          location,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<BackupInformation>, BackupInformation>;
}

export function _listTablesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables{?api%2Dversion}",
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

export async function _listTablesDeserialize(
  result: PathUncheckedResponse,
): Promise<_TableListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tableListResultDeserializer(result.body);
}

/** Lists the Tables under an existing Azure Cosmos DB database account. */
export function listTables(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableResourcesListTablesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TableGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listTablesSend(context, resourceGroupName, accountName, options),
    _listTablesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesDeleteTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Table. */
export function deleteTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesDeleteTableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteTableDeserialize, ["204", "202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteTableSend(context, resourceGroupName, accountName, tableName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  createUpdateTableParameters: TableCreateUpdateParameters,
  options: TableResourcesCreateUpdateTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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
    body: tableCreateUpdateParametersSerializer(createUpdateTableParameters),
  });
}

export async function _createUpdateTableDeserialize(
  result: PathUncheckedResponse,
): Promise<TableGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Table */
export function createUpdateTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  createUpdateTableParameters: TableCreateUpdateParameters,
  options: TableResourcesCreateUpdateTableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TableGetResults>, TableGetResults> {
  return getLongRunningPoller(context, _createUpdateTableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateTableSend(
        context,
        resourceGroupName,
        accountName,
        tableName,
        createUpdateTableParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<TableGetResults>, TableGetResults>;
}

export function _getTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesGetTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

export async function _getTableDeserialize(
  result: PathUncheckedResponse,
): Promise<TableGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tableGetResultsDeserializer(result.body);
}

/** Gets the Tables under an existing Azure Cosmos DB database account with the provided name. */
export async function getTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesGetTableOptionalParams = { requestOptions: {} },
): Promise<TableGetResults> {
  const result = await _getTableSend(context, resourceGroupName, accountName, tableName, options);
  return _getTableDeserialize(result);
}

export function _migrateTableToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesMigrateTableToManualThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

export async function _migrateTableToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Table from autoscale to manual throughput */
export function migrateTableToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesMigrateTableToManualThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateTableToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateTableToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          tableName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateTableToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesMigrateTableToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

export async function _migrateTableToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Table from manual throughput to autoscale */
export function migrateTableToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesMigrateTableToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(context, _migrateTableToAutoscaleDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateTableToAutoscaleSend(context, resourceGroupName, accountName, tableName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateTableThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: TableResourcesUpdateTableThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

export async function _updateTableThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Table */
export function updateTableThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: TableResourcesUpdateTableThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(context, _updateTableThroughputDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTableThroughputSend(
        context,
        resourceGroupName,
        accountName,
        tableName,
        updateThroughputParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getTableThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesGetTableThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      tableName: tableName,
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

export async function _getTableThroughputDeserialize(
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

/** Gets the RUs per second of the Table under an existing Azure Cosmos DB database account with the provided name. */
export async function getTableThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  tableName: string,
  options: TableResourcesGetTableThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getTableThroughputSend(
    context,
    resourceGroupName,
    accountName,
    tableName,
    options,
  );
  return _getTableThroughputDeserialize(result);
}
