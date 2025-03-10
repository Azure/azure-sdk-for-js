// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DurableTaskContext as Client,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersGetOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersListBySubscriptionOptionalParams,
  SchedulersUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  Scheduler,
  schedulerSerializer,
  schedulerDeserializer,
  _SchedulerListResult,
  _schedulerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _schedulersListBySubscriptionSend(
  context: Client,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DurableTask/schedulers{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _schedulersListBySubscriptionDeserialize(
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
export function schedulersListBySubscription(
  context: Client,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () => _schedulersListBySubscriptionSend(context, options),
    _schedulersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _schedulersListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _schedulersListByResourceGroupDeserialize(
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
export function schedulersListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _schedulersListByResourceGroupSend(context, resourceGroupName, options),
    _schedulersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _schedulersDeleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _schedulersDeleteDeserialize(
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

/** Delete a Scheduler */
export function schedulersDelete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _schedulersDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _schedulersDeleteSend(
          context,
          resourceGroupName,
          schedulerName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _schedulersUpdateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: Scheduler,
  options: SchedulersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: schedulerSerializer(properties),
    });
}

export async function _schedulersUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Update a Scheduler */
export function schedulersUpdate(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: Scheduler,
  options: SchedulersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Scheduler>, Scheduler> {
  return getLongRunningPoller(
    context,
    _schedulersUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _schedulersUpdateSend(
          context,
          resourceGroupName,
          schedulerName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _schedulersCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: Scheduler,
  options: SchedulersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: schedulerSerializer(resource),
    });
}

export async function _schedulersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Create or update a Scheduler */
export function schedulersCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: Scheduler,
  options: SchedulersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Scheduler>, Scheduler> {
  return getLongRunningPoller(
    context,
    _schedulersCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _schedulersCreateOrUpdateSend(
          context,
          resourceGroupName,
          schedulerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _schedulersGetSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _schedulersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schedulerDeserializer(result.body);
}

/** Get a Scheduler */
export async function schedulersGet(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): Promise<Scheduler> {
  const result = await _schedulersGetSend(
    context,
    resourceGroupName,
    schedulerName,
    options,
  );
  return _schedulersGetDeserialize(result);
}
