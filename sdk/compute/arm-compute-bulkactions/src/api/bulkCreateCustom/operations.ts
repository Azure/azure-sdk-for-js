// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  OperationStatusResult,
  LocationBasedBulkCreateCustom,
  _BulkCreateCustomListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationStatusResultDeserializer,
  locationBasedBulkCreateCustomSerializer,
  locationBasedBulkCreateCustomDeserializer,
  _bulkCreateCustomListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BulkCreateCustomListBySubscriptionOptionalParams,
  BulkCreateCustomListByResourceGroupOptionalParams,
  BulkCreateCustomCancelOptionalParams,
  BulkCreateCustomDeleteOptionalParams,
  BulkCreateCustomCreateOrUpdateOptionalParams,
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
  options: BulkCreateCustomListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom{?api%2Dversion}",
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
  options: BulkCreateCustomCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}/cancel{?api%2Dversion}",
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
/** Cancels BulkCreateCustom instances that have not yet launched. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomCancelOptionalParams = { requestOptions: {} },
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
  options: BulkCreateCustomDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}{?api%2Dversion,deleteInstances}",
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
/** Deletes BulkCreateCustoms. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkCreateCustomDeleteOptionalParams = { requestOptions: {} },
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
  resource: LocationBasedBulkCreateCustom,
  options: BulkCreateCustomCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/bulkCreateCustom/{name}{?api%2Dversion}",
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
    body: locationBasedBulkCreateCustomSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
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
/** Creates or updates BulkCreateCustoms. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedBulkCreateCustom,
  options: BulkCreateCustomCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LocationBasedBulkCreateCustom>, LocationBasedBulkCreateCustom> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, location, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
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
