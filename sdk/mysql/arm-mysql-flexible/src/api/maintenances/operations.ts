// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { Maintenance, _MaintenanceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  maintenanceDeserializer,
  maintenanceUpdateSerializer,
  _maintenanceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MaintenancesListOptionalParams,
  MaintenancesUpdateOptionalParams,
  MaintenancesReadOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
    { itemName: "value", nextLinkName: "nextLink" },
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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : maintenanceUpdateSerializer(options["parameters"]),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, maintenanceName, options),
    resourceLocationConfig: "location",
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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _readDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
