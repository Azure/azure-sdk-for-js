// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkBootstrapInterface,
  NetworkBootstrapInterfacePatch,
  _NetworkBootstrapInterfaceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  networkBootstrapInterfaceSerializer,
  networkBootstrapInterfaceDeserializer,
  networkBootstrapInterfacePatchSerializer,
  _networkBootstrapInterfaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
  NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams,
  NetworkBootstrapInterfacesDeleteOptionalParams,
  NetworkBootstrapInterfacesUpdateOptionalParams,
  NetworkBootstrapInterfacesCreateOptionalParams,
  NetworkBootstrapInterfacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: UpdateAdministrativeState,
  options: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces/{networkBootstrapInterfaceName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      networkBootstrapInterfaceName: networkBootstrapInterfaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
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
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: UpdateAdministrativeState,
  options: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams = {
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
          networkBootstrapDeviceName,
          networkBootstrapInterfaceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _listByNetworkBootstrapDeviceSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _listByNetworkBootstrapDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkBootstrapInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkBootstrapInterfaceListResultDeserializer(result.body);
}

/** List all the Network Bootstrap Interface resources in a given resource group. */
export function listByNetworkBootstrapDevice(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkBootstrapInterface> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByNetworkBootstrapDeviceSend(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        options,
      ),
    _listByNetworkBootstrapDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  options: NetworkBootstrapInterfacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces/{networkBootstrapInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      networkBootstrapInterfaceName: networkBootstrapInterfaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete the Network Bootstrap Interface resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  options: NetworkBootstrapInterfacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: NetworkBootstrapInterfacePatch,
  options: NetworkBootstrapInterfacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces/{networkBootstrapInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      networkBootstrapInterfaceName: networkBootstrapInterfaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkBootstrapInterfacePatchSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapInterface> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapInterfaceDeserializer(result.body);
}

/** Update certain properties of the Network Bootstrap Interface resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: NetworkBootstrapInterfacePatch,
  options: NetworkBootstrapInterfacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: NetworkBootstrapInterface,
  options: NetworkBootstrapInterfacesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces/{networkBootstrapInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      networkBootstrapInterfaceName: networkBootstrapInterfaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkBootstrapInterfaceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapInterface> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapInterfaceDeserializer(result.body);
}

/** Create a Network Bootstrap Interface resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  body: NetworkBootstrapInterface,
  options: NetworkBootstrapInterfacesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  options: NetworkBootstrapInterfacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/networkBootstrapInterfaces/{networkBootstrapInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkBootstrapDeviceName: networkBootstrapDeviceName,
      networkBootstrapInterfaceName: networkBootstrapInterfaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
): Promise<NetworkBootstrapInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapInterfaceDeserializer(result.body);
}

/** Get the Network Bootstrap Interface resource details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  networkBootstrapInterfaceName: string,
  options: NetworkBootstrapInterfacesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkBootstrapInterface> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkBootstrapDeviceName,
    networkBootstrapInterfaceName,
    options,
  );
  return _getDeserialize(result);
}
