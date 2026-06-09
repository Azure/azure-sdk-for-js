// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  SoftDeletedSqlDatabaseGetResult,
  SoftDeletedSqlDatabasesListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  softDeletedSqlDatabaseGetResultDeserializer,
  softDeletedSqlDatabasesListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SoftDeletedSqlDatabasesPurgeOptionalParams,
  SoftDeletedSqlDatabasesRestoreOptionalParams,
  SoftDeletedSqlDatabasesListOptionalParams,
  SoftDeletedSqlDatabasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}?softDeleteActionKind=PermanentDeleteResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      softDeleteActionKind: options?.softDeleteActionKind,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Permanently deletes a soft-deleted Azure Cosmos DB SQL database. */
export function purge(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(context, resourceGroupName, location, accountName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}?softDeleteActionKind=RestoreSoftDeletedResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      softDeleteActionKind: options?.softDeleteActionKind,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _restoreDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Restores a soft-deleted Azure Cosmos DB SQL database. */
export function restore(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(context, resourceGroupName, location, accountName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedSqlDatabasesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<SoftDeletedSqlDatabasesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedSqlDatabasesListResultDeserializer(result.body);
}

/** Lists all the soft-deleted Azure Cosmos DB SQL databases under a soft-deleted database account. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission. */
export async function list(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedSqlDatabasesListOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedSqlDatabasesListResult> {
  const result = await _listSend(context, resourceGroupName, location, accountName, options);
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<SoftDeletedSqlDatabaseGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedSqlDatabaseGetResultDeserializer(result.body);
}

/** Retrieves the properties of a soft-deleted Azure Cosmos DB SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedSqlDatabaseGetResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    location,
    accountName,
    databaseName,
    options,
  );
  return _getDeserialize(result);
}
