// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DedicatedCapacity,
  dedicatedCapacitySerializer,
  dedicatedCapacityDeserializer,
  DedicatedCapacityUpdateParameters,
  dedicatedCapacityUpdateParametersSerializer,
  _DedicatedCapacities,
  _dedicatedCapacitiesDeserializer,
  OkResponse,
  okResponseDeserializer,
  SkuEnumerationForExistingResourceResult,
  skuEnumerationForExistingResourceResultDeserializer,
  SkuEnumerationForNewResourceResult,
  skuEnumerationForNewResourceResultDeserializer,
  CheckCapacityNameAvailabilityParameters,
  checkCapacityNameAvailabilityParametersSerializer,
  CheckCapacityNameAvailabilityResult,
  checkCapacityNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import {
  CapacitiesCheckNameAvailabilityOptionalParams,
  CapacitiesListSkusOptionalParams,
  CapacitiesListSkusForCapacityOptionalParams,
  CapacitiesResumeOptionalParams,
  CapacitiesSuspendOptionalParams,
  CapacitiesListOptionalParams,
  CapacitiesListByResourceGroupOptionalParams,
  CapacitiesDeleteOptionalParams,
  CapacitiesUpdateOptionalParams,
  CapacitiesCreateOptionalParams,
  CapacitiesGetDetailsOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  capacityParameters: CheckCapacityNameAvailabilityParameters,
  options: CapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: checkCapacityNameAvailabilityParametersSerializer(capacityParameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckCapacityNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkCapacityNameAvailabilityResultDeserializer(result.body);
}

/** Check the name availability in the target location. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  capacityParameters: CheckCapacityNameAvailabilityParameters,
  options: CapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckCapacityNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, location, capacityParameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  options: CapacitiesListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuEnumerationForNewResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return skuEnumerationForNewResourceResultDeserializer(result.body);
}

/** Lists eligible SKUs for PowerBI Dedicated resource provider. */
export async function listSkus(
  context: Client,
  options: CapacitiesListSkusOptionalParams = { requestOptions: {} },
): Promise<SkuEnumerationForNewResourceResult> {
  const result = await _listSkusSend(context, options);
  return _listSkusDeserialize(result);
}

export function _listSkusForCapacitySend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesListSkusForCapacityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSkusForCapacityDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuEnumerationForExistingResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return skuEnumerationForExistingResourceResultDeserializer(result.body);
}

/** Lists eligible SKUs for a PowerBI Dedicated resource. */
export async function listSkusForCapacity(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesListSkusForCapacityOptionalParams = { requestOptions: {} },
): Promise<SkuEnumerationForExistingResourceResult> {
  const result = await _listSkusForCapacitySend(
    context,
    resourceGroupName,
    dedicatedCapacityName,
    options,
  );
  return _listSkusForCapacityDeserialize(result);
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Resumes operation of the specified Dedicated capacity instance. */
export function resume(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _resumeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(context, resourceGroupName, dedicatedCapacityName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _suspendDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Suspends operation of the specified dedicated capacity instance. */
export function suspend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesSuspendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _suspendDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _suspendSend(context, resourceGroupName, dedicatedCapacityName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _listSend(
  context: Client,
  options: CapacitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/capacities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DedicatedCapacities> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dedicatedCapacitiesDeserializer(result.body);
}

/** Lists all the Dedicated capacities for the given subscription. */
export function list(
  context: Client,
  options: CapacitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DedicatedCapacity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CapacitiesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DedicatedCapacities> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dedicatedCapacitiesDeserializer(result.body);
}

/** Gets all the Dedicated capacities for the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CapacitiesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DedicatedCapacity> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified Dedicated capacity. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dedicatedCapacityName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  capacityUpdateParameters: DedicatedCapacityUpdateParameters,
  options: CapacitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dedicatedCapacityUpdateParametersSerializer(capacityUpdateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedCapacity> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dedicatedCapacityDeserializer(result.body);
}

/** Updates the current state of the specified Dedicated capacity. */
export function update(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  capacityUpdateParameters: DedicatedCapacityUpdateParameters,
  options: CapacitiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        dedicatedCapacityName,
        capacityUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  capacityParameters: DedicatedCapacity,
  options: CapacitiesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dedicatedCapacitySerializer(capacityParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedCapacity> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dedicatedCapacityDeserializer(result.body);
}

/** Provisions the specified Dedicated capacity based on the configuration specified in the request. */
export function create(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  capacityParameters: DedicatedCapacity,
  options: CapacitiesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, dedicatedCapacityName, capacityParameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity>;
}

export function _getDetailsSend(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesGetDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dedicatedCapacityName: dedicatedCapacityName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedCapacity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dedicatedCapacityDeserializer(result.body);
}

/** Gets details about the specified dedicated capacity. */
export async function getDetails(
  context: Client,
  resourceGroupName: string,
  dedicatedCapacityName: string,
  options: CapacitiesGetDetailsOptionalParams = { requestOptions: {} },
): Promise<DedicatedCapacity> {
  const result = await _getDetailsSend(context, resourceGroupName, dedicatedCapacityName, options);
  return _getDetailsDeserialize(result);
}
