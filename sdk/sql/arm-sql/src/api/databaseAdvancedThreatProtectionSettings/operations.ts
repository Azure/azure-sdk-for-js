// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  DatabaseAdvancedThreatProtection,
  AdvancedThreatProtectionName,
  _DatabaseAdvancedThreatProtectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseAdvancedThreatProtectionSerializer,
  databaseAdvancedThreatProtectionDeserializer,
  _databaseAdvancedThreatProtectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings{?api%2Dversion}",
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
): Promise<_DatabaseAdvancedThreatProtectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseAdvancedThreatProtectionListResultDeserializer(result.body);
}

/** Gets a list of database's Advanced Threat Protection states. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DatabaseAdvancedThreatProtection> {
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

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: DatabaseAdvancedThreatProtection,
  options: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
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
    body: databaseAdvancedThreatProtectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAdvancedThreatProtection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAdvancedThreatProtectionDeserializer(result.body);
}

/** Creates or updates a database's Advanced Threat Protection state. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: DatabaseAdvancedThreatProtection,
  options: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<DatabaseAdvancedThreatProtection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: DatabaseAdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
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
): Promise<DatabaseAdvancedThreatProtection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAdvancedThreatProtectionDeserializer(result.body);
}

/** Gets a database's Advanced Threat Protection state. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: DatabaseAdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseAdvancedThreatProtection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    advancedThreatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
