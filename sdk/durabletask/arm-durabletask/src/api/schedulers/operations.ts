// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext as Client } from "../index.js";
import type {
  Scheduler,
  PrivateEndpointConnection,
  SchedulerUpdate,
  _SchedulerListResult,
  SchedulerPrivateLinkResource,
  _SchedulerPrivateLinkResourceListResult,
  PrivateEndpointConnectionUpdate,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  schedulerSerializer,
  schedulerDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  schedulerUpdateSerializer,
  _schedulerListResultDeserializer,
  schedulerPrivateLinkResourceDeserializer,
  _schedulerPrivateLinkResourceListResultDeserializer,
  privateEndpointConnectionUpdateSerializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SchedulersListPrivateEndpointConnectionsOptionalParams,
  SchedulersDeletePrivateEndpointConnectionOptionalParams,
  SchedulersUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersGetPrivateEndpointConnectionOptionalParams,
  SchedulersListPrivateLinksOptionalParams,
  SchedulersGetPrivateLinkOptionalParams,
  SchedulersListBySubscriptionOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateEndpointConnectionsSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _listPrivateEndpointConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List private endpoint connections for the durable task scheduler */
export function listPrivateEndpointConnections(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionsSend(context, resourceGroupName, schedulerName, options),
    _listPrivateEndpointConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  options: SchedulersDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a private endpoint connection for the durable task scheduler */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  options: SchedulersDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          schedulerName,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-02-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updatePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnectionUpdate,
  options: SchedulersUpdatePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionUpdateSerializer(properties),
  });
}

export async function _updatePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Update a private endpoint connection for the durable task scheduler */
export function updatePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnectionUpdate,
  options: SchedulersUpdatePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(
    context,
    _updatePrivateEndpointConnectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updatePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          schedulerName,
          privateEndpointConnectionName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-02-01",
    },
  ) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _createOrUpdatePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnection,
  options: SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(resource),
  });
}

export async function _createOrUpdatePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Create or update a private endpoint connection for the durable task scheduler */
export function createOrUpdatePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnection,
  options: SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(
    context,
    _createOrUpdatePrivateEndpointConnectionDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdatePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          schedulerName,
          privateEndpointConnectionName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-02-01",
    },
  ) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  options: SchedulersGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Get a private endpoint connection for the durable task scheduler */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateEndpointConnectionName: string,
  options: SchedulersGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    schedulerName,
    privateEndpointConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}

export function _listPrivateLinksSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersListPrivateLinksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _listPrivateLinksDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchedulerPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _schedulerPrivateLinkResourceListResultDeserializer(result.body);
}

/** List private link resources for the durable task scheduler */
export function listPrivateLinks(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersListPrivateLinksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SchedulerPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateLinksSend(context, resourceGroupName, schedulerName, options),
    _listPrivateLinksDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _getPrivateLinkSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateLinkResourceName: string,
  options: SchedulersGetPrivateLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      privateLinkResourceName: privateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _getPrivateLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<SchedulerPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return schedulerPrivateLinkResourceDeserializer(result.body);
}

/** Get a private link resource for the durable task scheduler */
export async function getPrivateLink(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  privateLinkResourceName: string,
  options: SchedulersGetPrivateLinkOptionalParams = { requestOptions: {} },
): Promise<SchedulerPrivateLinkResource> {
  const result = await _getPrivateLinkSend(
    context,
    resourceGroupName,
    schedulerName,
    privateLinkResourceName,
    options,
  );
  return _getPrivateLinkDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DurableTask/schedulers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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
): Promise<_SchedulerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _schedulerListResultDeserializer(result.body);
}

/** List Schedulers by subscription */
export function listBySubscription(
  context: Client,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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
): Promise<_SchedulerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _schedulerListResultDeserializer(result.body);
}

/** List Schedulers by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Scheduler */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, schedulerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: SchedulerUpdate,
  options: SchedulersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: schedulerUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Scheduler> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Update a Scheduler */
export function update(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: SchedulerUpdate,
  options: SchedulersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Scheduler>, Scheduler> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, schedulerName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: Scheduler,
  options: SchedulersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: schedulerSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Create or update a Scheduler */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: Scheduler,
  options: SchedulersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Scheduler>, Scheduler> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, schedulerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Scheduler> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Get a Scheduler */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): Promise<Scheduler> {
  const result = await _getSend(context, resourceGroupName, schedulerName, options);
  return _getDeserialize(result);
}
