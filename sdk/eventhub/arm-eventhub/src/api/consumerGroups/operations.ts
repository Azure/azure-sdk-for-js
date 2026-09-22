// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext as Client } from "../index.js";
import type { ConsumerGroup, _ConsumerGroupListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  consumerGroupSerializer,
  consumerGroupDeserializer,
  _consumerGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConsumerGroupsListByEventHubOptionalParams,
  ConsumerGroupsDeleteOptionalParams,
  ConsumerGroupsCreateOrUpdateOptionalParams,
  ConsumerGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByEventHubSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  options: ConsumerGroupsListByEventHubOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups{?api%2Dversion,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
      "%24skip": options?.skip,
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

export async function _listByEventHubDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConsumerGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _consumerGroupListResultDeserializer(result.body);
}

/** Gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace. */
export function listByEventHub(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  options: ConsumerGroupsListByEventHubOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConsumerGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEventHubSend(context, resourceGroupName, namespaceName, eventHubName, options),
    _listByEventHubDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  options: ConsumerGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      consumerGroupName: consumerGroupName,
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

/** Deletes a consumer group from the specified Event Hub and resource group. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  options: ConsumerGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    consumerGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  parameters: ConsumerGroup,
  options: ConsumerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      consumerGroupName: consumerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: consumerGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConsumerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return consumerGroupDeserializer(result.body);
}

/** Creates or updates an Event Hubs consumer group as a nested resource within a Namespace. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  parameters: ConsumerGroup,
  options: ConsumerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConsumerGroup> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    consumerGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  options: ConsumerGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      consumerGroupName: consumerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConsumerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return consumerGroupDeserializer(result.body);
}

/** Gets a description for the specified consumer group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  consumerGroupName: string,
  options: ConsumerGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ConsumerGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    consumerGroupName,
    options,
  );
  return _getDeserialize(result);
}
