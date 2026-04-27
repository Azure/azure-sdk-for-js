// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  SystemTopic,
  SystemTopicUpdateParameters,
  _SystemTopicsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  systemTopicSerializer,
  systemTopicDeserializer,
  systemTopicUpdateParametersSerializer,
  _systemTopicsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SystemTopicsListBySubscriptionOptionalParams,
  SystemTopicsListByResourceGroupOptionalParams,
  SystemTopicsDeleteOptionalParams,
  SystemTopicsUpdateOptionalParams,
  SystemTopicsCreateOrUpdateOptionalParams,
  SystemTopicsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: SystemTopicsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/systemTopics{?api%2Dversion,%24filter,%24top}",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SystemTopicsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _systemTopicsListResultDeserializer(result.body);
}

/** List all the system topics under an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: SystemTopicsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SystemTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SystemTopicsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics{?api%2Dversion,%24filter,%24top}",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SystemTopicsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _systemTopicsListResultDeserializer(result.body);
}

/** List all the system topics under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SystemTopicsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SystemTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
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
  options: SystemTopicsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

/** Delete existing system topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  options: SystemTopicsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, systemTopicName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  systemTopicUpdateParameters: SystemTopicUpdateParameters,
  options: SystemTopicsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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
    body: systemTopicUpdateParametersSerializer(systemTopicUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SystemTopic> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return systemTopicDeserializer(result.body);
}

/** Asynchronously updates a system topic with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  systemTopicUpdateParameters: SystemTopicUpdateParameters,
  options: SystemTopicsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SystemTopic>, SystemTopic> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        systemTopicName,
        systemTopicUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<SystemTopic>, SystemTopic>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  systemTopicInfo: SystemTopic,
  options: SystemTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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
    body: systemTopicSerializer(systemTopicInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SystemTopic> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return systemTopicDeserializer(result.body);
}

/** Asynchronously creates a new system topic with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  systemTopicInfo: SystemTopic,
  options: SystemTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SystemTopic>, SystemTopic> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, systemTopicName, systemTopicInfo, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<SystemTopic>, SystemTopic>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  options: SystemTopicsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      systemTopicName: systemTopicName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SystemTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return systemTopicDeserializer(result.body);
}

/** Get properties of a system topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  systemTopicName: string,
  options: SystemTopicsGetOptionalParams = { requestOptions: {} },
): Promise<SystemTopic> {
  const result = await _getSend(context, resourceGroupName, systemTopicName, options);
  return _getDeserialize(result);
}
