// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DatabaseColumn,
  databaseColumnDeserializer,
  _DatabaseColumnListResult,
  _databaseColumnListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedDatabaseColumnsListByDatabaseOptionalParams,
  ManagedDatabaseColumnsListByTableOptionalParams,
  ManagedDatabaseColumnsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseColumnsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/columns{?api%2Dversion,schema*,table*,column*,orderBy*,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseColumnListResultDeserializer(result.body);
}

/** List managed database columns */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseColumnsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseColumn> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _listByTableSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: ManagedDatabaseColumnsListByTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      "%24filter": options?.filter,
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

export async function _listByTableDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseColumnListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseColumnListResultDeserializer(result.body);
}

/** List managed database columns */
export function listByTable(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  options: ManagedDatabaseColumnsListByTableOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseColumn> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByTableSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        options,
      ),
    _listByTableDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  options: ManagedDatabaseColumnsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseColumn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseColumnDeserializer(result.body);
}

/** Get managed database column */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  options: ManagedDatabaseColumnsGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseColumn> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    options,
  );
  return _getDeserialize(result);
}
