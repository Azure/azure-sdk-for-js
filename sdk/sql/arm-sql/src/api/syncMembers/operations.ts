// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  _SyncFullSchemaPropertiesListResult,
  SyncFullSchemaProperties,
  SyncMember,
  _SyncMemberListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _syncFullSchemaPropertiesListResultDeserializer,
  syncMemberSerializer,
  syncMemberDeserializer,
  _syncMemberListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SyncMembersListMemberSchemasOptionalParams,
  SyncMembersRefreshMemberSchemaOptionalParams,
  SyncMembersListBySyncGroupOptionalParams,
  SyncMembersDeleteOptionalParams,
  SyncMembersUpdateOptionalParams,
  SyncMembersCreateOrUpdateOptionalParams,
  SyncMembersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listMemberSchemasSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersListMemberSchemasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/schemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
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

export async function _listMemberSchemasDeserialize(
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

/** Gets a sync member database schema. */
export function listMemberSchemas(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersListMemberSchemasOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncFullSchemaProperties> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMemberSchemasSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
    _listMemberSchemasDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _refreshMemberSchemaSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersRefreshMemberSchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/refreshSchema{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshMemberSchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Refreshes a sync member database schema. */
export function refreshMemberSchema(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersRefreshMemberSchemaOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshMemberSchemaDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshMemberSchemaSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySyncGroupSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncMembersListBySyncGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers{?api%2Dversion}",
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

export async function _listBySyncGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncMemberListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncMemberListResultDeserializer(result.body);
}

/** Lists sync members in the given sync group. */
export function listBySyncGroup(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  options: SyncMembersListBySyncGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncMember> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySyncGroupSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      ),
    _listBySyncGroupDeserialize,
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
  syncMemberName: string,
  options: SyncMembersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
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

/** Deletes a sync member. */
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
  syncMemberName: string,
  options: SyncMembersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
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
  syncMemberName: string,
  parameters: SyncMember,
  options: SyncMembersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
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
    body: syncMemberSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SyncMember> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncMemberDeserializer(result.body);
}

/** Updates an existing sync member. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  parameters: SyncMember,
  options: SyncMembersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SyncMember>, SyncMember> {
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
        syncMemberName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<SyncMember>, SyncMember>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  parameters: SyncMember,
  options: SyncMembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
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
    body: syncMemberSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SyncMember> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncMemberDeserializer(result.body);
}

/** Creates or updates a sync member. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  parameters: SyncMember,
  options: SyncMembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SyncMember>, SyncMember> {
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
        syncMemberName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<SyncMember>, SyncMember>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      syncGroupName: syncGroupName,
      syncMemberName: syncMemberName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SyncMember> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncMemberDeserializer(result.body);
}

/** Gets a sync member. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  syncGroupName: string,
  syncMemberName: string,
  options: SyncMembersGetOptionalParams = { requestOptions: {} },
): Promise<SyncMember> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    syncMemberName,
    options,
  );
  return _getDeserialize(result);
}
