// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  LocationBasedLaunchBulkInstancesOperation,
  OperationStatusResult,
  _LaunchBulkInstancesOperationListResult,
  _VirtualMachineListResult,
  VirtualMachine,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  locationBasedLaunchBulkInstancesOperationSerializer,
  locationBasedLaunchBulkInstancesOperationDeserializer,
  operationStatusResultDeserializer,
  _launchBulkInstancesOperationListResultDeserializer,
  _virtualMachineListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LaunchBulkInstancesOperationListVirtualMachinesOptionalParams,
  LaunchBulkInstancesOperationListBySubscriptionOptionalParams,
  LaunchBulkInstancesOperationListByResourceGroupOptionalParams,
  LaunchBulkInstancesOperationCancelOptionalParams,
  LaunchBulkInstancesOperationDeleteOptionalParams,
  LaunchBulkInstancesOperationCreateOrUpdateOptionalParams,
  LaunchBulkInstancesOperationGetOperationStatusOptionalParams,
  LaunchBulkInstancesOperationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVirtualMachinesSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationListVirtualMachinesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/{name}/virtualMachines{?api%2Dversion,%24filter,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
      "%24filter": options?.filter,
      "%24skiptoken": options?.skiptoken,
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

export async function _listVirtualMachinesDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _virtualMachineListResultDeserializer(result.body);
}
/** List VirtualMachine resources of a LaunchBulkInstancesOperation. */
export function listVirtualMachines(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationListVirtualMachinesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listVirtualMachinesSend(context, resourceGroupName, location, name, options),
    _listVirtualMachinesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  location: string,
  options: LaunchBulkInstancesOperationListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_LaunchBulkInstancesOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _launchBulkInstancesOperationListResultDeserializer(result.body);
}
/** List LaunchBulkInstancesOperation resources by subscriptionId. */
export function listBySubscription(
  context: Client,
  location: string,
  options: LaunchBulkInstancesOperationListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, location, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: LaunchBulkInstancesOperationListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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
): Promise<_LaunchBulkInstancesOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _launchBulkInstancesOperationListResultDeserializer(result.body);
}
/** List LaunchBulkInstancesOperation resources by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: LaunchBulkInstancesOperationListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, location, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/{name}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Cancels LaunchBulkInstancesOperation instances that have not yet launched. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, location, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion,deleteInstances}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
      deleteInstances: options?.deleteInstances,
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
/** Deletes LaunchBulkInstancesOperations. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, location, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedLaunchBulkInstancesOperation,
  options: LaunchBulkInstancesOperationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: locationBasedLaunchBulkInstancesOperationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedLaunchBulkInstancesOperationDeserializer(result.body);
}
/** Creates or updates LaunchBulkInstancesOperations. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedLaunchBulkInstancesOperation,
  options: LaunchBulkInstancesOperationCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LocationBasedLaunchBulkInstancesOperation>,
  LocationBasedLaunchBulkInstancesOperation
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, location, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<
    OperationState<LocationBasedLaunchBulkInstancesOperation>,
    LocationBasedLaunchBulkInstancesOperation
  >;
}

export function _getOperationStatusSend(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: LaunchBulkInstancesOperationGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/asyncOperations/{asyncOperationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      asyncOperationId: asyncOperationId,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}
/** Get the status of a LaunchBulkInstancesOperation. */
export async function getOperationStatus(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: LaunchBulkInstancesOperationGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getOperationStatusSend(context, location, asyncOperationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedLaunchBulkInstancesOperationDeserializer(result.body);
}
/** Gets an instance of LaunchBulkInstancesOperations. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: LaunchBulkInstancesOperationGetOptionalParams = { requestOptions: {} },
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const result = await _getSend(context, resourceGroupName, location, name, options);
  return _getDeserialize(result);
}
