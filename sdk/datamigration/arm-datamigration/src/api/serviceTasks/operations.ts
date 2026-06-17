// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type { ProjectTask, _TaskList } from "../../models/models.js";
import {
  projectTaskSerializer,
  projectTaskDeserializer,
  apiErrorDeserializer,
  _taskListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServiceTasksCancelOptionalParams,
  ServiceTasksListOptionalParams,
  ServiceTasksDeleteOptionalParams,
  ServiceTasksUpdateOptionalParams,
  ServiceTasksCreateOrUpdateOptionalParams,
  ServiceTasksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  options: ServiceTasksCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

/** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a service task if it's currently queued or running. */
export async function cancel(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  options: ServiceTasksCancelOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _cancelSend(context, groupName, serviceName, taskName, options);
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServiceTasksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks{?api%2Dversion,taskType}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      taskType: options?.taskType,
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

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service level tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task. */
export function list(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServiceTasksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProjectTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, groupName, serviceName, options),
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
  taskName: string,
  options: ServiceTasksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}{?api%2Dversion,deleteRunningTasks}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
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

/** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running. */
export async function $delete(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  options: ServiceTasksDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, groupName, serviceName, taskName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  parameters: ProjectTask,
  options: ServiceTasksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
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

/** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing service task, but since service tasks have no mutable custom properties, there is little reason to do so. */
export async function update(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  parameters: ProjectTask,
  options: ServiceTasksUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _updateSend(context, groupName, serviceName, taskName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  parameters: ProjectTask,
  options: ServiceTasksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
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

/** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new service task or updates an existing one, although since service tasks have no mutable custom properties, there is little reason to update an existing one. */
export async function createOrUpdate(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  parameters: ProjectTask,
  options: ServiceTasksCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _createOrUpdateSend(
    context,
    groupName,
    serviceName,
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
  taskName: string,
  options: ServiceTasksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      taskName: taskName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      "%24expand": options?.expand,
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

/** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a service task. */
export async function get(
  context: Client,
  groupName: string,
  serviceName: string,
  taskName: string,
  options: ServiceTasksGetOptionalParams = { requestOptions: {} },
): Promise<ProjectTask> {
  const result = await _getSend(context, groupName, serviceName, taskName, options);
  return _getDeserialize(result);
}
