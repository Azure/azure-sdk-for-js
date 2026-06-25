// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SBSubscription,
  sbSubscriptionSerializer,
  sbSubscriptionDeserializer,
  _SBSubscriptionListResult,
  _sbSubscriptionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SubscriptionsListByTopicOptionalParams,
  SubscriptionsDeleteOptionalParams,
  SubscriptionsCreateOrUpdateOptionalParams,
  SubscriptionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByTopicSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: SubscriptionsListByTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions{?api%2Dversion,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
      "%24skip": options?.skip,
      "%24top": options?.top,
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

export async function _listByTopicDeserialize(
  result: PathUncheckedResponse,
): Promise<_SBSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sbSubscriptionListResultDeserializer(result.body);
}

/** List all the subscriptions under a specified topic. */
export function listByTopic(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: SubscriptionsListByTopicOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTopicSend(context, resourceGroupName, namespaceName, topicName, options),
    _listByTopicDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: SubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a subscription from the specified topic. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: SubscriptionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription,
  options: SubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: sbSubscriptionSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SBSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sbSubscriptionDeserializer(result.body);
}

/** Creates a topic subscription. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription,
  options: SubscriptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SBSubscription> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: SubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SBSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sbSubscriptionDeserializer(result.body);
}

/** Returns a subscription description for the specified topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: SubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<SBSubscription> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    options,
  );
  return _getDeserialize(result);
}
