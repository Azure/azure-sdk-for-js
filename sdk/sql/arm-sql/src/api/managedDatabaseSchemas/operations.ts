// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { DatabaseSchema, _DatabaseSchemaListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseSchemaDeserializer,
  _databaseSchemaListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDatabaseSchemasListByDatabaseOptionalParams,
  ManagedDatabaseSchemasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSchemasListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseSchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseSchemaListResultDeserializer(result.body);
}

/** List managed database schemas */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSchemasListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseSchema> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
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
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  options: ManagedDatabaseSchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseSchemaDeserializer(result.body);
}

/** Get managed database schema */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  options: ManagedDatabaseSchemasGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseSchema> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    options,
  );
  return _getDeserialize(result);
}
