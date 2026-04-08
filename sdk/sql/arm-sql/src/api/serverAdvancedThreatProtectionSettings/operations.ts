// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  AdvancedThreatProtectionName,
  ServerAdvancedThreatProtection,
  _LogicalServerAdvancedThreatProtectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverAdvancedThreatProtectionSerializer,
  serverAdvancedThreatProtectionDeserializer,
  _logicalServerAdvancedThreatProtectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerAdvancedThreatProtectionSettingsListByServerOptionalParams,
  ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ServerAdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAdvancedThreatProtectionSettingsListByServerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings{?api%2Dversion}",
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
): Promise<_LogicalServerAdvancedThreatProtectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _logicalServerAdvancedThreatProtectionListResultDeserializer(result.body);
}

/** Get a list of the server's Advanced Threat Protection states. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAdvancedThreatProtectionSettingsListByServerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ServerAdvancedThreatProtection> {
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
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ServerAdvancedThreatProtection,
  options: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advancedThreatProtectionName: advancedThreatProtectionName,
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
    body: serverAdvancedThreatProtectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerAdvancedThreatProtection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverAdvancedThreatProtectionDeserializer(result.body);
}

/** Creates or updates an Advanced Threat Protection state. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ServerAdvancedThreatProtection,
  options: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ServerAdvancedThreatProtection>, ServerAdvancedThreatProtection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ServerAdvancedThreatProtection>, ServerAdvancedThreatProtection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ServerAdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advancedThreatProtectionName: advancedThreatProtectionName,
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
): Promise<ServerAdvancedThreatProtection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverAdvancedThreatProtectionDeserializer(result.body);
}

/** Get a server's Advanced Threat Protection state. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ServerAdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ServerAdvancedThreatProtection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    advancedThreatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
