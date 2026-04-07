// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  StartStopManagedInstanceSchedule,
  StartStopScheduleName,
  _StartStopManagedInstanceScheduleListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  startStopManagedInstanceScheduleSerializer,
  startStopManagedInstanceScheduleDeserializer,
  _startStopManagedInstanceScheduleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
  StartStopManagedInstanceSchedulesDeleteOptionalParams,
  StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams,
  StartStopManagedInstanceSchedulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: StartStopManagedInstanceSchedulesListByInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_StartStopManagedInstanceScheduleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _startStopManagedInstanceScheduleListResultDeserializer(result.body);
}

/** Lists the managed instance's Start/Stop schedules. */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: StartStopManagedInstanceSchedulesListByInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StartStopManagedInstanceSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  options: StartStopManagedInstanceSchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      startStopScheduleName: startStopScheduleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

/** Deletes the managed instance's Start/Stop schedule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  options: StartStopManagedInstanceSchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    managedInstanceName,
    startStopScheduleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  parameters: StartStopManagedInstanceSchedule,
  options: StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      startStopScheduleName: startStopScheduleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: startStopManagedInstanceScheduleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StartStopManagedInstanceSchedule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return startStopManagedInstanceScheduleDeserializer(result.body);
}

/** Creates or updates the managed instance's Start/Stop schedule. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  parameters: StartStopManagedInstanceSchedule,
  options: StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<StartStopManagedInstanceSchedule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    managedInstanceName,
    startStopScheduleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  options: StartStopManagedInstanceSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      startStopScheduleName: startStopScheduleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StartStopManagedInstanceSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return startStopManagedInstanceScheduleDeserializer(result.body);
}

/** Gets the managed instance's Start/Stop schedule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  startStopScheduleName: StartStopScheduleName,
  options: StartStopManagedInstanceSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<StartStopManagedInstanceSchedule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    startStopScheduleName,
    options,
  );
  return _getDeserialize(result);
}
