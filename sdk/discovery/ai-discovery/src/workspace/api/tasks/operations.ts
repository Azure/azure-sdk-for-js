// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext as Client } from "../index.js";
import {
  Task,
  taskSerializer,
  taskDeserializer,
  TaskComment,
  taskCommentSerializer,
  ExecutionHistoryEntry,
  executionHistoryEntrySerializer,
  startTaskRequestSerializer,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { _PagedTask, _pagedTaskDeserializer } from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  TasksAddExecutionHistoryOptionalParams,
  TasksAddCommentOptionalParams,
  TasksStartOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOptionalParams,
  TasksListOptionalParams,
  TasksGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _addExecutionHistorySend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  body: ExecutionHistoryEntry,
  options: TasksAddExecutionHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}:addExecutionHistory{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executionHistoryEntrySerializer(body),
  });
}

export async function _addExecutionHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Add an execution history entry to a task. */
export async function addExecutionHistory(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  body: ExecutionHistoryEntry,
  options: TasksAddExecutionHistoryOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _addExecutionHistorySend(
    context,
    projectName,
    investigationName,
    taskName,
    body,
    options,
  );
  return _addExecutionHistoryDeserialize(result);
}

export function _addCommentSend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  body: TaskComment,
  options: TasksAddCommentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}:addComment{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskCommentSerializer(body),
  });
}

export async function _addCommentDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Add a comment to a task. */
export async function addComment(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  body: TaskComment,
  options: TasksAddCommentOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _addCommentSend(
    context,
    projectName,
    investigationName,
    taskName,
    body,
    options,
  );
  return _addCommentDeserialize(result);
}

export function _startSend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}:start{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.body ? options?.body : startTaskRequestSerializer(options?.body),
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Start execution of a task. */
export async function start(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksStartOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _startSend(context, projectName, investigationName, taskName, options);
  return _startDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}
/** Delete a task by ID. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, projectName, investigationName, taskName, options);
  return _$deleteDeserialize(result);
}

export function _stableUpdateSend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  resource: Task,
  options: TasksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskSerializer(resource),
  });
}

export async function _stableUpdateDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Patch (partial update) a task (e.g. status, description, validation requirements, dependencies, result). */
export async function stableUpdate(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  resource: Task,
  options: TasksUpdateOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _stableUpdateSend(
    context,
    projectName,
    investigationName,
    taskName,
    resource,
    options,
  );
  return _stableUpdateDeserialize(result);
}

export function _createSend(
  context: Client,
  projectName: string,
  investigationName: string,
  body: Task,
  options: TasksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: taskSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Create a new task. */
export async function create(
  context: Client,
  projectName: string,
  investigationName: string,
  body: Task,
  options: TasksCreateOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _createSend(context, projectName, investigationName, body, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: TasksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks{?api%2Dversion,filter}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
      filter: options?.filter,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTaskDeserializer(result.body);
}
/** List tasks with optional OData filters. */
export function list(
  context: Client,
  projectName: string,
  investigationName: string,
  options: TasksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Task> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, projectName, investigationName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-06-01" },
  );
}

export function _getSend(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/tasks/{taskName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      taskName: taskName,
      "api%2Dversion": "2026-06-01",
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
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}
/** Get a task by ID. */
export async function get(
  context: Client,
  projectName: string,
  investigationName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _getSend(context, projectName, investigationName, taskName, options);
  return _getDeserialize(result);
}
