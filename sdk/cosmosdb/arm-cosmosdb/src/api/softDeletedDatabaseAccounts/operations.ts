// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SoftDeletedDatabaseAccountGetResult,
  softDeletedDatabaseAccountGetResultDeserializer,
  SoftDeletedDatabaseAccountsListResult,
  softDeletedDatabaseAccountsListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SoftDeletedDatabaseAccountsPurgeOptionalParams,
  SoftDeletedDatabaseAccountsRestoreOptionalParams,
  SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams,
  SoftDeletedDatabaseAccountsListByLocationOptionalParams,
  SoftDeletedDatabaseAccountsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}?softDeleteActionKind=PermanentDeleteResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
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

/** Permanently deletes (purges) a soft-deleted Azure Cosmos DB database account. */
export function purge(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(context, resourceGroupName, location, accountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}?softDeleteActionKind=RestoreSoftDeletedResource{?api%2Dversion,softDeleteActionKind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      accountName: accountName,
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

/** Restores a soft-deleted Azure Cosmos DB database account. */
export function restore(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(context, resourceGroupName, location, accountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupAndLocationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByResourceGroupAndLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftDeletedDatabaseAccountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedDatabaseAccountsListResultDeserializer(result.body);
}

/** Lists all the soft-deleted Azure Cosmos DB database accounts available under the given resource group and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
export async function listByResourceGroupAndLocation(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams = {
    requestOptions: {},
  },
): Promise<SoftDeletedDatabaseAccountsListResult> {
  const result = await _listByResourceGroupAndLocationSend(
    context,
    resourceGroupName,
    location,
    options,
  );
  return _listByResourceGroupAndLocationDeserialize(result);
}

export function _listByLocationSend(
  context: Client,
  location: string,
  options: SoftDeletedDatabaseAccountsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftDeletedDatabaseAccountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedDatabaseAccountsListResultDeserializer(result.body);
}

/** Lists all the soft-deleted Azure Cosmos DB database accounts available under the subscription and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
export async function listByLocation(
  context: Client,
  location: string,
  options: SoftDeletedDatabaseAccountsListByLocationOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedDatabaseAccountsListResult> {
  const result = await _listByLocationSend(context, location, options);
  return _listByLocationDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/locations/{location}/softDeletedDatabaseAccounts/{accountName}{?api%2Dversion}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftDeletedDatabaseAccountGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softDeletedDatabaseAccountGetResultDeserializer(result.body);
}

/** Retrieves the properties of a soft-deleted Azure Cosmos DB database account by location and accountName. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  accountName: string,
  options: SoftDeletedDatabaseAccountsGetOptionalParams = { requestOptions: {} },
): Promise<SoftDeletedDatabaseAccountGetResult> {
  const result = await _getSend(context, resourceGroupName, location, accountName, options);
  return _getDeserialize(result);
}
