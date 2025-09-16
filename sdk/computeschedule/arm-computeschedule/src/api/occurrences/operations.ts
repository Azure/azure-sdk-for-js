// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RecurringActionsResourceOperationResult,
  recurringActionsResourceOperationResultDeserializer,
  CancelOccurrenceRequest,
  cancelOccurrenceRequestSerializer,
  Occurrence,
  occurrenceDeserializer,
  _OccurrenceListResult,
  _occurrenceListResultDeserializer,
  _OccurrenceResourceListResponse,
  _occurrenceResourceListResponseDeserializer,
  OccurrenceResource,
  DelayRequest,
  delayRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  OccurrencesDelayOptionalParams,
  OccurrencesCancelOptionalParams,
  OccurrencesListResourcesOptionalParams,
  OccurrencesListByScheduledActionOptionalParams,
  OccurrencesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _delaySend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  body: DelayRequest,
  options: OccurrencesDelayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/occurrences/{occurrenceId}/delay{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      occurrenceId: occurrenceId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: delayRequestSerializer(body),
  });
}

export async function _delayDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A long-running resource action. */
export function delay(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  body: DelayRequest,
  options: OccurrencesDelayOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RecurringActionsResourceOperationResult>,
  RecurringActionsResourceOperationResult
> {
  return getLongRunningPoller(context, _delayDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _delaySend(context, resourceGroupName, scheduledActionName, occurrenceId, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<RecurringActionsResourceOperationResult>,
    RecurringActionsResourceOperationResult
  >;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  body: CancelOccurrenceRequest,
  options: OccurrencesCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/occurrences/{occurrenceId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      occurrenceId: occurrenceId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cancelOccurrenceRequestSerializer(body),
  });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A synchronous resource action. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  body: CancelOccurrenceRequest,
  options: OccurrencesCancelOptionalParams = { requestOptions: {} },
): Promise<RecurringActionsResourceOperationResult> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    scheduledActionName,
    occurrenceId,
    body,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  options: OccurrencesListResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/occurrences/{occurrenceId}/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      occurrenceId: occurrenceId,
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

export async function _listResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_OccurrenceResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _occurrenceResourceListResponseDeserializer(result.body);
}

/** List resources attached to Scheduled Actions for the given occurrence */
export function listResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  options: OccurrencesListResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OccurrenceResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listResourcesSend(context, resourceGroupName, scheduledActionName, occurrenceId, options),
    _listResourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByScheduledActionSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: OccurrencesListByScheduledActionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/occurrences{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
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

export async function _listByScheduledActionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OccurrenceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _occurrenceListResultDeserializer(result.body);
}

/** List Occurrence resources by ScheduledAction */
export function listByScheduledAction(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: OccurrencesListByScheduledActionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Occurrence> {
  return buildPagedAsyncIterator(
    context,
    () => _listByScheduledActionSend(context, resourceGroupName, scheduledActionName, options),
    _listByScheduledActionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  options: OccurrencesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/occurrences/{occurrenceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      occurrenceId: occurrenceId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Occurrence> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return occurrenceDeserializer(result.body);
}

/** Get a Occurrence */
export async function get(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  occurrenceId: string,
  options: OccurrencesGetOptionalParams = { requestOptions: {} },
): Promise<Occurrence> {
  const result = await _getSend(
    context,
    resourceGroupName,
    scheduledActionName,
    occurrenceId,
    options,
  );
  return _getDeserialize(result);
}
