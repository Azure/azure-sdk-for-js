// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  ContinuousBackupRestoreLocation,
  BackupInformation,
  GremlinDatabaseGetResults,
  GremlinDatabaseCreateUpdateParameters,
  _GremlinDatabaseListResult,
  GremlinGraphGetResults,
  GremlinGraphCreateUpdateParameters,
  _GremlinGraphListResult,
  GremlinRoleDefinitionResource,
  _GremlinRoleDefinitionListResult,
  GremlinRoleAssignmentResource,
  _GremlinRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  throughputSettingsGetResultsDeserializer,
  throughputSettingsUpdateParametersSerializer,
  continuousBackupRestoreLocationSerializer,
  backupInformationDeserializer,
  gremlinDatabaseGetResultsDeserializer,
  gremlinDatabaseCreateUpdateParametersSerializer,
  _gremlinDatabaseListResultDeserializer,
  gremlinGraphGetResultsDeserializer,
  gremlinGraphCreateUpdateParametersSerializer,
  _gremlinGraphListResultDeserializer,
  gremlinRoleDefinitionResourceSerializer,
  gremlinRoleDefinitionResourceDeserializer,
  _gremlinRoleDefinitionListResultDeserializer,
  gremlinRoleAssignmentResourceSerializer,
  gremlinRoleAssignmentResourceDeserializer,
  _gremlinRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listGremlinRoleAssignmentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinRoleAssignmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments{?api%2Dversion}",
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

export async function _listGremlinRoleAssignmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GremlinRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gremlinRoleAssignmentListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Gremlin Role Assignments. */
export function listGremlinRoleAssignments(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinRoleAssignmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GremlinRoleAssignmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listGremlinRoleAssignmentsSend(context, resourceGroupName, accountName, options),
    _listGremlinRoleAssignmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteGremlinRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _deleteGremlinRoleAssignmentDeserialize(
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

/** Deletes an existing Azure Cosmos DB Gremlin Role Assignment. */
export function deleteGremlinRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: GremlinResourcesDeleteGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteGremlinRoleAssignmentDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteGremlinRoleAssignmentSend(
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

export function _createUpdateGremlinRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
  options: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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
    body: gremlinRoleAssignmentResourceSerializer(createUpdateGremlinRoleAssignmentParameters),
  });
}

export async function _createUpdateGremlinRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinRoleAssignmentResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinRoleAssignmentResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Gremlin Role Assignment. */
export function createUpdateGremlinRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateGremlinRoleAssignmentParameters: GremlinRoleAssignmentResource,
  options: GremlinResourcesCreateUpdateGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GremlinRoleAssignmentResource>, GremlinRoleAssignmentResource> {
  return getLongRunningPoller(
    context,
    _createUpdateGremlinRoleAssignmentDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateGremlinRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          createUpdateGremlinRoleAssignmentParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<GremlinRoleAssignmentResource>, GremlinRoleAssignmentResource>;
}

export function _getGremlinRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: GremlinResourcesGetGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _getGremlinRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinRoleAssignmentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinRoleAssignmentResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Assignment with the given Id. */
export async function getGremlinRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: GremlinResourcesGetGremlinRoleAssignmentOptionalParams = { requestOptions: {} },
): Promise<GremlinRoleAssignmentResource> {
  const result = await _getGremlinRoleAssignmentSend(
    context,
    resourceGroupName,
    accountName,
    roleAssignmentId,
    options,
  );
  return _getGremlinRoleAssignmentDeserialize(result);
}

export function _listGremlinRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions{?api%2Dversion}",
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

export async function _listGremlinRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GremlinRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gremlinRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Gremlin Role Definitions. */
export function listGremlinRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GremlinRoleDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listGremlinRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listGremlinRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteGremlinRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _deleteGremlinRoleDefinitionDeserialize(
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

/** Deletes an existing Azure Cosmos DB Gremlin Role Definition. */
export function deleteGremlinRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: GremlinResourcesDeleteGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteGremlinRoleDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteGremlinRoleDefinitionSend(
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

export function _createUpdateGremlinRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
  options: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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
    body: gremlinRoleDefinitionResourceSerializer(createUpdateGremlinRoleDefinitionParameters),
  });
}

