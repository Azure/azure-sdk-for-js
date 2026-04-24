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
  EventSubscriptionsListRegionalByResourceGroupForTopicTypeOptionalParams,
  EventSubscriptionsListRegionalBySubscriptionForTopicTypeOptionalParams,
  EventSubscriptionsListRegionalByResourceGroupOptionalParams,
  EventSubscriptionsListRegionalBySubscriptionOptionalParams,
  EventSubscriptionsListGlobalByResourceGroupForTopicTypeOptionalParams,
  EventSubscriptionsListGlobalBySubscriptionForTopicTypeOptionalParams,
  EventSubscriptionsGetFullUrlOptionalParams,
  EventSubscriptionsGetDeliveryAttributesOptionalParams,
  EventSubscriptionsListByResourceOptionalParams,
  EventSubscriptionsListGlobalBySubscriptionOptionalParams,
  EventSubscriptionsDeleteOptionalParams,
  EventSubscriptionsUpdateOptionalParams,
  EventSubscriptionsCreateOrUpdateOptionalParams,
  EventSubscriptionsGetOptionalParams,
  EventSubscriptionsListByDomainTopicOptionalParams,
  EventSubscriptionsListGlobalByResourceGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listRegionalByResourceGroupForTopicTypeSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  topicTypeName: string,
  options: EventSubscriptionsListRegionalByResourceGroupForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/locations/{location}/topicTypes/{topicTypeName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      topicTypeName: topicTypeName,
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

export async function _listRegionalByResourceGroupForTopicTypeDeserialize(
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

/** List all event subscriptions from the given location under a specific Azure subscription and resource group and topic type. */
export function listRegionalByResourceGroupForTopicType(
  context: Client,
  resourceGroupName: string,
  location: string,
  topicTypeName: string,
  options: EventSubscriptionsListRegionalByResourceGroupForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listRegionalByResourceGroupForTopicTypeSend(
        context,
        resourceGroupName,
        location,
        topicTypeName,
        options,
      ),
    _listRegionalByResourceGroupForTopicTypeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listRegionalBySubscriptionForTopicTypeSend(
  context: Client,
  location: string,
  topicTypeName: string,
  options: EventSubscriptionsListRegionalBySubscriptionForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/locations/{location}/topicTypes/{topicTypeName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      topicTypeName: topicTypeName,
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

export async function _listRegionalBySubscriptionForTopicTypeDeserialize(
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

/** List all event subscriptions from the given location under a specific Azure subscription and topic type. */
export function listRegionalBySubscriptionForTopicType(
  context: Client,
  location: string,
  topicTypeName: string,
  options: EventSubscriptionsListRegionalBySubscriptionForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listRegionalBySubscriptionForTopicTypeSend(context, location, topicTypeName, options),
    _listRegionalBySubscriptionForTopicTypeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listRegionalByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: EventSubscriptionsListRegionalByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/locations/{location}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
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

export async function _listRegionalByResourceGroupDeserialize(
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

/** List all event subscriptions from the given location under a specific Azure subscription and resource group. */
export function listRegionalByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: EventSubscriptionsListRegionalByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listRegionalByResourceGroupSend(context, resourceGroupName, location, options),
    _listRegionalByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listRegionalBySubscriptionSend(
  context: Client,
  location: string,
  options: EventSubscriptionsListRegionalBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/locations/{location}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listRegionalBySubscriptionDeserialize(
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

/** List all event subscriptions from the given location under a specific Azure subscription. */
export function listRegionalBySubscription(
  context: Client,
  location: string,
  options: EventSubscriptionsListRegionalBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listRegionalBySubscriptionSend(context, location, options),
    _listRegionalBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listGlobalByResourceGroupForTopicTypeSend(
  context: Client,
  resourceGroupName: string,
  topicTypeName: string,
  options: EventSubscriptionsListGlobalByResourceGroupForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topicTypeName: topicTypeName,
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

export async function _listGlobalByResourceGroupForTopicTypeDeserialize(
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

/** List all global event subscriptions under a resource group for a specific topic type. */
export function listGlobalByResourceGroupForTopicType(
  context: Client,
  resourceGroupName: string,
  topicTypeName: string,
  options: EventSubscriptionsListGlobalByResourceGroupForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listGlobalByResourceGroupForTopicTypeSend(
        context,
        resourceGroupName,
        topicTypeName,
        options,
      ),
    _listGlobalByResourceGroupForTopicTypeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listGlobalBySubscriptionForTopicTypeSend(
  context: Client,
  topicTypeName: string,
  options: EventSubscriptionsListGlobalBySubscriptionForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      topicTypeName: topicTypeName,
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

export async function _listGlobalBySubscriptionForTopicTypeDeserialize(
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

/** List all global event subscriptions under an Azure subscription for a topic type. */
export function listGlobalBySubscriptionForTopicType(
  context: Client,
  topicTypeName: string,
  options: EventSubscriptionsListGlobalBySubscriptionForTopicTypeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listGlobalBySubscriptionForTopicTypeSend(context, topicTypeName, options),
    _listGlobalBySubscriptionForTopicTypeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _getFullUrlSend(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}/getFullUrl{?api%2Dversion}",
    {
      scope: scope,
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

/** Get the full endpoint URL for an event subscription. */
export async function getFullUrl(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(context, scope, eventSubscriptionName, options);
  return _getFullUrlDeserialize(result);
}

export function _getDeliveryAttributesSend(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes{?api%2Dversion}",
    {
      scope: scope,
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
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetDeliveryAttributesOptionalParams = { requestOptions: {} },
): Promise<DeliveryAttributeListResult> {
  const result = await _getDeliveryAttributesSend(context, scope, eventSubscriptionName, options);
  return _getDeliveryAttributesDeserialize(result);
}

export function _listByResourceSend(
  context: Client,
  resourceGroupName: string,
  providerNamespace: string,
  resourceTypeName: string,
  resourceName: string,
  options: EventSubscriptionsListByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerNamespace}/{resourceTypeName}/{resourceName}/providers/Microsoft.EventGrid/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerNamespace: providerNamespace,
      resourceTypeName: resourceTypeName,
      resourceName: resourceName,
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

export async function _listByResourceDeserialize(
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

/** List all event subscriptions that have been created for a specific resource. */
export function listByResource(
  context: Client,
  resourceGroupName: string,
  providerNamespace: string,
  resourceTypeName: string,
  resourceName: string,
  options: EventSubscriptionsListByResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceSend(
        context,
        resourceGroupName,
        providerNamespace,
        resourceTypeName,
        resourceName,
        options,
      ),
    _listByResourceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listGlobalBySubscriptionSend(
  context: Client,
  options: EventSubscriptionsListGlobalBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listGlobalBySubscriptionDeserialize(
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

/** List all aggregated global event subscriptions under a specific Azure subscription. */
export function listGlobalBySubscription(
  context: Client,
  options: EventSubscriptionsListGlobalBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listGlobalBySubscriptionSend(context, options),
    _listGlobalBySubscriptionDeserialize,
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
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      scope: scope,
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

/** Delete an existing event subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, scope, eventSubscriptionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: EventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      scope: scope,
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

/** Asynchronously updates an existing event subscription. */
export function update(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
  options: EventSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        scope,
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
  scope: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: EventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      scope: scope,
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

/** Asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope. */
export function createOrUpdate(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  eventSubscriptionInfo: EventSubscription,
  options: EventSubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EventSubscription>, EventSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, scope, eventSubscriptionName, eventSubscriptionInfo, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<EventSubscription>, EventSubscription>;
}

export function _getSend(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}{?api%2Dversion}",
    {
      scope: scope,
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

/** Get properties of an event subscription. */
export async function get(
  context: Client,
  scope: string,
  eventSubscriptionName: string,
  options: EventSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<EventSubscription> {
  const result = await _getSend(context, scope, eventSubscriptionName, options);
  return _getDeserialize(result);
}

export function _listByDomainTopicSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  options: EventSubscriptionsListByDomainTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/providers/Microsoft.EventGrid/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
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

export async function _listByDomainTopicDeserialize(
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
export function listByDomainTopic(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  topicName: string,
  options: EventSubscriptionsListByDomainTopicOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDomainTopicSend(context, resourceGroupName, domainName, topicName, options),
    _listByDomainTopicDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listGlobalByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: EventSubscriptionsListGlobalByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/eventSubscriptions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listGlobalByResourceGroupDeserialize(
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

/** List all global event subscriptions under a specific Azure subscription and resource group. */
export function listGlobalByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: EventSubscriptionsListGlobalByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listGlobalByResourceGroupSend(context, resourceGroupName, options),
    _listGlobalByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}
