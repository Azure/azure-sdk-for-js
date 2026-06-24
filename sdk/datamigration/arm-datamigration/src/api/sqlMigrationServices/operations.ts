// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SqlMigrationService,
  sqlMigrationServiceSerializer,
  sqlMigrationServiceDeserializer,
  SqlMigrationServiceUpdate,
  sqlMigrationServiceUpdateSerializer,
  _SqlMigrationListResult,
  _sqlMigrationListResultDeserializer,
  AuthenticationKeys,
  authenticationKeysDeserializer,
  RegenAuthKeys,
  regenAuthKeysSerializer,
  regenAuthKeysDeserializer,
  DeleteNode,
  deleteNodeSerializer,
  deleteNodeDeserializer,
  _DatabaseMigrationListResult,
  _databaseMigrationListResultDeserializer,
  DatabaseMigration,
  IntegrationRuntimeMonitoringData,
  integrationRuntimeMonitoringDataDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SqlMigrationServicesListMonitoringDataOptionalParams,
  SqlMigrationServicesListMigrationsOptionalParams,
  SqlMigrationServicesDeleteNodeOptionalParams,
  SqlMigrationServicesRegenerateAuthKeysOptionalParams,
  SqlMigrationServicesListAuthKeysOptionalParams,
  SqlMigrationServicesListBySubscriptionOptionalParams,
  SqlMigrationServicesListByResourceGroupOptionalParams,
  SqlMigrationServicesDeleteOptionalParams,
  SqlMigrationServicesUpdateOptionalParams,
  SqlMigrationServicesCreateOrUpdateOptionalParams,
  SqlMigrationServicesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listMonitoringDataSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListMonitoringDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listMonitoringData{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listMonitoringDataDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeMonitoringData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return integrationRuntimeMonitoringDataDeserializer(result.body);
}

/** Retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service. */
export async function listMonitoringData(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListMonitoringDataOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeMonitoringData> {
  const result = await _listMonitoringDataSend(
    context,
    resourceGroupName,
    sqlMigrationServiceName,
    options,
  );
  return _listMonitoringDataDeserialize(result);
}

export function _listMigrationsSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListMigrationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listMigrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listMigrationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseMigrationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseMigrationListResultDeserializer(result.body);
}

/** Retrieve the List of database migrations attached to the service. */
export function listMigrations(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListMigrationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseMigration> {
  return buildPagedAsyncIterator(
    context,
    () => _listMigrationsSend(context, resourceGroupName, sqlMigrationServiceName, options),
    _listMigrationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _deleteNodeSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: DeleteNode,
  options: SqlMigrationServicesDeleteNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/deleteNode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deleteNodeSerializer(parameters),
    });
}

export async function _deleteNodeDeserialize(result: PathUncheckedResponse): Promise<DeleteNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteNodeDeserializer(result.body);
}

/** Delete the integration runtime node. */
export async function deleteNode(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: DeleteNode,
  options: SqlMigrationServicesDeleteNodeOptionalParams = { requestOptions: {} },
): Promise<DeleteNode> {
  const result = await _deleteNodeSend(
    context,
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
    options,
  );
  return _deleteNodeDeserialize(result);
}

export function _regenerateAuthKeysSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: RegenAuthKeys,
  options: SqlMigrationServicesRegenerateAuthKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/regenerateAuthKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: regenAuthKeysSerializer(parameters),
    });
}

export async function _regenerateAuthKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<RegenAuthKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return regenAuthKeysDeserializer(result.body);
}

/** Regenerate a new set of Authentication Keys for Self Hosted Integration Runtime. */
export async function regenerateAuthKeys(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: RegenAuthKeys,
  options: SqlMigrationServicesRegenerateAuthKeysOptionalParams = { requestOptions: {} },
): Promise<RegenAuthKeys> {
  const result = await _regenerateAuthKeysSend(
    context,
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
    options,
  );
  return _regenerateAuthKeysDeserialize(result);
}

export function _listAuthKeysSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListAuthKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listAuthKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAuthKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthenticationKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authenticationKeysDeserializer(result.body);
}

/** Retrieve the List of Authentication Keys for Self Hosted Integration Runtime. */
export async function listAuthKeys(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesListAuthKeysOptionalParams = { requestOptions: {} },
): Promise<AuthenticationKeys> {
  const result = await _listAuthKeysSend(
    context,
    resourceGroupName,
    sqlMigrationServiceName,
    options,
  );
  return _listAuthKeysDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: SqlMigrationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/sqlMigrationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlMigrationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlMigrationListResultDeserializer(result.body);
}

/** Retrieve all SQL migration services in the subscriptions. */
export function listBySubscription(
  context: Client,
  options: SqlMigrationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlMigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SqlMigrationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlMigrationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlMigrationListResultDeserializer(result.body);
}

/** Retrieve all SQL migration services in the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SqlMigrationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlMigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete Database Migration Service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlMigrationServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: SqlMigrationServiceUpdate,
  options: SqlMigrationServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: sqlMigrationServiceUpdateSerializer(parameters),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlMigrationService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlMigrationServiceDeserializer(result.body);
}

/** Update Database Migration Service. */
export function update(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: SqlMigrationServiceUpdate,
  options: SqlMigrationServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlMigrationService>, SqlMigrationService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<SqlMigrationService>, SqlMigrationService>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: SqlMigrationService,
  options: SqlMigrationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: sqlMigrationServiceSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlMigrationService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlMigrationServiceDeserializer(result.body);
}

/** Create or Update Database Migration Service. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  parameters: SqlMigrationService,
  options: SqlMigrationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlMigrationService>, SqlMigrationService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<SqlMigrationService>, SqlMigrationService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlMigrationServiceName: sqlMigrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SqlMigrationService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlMigrationServiceDeserializer(result.body);
}

/** Retrieve the Database Migration Service */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlMigrationServiceName: string,
  options: SqlMigrationServicesGetOptionalParams = { requestOptions: {} },
): Promise<SqlMigrationService> {
  const result = await _getSend(context, resourceGroupName, sqlMigrationServiceName, options);
  return _getDeserialize(result);
}
