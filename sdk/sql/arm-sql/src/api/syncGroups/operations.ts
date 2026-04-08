// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  SyncGroup,
  _SyncGroupListResult,
  _SyncFullSchemaPropertiesListResult,
  SyncFullSchemaProperties,
  _SyncGroupLogListResult,
  SyncGroupLogProperties,
  _SyncDatabaseIdListResult,
  SyncDatabaseIdProperties,
  SyncGroupsType,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  syncGroupSerializer,
  syncGroupDeserializer,
  _syncGroupListResultDeserializer,
  _syncFullSchemaPropertiesListResultDeserializer,
  _syncGroupLogListResultDeserializer,
  _syncDatabaseIdListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SyncGroupsListSyncDatabaseIdsOptionalParams,
  SyncGroupsTriggerSyncOptionalParams,
  SyncGroupsRefreshHubSchemaOptionalParams,
  SyncGroupsListLogsOptionalParams,
  SyncGroupsListHubSchemasOptionalParams,
  SyncGroupsCancelSyncOptionalParams,
  SyncGroupsListByDatabaseOptionalParams,
  SyncGroupsDeleteOptionalParams,
  SyncGroupsUpdateOptionalParams,
  SyncGroupsCreateOrUpdateOptionalParams,
  SyncGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSyncDatabaseIdsSend(
  context: Client,
  locationName: string,
  options: SyncGroupsListSyncDatabaseIdsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/syncDatabaseIds{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listSyncDatabaseIdsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncDatabaseIdListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncDatabaseIdListResultDeserializer(result.body);
}

/** Gets a collection of sync database ids. */
export function listSyncDatabaseIds(
  context: Client,
  locationName: string,
  options: SyncGroupsListSyncDatabaseIdsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncDatabaseIdProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listSyncDatabaseIdsSend(context, locationName, options),
    _listSyncDatabaseIdsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _triggerSyncSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsTriggerSyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/triggerSync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _triggerSyncDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Triggers a sync group synchronization. */
export async function triggerSync(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsTriggerSyncOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _triggerSyncSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    options,
  );
  return _triggerSyncDeserialize(result);
}

export function _refreshHubSchemaSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsRefreshHubSchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/refreshHubSchema{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshHubSchemaDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Refreshes a hub database schema. */
export function refreshHubSchema(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsRefreshHubSchemaOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshHubSchemaDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshHubSchemaSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listLogsSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  startTime: string,
  endTime: string,
  typeParam: SyncGroupsType,
  options: SyncGroupsListLogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/logs{?api%2Dversion,startTime,endTime,type,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      startTime: startTime,
      endTime: endTime,
      type: typeParam,
      continuationToken: options?.continuationToken,
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

export async function _listLogsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncGroupLogListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncGroupLogListResultDeserializer(result.body);
}

/** Gets a collection of sync group logs. */
export function listLogs(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  startTime: string,
  endTime: string,
  typeParam: SyncGroupsType,
  options: SyncGroupsListLogsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncGroupLogProperties> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listLogsSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        startTime,
        endTime,
        typeParam,
        options,
      ),
    _listLogsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listHubSchemasSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsListHubSchemasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/hubSchemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listHubSchemasDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncFullSchemaPropertiesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncFullSchemaPropertiesListResultDeserializer(result.body);
}

/** Gets a collection of hub database schemas. */
export function listHubSchemas(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsListHubSchemasOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncFullSchemaProperties> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listHubSchemasSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      ),
    _listHubSchemasDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _cancelSyncSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsCancelSyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/cancelSync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelSyncDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels a sync group synchronization. */
export async function cancelSync(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsCancelSyncOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSyncSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    options,
  );
  return _cancelSyncDeserialize(result);
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: SyncGroupsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncGroupListResultDeserializer(result.body);
}

/** Lists sync groups under a hub database. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: SyncGroupsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, serverName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a sync group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  parameters: SyncGroup,
  options: SyncGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: syncGroupSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SyncGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncGroupDeserializer(result.body);
}

/** Updates a sync group. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  parameters: SyncGroup,
  options: SyncGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SyncGroup>, SyncGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<SyncGroup>, SyncGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  parameters: SyncGroup,
  options: SyncGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: syncGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SyncGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncGroupDeserializer(result.body);
}

/** Creates or updates a sync group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  parameters: SyncGroup,
  options: SyncGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SyncGroup>, SyncGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<SyncGroup>, SyncGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SyncGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncGroupDeserializer(result.body);
}

/** Gets a sync group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncGroupsGetOptionalParams = { requestOptions: {} },
): Promise<SyncGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    options,
  );
  return _getDeserialize(result);
}
