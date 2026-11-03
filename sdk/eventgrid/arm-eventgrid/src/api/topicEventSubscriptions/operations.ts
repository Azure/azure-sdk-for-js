// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  EventSubscriptionFullUrl,
  _EventSubscriptionsListResult,
  EventSubscription,
  EventSubscriptionUpdateParameters,
  DeliveryAttributeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  eventSubscriptionFullUrlDeserializer,
  _eventSubscriptionsListResultDeserializer,
  eventSubscriptionSerializer,
  eventSubscriptionDeserializer,
  eventSubscriptionUpdateParametersSerializer,
  deliveryAttributeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TopicEventSubscriptionsGetFullUrlOptionalParams,
  TopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  TopicEventSubscriptionsListOptionalParams,
  TopicEventSubscriptionsDeleteOptionalParams,
  TopicEventSubscriptionsUpdateOptionalParams,
  TopicEventSubscriptionsCreateOrUpdateOptionalParams,
  TopicEventSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getFullUrlSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getFullUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<EventSubscriptionFullUrl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionFullUrlDeserializer(result.body);
}

/** Get the full endpoint URL for an event subscription for topic. */
export async function getFullUrl(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(
    context,
    resourceGroupName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getFullUrlDeserialize(result);
}

export function _getDeliveryAttributesSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeliveryAttributesDeserialize(
  result: PathUncheckedResponse,
): Promise<DeliveryAttributeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deliveryAttributeListResultDeserializer(result.body);
}

/** Get all delivery attributes for an event subscription for topic. */
export async function getDeliveryAttributes(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): Promise<DeliveryAttributeListResult> {
  const result = await _getDeliveryAttributesSend(
    context,
    resourceGroupName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getDeliveryAttributesDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  options: TopicEventSubscriptionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_EventSubscriptionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _eventSubscriptionsListResultDeserializer(result.body);
}

/** List all event subscriptions that have been created for a specific topic. */
export function list(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  options: TopicEventSubscriptionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, topicName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an existing event subscription for a topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, topicName, eventSubscriptionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: TopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: eventSubscriptionUpdateParametersSerializer(eventSubscriptionUpdateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EventSubscription> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionDeserializer(result.body);
}

/** Update an existing event subscription for a topic. */
export function update(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: TopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<EventSubscription>, EventSubscription>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: TopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: eventSubscriptionSerializer(eventSubscriptionInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EventSubscription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionDeserializer(result.body);
}

/** Asynchronously creates a new event subscription or updates an existing event subscription. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: TopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<EventSubscription>, EventSubscription>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EventSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionDeserializer(result.body);
}

/** Get properties of an event subscription of a topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: TopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<EventSubscription> {
  const result = await _getSend(
    context,
    resourceGroupName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getDeserialize(result);
}
