// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ServerDevOpsAuditingSettings,
  DevOpsAuditingSettingsName,
  _ServerDevOpsAuditSettingsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverDevOpsAuditingSettingsSerializer,
  serverDevOpsAuditingSettingsDeserializer,
  _serverDevOpsAuditSettingsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerDevOpsAuditSettingsListByServerOptionalParams,
  ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ServerDevOpsAuditSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerDevOpsAuditSettingsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings{?api%2Dversion}",
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
): Promise<_ServerDevOpsAuditSettingsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _serverDevOpsAuditSettingsListResultDeserializer(result.body);
}

/** Lists DevOps audit settings of a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerDevOpsAuditSettingsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerDevOpsAuditingSettings> {
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

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
  parameters: ServerDevOpsAuditingSettings,
  options: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      devOpsAuditingSettingsName: devOpsAuditingSettingsName,
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
    body: serverDevOpsAuditingSettingsSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerDevOpsAuditingSettings> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverDevOpsAuditingSettingsDeserializer(result.body);
}

/** Creates or updates a server's DevOps audit settings. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
  parameters: ServerDevOpsAuditingSettings,
  options: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerDevOpsAuditingSettings>, ServerDevOpsAuditingSettings> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        devOpsAuditingSettingsName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ServerDevOpsAuditingSettings>, ServerDevOpsAuditingSettings>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
  options: ServerDevOpsAuditSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      devOpsAuditingSettingsName: devOpsAuditingSettingsName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerDevOpsAuditingSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverDevOpsAuditingSettingsDeserializer(result.body);
}

/** Gets a server's DevOps audit settings. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
  options: ServerDevOpsAuditSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ServerDevOpsAuditingSettings> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    devOpsAuditingSettingsName,
    options,
  );
  return _getDeserialize(result);
}
