// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  SyncAgent,
  _SyncAgentListResult,
  SyncAgentKeyProperties,
  _SyncAgentLinkedDatabaseListResult,
  SyncAgentLinkedDatabase,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  syncAgentSerializer,
  syncAgentDeserializer,
  _syncAgentListResultDeserializer,
  syncAgentKeyPropertiesDeserializer,
  _syncAgentLinkedDatabaseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SyncAgentsListLinkedDatabasesOptionalParams,
  SyncAgentsGenerateKeyOptionalParams,
  SyncAgentsListByServerOptionalParams,
  SyncAgentsDeleteOptionalParams,
  SyncAgentsCreateOrUpdateOptionalParams,
  SyncAgentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listLinkedDatabasesSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsListLinkedDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/linkedDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      syncAgentName: syncAgentName,
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

export async function _listLinkedDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncAgentLinkedDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncAgentLinkedDatabaseListResultDeserializer(result.body);
}

/** Lists databases linked to a sync agent. */
export function listLinkedDatabases(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsListLinkedDatabasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncAgentLinkedDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listLinkedDatabasesSend(context, resourceGroupName, serverName, syncAgentName, options),
    _listLinkedDatabasesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _generateKeySend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsGenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/generateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      syncAgentName: syncAgentName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _generateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<SyncAgentKeyProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncAgentKeyPropertiesDeserializer(result.body);
}

/** Generates a sync agent key. */
export async function generateKey(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsGenerateKeyOptionalParams = { requestOptions: {} },
): Promise<SyncAgentKeyProperties> {
  const result = await _generateKeySend(
    context,
    resourceGroupName,
    serverName,
    syncAgentName,
    options,
  );
  return _generateKeyDeserialize(result);
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: SyncAgentsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncAgentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _syncAgentListResultDeserializer(result.body);
}

/** Lists sync agents in a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: SyncAgentsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncAgent> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
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
  syncAgentName: string,
  options: SyncAgentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      syncAgentName: syncAgentName,
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

/** Deletes a sync agent. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, syncAgentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  parameters: SyncAgent,
  options: SyncAgentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      syncAgentName: syncAgentName,
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
    body: syncAgentSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SyncAgent> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncAgentDeserializer(result.body);
}

/** Creates or updates a sync agent. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  parameters: SyncAgent,
  options: SyncAgentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SyncAgent>, SyncAgent> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        syncAgentName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<SyncAgent>, SyncAgent>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      syncAgentName: syncAgentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SyncAgent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return syncAgentDeserializer(result.body);
}

/** Gets a sync agent. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  syncAgentName: string,
  options: SyncAgentsGetOptionalParams = { requestOptions: {} },
): Promise<SyncAgent> {
  const result = await _getSend(context, resourceGroupName, serverName, syncAgentName, options);
  return _getDeserialize(result);
}
