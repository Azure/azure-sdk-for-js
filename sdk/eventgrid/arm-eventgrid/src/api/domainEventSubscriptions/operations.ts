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
  DomainEventSubscriptionsGetFullUrlOptionalParams,
  DomainEventSubscriptionsGetDeliveryAttributesOptionalParams,
  DomainEventSubscriptionsListOptionalParams,
  DomainEventSubscriptionsDeleteOptionalParams,
  DomainEventSubscriptionsUpdateOptionalParams,
  DomainEventSubscriptionsCreateOrUpdateOptionalParams,
  DomainEventSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getFullUrlSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get the full endpoint URL for an event subscription for domain. */
export async function getFullUrl(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(
    context,
    resourceGroupName,
    domainName,
    eventSubscriptionName,
    options,
  );
  return _getFullUrlDeserialize(result);
}

export function _getDeliveryAttributesSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get all delivery attributes for an event subscription for domain. */
export async function getDeliveryAttributes(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): Promise<DeliveryAttributeListResult> {
  const result = await _getDeliveryAttributesSend(
    context,
    resourceGroupName,
    domainName,
    eventSubscriptionName,
    options,
  );
  return _getDeliveryAttributesDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainEventSubscriptionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
  domainName: string,
  options: DomainEventSubscriptionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, domainName, options),
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
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Delete an existing event subscription for a domain. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, domainName, eventSubscriptionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: DomainEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
  domainName: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: DomainEventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        domainName,
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
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: DomainEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: DomainEventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        domainName,
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
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Get properties of an event subscription of a domain. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  eventSubscriptionName: string,
  options: DomainEventSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<EventSubscription> {
  const result = await _getSend(
    context,
    resourceGroupName,
    domainName,
    eventSubscriptionName,
    options,
  );
  return _getDeserialize(result);
}
