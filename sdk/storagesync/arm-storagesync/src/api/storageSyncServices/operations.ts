// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext as Client } from "../index.js";
import {
  storageSyncErrorDeserializer,
  StorageSyncService,
  storageSyncServiceDeserializer,
  StorageSyncServiceCreateParameters,
  storageSyncServiceCreateParametersSerializer,
  storageSyncServiceUpdateParametersSerializer,
  _StorageSyncServiceArray,
  _storageSyncServiceArrayDeserializer,
  CheckNameAvailabilityParameters,
  checkNameAvailabilityParametersSerializer,
  CheckNameAvailabilityResult,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageSyncServicesCheckNameAvailabilityOptionalParams,
  StorageSyncServicesListBySubscriptionOptionalParams,
  StorageSyncServicesListByResourceGroupOptionalParams,
  StorageSyncServicesDeleteOptionalParams,
  StorageSyncServicesUpdateOptionalParams,
  StorageSyncServicesCreateOptionalParams,
  StorageSyncServicesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityParameters,
  options: StorageSyncServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/locations/{locationName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: checkNameAvailabilityParametersSerializer(parameters),
    });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Check the give namespace name availability. */
export async function checkNameAvailability(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityParameters,
  options: StorageSyncServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, locationName, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: StorageSyncServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/storageSyncServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageSyncServiceArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _storageSyncServiceArrayDeserializer(result.body);
}

/** Get a StorageSyncService list by subscription. */
export function listBySubscription(
  context: Client,
  options: StorageSyncServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageSyncService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: StorageSyncServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageSyncServiceArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _storageSyncServiceArrayDeserializer(result.body);
}

/** Get a StorageSyncService list by Resource group name. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageSyncServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageSyncService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a given StorageSyncService. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageSyncServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: !options?.parameters
        ? options?.parameters
        : storageSyncServiceUpdateParametersSerializer(options?.parameters),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageSyncService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return storageSyncServiceDeserializer(result.body);
}

/** Patch a given StorageSyncService. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageSyncService>, StorageSyncService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, storageSyncServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<StorageSyncService>, StorageSyncService>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  parameters: StorageSyncServiceCreateParameters,
  options: StorageSyncServicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: storageSyncServiceCreateParametersSerializer(parameters),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageSyncService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return storageSyncServiceDeserializer(result.body);
}

/** Create a new StorageSyncService. */
export function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  parameters: StorageSyncServiceCreateParameters,
  options: StorageSyncServicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageSyncService>, StorageSyncService> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, storageSyncServiceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<StorageSyncService>, StorageSyncService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageSyncService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return storageSyncServiceDeserializer(result.body);
}

/** Get a given StorageSyncService. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: StorageSyncServicesGetOptionalParams = { requestOptions: {} },
): Promise<StorageSyncService> {
  const result = await _getSend(context, resourceGroupName, storageSyncServiceName, options);
  return _getDeserialize(result);
}
