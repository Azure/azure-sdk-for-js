// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkToNetworkInterconnect,
  NetworkToNetworkInterconnectPatch,
  _NetworkToNetworkInterconnectListResult,
  NniBfdAdministrativeStateRequest,
  NniBfdAdministrativeStateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  networkToNetworkInterconnectSerializer,
  networkToNetworkInterconnectDeserializer,
  networkToNetworkInterconnectPatchSerializer,
  _networkToNetworkInterconnectListResultDeserializer,
  nniBfdAdministrativeStateRequestSerializer,
  nniBfdAdministrativeStateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
  NetworkToNetworkInterconnectsDeleteOptionalParams,
  NetworkToNetworkInterconnectsUpdateOptionalParams,
  NetworkToNetworkInterconnectsCreateOptionalParams,
  NetworkToNetworkInterconnectsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateBfdAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  body: NniBfdAdministrativeStateRequest,
  options: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}/updateBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
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
    body: nniBfdAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<NniBfdAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nniBfdAdministrativeStateResponseDeserializer(result.body);
}

/** Updates the Admin State. */
export function updateBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  body: NniBfdAdministrativeStateRequest,
  options: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<NniBfdAdministrativeStateResponse>,
  NniBfdAdministrativeStateResponse
> {
  return getLongRunningPoller(
    context,
    _updateBfdAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateBfdAdministrativeStateSend(
          context,
          resourceGroupName,
          networkFabricName,
          networkToNetworkInterconnectName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<NniBfdAdministrativeStateResponse>,
    NniBfdAdministrativeStateResponse
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  body: UpdateAdministrativeState,
  options: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
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
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Updates the Admin State. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  body: UpdateAdministrativeState,
  options: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(
    context,
    _updateAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateAdministrativeStateSend(
          context,
          resourceGroupName,
          networkFabricName,
          networkToNetworkInterconnectName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _listByNetworkFabricSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
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

export async function _listByNetworkFabricDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkToNetworkInterconnectListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkToNetworkInterconnectListResultDeserializer(result.body);
}

/** Implements Network To Network Interconnects list by Network Fabric GET method. */
export function listByNetworkFabric(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkToNetworkInterconnect> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNetworkFabricSend(context, resourceGroupName, networkFabricName, options),
    _listByNetworkFabricDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  options: NetworkToNetworkInterconnectsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Implements NetworkToNetworkInterconnects DELETE method. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  options: NetworkToNetworkInterconnectsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  properties: NetworkToNetworkInterconnectPatch,
  options: NetworkToNetworkInterconnectsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
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
    body: networkToNetworkInterconnectPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkToNetworkInterconnect> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkToNetworkInterconnectDeserializer(result.body);
}

/** Update certain properties of the Network To NetworkInterconnects resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  properties: NetworkToNetworkInterconnectPatch,
  options: NetworkToNetworkInterconnectsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  resource: NetworkToNetworkInterconnect,
  options: NetworkToNetworkInterconnectsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
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
    body: networkToNetworkInterconnectSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkToNetworkInterconnect> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkToNetworkInterconnectDeserializer(result.body);
}

/** Configuration used to setup CE-PE connectivity PUT Method. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  resource: NetworkToNetworkInterconnect,
  options: NetworkToNetworkInterconnectsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  options: NetworkToNetworkInterconnectsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      networkToNetworkInterconnectName: networkToNetworkInterconnectName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkToNetworkInterconnect> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkToNetworkInterconnectDeserializer(result.body);
}

/** Implements NetworkToNetworkInterconnects GET method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  networkToNetworkInterconnectName: string,
  options: NetworkToNetworkInterconnectsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkToNetworkInterconnect> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkFabricName,
    networkToNetworkInterconnectName,
    options,
  );
  return _getDeserialize(result);
}
