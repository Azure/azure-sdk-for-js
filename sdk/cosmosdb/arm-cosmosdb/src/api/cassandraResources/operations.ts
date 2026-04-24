// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  ThroughputSettingsGetResults,
  ThroughputSettingsUpdateParameters,
  CassandraKeyspaceGetResults,
  CassandraKeyspaceCreateUpdateParameters,
  _CassandraKeyspaceListResult,
  CassandraTableGetResults,
  CassandraTableCreateUpdateParameters,
  _CassandraTableListResult,
  CassandraViewGetResults,
  CassandraViewCreateUpdateParameters,
  _CassandraViewListResult,
  CassandraRoleDefinitionResource,
  _CassandraRoleDefinitionListResult,
  CassandraRoleAssignmentResource,
  _CassandraRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  throughputSettingsGetResultsDeserializer,
  throughputSettingsUpdateParametersSerializer,
  cassandraKeyspaceGetResultsDeserializer,
  cassandraKeyspaceCreateUpdateParametersSerializer,
  _cassandraKeyspaceListResultDeserializer,
  cassandraTableGetResultsDeserializer,
  cassandraTableCreateUpdateParametersSerializer,
  _cassandraTableListResultDeserializer,
  cassandraViewGetResultsDeserializer,
  cassandraViewCreateUpdateParametersSerializer,
  _cassandraViewListResultDeserializer,
  cassandraRoleDefinitionResourceSerializer,
  cassandraRoleDefinitionResourceDeserializer,
  _cassandraRoleDefinitionListResultDeserializer,
  cassandraRoleAssignmentResourceSerializer,
  cassandraRoleAssignmentResourceDeserializer,
  _cassandraRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CassandraResourcesListCassandraRoleAssignmentsOptionalParams,
  CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams,
  CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams,
  CassandraResourcesGetCassandraRoleAssignmentOptionalParams,
  CassandraResourcesListCassandraRoleDefinitionsOptionalParams,
  CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams,
  CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams,
  CassandraResourcesGetCassandraRoleDefinitionOptionalParams,
  CassandraResourcesListCassandraViewsOptionalParams,
  CassandraResourcesDeleteCassandraViewOptionalParams,
  CassandraResourcesCreateUpdateCassandraViewOptionalParams,
  CassandraResourcesGetCassandraViewOptionalParams,
  CassandraResourcesListCassandraTablesOptionalParams,
  CassandraResourcesDeleteCassandraTableOptionalParams,
  CassandraResourcesCreateUpdateCassandraTableOptionalParams,
  CassandraResourcesGetCassandraTableOptionalParams,
  CassandraResourcesListCassandraKeyspacesOptionalParams,
  CassandraResourcesDeleteCassandraKeyspaceOptionalParams,
  CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams,
  CassandraResourcesGetCassandraKeyspaceOptionalParams,
  CassandraResourcesMigrateCassandraViewToManualThroughputOptionalParams,
  CassandraResourcesMigrateCassandraViewToAutoscaleOptionalParams,
  CassandraResourcesUpdateCassandraViewThroughputOptionalParams,
  CassandraResourcesGetCassandraViewThroughputOptionalParams,
  CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams,
  CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams,
  CassandraResourcesUpdateCassandraTableThroughputOptionalParams,
  CassandraResourcesGetCassandraTableThroughputOptionalParams,
  CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams,
  CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams,
  CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams,
  CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listCassandraRoleAssignmentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraRoleAssignmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments{?api%2Dversion}",
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

export async function _listCassandraRoleAssignmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CassandraRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cassandraRoleAssignmentListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Cassandra Role Assignments. */
export function listCassandraRoleAssignments(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraRoleAssignmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CassandraRoleAssignmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listCassandraRoleAssignmentsSend(context, resourceGroupName, accountName, options),
    _listCassandraRoleAssignmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteCassandraRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _deleteCassandraRoleAssignmentDeserialize(
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

/** Deletes an existing Azure Cosmos DB Cassandra Role Assignment. */
export function deleteCassandraRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: CassandraResourcesDeleteCassandraRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteCassandraRoleAssignmentDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteCassandraRoleAssignmentSend(
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

export function _createUpdateCassandraRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
  options: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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
    body: cassandraRoleAssignmentResourceSerializer(createUpdateCassandraRoleAssignmentParameters),
  });
}

