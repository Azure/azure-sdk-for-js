// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  SqlServerDatabaseResource,
  SqlServerDatabaseUpdate,
  _ArcSqlServerDatabaseListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sqlServerDatabaseResourceSerializer,
  sqlServerDatabaseResourceDeserializer,
  sqlServerDatabaseUpdateSerializer,
  _arcSqlServerDatabaseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SqlServerDatabasesListOptionalParams,
  SqlServerDatabasesDeleteOptionalParams,
  SqlServerDatabasesUpdateOptionalParams,
  SqlServerDatabasesCreateOptionalParams,
  SqlServerDatabasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerDatabasesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArcSqlServerDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _arcSqlServerDatabaseListResultDeserializer(result.body);
}

/** List the databases associated with the given Arc Sql Server. */
export function list(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerDatabasesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerDatabaseResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, sqlServerInstanceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  options: SqlServerDatabasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an Arc Sql Server database resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  options: SqlServerDatabasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlServerInstanceName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  sqlServerDatabaseUpdate: SqlServerDatabaseUpdate,
  options: SqlServerDatabasesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerDatabaseUpdateSerializer(sqlServerDatabaseUpdate),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerDatabaseResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerDatabaseResourceDeserializer(result.body);
}

/** Updates an existing database. */
export function update(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  sqlServerDatabaseUpdate: SqlServerDatabaseUpdate,
  options: SqlServerDatabasesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlServerDatabaseResource>, SqlServerDatabaseResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        databaseName,
        sqlServerDatabaseUpdate,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SqlServerDatabaseResource>, SqlServerDatabaseResource>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  sqlServerDatabaseResource: SqlServerDatabaseResource,
  options: SqlServerDatabasesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerDatabaseResourceSerializer(sqlServerDatabaseResource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerDatabaseResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerDatabaseResourceDeserializer(result.body);
}

/** Creates or replaces an Arc Sql Server Database. */
export async function create(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  sqlServerDatabaseResource: SqlServerDatabaseResource,
  options: SqlServerDatabasesCreateOptionalParams = { requestOptions: {} },
): Promise<SqlServerDatabaseResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    databaseName,
    sqlServerDatabaseResource,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  options: SqlServerDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<SqlServerDatabaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerDatabaseResourceDeserializer(result.body);
}

/** Retrieves an Arc Sql Server database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  databaseName: string,
  options: SqlServerDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<SqlServerDatabaseResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    databaseName,
    options,
  );
  return _getDeserialize(result);
}
