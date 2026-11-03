// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext as Client } from "../index.js";
import type { TaskRun, TaskRunUpdateParameters, _TaskRunListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  taskRunSerializer,
  taskRunDeserializer,
  taskRunUpdateParametersSerializer,
  _taskRunListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TaskRunsGetDetailsOptionalParams,
  TaskRunsListOptionalParams,
  TaskRunsDeleteOptionalParams,
  TaskRunsUpdateOptionalParams,
  TaskRunsCreateOptionalParams,
  TaskRunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getDetailsSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  options: TaskRunsGetDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns/{taskRunName}/listDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      taskRunName: taskRunName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDetailsDeserialize(result: PathUncheckedResponse): Promise<TaskRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return taskRunDeserializer(result.body);
}

/** Gets the detailed information for a given task run that includes all secrets. */
export async function getDetails(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  options: TaskRunsGetDetailsOptionalParams = { requestOptions: {} },
): Promise<TaskRun> {
  const result = await _getDetailsSend(
    context,
    resourceGroupName,
    registryName,
    taskRunName,
    options,
  );
  return _getDetailsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: TaskRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_TaskRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _taskRunListResultDeserializer(result.body);
}

/** Lists all the task runs for a specified container registry. */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: TaskRunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TaskRun> {
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
  taskRunName: string,
  options: TaskRunsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns/{taskRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      taskRunName: taskRunName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a specified task run resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  options: TaskRunsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, registryName, taskRunName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  updateParameters: TaskRunUpdateParameters,
  options: TaskRunsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns/{taskRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      taskRunName: taskRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskRunUpdateParametersSerializer(updateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<TaskRun> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return taskRunDeserializer(result.body);
}

/** Updates a task run with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  updateParameters: TaskRunUpdateParameters,
  options: TaskRunsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TaskRun>, TaskRun> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, registryName, taskRunName, updateParameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<TaskRun>, TaskRun>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  taskRun: TaskRun,
  options: TaskRunsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns/{taskRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      taskRunName: taskRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskRunSerializer(taskRun),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<TaskRun> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return taskRunDeserializer(result.body);
}

/** Creates a task run for a container registry with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  taskRun: TaskRun,
  options: TaskRunsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TaskRun>, TaskRun> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, registryName, taskRunName, taskRun, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<TaskRun>, TaskRun>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  options: TaskRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/taskRuns/{taskRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      taskRunName: taskRunName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TaskRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return taskRunDeserializer(result.body);
}

/** Gets the detailed information for a given task run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  taskRunName: string,
  options: TaskRunsGetOptionalParams = { requestOptions: {} },
): Promise<TaskRun> {
  const result = await _getSend(context, resourceGroupName, registryName, taskRunName, options);
  return _getDeserialize(result);
}