export async function _createUpdateGremlinRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinRoleDefinitionResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinRoleDefinitionResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Gremlin Role Definition. */
export function createUpdateGremlinRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateGremlinRoleDefinitionParameters: GremlinRoleDefinitionResource,
  options: GremlinResourcesCreateUpdateGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GremlinRoleDefinitionResource>, GremlinRoleDefinitionResource> {
  return getLongRunningPoller(
    context,
    _createUpdateGremlinRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateGremlinRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          createUpdateGremlinRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<GremlinRoleDefinitionResource>, GremlinRoleDefinitionResource>;
}

export function _getGremlinRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: GremlinResourcesGetGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _getGremlinRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinRoleDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinRoleDefinitionResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Definition with the given Id. */
export async function getGremlinRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: GremlinResourcesGetGremlinRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<GremlinRoleDefinitionResource> {
  const result = await _getGremlinRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    roleDefinitionId,
    options,
  );
  return _getGremlinRoleDefinitionDeserialize(result);
}

export function _retrieveContinuousBackupInformationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  location: ContinuousBackupRestoreLocation,
  options: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/retrieveContinuousBackupInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

/** Retrieves continuous backup information for a gremlin graph. */
export function retrieveContinuousBackupInformation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  location: ContinuousBackupRestoreLocation,
  options: GremlinResourcesRetrieveContinuousBackupInformationOptionalParams = {
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
          graphName,
          location,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<BackupInformation>, BackupInformation>;
}

export function _listGremlinGraphsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesListGremlinGraphsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs{?api%2Dversion}",
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

export async function _listGremlinGraphsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GremlinGraphListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gremlinGraphListResultDeserializer(result.body);
}

/** Lists the Gremlin graph under an existing Azure Cosmos DB database account. */
export function listGremlinGraphs(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesListGremlinGraphsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GremlinGraphGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listGremlinGraphsSend(context, resourceGroupName, accountName, databaseName, options),
    _listGremlinGraphsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteGremlinGraphSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesDeleteGremlinGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteGremlinGraphDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Gremlin graph. */
export function deleteGremlinGraph(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesDeleteGremlinGraphOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteGremlinGraphDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteGremlinGraphSend(
        context,
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateGremlinGraphSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
  options: GremlinResourcesCreateUpdateGremlinGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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
    body: gremlinGraphCreateUpdateParametersSerializer(createUpdateGremlinGraphParameters),
  });
}

export async function _createUpdateGremlinGraphDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinGraphGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinGraphGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Gremlin graph */
export function createUpdateGremlinGraph(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
  options: GremlinResourcesCreateUpdateGremlinGraphOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GremlinGraphGetResults>, GremlinGraphGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateGremlinGraphDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateGremlinGraphSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          graphName,
          createUpdateGremlinGraphParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<GremlinGraphGetResults>, GremlinGraphGetResults>;
}

export function _getGremlinGraphSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesGetGremlinGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

export async function _getGremlinGraphDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinGraphGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinGraphGetResultsDeserializer(result.body);
}

/** Gets the Gremlin graph under an existing Azure Cosmos DB database account. */
export async function getGremlinGraph(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesGetGremlinGraphOptionalParams = { requestOptions: {} },
): Promise<GremlinGraphGetResults> {
  const result = await _getGremlinGraphSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    graphName,
    options,
  );
  return _getGremlinGraphDeserialize(result);
}

export function _listGremlinDatabasesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases{?api%2Dversion}",
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

export async function _listGremlinDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_GremlinDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gremlinDatabaseListResultDeserializer(result.body);
}

/** Lists the Gremlin databases under an existing Azure Cosmos DB database account. */
export function listGremlinDatabases(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GremlinResourcesListGremlinDatabasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GremlinDatabaseGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listGremlinDatabasesSend(context, resourceGroupName, accountName, options),
    _listGremlinDatabasesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteGremlinDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesDeleteGremlinDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}{?api%2Dversion}",
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