export async function _createUpdateCassandraRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraRoleAssignmentResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraRoleAssignmentResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Cassandra Role Assignment. */
export function createUpdateCassandraRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateCassandraRoleAssignmentParameters: CassandraRoleAssignmentResource,
  options: CassandraResourcesCreateUpdateCassandraRoleAssignmentOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CassandraRoleAssignmentResource>, CassandraRoleAssignmentResource> {
  return getLongRunningPoller(
    context,
    _createUpdateCassandraRoleAssignmentDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateCassandraRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          createUpdateCassandraRoleAssignmentParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<CassandraRoleAssignmentResource>, CassandraRoleAssignmentResource>;
}

export function _getCassandraRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: CassandraResourcesGetCassandraRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _getCassandraRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraRoleAssignmentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraRoleAssignmentResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id. */
export async function getCassandraRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: CassandraResourcesGetCassandraRoleAssignmentOptionalParams = { requestOptions: {} },
): Promise<CassandraRoleAssignmentResource> {
  const result = await _getCassandraRoleAssignmentSend(
    context,
    resourceGroupName,
    accountName,
    roleAssignmentId,
    options,
  );
  return _getCassandraRoleAssignmentDeserialize(result);
}

export function _listCassandraRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions{?api%2Dversion}",
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

export async function _listCassandraRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CassandraRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cassandraRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB Cassandra Role Definitions. */
export function listCassandraRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CassandraRoleDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listCassandraRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listCassandraRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteCassandraRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _deleteCassandraRoleDefinitionDeserialize(
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

/** Deletes an existing Azure Cosmos DB Cassandra Role Definition. */
export function deleteCassandraRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: CassandraResourcesDeleteCassandraRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteCassandraRoleDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteCassandraRoleDefinitionSend(
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

export function _createUpdateCassandraRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
  options: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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
    body: cassandraRoleDefinitionResourceSerializer(createUpdateCassandraRoleDefinitionParameters),
  });
}

export async function _createUpdateCassandraRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraRoleDefinitionResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraRoleDefinitionResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB Cassandra Role Definition. */
export function createUpdateCassandraRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource,
  options: CassandraResourcesCreateUpdateCassandraRoleDefinitionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CassandraRoleDefinitionResource>, CassandraRoleDefinitionResource> {
  return getLongRunningPoller(
    context,
    _createUpdateCassandraRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateCassandraRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          createUpdateCassandraRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<CassandraRoleDefinitionResource>, CassandraRoleDefinitionResource>;
}

export function _getCassandraRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: CassandraResourcesGetCassandraRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _getCassandraRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraRoleDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraRoleDefinitionResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Cassandra Role Definition with the given Id. */
export async function getCassandraRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: CassandraResourcesGetCassandraRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<CassandraRoleDefinitionResource> {
  const result = await _getCassandraRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    roleDefinitionId,
    options,
  );
  return _getCassandraRoleDefinitionDeserialize(result);
}

export function _listCassandraViewsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesListCassandraViewsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _listCassandraViewsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CassandraViewListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cassandraViewListResultDeserializer(result.body);
}

/** Lists the Cassandra materialized views under an existing Azure Cosmos DB database account. */
export function listCassandraViews(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesListCassandraViewsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CassandraViewGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listCassandraViewsSend(context, resourceGroupName, accountName, keyspaceName, options),
    _listCassandraViewsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteCassandraViewSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesDeleteCassandraViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCassandraViewDeserialize(
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

/** Deletes an existing Azure Cosmos DB Cassandra view. */
export function deleteCassandraView(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesDeleteCassandraViewOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteCassandraViewDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteCassandraViewSend(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        viewName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateCassandraViewSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  createUpdateCassandraViewParameters: CassandraViewCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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
    body: cassandraViewCreateUpdateParametersSerializer(createUpdateCassandraViewParameters),
  });
}

export async function _createUpdateCassandraViewDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraViewGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraViewGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Cassandra View */
export function createUpdateCassandraView(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  createUpdateCassandraViewParameters: CassandraViewCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraViewOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CassandraViewGetResults>, CassandraViewGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateCassandraViewDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateCassandraViewSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          viewName,
          createUpdateCassandraViewParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<CassandraViewGetResults>, CassandraViewGetResults>;
}

export function _getCassandraViewSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesGetCassandraViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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

export async function _getCassandraViewDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraViewGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraViewGetResultsDeserializer(result.body);
}

