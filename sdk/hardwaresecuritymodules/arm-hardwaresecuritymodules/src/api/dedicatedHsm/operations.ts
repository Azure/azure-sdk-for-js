// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import {
  DedicatedHsm,
  dedicatedHsmSerializer,
  dedicatedHsmDeserializer,
  dedicatedHsmErrorDeserializer,
  DedicatedHsmPatchParameters,
  dedicatedHsmPatchParametersSerializer,
  _DedicatedHsmListResult,
  _dedicatedHsmListResultDeserializer,
  _OutboundEnvironmentEndpointCollection,
  _outboundEnvironmentEndpointCollectionDeserializer,
  OutboundEnvironmentEndpoint,
} from "../../models/models.js";
import {
  DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams,
  DedicatedHsmListBySubscriptionOptionalParams,
  DedicatedHsmListByResourceGroupOptionalParams,
  DedicatedHsmDeleteOptionalParams,
  DedicatedHsmUpdateOptionalParams,
  DedicatedHsmCreateOrUpdateOptionalParams,
  DedicatedHsmGetOptionalParams,
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

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _listOutboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<_OutboundEnvironmentEndpointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _outboundEnvironmentEndpointCollectionDeserializer(result.body);
}

/** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. */
export function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OutboundEnvironmentEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listOutboundNetworkDependenciesEndpointsSend(context, resourceGroupName, name, options),
    _listOutboundNetworkDependenciesEndpointsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: DedicatedHsmListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DedicatedHsmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _dedicatedHsmListResultDeserializer(result.body);
}

/** The List operation gets information about the dedicated HSMs associated with the subscription. */
export function listBySubscription(
  context: Client,
  options: DedicatedHsmListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DedicatedHsm> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DedicatedHsmListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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
): Promise<_DedicatedHsmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _dedicatedHsmListResultDeserializer(result.body);
}

/** The List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DedicatedHsmListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DedicatedHsm> {
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
  name: string,
  options: DedicatedHsmDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified Azure Dedicated HSM. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DedicatedHsmDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: DedicatedHsmPatchParameters,
  options: DedicatedHsmUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    body: dedicatedHsmPatchParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DedicatedHsm> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return dedicatedHsmDeserializer(result.body);
}

/** Update a dedicated HSM in the specified subscription. */
export function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: DedicatedHsmPatchParameters,
  options: DedicatedHsmUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedHsm>, DedicatedHsm> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DedicatedHsm>, DedicatedHsm>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: DedicatedHsm,
  options: DedicatedHsmCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    body: dedicatedHsmSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedHsm> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return dedicatedHsmDeserializer(result.body);
}

/** Create or Update a dedicated HSM in the specified subscription. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: DedicatedHsm,
  options: DedicatedHsmCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedHsm>, DedicatedHsm> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DedicatedHsm>, DedicatedHsm>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DedicatedHsmGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DedicatedHsm> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = dedicatedHsmErrorDeserializer(result.body);
    throw error;
  }

  return dedicatedHsmDeserializer(result.body);
}

/** Gets the specified Azure dedicated HSM. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DedicatedHsmGetOptionalParams = { requestOptions: {} },
): Promise<DedicatedHsm> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}