export async function _deleteGremlinDatabaseDeserialize(
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

/** Deletes an existing Azure Cosmos DB Gremlin database. */
export function deleteGremlinDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesDeleteGremlinDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteGremlinDatabaseDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteGremlinDatabaseSend(context, resourceGroupName, accountName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateGremlinDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
  options: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}{?api%2Dversion}",
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
    body: gremlinDatabaseCreateUpdateParametersSerializer(createUpdateGremlinDatabaseParameters),
  });
}

export async function _createUpdateGremlinDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinDatabaseGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinDatabaseGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Gremlin database */
export function createUpdateGremlinDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
  options: GremlinResourcesCreateUpdateGremlinDatabaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GremlinDatabaseGetResults>, GremlinDatabaseGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateGremlinDatabaseDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateGremlinDatabaseSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          createUpdateGremlinDatabaseParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<GremlinDatabaseGetResults>, GremlinDatabaseGetResults>;
}

export function _getGremlinDatabaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesGetGremlinDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}{?api%2Dversion}",
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

export async function _getGremlinDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<GremlinDatabaseGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gremlinDatabaseGetResultsDeserializer(result.body);
}

/** Gets the Gremlin databases under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinDatabase(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesGetGremlinDatabaseOptionalParams = { requestOptions: {} },
): Promise<GremlinDatabaseGetResults> {
  const result = await _getGremlinDatabaseSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getGremlinDatabaseDeserialize(result);
}

export function _migrateGremlinGraphToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

export async function _migrateGremlinGraphToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Gremlin graph from autoscale to manual throughput */
export function migrateGremlinGraphToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesMigrateGremlinGraphToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateGremlinGraphToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateGremlinGraphToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          graphName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateGremlinGraphToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

export async function _migrateGremlinGraphToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale */
export function migrateGremlinGraphToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesMigrateGremlinGraphToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateGremlinGraphToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateGremlinGraphToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          graphName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateGremlinGraphThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

export async function _updateGremlinGraphThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Gremlin graph */
export function updateGremlinGraphThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: GremlinResourcesUpdateGremlinGraphThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateGremlinGraphThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateGremlinGraphThroughputSend(
          context,
          resourceGroupName,
          accountName,
          databaseName,
          graphName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getGremlinGraphThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesGetGremlinGraphThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseName: databaseName,
      graphName: graphName,
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

export async function _getGremlinGraphThroughputDeserialize(
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

/** Gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinGraphThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  graphName: string,
  options: GremlinResourcesGetGremlinGraphThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getGremlinGraphThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    graphName,
    options,
  );
  return _getGremlinGraphThroughputDeserialize(result);
}

export function _migrateGremlinDatabaseToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
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

export async function _migrateGremlinDatabaseToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Gremlin database from autoscale to manual throughput */
export function migrateGremlinDatabaseToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesMigrateGremlinDatabaseToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateGremlinDatabaseToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateGremlinDatabaseToManualThroughputSend(
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

export function _migrateGremlinDatabaseToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
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

export async function _migrateGremlinDatabaseToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Gremlin database from manual throughput to autoscale */
export function migrateGremlinDatabaseToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateGremlinDatabaseToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateGremlinDatabaseToAutoscaleSend(
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

export function _updateGremlinDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
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

export async function _updateGremlinDatabaseThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Gremlin database */
export function updateGremlinDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: GremlinResourcesUpdateGremlinDatabaseThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateGremlinDatabaseThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateGremlinDatabaseThroughputSend(
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

export function _getGremlinDatabaseThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesGetGremlinDatabaseThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default{?api%2Dversion}",
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

export async function _getGremlinDatabaseThroughputDeserialize(
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

/** Gets the RUs per second of the Gremlin database under an existing Azure Cosmos DB database account with the provided name. */
export async function getGremlinDatabaseThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseName: string,
  options: GremlinResourcesGetGremlinDatabaseThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getGremlinDatabaseThroughputSend(
    context,
    resourceGroupName,
    accountName,
    databaseName,
    options,
  );
  return _getGremlinDatabaseThroughputDeserialize(result);
}
