// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext as Client } from "../index.js";
import type { TaskQueue, TaskQueueUpdate, _TaskQueueListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  taskQueueSerializer,
  taskQueueDeserializer,
  taskQueueUpdateSerializer,
  _taskQueueListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TaskQueuesListByTaskHubOptionalParams,
  TaskQueuesDeleteOptionalParams,
  TaskQueuesUpdateOptionalParams,
  TaskQueuesCreateOrUpdateOptionalParams,
  TaskQueuesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByTaskHubSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskQueuesListByTaskHubOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}/taskQueues{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      taskHubName: taskHubName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listByTaskHubDeserialize(
  result: PathUncheckedResponse,
): Promise<_TaskQueueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _taskQueueListResultDeserializer(result.body);
}

/** List Task Queues by Task Hub */
export function listByTaskHub(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  options: TaskQueuesListByTaskHubOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TaskQueue> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTaskHubSend(context, resourceGroupName, schedulerName, taskHubName, options),
    _listByTaskHubDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  options: TaskQueuesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}/taskQueues/{taskQueueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      taskHubName: taskHubName,
      taskQueueName: taskQueueName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Task Queue */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  options: TaskQueuesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, schedulerName, taskHubName, taskQueueName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  properties: TaskQueueUpdate,
  options: TaskQueuesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}/taskQueues/{taskQueueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      taskHubName: taskHubName,
      taskQueueName: taskQueueName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskQueueUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<TaskQueue> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskQueueDeserializer(result.body);
}

/** Update a Task Queue */
export function update(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  properties: TaskQueueUpdate,
  options: TaskQueuesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TaskQueue>, TaskQueue> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        schedulerName,
        taskHubName,
        taskQueueName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<TaskQueue>, TaskQueue>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  resource: TaskQueue,
  options: TaskQueuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}/taskQueues/{taskQueueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      taskHubName: taskHubName,
      taskQueueName: taskQueueName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskQueueSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TaskQueue> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskQueueDeserializer(result.body);
}

/** Create or update a Task Queue */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  resource: TaskQueue,
  options: TaskQueuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TaskQueue>, TaskQueue> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        schedulerName,
        taskHubName,
        taskQueueName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<TaskQueue>, TaskQueue>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  options: TaskQueuesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}/taskQueues/{taskQueueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      taskHubName: taskHubName,
      taskQueueName: taskQueueName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TaskQueue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskQueueDeserializer(result.body);
}

/** Get a Task Queue */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  taskHubName: string,
  taskQueueName: string,
  options: TaskQueuesGetOptionalParams = { requestOptions: {} },
): Promise<TaskQueue> {
  const result = await _getSend(
    context,
    resourceGroupName,
    schedulerName,
    taskHubName,
    taskQueueName,
    options,
  );
  return _getDeserialize(result);
}
