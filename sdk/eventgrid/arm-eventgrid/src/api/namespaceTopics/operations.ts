// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  NamespaceTopic,
  NamespaceTopicUpdateParameters,
  _NamespaceTopicsListResult,
  TopicSharedAccessKeys,
  TopicRegenerateKeyRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  namespaceTopicSerializer,
  namespaceTopicDeserializer,
  namespaceTopicUpdateParametersSerializer,
  _namespaceTopicsListResultDeserializer,
  topicSharedAccessKeysDeserializer,
  topicRegenerateKeyRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamespaceTopicsRegenerateKeyOptionalParams,
  NamespaceTopicsListSharedAccessKeysOptionalParams,
  NamespaceTopicsListByNamespaceOptionalParams,
  NamespaceTopicsDeleteOptionalParams,
  NamespaceTopicsUpdateOptionalParams,
  NamespaceTopicsCreateOrUpdateOptionalParams,
  NamespaceTopicsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  regenerateKeyRequest: TopicRegenerateKeyRequest,
  options: NamespaceTopicsRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: topicRegenerateKeyRequestSerializer(regenerateKeyRequest),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<TopicSharedAccessKeys> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return topicSharedAccessKeysDeserializer(result.body);
}

/** Regenerate a shared access key for a namespace topic. */
export function regenerateKey(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  regenerateKeyRequest: TopicRegenerateKeyRequest,
  options: NamespaceTopicsRegenerateKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys> {
  return getLongRunningPoller(context, _regenerateKeyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeySend(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        regenerateKeyRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys>;
}

export function _listSharedAccessKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsListSharedAccessKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

export async function _listSharedAccessKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<TopicSharedAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return topicSharedAccessKeysDeserializer(result.body);
}

/** List the two keys used to publish to a namespace topic. */
export async function listSharedAccessKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsListSharedAccessKeysOptionalParams = { requestOptions: {} },
): Promise<TopicSharedAccessKeys> {
  const result = await _listSharedAccessKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    options,
  );
  return _listSharedAccessKeysDeserialize(result);
}

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceTopicsListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_NamespaceTopicsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _namespaceTopicsListResultDeserializer(result.body);
}

/** List all the namespace topics under a namespace. */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceTopicsListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NamespaceTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
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
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

/** Delete existing namespace topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, topicName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
  options: NamespaceTopicsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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
    body: namespaceTopicUpdateParametersSerializer(namespaceTopicUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NamespaceTopic> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namespaceTopicDeserializer(result.body);
}

/** Asynchronously updates a namespace topic with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
  options: NamespaceTopicsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NamespaceTopic>, NamespaceTopic> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicUpdateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<NamespaceTopic>, NamespaceTopic>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  namespaceTopicInfo: NamespaceTopic,
  options: NamespaceTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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
    body: namespaceTopicSerializer(namespaceTopicInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceTopic> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namespaceTopicDeserializer(result.body);
}

/** Asynchronously creates a new namespace topic with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  namespaceTopicInfo: NamespaceTopic,
  options: NamespaceTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NamespaceTopic>, NamespaceTopic> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicInfo,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<NamespaceTopic>, NamespaceTopic>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NamespaceTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namespaceTopicDeserializer(result.body);
}

/** Get properties of a namespace topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: NamespaceTopicsGetOptionalParams = { requestOptions: {} },
): Promise<NamespaceTopic> {
  const result = await _getSend(context, resourceGroupName, namespaceName, topicName, options);
  return _getDeserialize(result);
}