/** Gets the Cassandra view under an existing Azure Cosmos DB database account. */
export async function getCassandraView(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesGetCassandraViewOptionalParams = { requestOptions: {} },
): Promise<CassandraViewGetResults> {
  const result = await _getCassandraViewSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    viewName,
    options,
  );
  return _getCassandraViewDeserialize(result);
}

export function _listCassandraTablesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesListCassandraTablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _listCassandraTablesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CassandraTableListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cassandraTableListResultDeserializer(result.body);
}

/** Lists the Cassandra table under an existing Azure Cosmos DB database account. */
export function listCassandraTables(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesListCassandraTablesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CassandraTableGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listCassandraTablesSend(context, resourceGroupName, accountName, keyspaceName, options),
    _listCassandraTablesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteCassandraTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesDeleteCassandraTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      tableName: tableName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCassandraTableDeserialize(
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

/** Deletes an existing Azure Cosmos DB Cassandra table. */
export function deleteCassandraTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesDeleteCassandraTableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteCassandraTableDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteCassandraTableSend(
        context,
        resourceGroupName,
        accountName,
        keyspaceName,
        tableName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateCassandraTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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
    body: cassandraTableCreateUpdateParametersSerializer(createUpdateCassandraTableParameters),
  });
}

export async function _createUpdateCassandraTableDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraTableGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraTableGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Cassandra Table */
export function createUpdateCassandraTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  createUpdateCassandraTableParameters: CassandraTableCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraTableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CassandraTableGetResults>, CassandraTableGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateCassandraTableDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateCassandraTableSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          tableName,
          createUpdateCassandraTableParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<CassandraTableGetResults>, CassandraTableGetResults>;
}

export function _getCassandraTableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesGetCassandraTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _getCassandraTableDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraTableGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraTableGetResultsDeserializer(result.body);
}

/** Gets the Cassandra table under an existing Azure Cosmos DB database account. */
export async function getCassandraTable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesGetCassandraTableOptionalParams = { requestOptions: {} },
): Promise<CassandraTableGetResults> {
  const result = await _getCassandraTableSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    tableName,
    options,
  );
  return _getCassandraTableDeserialize(result);
}

export function _listCassandraKeyspacesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraKeyspacesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces{?api%2Dversion}",
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

export async function _listCassandraKeyspacesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CassandraKeyspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cassandraKeyspaceListResultDeserializer(result.body);
}

