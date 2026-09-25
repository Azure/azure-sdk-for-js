// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext as Client } from "../index.js";
import type {
  TaskCreate,
  Task,
  _TaskListResult,
  TaskSummaryRequest,
  TaskSummaryResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  taskCreateSerializer,
  taskDeserializer,
  _taskListResultDeserializer,
  taskSummaryRequestSerializer,
  taskSummaryResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TasksGetSummaryOptionalParams,
  TasksDeleteOptionalParams,
  TasksListByParentOptionalParams,
  TasksGetOptionalParams,
  TasksCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSummarySend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: TaskSummaryRequest,
  options: TasksGetSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/taskSummary{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskSummaryRequestSerializer(body),
  });
}

export async function _getSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<TaskSummaryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskSummaryResponseDeserializer(result.body);
}

/** Retrieves task summary across all tasks in the project. */
export async function getSummary(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: TaskSummaryRequest,
  options: TasksGetSummaryOptionalParams = { requestOptions: {} },
): Promise<TaskSummaryResponse> {
  const result = await _getSummarySend(context, resourceGroupName, projectName, body, options);
  return _getSummaryDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

/** Delete a Task */
export function $delete(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, projectName, taskName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: TasksListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/tasks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_TaskListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _taskListResultDeserializer(result.body);
}

/** List Task resources by MigrateProject */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: TasksListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Task> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, projectName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskDeserializer(result.body);
}

/** Get a Task */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _getSend(context, resourceGroupName, projectName, taskName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  resource: TaskCreate,
  options: TasksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskCreateSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return taskDeserializer(result.body);
}

/** Create a Task */
export function create(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  taskName: string,
  resource: TaskCreate,
  options: TasksCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Task>, Task> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, projectName, taskName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<Task>, Task>;
}
