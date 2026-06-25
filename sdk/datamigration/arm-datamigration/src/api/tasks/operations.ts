// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext as Client } from "../index.js";
import {
  ProjectTask,
  projectTaskSerializer,
  projectTaskDeserializer,
  commandPropertiesUnionSerializer,
  commandPropertiesUnionDeserializer,
  CommandPropertiesUnion,
  apiErrorDeserializer,
  _TaskList,
  _taskListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TasksCommandOptionalParams,
  TasksCancelOptionalParams,
  TasksListOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOrUpdateOptionalParams,
  TasksGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _commandSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: CommandPropertiesUnion,
  options: TasksCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}/command{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: commandPropertiesUnionSerializer(parameters),
    });
}

export async function _commandDeserialize(
  result: PathUncheckedResponse,
): Promise<CommandPropertiesUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return commandPropertiesUnionDeserializer(result.body);
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task. */
export async function command(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: CommandPropertiesUnion,
  options: TasksCommandOptionalParams = { requestOptions: {} },
): Promise<CommandPropertiesUnion> {
  const result = await _commandSend(
    context,
    groupName,
    serviceName,
    projectName,
    taskName,
    parameters,
    options,
  );
  return _commandDeserialize(result);
}

export function _cancelSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<ProjectTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectTaskDeserializer(result.body);
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running. */
export async function cancel(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksCancelOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _cancelSend(context, groupName, serviceName, projectName, taskName, options);
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: TasksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks{?api%2Dversion,taskType}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      taskType: options?.taskType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_TaskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _taskListDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task. */
export function list(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: TasksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProjectTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, groupName, serviceName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}{?api%2Dversion,deleteRunningTasks}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      deleteRunningTasks: options?.deleteRunningTasks,
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
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a task, canceling it first if it's running. */
export async function $delete(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    groupName,
    serviceName,
    projectName,
    taskName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: ProjectTask,
  options: TasksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: projectTaskSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ProjectTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectTaskDeserializer(result.body);
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so. */
export async function update(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: ProjectTask,
  options: TasksUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _updateSend(
    context,
    groupName,
    serviceName,
    projectName,
    taskName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: ProjectTask,
  options: TasksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: projectTaskSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectTask> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectTaskDeserializer(result.body);
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new task or updates an existing one, although since tasks have no mutable custom properties, there is little reason to update an existing one. */
export async function createOrUpdate(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  parameters: ProjectTask,
  options: TasksCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _createOrUpdateSend(
    context,
    groupName,
    serviceName,
    projectName,
    taskName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProjectTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectTaskDeserializer(result.body);
}

/** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task. */
export async function get(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  taskName: string,
  options: TasksGetOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _getSend(context, groupName, serviceName, projectName, taskName, options);
  return _getDeserialize(result);
}
