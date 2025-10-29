// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext as Client } from "../index.js";
import type {
  Webhook,
  WebhookCreateParameters,
  WebhookUpdateParameters,
  _WebhookListResult,
  EventInfo,
  _EventListResult,
  Event,
  CallbackConfig,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  webhookDeserializer,
  webhookCreateParametersSerializer,
  webhookUpdateParametersSerializer,
  _webhookListResultDeserializer,
  eventInfoDeserializer,
  _eventListResultDeserializer,
  callbackConfigDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WebhooksGetCallbackConfigOptionalParams,
  WebhooksListEventsOptionalParams,
  WebhooksPingOptionalParams,
  WebhooksListOptionalParams,
  WebhooksDeleteOptionalParams,
  WebhooksUpdateOptionalParams,
  WebhooksCreateOptionalParams,
  WebhooksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getCallbackConfigSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksGetCallbackConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}/getCallbackConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCallbackConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<CallbackConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return callbackConfigDeserializer(result.body);
}

/** Gets the configuration of service URI and custom headers for the webhook. */
export async function getCallbackConfig(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksGetCallbackConfigOptionalParams = { requestOptions: {} },
): Promise<CallbackConfig> {
  const result = await _getCallbackConfigSend(
    context,
    resourceGroupName,
    registryName,
    webhookName,
    options,
  );
  return _getCallbackConfigDeserialize(result);
}

export function _listEventsSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksListEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}/listEvents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<_EventListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _eventListResultDeserializer(result.body);
}

/** Lists recent events for the specified webhook. */
export function listEvents(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksListEventsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Event> {
  return buildPagedAsyncIterator(
    context,
    () => _listEventsSend(context, resourceGroupName, registryName, webhookName, options),
    _listEventsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _pingSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksPingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}/ping{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _pingDeserialize(result: PathUncheckedResponse): Promise<EventInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return eventInfoDeserializer(result.body);
}

/** Triggers a ping event to be sent to the webhook. */
export async function ping(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksPingOptionalParams = { requestOptions: {} },
): Promise<EventInfo> {
  const result = await _pingSend(context, resourceGroupName, registryName, webhookName, options);
  return _pingDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: WebhooksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_WebhookListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _webhookListResultDeserializer(result.body);
}

/** Lists all the webhooks for the specified container registry. */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: WebhooksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Webhook> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, registryName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a webhook from a container registry. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, registryName, webhookName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  webhookUpdateParameters: WebhookUpdateParameters,
  options: WebhooksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: webhookUpdateParametersSerializer(webhookUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Updates a webhook with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  webhookUpdateParameters: WebhookUpdateParameters,
  options: WebhooksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Webhook>, Webhook> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        registryName,
        webhookName,
        webhookUpdateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Webhook>, Webhook>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  webhookCreateParameters: WebhookCreateParameters,
  options: WebhooksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: webhookCreateParametersSerializer(webhookCreateParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Creates a webhook for a container registry with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  webhookCreateParameters: WebhookCreateParameters,
  options: WebhooksCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Webhook>, Webhook> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        registryName,
        webhookName,
        webhookCreateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Webhook>, Webhook>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Gets the properties of the specified webhook. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  webhookName: string,
  options: WebhooksGetOptionalParams = { requestOptions: {} },
): Promise<Webhook> {
  const result = await _getSend(context, resourceGroupName, registryName, webhookName, options);
  return _getDeserialize(result);
}
