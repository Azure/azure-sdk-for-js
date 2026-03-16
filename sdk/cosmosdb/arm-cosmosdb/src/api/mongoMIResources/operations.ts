// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  MongoMIRoleDefinitionResource,
  _MongoMIRoleDefinitionListResult,
  MongoMIRoleAssignmentResource,
  _MongoMIRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  mongoMIRoleDefinitionResourceSerializer,
  mongoMIRoleDefinitionResourceDeserializer,
  _mongoMIRoleDefinitionListResultDeserializer,
  mongoMIRoleAssignmentResourceSerializer,
  mongoMIRoleAssignmentResourceDeserializer,
  _mongoMIRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams,
  MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams,
  MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams,
  MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams,
  MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams,
  MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listMongoMIRoleAssignmentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments{?api%2Dversion}",
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

export async function _listMongoMIRoleAssignmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoMIRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _mongoMIRoleAssignmentListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB MongoMI Role Assignments. */
export function listMongoMIRoleAssignments(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoMIRoleAssignmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listMongoMIRoleAssignmentsSend(context, resourceGroupName, accountName, options),
    _listMongoMIRoleAssignmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoMIRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _deleteMongoMIRoleAssignmentDeserialize(
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

/** Deletes an existing Azure Cosmos DB MongoMI Role Assignment. */
export function deleteMongoMIRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteMongoMIRoleAssignmentDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteMongoMIRoleAssignmentSend(
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

export function _createUpdateMongoMIRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
  options: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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
    body: mongoMIRoleAssignmentResourceSerializer(createUpdateMongoMIRoleAssignmentParameters),
  });
}

export async function _createUpdateMongoMIRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoMIRoleAssignmentResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoMIRoleAssignmentResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB MongoMI Role Assignment. */
export function createUpdateMongoMIRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource,
  options: MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoMIRoleAssignmentResource>, MongoMIRoleAssignmentResource> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoMIRoleAssignmentDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoMIRoleAssignmentSend(
          context,
          resourceGroupName,
          accountName,
          roleAssignmentId,
          createUpdateMongoMIRoleAssignmentParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoMIRoleAssignmentResource>, MongoMIRoleAssignmentResource>;
}

export function _getMongoMIRoleAssignmentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments/{roleAssignmentId}{?api%2Dversion}",
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

export async function _getMongoMIRoleAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoMIRoleAssignmentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoMIRoleAssignmentResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Assignment with the given Id. */
export async function getMongoMIRoleAssignment(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleAssignmentId: string,
  options: MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams = { requestOptions: {} },
): Promise<MongoMIRoleAssignmentResource> {
  const result = await _getMongoMIRoleAssignmentSend(
    context,
    resourceGroupName,
    accountName,
    roleAssignmentId,
    options,
  );
  return _getMongoMIRoleAssignmentDeserialize(result);
}

export function _listMongoMIRoleDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions{?api%2Dversion}",
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

export async function _listMongoMIRoleDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoMIRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _mongoMIRoleDefinitionListResultDeserializer(result.body);
}

/** Retrieves the list of all Azure Cosmos DB MongoMI Role Definitions. */
export function listMongoMIRoleDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoMIRoleDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listMongoMIRoleDefinitionsSend(context, resourceGroupName, accountName, options),
    _listMongoMIRoleDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteMongoMIRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _deleteMongoMIRoleDefinitionDeserialize(
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

/** Deletes an existing Azure Cosmos DB MongoMI Role Definition. */
export function deleteMongoMIRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteMongoMIRoleDefinitionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteMongoMIRoleDefinitionSend(
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

export function _createUpdateMongoMIRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
  options: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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
    body: mongoMIRoleDefinitionResourceSerializer(createUpdateMongoMIRoleDefinitionParameters),
  });
}

export async function _createUpdateMongoMIRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoMIRoleDefinitionResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoMIRoleDefinitionResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB MongoMI Role Definition. */
export function createUpdateMongoMIRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  createUpdateMongoMIRoleDefinitionParameters: MongoMIRoleDefinitionResource,
  options: MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoMIRoleDefinitionResource>, MongoMIRoleDefinitionResource> {
  return getLongRunningPoller(
    context,
    _createUpdateMongoMIRoleDefinitionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createUpdateMongoMIRoleDefinitionSend(
          context,
          resourceGroupName,
          accountName,
          roleDefinitionId,
          createUpdateMongoMIRoleDefinitionParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<MongoMIRoleDefinitionResource>, MongoMIRoleDefinitionResource>;
}

export function _getMongoMIRoleDefinitionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions/{roleDefinitionId}{?api%2Dversion}",
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

export async function _getMongoMIRoleDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoMIRoleDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mongoMIRoleDefinitionResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Definition with the given Id. */
export async function getMongoMIRoleDefinition(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  roleDefinitionId: string,
  options: MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams = { requestOptions: {} },
): Promise<MongoMIRoleDefinitionResource> {
  const result = await _getMongoMIRoleDefinitionSend(
    context,
    resourceGroupName,
    accountName,
    roleDefinitionId,
    options,
  );
  return _getMongoMIRoleDefinitionDeserialize(result);
}
