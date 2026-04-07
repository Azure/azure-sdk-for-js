// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { DatabaseTable, _DatabaseTableListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseTableDeserializer,
  _databaseTableListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseTablesListBySchemaOptionalParams,
  DatabaseTablesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySchemaSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  options: DatabaseTablesListBySchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24filter": options?.filter,
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

export async function _listBySchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseTableListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseTableListResultDeserializer(result.body);
}

/** List database tables */
export function listBySchema(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  options: DatabaseTablesListBySchemaOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseTable> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySchemaSend(context, resourceGroupName, serverName, databaseName, schemaName, options),
    _listBySchemaDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: DatabaseTablesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseTable> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseTableDeserializer(result.body);
}

/** Get database table */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: DatabaseTablesGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseTable> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    schemaName,
    tableName,
    options,
  );
  return _getDeserialize(result);
}
