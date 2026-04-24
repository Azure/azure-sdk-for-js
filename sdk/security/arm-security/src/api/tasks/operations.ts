// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecurityTask,
  _SecurityTaskList,
  TaskUpdateActionType,
} from "../../models/tasksAPI/models.js";
import {
  securityTaskDeserializer,
  _securityTaskListDeserializer,
} from "../../models/tasksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TasksListOptionalParams,
  TasksUpdateSubscriptionLevelTaskStateOptionalParams,
  TasksListByHomeRegionOptionalParams,
  TasksGetSubscriptionLevelTaskOptionalParams,
  TasksUpdateResourceGroupLevelTaskStateOptionalParams,
  TasksListByResourceGroupOptionalParams,
  TasksGetResourceGroupLevelTaskOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: TasksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/tasks{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2015-06-01-preview",
      "%24filter": options?.filter,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_SecurityTaskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityTaskListDeserializer(result.body);
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export function list(
  context: Client,
  options: TasksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-06-01-preview" },
  );
}

export function _updateSubscriptionLevelTaskStateSend(
  context: Client,
  ascLocation: string,
  taskName: string,
  taskUpdateActionType: TaskUpdateActionType,
  options: TasksUpdateSubscriptionLevelTaskStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/tasks/{taskName}/{taskUpdateActionType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      taskName: taskName,
      taskUpdateActionType: taskUpdateActionType,
      "api%2Dversion": "2015-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateSubscriptionLevelTaskStateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export async function updateSubscriptionLevelTaskState(
  context: Client,
  ascLocation: string,
  taskName: string,
  taskUpdateActionType: TaskUpdateActionType,
  options: TasksUpdateSubscriptionLevelTaskStateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSubscriptionLevelTaskStateSend(
    context,
    ascLocation,
    taskName,
    taskUpdateActionType,
    options,
  );
  return _updateSubscriptionLevelTaskStateDeserialize(result);
}

export function _listByHomeRegionSend(
  context: Client,
  ascLocation: string,
  options: TasksListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/tasks{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2015-06-01-preview",
      "%24filter": options?.filter,
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

export async function _listByHomeRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityTaskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityTaskListDeserializer(result.body);
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: TasksListByHomeRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHomeRegionSend(context, ascLocation, options),
    _listByHomeRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-06-01-preview" },
  );
}

export function _getSubscriptionLevelTaskSend(
  context: Client,
  ascLocation: string,
  taskName: string,
  options: TasksGetSubscriptionLevelTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      taskName: taskName,
      "api%2Dversion": "2015-06-01-preview",
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

export async function _getSubscriptionLevelTaskDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityTaskDeserializer(result.body);
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export async function getSubscriptionLevelTask(
  context: Client,
  ascLocation: string,
  taskName: string,
  options: TasksGetSubscriptionLevelTaskOptionalParams = { requestOptions: {} },
): Promise<SecurityTask> {
  const result = await _getSubscriptionLevelTaskSend(context, ascLocation, taskName, options);
  return _getSubscriptionLevelTaskDeserialize(result);
}

export function _updateResourceGroupLevelTaskStateSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  taskName: string,
  taskUpdateActionType: TaskUpdateActionType,
  options: TasksUpdateResourceGroupLevelTaskStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/tasks/{taskName}/{taskUpdateActionType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      taskName: taskName,
      taskUpdateActionType: taskUpdateActionType,
      "api%2Dversion": "2015-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateResourceGroupLevelTaskStateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export async function updateResourceGroupLevelTaskState(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  taskName: string,
  taskUpdateActionType: TaskUpdateActionType,
  options: TasksUpdateResourceGroupLevelTaskStateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateResourceGroupLevelTaskStateSend(
    context,
    resourceGroupName,
    ascLocation,
    taskName,
    taskUpdateActionType,
    options,
  );
  return _updateResourceGroupLevelTaskStateDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: TasksListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/tasks{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      "api%2Dversion": "2015-06-01-preview",
      "%24filter": options?.filter,
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
): Promise<_SecurityTaskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityTaskListDeserializer(result.body);
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: TasksListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, ascLocation, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-06-01-preview" },
  );
}

export function _getResourceGroupLevelTaskSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  taskName: string,
  options: TasksGetResourceGroupLevelTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      taskName: taskName,
      "api%2Dversion": "2015-06-01-preview",
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

export async function _getResourceGroupLevelTaskDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityTaskDeserializer(result.body);
}

/** Recommended tasks that will help improve the security of the subscription proactively */
export async function getResourceGroupLevelTask(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  taskName: string,
  options: TasksGetResourceGroupLevelTaskOptionalParams = { requestOptions: {} },
): Promise<SecurityTask> {
  const result = await _getResourceGroupLevelTaskSend(
    context,
    resourceGroupName,
    ascLocation,
    taskName,
    options,
  );
  return _getResourceGroupLevelTaskDeserialize(result);
}
