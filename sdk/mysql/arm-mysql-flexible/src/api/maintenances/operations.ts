// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Maintenance,
  maintenanceDeserializer,
  maintenanceUpdateSerializer,
  _MaintenanceListResult,
  _maintenanceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MaintenancesListOptionalParams,
  MaintenancesUpdateOptionalParams,
  MaintenancesReadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MaintenancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _maintenanceListResultDeserializer(result.body);
}

/** List maintenances. */
export function list(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MaintenancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Maintenance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serverName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceName: string,
  options: MaintenancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances/{maintenanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: !options?.parameters
        ? options?.parameters
        : maintenanceUpdateSerializer(options?.parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Update maintenances. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceName: string,
  options: MaintenancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Maintenance>, Maintenance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, maintenanceName, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-06-01-preview",
  }) as PollerLike<OperationState<Maintenance>, Maintenance>;
}

export function _readSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceName: string,
  options: MaintenancesReadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances/{maintenanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _readDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Read maintenance. */
export async function read(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceName: string,
  options: MaintenancesReadOptionalParams = { requestOptions: {} },
): Promise<Maintenance> {
  const result = await _readSend(context, resourceGroupName, serverName, maintenanceName, options);
  return _readDeserialize(result);
}