/** Lists the Cassandra keyspaces under an existing Azure Cosmos DB database account. */
export function listCassandraKeyspaces(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CassandraResourcesListCassandraKeyspacesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CassandraKeyspaceGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listCassandraKeyspacesSend(context, resourceGroupName, accountName, options),
    _listCassandraKeyspacesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteCassandraKeyspaceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesDeleteCassandraKeyspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCassandraKeyspaceDeserialize(
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

/** Deletes an existing Azure Cosmos DB Cassandra keyspace. */
export function deleteCassandraKeyspace(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesDeleteCassandraKeyspaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteCassandraKeyspaceDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteCassandraKeyspaceSend(context, resourceGroupName, accountName, keyspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateCassandraKeyspaceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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
    body: cassandraKeyspaceCreateUpdateParametersSerializer(
      createUpdateCassandraKeyspaceParameters,
    ),
  });
}

export async function _createUpdateCassandraKeyspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraKeyspaceGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraKeyspaceGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Cassandra keyspace */
export function createUpdateCassandraKeyspace(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters,
  options: CassandraResourcesCreateUpdateCassandraKeyspaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CassandraKeyspaceGetResults>, CassandraKeyspaceGetResults> {
  return getLongRunningPoller(
    context,
    _createUpdateCassandraKeyspaceDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateCassandraKeyspaceSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          createUpdateCassandraKeyspaceParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<CassandraKeyspaceGetResults>, CassandraKeyspaceGetResults>;
}

export function _getCassandraKeyspaceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesGetCassandraKeyspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _getCassandraKeyspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraKeyspaceGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return cassandraKeyspaceGetResultsDeserializer(result.body);
}

/** Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraKeyspace(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesGetCassandraKeyspaceOptionalParams = { requestOptions: {} },
): Promise<CassandraKeyspaceGetResults> {
  const result = await _getCassandraKeyspaceSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    options,
  );
  return _getCassandraKeyspaceDeserialize(result);
}

export function _migrateCassandraViewToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesMigrateCassandraViewToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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

export async function _migrateCassandraViewToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra view from autoscale to manual throughput */
export function migrateCassandraViewToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesMigrateCassandraViewToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraViewToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraViewToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          viewName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateCassandraViewToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesMigrateCassandraViewToAutoscaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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

export async function _migrateCassandraViewToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra view from manual throughput to autoscale */
export function migrateCassandraViewToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesMigrateCassandraViewToAutoscaleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraViewToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraViewToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          viewName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateCassandraViewThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraViewThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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

export async function _updateCassandraViewThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Cassandra view */
export function updateCassandraViewThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraViewThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateCassandraViewThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateCassandraViewThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          viewName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getCassandraViewThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesGetCassandraViewThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
      viewName: viewName,
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

export async function _getCassandraViewThroughputDeserialize(
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

/** Gets the RUs per second of the Cassandra view under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraViewThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  viewName: string,
  options: CassandraResourcesGetCassandraViewThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getCassandraViewThroughputSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    viewName,
    options,
  );
  return _getCassandraViewThroughputDeserialize(result);
}

export function _migrateCassandraTableToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _migrateCassandraTableToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra table from autoscale to manual throughput */
export function migrateCassandraTableToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesMigrateCassandraTableToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraTableToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraTableToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          tableName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateCassandraTableToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _migrateCassandraTableToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale */
export function migrateCassandraTableToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesMigrateCassandraTableToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraTableToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraTableToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          tableName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateCassandraTableThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraTableThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _updateCassandraTableThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Cassandra table */
export function updateCassandraTableThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraTableThroughputOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateCassandraTableThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateCassandraTableThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          tableName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getCassandraTableThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesGetCassandraTableThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _getCassandraTableThroughputDeserialize(
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

/** Gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraTableThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  tableName: string,
  options: CassandraResourcesGetCassandraTableThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getCassandraTableThroughputSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    tableName,
    options,
  );
  return _getCassandraTableThroughputDeserialize(result);
}

export function _migrateCassandraKeyspaceToManualThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToManualThroughput{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _migrateCassandraKeyspaceToManualThroughputDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra Keyspace from autoscale to manual throughput */
export function migrateCassandraKeyspaceToManualThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraKeyspaceToManualThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraKeyspaceToManualThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _migrateCassandraKeyspaceToAutoscaleSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToAutoscale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _migrateCassandraKeyspaceToAutoscaleDeserialize(
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

/** Migrate an Azure Cosmos DB Cassandra Keyspace from manual throughput to autoscale */
export function migrateCassandraKeyspaceToAutoscale(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _migrateCassandraKeyspaceToAutoscaleDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _migrateCassandraKeyspaceToAutoscaleSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _updateCassandraKeyspaceThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _updateCassandraKeyspaceThroughputDeserialize(
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

/** Update RUs per second of an Azure Cosmos DB Cassandra Keyspace */
export function updateCassandraKeyspaceThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  updateThroughputParameters: ThroughputSettingsUpdateParameters,
  options: CassandraResourcesUpdateCassandraKeyspaceThroughputOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults> {
  return getLongRunningPoller(
    context,
    _updateCassandraKeyspaceThroughputDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateCassandraKeyspaceThroughputSend(
          context,
          resourceGroupName,
          accountName,
          keyspaceName,
          updateThroughputParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<ThroughputSettingsGetResults>, ThroughputSettingsGetResults>;
}

export function _getCassandraKeyspaceThroughputSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      keyspaceName: keyspaceName,
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

export async function _getCassandraKeyspaceThroughputDeserialize(
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

/** Gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name. */
export async function getCassandraKeyspaceThroughput(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyspaceName: string,
  options: CassandraResourcesGetCassandraKeyspaceThroughputOptionalParams = { requestOptions: {} },
): Promise<ThroughputSettingsGetResults> {
  const result = await _getCassandraKeyspaceThroughputSend(
    context,
    resourceGroupName,
    accountName,
    keyspaceName,
    options,
  );
  return _getCassandraKeyspaceThroughputDeserialize(result);
}
