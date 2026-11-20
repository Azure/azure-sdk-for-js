// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  ResourceOperation,
  OperationStatusResult,
  LocationBasedBulkCreate,
  _BulkCreateOperationStatusListResult,
  _BulkCreateListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationStatusResultDeserializer,
  locationBasedBulkCreateSerializer,
  locationBasedBulkCreateDeserializer,
  _bulkCreateOperationStatusListResultDeserializer,
  _bulkCreateListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BulkCreateListBySubscriptionOptionalParams,
  BulkCreateListByResourceGroupOptionalParams,
  BulkCreateVirtualMachinesGetOperationStatusOptionalParams,
  BulkCreateCreateOptionalParams,
  BulkCreateGetAsyncOperationStatusOptionalParams,
  BulkCreateGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  location: string,
  options: BulkCreateListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/bulkCreate{?api%2Dversion}",
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
): Promise<_BulkCreateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateListResultDeserializer(result.body);
}

/** List BulkCreate resources by subscriptionId. */
export function listBySubscription(
  context: Client,
  location: string,
  options: BulkCreateListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedBulkCreate> {
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
  options: BulkCreateListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreate{?api%2Dversion}",
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
): Promise<_BulkCreateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateListResultDeserializer(result.body);
}

/** List BulkCreate resources by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: BulkCreateListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedBulkCreate> {
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
  options: BulkCreateVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreate/{name}/virtualMachinesGetOperationStatus{?api%2Dversion}",
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
): Promise<_BulkCreateOperationStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bulkCreateOperationStatusListResultDeserializer(result.body);
}

/** Gets the operation status for virtual machines in a BulkCreate operation. */
export function virtualMachinesGetOperationStatus(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
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
  resource: LocationBasedBulkCreate,
  options: BulkCreateCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreate/{name}{?api%2Dversion}",
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
    body: locationBasedBulkCreateSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationBasedBulkCreate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedBulkCreateDeserializer(result.body);
}

/** Creates virtual machines in bulk. */
export function create(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedBulkCreate,
  options: BulkCreateCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LocationBasedBulkCreate>, LocationBasedBulkCreate> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, location, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-16",
  }) as PollerLike<OperationState<LocationBasedBulkCreate>, LocationBasedBulkCreate>;
}

export function _getAsyncOperationStatusSend(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: BulkCreateGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/bulkCreate/asyncOperations/{asyncOperationId}{?api%2Dversion}",
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

/** Get the status of an async operation of a BulkCreate. */
export async function getAsyncOperationStatus(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: BulkCreateGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getAsyncOperationStatusSend(context, location, asyncOperationId, options);
  return _getAsyncOperationStatusDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreate/{name}{?api%2Dversion}",
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
): Promise<LocationBasedBulkCreate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return locationBasedBulkCreateDeserializer(result.body);
}

/** Gets an instance of BulkCreates. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateGetOptionalParams = { requestOptions: {} },
): Promise<LocationBasedBulkCreate> {
  const result = await _getSend(context, resourceGroupName, location, name, options);
  return _getDeserialize(result);
}
