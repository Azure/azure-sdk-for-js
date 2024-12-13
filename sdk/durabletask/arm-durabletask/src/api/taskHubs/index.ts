// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DurableTaskContext as Client,
  TaskHubsCreateOrUpdateOptionalParams,
  TaskHubsDeleteOptionalParams,
  TaskHubsGetOptionalParams,
  TaskHubsListBySchedulerOptionalParams,
} from "../index.js";
import {
  TaskHub,
  taskHubSerializer,
  taskHubDeserializer,
  _TaskHubListResult,
  _taskHubListResultDeserializer,
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

export function _taskHubsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskHubsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
      taskHubName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _taskHubsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<TaskHub> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskHubDeserializer(result.body);
}

/** Get a Task Hub */
export async function taskHubsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskHubsGetOptionalParams = { requestOptions: {} },
): Promise<TaskHub> {
  const result = await _taskHubsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    schedulerName,
    taskHubName,
    options,
  );
  return _taskHubsGetDeserialize(result);
}

export function _taskHubsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  resource: TaskHub,
  options: TaskHubsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
      taskHubName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: taskHubSerializer(resource),
    });
}

export async function _taskHubsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TaskHub> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskHubDeserializer(result.body);
}

/** Create or Update a Task Hub */
export function taskHubsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  resource: TaskHub,
  options: TaskHubsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TaskHub>, TaskHub> {
  return getLongRunningPoller(
    context,
    _taskHubsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _taskHubsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          schedulerName,
          taskHubName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<TaskHub>, TaskHub>;
}

export function _taskHubsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskHubsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
      subscriptionId,
      resourceGroupName,
      schedulerName,
      taskHubName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _taskHubsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Task Hub */
export function taskHubsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskHubsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _taskHubsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _taskHubsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          schedulerName,
          taskHubName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _taskHubsListBySchedulerSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  options: TaskHubsListBySchedulerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs",
      subscriptionId,
      resourceGroupName,
      schedulerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _taskHubsListBySchedulerDeserialize(
  result: PathUncheckedResponse,
): Promise<_TaskHubListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _taskHubListResultDeserializer(result.body);
}

/** List Task Hubs */
export function taskHubsListByScheduler(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schedulerName: string,
  options: TaskHubsListBySchedulerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TaskHub> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _taskHubsListBySchedulerSend(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        options,
      ),
    _taskHubsListBySchedulerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
