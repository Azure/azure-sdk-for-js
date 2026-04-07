// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { DatabaseColumn, _DatabaseColumnListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseColumnDeserializer,
  _databaseColumnListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseColumnsListByDatabaseOptionalParams,
  DatabaseColumnsListByTableOptionalParams,
  DatabaseColumnsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseColumnsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/columns{?api%2Dversion,schema*,table*,column*,orderBy*,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      schema: !options?.schema
        ? options?.schema
        : options?.schema.map((p: any) => {
            return p;
          }),
      table: !options?.table
        ? options?.table
        : options?.table.map((p: any) => {
            return p;
          }),
      column: !options?.column
        ? options?.column
        : options?.column.map((p: any) => {
            return p;
          }),
      orderBy: !options?.orderBy
        ? options?.orderBy
        : options?.orderBy.map((p: any) => {
            return p;
          }),
      "%24skiptoken": options?.skiptoken,
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
): Promise<_DatabaseColumnListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseColumnListResultDeserializer(result.body);
}

/** List database columns */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseColumnsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseColumn> {
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

export function _listByTableSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: DatabaseColumnsListByTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
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

export async function _listByTableDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseColumnListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseColumnListResultDeserializer(result.body);
}

/** List database columns */
export function listByTable(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: DatabaseColumnsListByTableOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseColumn> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByTableSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        options,
      ),
    _listByTableDeserialize,
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
  columnName: string,
  options: DatabaseColumnsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseColumn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseColumnDeserializer(result.body);
}

/** Get database column */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  options: DatabaseColumnsGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseColumn> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    options,
  );
  return _getDeserialize(result);
}
