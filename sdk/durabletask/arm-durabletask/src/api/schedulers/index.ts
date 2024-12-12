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
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _schedulersGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schedulersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schedulerDeserializer(result.body);
}

/** Get a Scheduler */
export async function schedulersGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersGetOptionalParams = { requestOptions: {} },
): Promise<Scheduler> {
  const result = await _schedulersGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    schedulerName,
    options,
  );
  return _schedulersGetDeserialize(result);
}

export function _schedulersCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  resource: Scheduler,
  options: SchedulersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: schedulerSerializer(resource),
    });
}

export async function _schedulersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schedulerDeserializer(result.body);
}

/** Create or update a Scheduler */
export function schedulersCreateOrUpdate(
  context: Client,
  subscriptionId: string,
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
          subscriptionId,
          resourceGroupName,
          schedulerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _schedulersUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  properties: Scheduler,
  options: SchedulersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: schedulerSerializer(properties),
    });
}

export async function _schedulersUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Scheduler> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schedulerDeserializer(result.body);
}

/** Update a Scheduler */
export function schedulersUpdate(
  context: Client,
  subscriptionId: string,
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
          subscriptionId,
          resourceGroupName,
          schedulerName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Scheduler>, Scheduler>;
}

export function _schedulersDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  options: SchedulersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _schedulersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Scheduler */
export function schedulersDelete(
  context: Client,
  subscriptionId: string,
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
          subscriptionId,
          resourceGroupName,
          schedulerName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _schedulersListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schedulersListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchedulerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schedulerListResultDeserializer(result.body);
}

/** List Schedulers by resource group */
export function schedulersListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SchedulersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _schedulersListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _schedulersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _schedulersListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DurableTask/schedulers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schedulersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchedulerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schedulerListResultDeserializer(result.body);
}

/** List Schedulers by subscription */
export function schedulersListBySubscription(
  context: Client,
  subscriptionId: string,
  options: SchedulersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scheduler> {
  return buildPagedAsyncIterator(
    context,
    () => _schedulersListBySubscriptionSend(context, subscriptionId, options),
    _schedulersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
