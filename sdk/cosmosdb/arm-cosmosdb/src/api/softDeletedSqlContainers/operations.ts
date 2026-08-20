// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  SoftDeletedSqlContainerGetResult,
  SoftDeletedSqlContainersListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  softDeletedSqlContainerGetResultDeserializer,
  softDeletedSqlContainersListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SoftDeletedSqlContainersPurgeOptionalParams,
  SoftDeletedSqlContainersRestoreOptionalParams,
  SoftDeletedSqlContainersListOptionalParams,
  SoftDeletedSqlContainersGetOptionalParams,
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
  containerName: string,
  options: SoftDeletedSqlContainersPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}/softDeletedSqlContainers/{containerName}?softDeleteActionKind=PermanentDeleteResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

/** Permanently deletes a soft-deleted Azure Cosmos DB SQL container. */
export function purge(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SoftDeletedSqlContainersPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      ),
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
  containerName: string,
  options: SoftDeletedSqlContainersRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}/softDeletedSqlContainers/{containerName}?softDeleteActionKind=RestoreSoftDeletedResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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

/** Restores a soft-deleted Azure Cosmos DB SQL container to active state. */
export function restore(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SoftDeletedSqlContainersRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlContainersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}/softDeletedSqlContainers{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftDeletedSqlContainersListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedSqlContainersListResultDeserializer(result.body);
}

/** Lists all the soft-deleted Azure Cosmos DB SQL containers under a soft-deleted SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission. */
export async function list(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  options: SoftDeletedSqlContainersListOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedSqlContainersListResult> {
  const result = await _listSend(
    context,
    resourceGroupName,
    location,
    accountName,
    databaseName,
    options,
  );
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SoftDeletedSqlContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}/softDeletedSqlDatabases/{databaseName}/softDeletedSqlContainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
      databaseName: databaseName,
      containerName: containerName,
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
): Promise<SoftDeletedSqlContainerGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedSqlContainerGetResultDeserializer(result.body);
}

/** Retrieves the properties of a soft-deleted Azure Cosmos DB SQL container. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  databaseName: string,
  containerName: string,
  options: SoftDeletedSqlContainersGetOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedSqlContainerGetResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    location,
    accountName,
    databaseName,
    containerName,
    options,
  );
  return _getDeserialize(result);
}
