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
  DomainTopicEventSubscriptionsGetFullUrlOptionalParams,
  DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  DomainTopicEventSubscriptionsListOptionalParams,
  DomainTopicEventSubscriptionsDeleteOptionalParams,
  DomainTopicEventSubscriptionsUpdateOptionalParams,
  DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  DomainTopicEventSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getFullUrlSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get the full endpoint URL for a nested event subscription for domain topic. */
export async function getFullUrl(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(
    context,
    resourceGroupName,
    domainName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getFullUrlDeserialize(result);
}

export function _getDeliveryAttributesSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get all delivery attributes for an event subscription for domain topic. */
export async function getDeliveryAttributes(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams = {
    requestOptions: {},
  },
): Promise<DeliveryAttributeListResult> {
  const result = await _getDeliveryAttributesSend(
    context,
    resourceGroupName,
    domainName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getDeliveryAttributesDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  options: DomainTopicEventSubscriptionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** List all event subscriptions that have been created for a specific domain topic. */
export function list(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  options: DomainTopicEventSubscriptionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, domainName, topicName, options),
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
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Delete a nested existing event subscription for a domain topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: DomainTopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Update an existing event subscription for a domain topic. */
export function update(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: DomainTopicEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        domainName,
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
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        domainName,
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
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get properties of a nested event subscription for a domain topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  eventSubscriptionName: string,
  options: DomainTopicEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<EventSubscription> {
  const result = await _getSend(
    context,
    resourceGroupName,
    domainName,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _getDeserialize(result);
}
