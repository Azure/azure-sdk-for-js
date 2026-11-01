// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  MaintenanceEvent,
  _MaintenanceEventListResult,
  MaintenanceEventRescheduleRequest,
  MaintenanceEventActionResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  maintenanceEventDeserializer,
  _maintenanceEventListResultDeserializer,
  maintenanceEventRescheduleRequestSerializer,
  maintenanceEventActionResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MaintenanceEventsApplyNowOptionalParams,
  MaintenanceEventsRescheduleOptionalParams,
  MaintenanceEventsListOptionalParams,
  MaintenanceEventsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _applyNowSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsApplyNowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents/{maintenanceEventId}/applyNow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      maintenanceEventId: maintenanceEventId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
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
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsApplyNowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse> {
  return getLongRunningPoller(context, _applyNowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applyNowSend(context, resourceGroupName, clusterName, poolName, maintenanceEventId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
}

export function _rescheduleSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  body: MaintenanceEventRescheduleRequest,
  options: MaintenanceEventsRescheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents/{maintenanceEventId}/reschedule{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      maintenanceEventId: maintenanceEventId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
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
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  body: MaintenanceEventRescheduleRequest,
  options: MaintenanceEventsRescheduleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse> {
  return getLongRunningPoller(context, _rescheduleDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rescheduleSend(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: MaintenanceEventsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceEventListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _maintenanceEventListResultDeserializer(result.body);
}

/** Lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: MaintenanceEventsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MaintenanceEvent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, poolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents/{maintenanceEventId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      maintenanceEventId: maintenanceEventId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MaintenanceEvent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceEventDeserializer(result.body);
}

/** Gets information about a maintenance event for a HorizonDB pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  maintenanceEventId: string,
  options: MaintenanceEventsGetOptionalParams = { requestOptions: {} },
): Promise<MaintenanceEvent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    poolName,
    maintenanceEventId,
    options,
  );
  return _getDeserialize(result);
}
