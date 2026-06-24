// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MaintenanceEventResource,
  maintenanceEventResourceDeserializer,
  _MaintenanceEventResourceListResult,
  _maintenanceEventResourceListResultDeserializer,
  MaintenanceEventRescheduleRequest,
  maintenanceEventRescheduleRequestSerializer,
  MaintenanceEventActionResponse,
  maintenanceEventActionResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MaintenanceEventsApplyNowOptionalParams,
  MaintenanceEventsRescheduleOptionalParams,
  MaintenanceEventsListOptionalParams,
  MaintenanceEventsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _applyNowSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsApplyNowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/maintenanceEvents/{maintenanceEventId}/applyNow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      maintenanceEventId: maintenanceEventId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _applyNowDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceEventActionResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceEventActionResponseDeserializer(result.body);
}

/** Applies the maintenance event immediately. */
export function applyNow(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsApplyNowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse> {
  return getLongRunningPoller(context, _applyNowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applyNowSend(context, resourceGroupName, serverName, maintenanceEventId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
}

export function _rescheduleSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  body: MaintenanceEventRescheduleRequest,
  options: MaintenanceEventsRescheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/maintenanceEvents/{maintenanceEventId}/reschedule{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      maintenanceEventId: maintenanceEventId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: maintenanceEventRescheduleRequestSerializer(body),
    });
}

export async function _rescheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceEventActionResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceEventActionResponseDeserializer(result.body);
}

/** Reschedules a maintenance event to a new date and time. */
export function reschedule(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  body: MaintenanceEventRescheduleRequest,
  options: MaintenanceEventsRescheduleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse> {
  return getLongRunningPoller(context, _rescheduleDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rescheduleSend(context, resourceGroupName, serverName, maintenanceEventId, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MaintenanceEventsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/maintenanceEvents{?api%2Dversion,maintenanceStatus}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      maintenanceStatus: options?.maintenanceStatus,
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
): Promise<_MaintenanceEventResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _maintenanceEventResourceListResultDeserializer(result.body);
}

/** Lists all maintenance events for a flexible server. */
export function list(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MaintenanceEventsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MaintenanceEventResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serverName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/maintenanceEvents/{maintenanceEventId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      maintenanceEventId: maintenanceEventId,
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
): Promise<MaintenanceEventResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceEventResourceDeserializer(result.body);
}

/** Gets information about a maintenance event for a flexible server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsGetOptionalParams = { requestOptions: {} },
): Promise<MaintenanceEventResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    maintenanceEventId,
    options,
  );
  return _getDeserialize(result);
}
