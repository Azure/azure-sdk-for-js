// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkInterface,
  NetworkInterfacePatch,
  _NetworkInterfaceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  networkInterfaceSerializer,
  networkInterfaceDeserializer,
  networkInterfacePatchSerializer,
  _networkInterfaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkInterfacesUpdateAdministrativeStateOptionalParams,
  NetworkInterfacesListByNetworkDeviceOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateOptionalParams,
  NetworkInterfacesCreateOptionalParams,
  NetworkInterfacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  body: UpdateAdministrativeState,
  options: NetworkInterfacesUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
      networkInterfaceName: networkInterfaceName,
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

/** Update the admin state of the Network Interface. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  body: UpdateAdministrativeState,
  options: NetworkInterfacesUpdateAdministrativeStateOptionalParams = {
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
          networkDeviceName,
          networkInterfaceName,
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

export function _listByNetworkDeviceSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkInterfacesListByNetworkDeviceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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

export async function _listByNetworkDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** List all the Network Interface resources in a given resource group. */
export function listByNetworkDevice(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkInterfacesListByNetworkDeviceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNetworkDeviceSend(context, resourceGroupName, networkDeviceName, options),
    _listByNetworkDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
      networkInterfaceName: networkInterfaceName,
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

/** Delete the Network Interface resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkDeviceName, networkInterfaceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  properties: NetworkInterfacePatch,
  options: NetworkInterfacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
      networkInterfaceName: networkInterfaceName,
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
    body: networkInterfacePatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Update certain properties of the Network Interface resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  properties: NetworkInterfacePatch,
  options: NetworkInterfacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkInterface>, NetworkInterface> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  resource: NetworkInterface,
  options: NetworkInterfacesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
      networkInterfaceName: networkInterfaceName,
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
    body: networkInterfaceSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Create a Network Interface resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  resource: NetworkInterface,
  options: NetworkInterfacesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkInterface>, NetworkInterface> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
      networkInterfaceName: networkInterfaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Get the Network Interface resource details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkInterface> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkDeviceName,
    networkInterfaceName,
    options,
  );
  return _getDeserialize(result);
}
