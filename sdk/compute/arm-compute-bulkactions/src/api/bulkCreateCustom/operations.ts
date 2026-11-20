// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  ResourceOperation,
  LocationBasedBulkCreateCustom,
  OperationStatusResult,
  _BulkCreateCustomOperationStatusListResult,
  _BulkCreateCustomListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  locationBasedBulkCreateCustomSerializer,
  locationBasedBulkCreateCustomDeserializer,
  operationStatusResultDeserializer,
  _bulkCreateCustomOperationStatusListResultDeserializer,
  _bulkCreateCustomListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BulkCreateCustomListBySubscriptionOptionalParams,
  BulkCreateCustomListByResourceGroupOptionalParams,
  BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams,
  BulkCreateCustomCreateOptionalParams,
  BulkCreateCustomGetAsyncOperationStatusOptionalParams,
  BulkCreateCustomGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  location: string,
  options: BulkCreateCustomListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
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
): Promise<_BulkCreateCustomListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateCustomListResultDeserializer(result.body);
}

/** List BulkCreateCustom resources by subscriptionId. */
export function listBySubscription(
  context: Client,
  location: string,
  options: BulkCreateCustomListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedBulkCreateCustom> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, location, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-16" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: BulkCreateCustomListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
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
): Promise<_BulkCreateCustomListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateCustomListResultDeserializer(result.body);
}

/** List BulkCreateCustom resources by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: BulkCreateCustomListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedBulkCreateCustom> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, location, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-16" },
  );
}

export function _virtualMachinesGetOperationStatusSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}/virtualMachinesGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
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

export async function _virtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<_BulkCreateCustomOperationStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateCustomOperationStatusListResultDeserializer(result.body);
}

/** Gets the operation status for virtual machines in a BulkCreateCustom operation. */
export function virtualMachinesGetOperationStatus(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceOperation> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _virtualMachinesGetOperationStatusSend(context, resourceGroupName, location, name, options),
    _virtualMachinesGetOperationStatusDeserialize,
    ["200"],
    {
      itemName: "results",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-16",
    },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedBulkCreateCustom,
  options: BulkCreateCustomCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: locationBasedBulkCreateCustomSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationBasedBulkCreateCustom> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedBulkCreateCustomDeserializer(result.body);
}

/** Creates virtual machines in bulk with custom settings. */
export function create(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedBulkCreateCustom,
  options: BulkCreateCustomCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LocationBasedBulkCreateCustom>, LocationBasedBulkCreateCustom> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, location, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-16",
  }) as PollerLike<OperationState<LocationBasedBulkCreateCustom>, LocationBasedBulkCreateCustom>;
}

export function _getAsyncOperationStatusSend(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: BulkCreateCustomGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/asyncOperations/{asyncOperationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      asyncOperationId: asyncOperationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
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

export async function _getAsyncOperationStatusDeserialize(
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

/** Get the status of an async operation of a BulkCreateCustom. */
export async function getAsyncOperationStatus(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: BulkCreateCustomGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getAsyncOperationStatusSend(context, location, asyncOperationId, options);
  return _getAsyncOperationStatusDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-10-16",
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
): Promise<LocationBasedBulkCreateCustom> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedBulkCreateCustomDeserializer(result.body);
}

/** Gets an instance of BulkCreateCustoms. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomGetOptionalParams = { requestOptions: {} },
): Promise<LocationBasedBulkCreateCustom> {
  const result = await _getSend(context, resourceGroupName, location, name, options);
  return _getDeserialize(result);
}
