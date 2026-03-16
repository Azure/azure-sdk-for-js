// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  TriggerFilterParameters,
  TriggerQueryResponse,
  TriggerResource,
  _TriggerListResponse,
  TriggerSubscriptionOperationStatus,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  triggerFilterParametersSerializer,
  triggerQueryResponseDeserializer,
  triggerResourceSerializer,
  triggerResourceDeserializer,
  _triggerListResponseDeserializer,
  triggerSubscriptionOperationStatusDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TriggersStopOptionalParams,
  TriggersStartOptionalParams,
  TriggersUnsubscribeFromEventsOptionalParams,
  TriggersGetEventSubscriptionStatusOptionalParams,
  TriggersSubscribeToEventsOptionalParams,
  TriggersListByFactoryOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
  TriggersQueryByFactoryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops a trigger. */
export function stop(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, factoryName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts a trigger. */
export function start(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, factoryName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _unsubscribeFromEventsSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersUnsubscribeFromEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/unsubscribeFromEvents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _unsubscribeFromEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerSubscriptionOperationStatus> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerSubscriptionOperationStatusDeserializer(result.body);
}

/** Unsubscribe event trigger from events. */
export function unsubscribeFromEvents(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersUnsubscribeFromEventsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<TriggerSubscriptionOperationStatus>,
  TriggerSubscriptionOperationStatus
> {
  return getLongRunningPoller(context, _unsubscribeFromEventsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unsubscribeFromEventsSend(context, resourceGroupName, factoryName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<
    OperationState<TriggerSubscriptionOperationStatus>,
    TriggerSubscriptionOperationStatus
  >;
}

export function _getEventSubscriptionStatusSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersGetEventSubscriptionStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/getEventSubscriptionStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getEventSubscriptionStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerSubscriptionOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerSubscriptionOperationStatusDeserializer(result.body);
}

/** Get a trigger's event subscription status. */
export async function getEventSubscriptionStatus(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersGetEventSubscriptionStatusOptionalParams = { requestOptions: {} },
): Promise<TriggerSubscriptionOperationStatus> {
  const result = await _getEventSubscriptionStatusSend(
    context,
    resourceGroupName,
    factoryName,
    triggerName,
    options,
  );
  return _getEventSubscriptionStatusDeserialize(result);
}

export function _subscribeToEventsSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersSubscribeToEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/subscribeToEvents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _subscribeToEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerSubscriptionOperationStatus> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerSubscriptionOperationStatusDeserializer(result.body);
}

/** Subscribe event trigger to events. */
export function subscribeToEvents(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersSubscribeToEventsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<TriggerSubscriptionOperationStatus>,
  TriggerSubscriptionOperationStatus
> {
  return getLongRunningPoller(context, _subscribeToEventsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _subscribeToEventsSend(context, resourceGroupName, factoryName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<
    OperationState<TriggerSubscriptionOperationStatus>,
    TriggerSubscriptionOperationStatus
  >;
}

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: TriggersListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggerListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _triggerListResponseDeserializer(result.body);
}

/** Lists triggers. */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: TriggersListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFactorySend(context, resourceGroupName, factoryName, options),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a trigger. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, factoryName, triggerName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  trigger: TriggerResource,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: triggerResourceSerializer(trigger),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerResourceDeserializer(result.body);
}

/** Creates or updates a trigger. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  trigger: TriggerResource,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TriggerResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    triggerName,
    trigger,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TriggerResource> {
  const expectedStatuses = ["200", "304"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerResourceDeserializer(result.body);
}

/** Gets a trigger. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): Promise<TriggerResource> {
  const result = await _getSend(context, resourceGroupName, factoryName, triggerName, options);
  return _getDeserialize(result);
}

export function _queryByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: TriggerFilterParameters,
  options: TriggersQueryByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/querytriggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: triggerFilterParametersSerializer(filterParameters),
  });
}

export async function _queryByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerQueryResponseDeserializer(result.body);
}

/** Query triggers. */
export async function queryByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: TriggerFilterParameters,
  options: TriggersQueryByFactoryOptionalParams = { requestOptions: {} },
): Promise<TriggerQueryResponse> {
  const result = await _queryByFactorySend(
    context,
    resourceGroupName,
    factoryName,
    filterParameters,
    options,
  );
  return _queryByFactoryDeserialize(result);
}
