// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext as Client } from "../index.js";
import type {
  AvailabilityGroupListener,
  _AvailabilityGroupListenerListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  availabilityGroupListenerSerializer,
  availabilityGroupListenerDeserializer,
  _availabilityGroupListenerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AvailabilityGroupListenersListByGroupOptionalParams,
  AvailabilityGroupListenersDeleteOptionalParams,
  AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  AvailabilityGroupListenersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByGroupSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: AvailabilityGroupListenersListByGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
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

export async function _listByGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailabilityGroupListenerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _availabilityGroupListenerListResultDeserializer(result.body);
}

/** Lists all availability group listeners in a SQL virtual machine group. */
export function listByGroup(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: AvailabilityGroupListenersListByGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilityGroupListener> {
  return buildPagedAsyncIterator(
    context,
    () => _listByGroupSend(context, resourceGroupName, sqlVirtualMachineGroupName, options),
    _listByGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  options: AvailabilityGroupListenersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
      availabilityGroupListenerName: availabilityGroupListenerName,
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an availability group listener. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  options: AvailabilityGroupListenersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  parameters: AvailabilityGroupListener,
  options: AvailabilityGroupListenersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
      availabilityGroupListenerName: availabilityGroupListenerName,
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: availabilityGroupListenerSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailabilityGroupListener> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return availabilityGroupListenerDeserializer(result.body);
}

/** Creates or updates an availability group listener. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  parameters: AvailabilityGroupListener,
  options: AvailabilityGroupListenersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AvailabilityGroupListener>, AvailabilityGroupListener> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-10-01",
  }) as PollerLike<OperationState<AvailabilityGroupListener>, AvailabilityGroupListener>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  options: AvailabilityGroupListenersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
      availabilityGroupListenerName: availabilityGroupListenerName,
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailabilityGroupListener> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return availabilityGroupListenerDeserializer(result.body);
}

/** Gets an availability group listener. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  availabilityGroupListenerName: string,
  options: AvailabilityGroupListenersGetOptionalParams = { requestOptions: {} },
): Promise<AvailabilityGroupListener> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlVirtualMachineGroupName,
    availabilityGroupListenerName,
    options,
  );
  return _getDeserialize(result);
}
