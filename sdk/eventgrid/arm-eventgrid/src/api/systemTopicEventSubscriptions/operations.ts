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
  SystemTopicEventSubscriptionsGetFullUrlOptionalParams,
  SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  SystemTopicEventSubscriptionsListBySystemTopicOptionalParams,
  SystemTopicEventSubscriptionsDeleteOptionalParams,
  SystemTopicEventSubscriptionsUpdateOptionalParams,
  SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  SystemTopicEventSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getFullUrlSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Get the full endpoint URL for an event subscription of a system topic. */
export async function getFullUrl(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(
    context,
    resourceGroupName,
    systemTopicName,
    eventSubscriptionName,
    options,
  );
  return _getFullUrlDeserialize(result);
}

export function _getDeliveryAttributesSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Get all delivery attributes for an event subscription. */
export async function getDeliveryAttributes(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams = {
    requestOptions: {},
  },
): Promise<DeliveryAttributeListResult> {
  const result = await _getDeliveryAttributesSend(
    context,
    resourceGroupName,
    systemTopicName,
    eventSubscriptionName,
    options,
  );
  return _getDeliveryAttributesDeserialize(result);
}

export function _listBySystemTopicSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  options: SystemTopicEventSubscriptionsListBySystemTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

export async function _listBySystemTopicDeserialize(
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

/** List event subscriptions that belong to a specific system topic. */
export function listBySystemTopic(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  options: SystemTopicEventSubscriptionsListBySystemTopicOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySystemTopicSend(context, resourceGroupName, systemTopicName, options),
    _listBySystemTopicDeserialize,
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
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Delete an existing event subscription of a system topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, systemTopicName, eventSubscriptionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: SystemTopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Update an existing event subscription of a system topic. */
export function update(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: SystemTopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        systemTopicName,
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
  systemTopicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionDeserializer(result.body);
}

/** Asynchronously creates or updates an event subscription with the specified parameters. Existing event subscriptions will be updated with this API. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        systemTopicName,
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
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Get an event subscription. */
export async function get(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  eventSubscriptionName: string,
  options: SystemTopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<EventSubscription> {
  const result = await _getSend(
    context,
    resourceGroupName,
    systemTopicName,
    eventSubscriptionName,
    options,
  );
  return _getDeserialize(result);
}
