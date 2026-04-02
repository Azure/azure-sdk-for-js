// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  UpdateDeviceAdministrativeState,
  UpdateVersion,
  NetworkBootstrapDevice,
  NetworkBootstrapDevicePatch,
  _NetworkBootstrapDeviceListResult,
  NetworkBootstrapDeviceRebootResponse,
  NetworkBootstrapDeviceRefreshConfigurationResponse,
  NetworkBootstrapDeviceUpgradeResponse,
  NetworkBootstrapDeviceUpdateAdministrativeStateResponse,
  NetworkBootstrapDeviceResyncPasswordsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateDeviceAdministrativeStateSerializer,
  updateVersionSerializer,
  networkBootstrapDeviceSerializer,
  networkBootstrapDeviceDeserializer,
  networkBootstrapDevicePatchSerializer,
  _networkBootstrapDeviceListResultDeserializer,
  networkBootstrapDeviceRebootResponseDeserializer,
  networkBootstrapDeviceRefreshConfigurationResponseDeserializer,
  networkBootstrapDeviceUpgradeResponseDeserializer,
  networkBootstrapDeviceUpdateAdministrativeStateResponseDeserializer,
  networkBootstrapDeviceResyncPasswordsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkBootstrapDevicesResyncPasswordsOptionalParams,
  NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams,
  NetworkBootstrapDevicesUpgradeOptionalParams,
  NetworkBootstrapDevicesRefreshConfigurationOptionalParams,
  NetworkBootstrapDevicesRebootOptionalParams,
  NetworkBootstrapDevicesListBySubscriptionOptionalParams,
  NetworkBootstrapDevicesListByResourceGroupOptionalParams,
  NetworkBootstrapDevicesDeleteOptionalParams,
  NetworkBootstrapDevicesUpdateOptionalParams,
  NetworkBootstrapDevicesCreateOptionalParams,
  NetworkBootstrapDevicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resyncPasswordsSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesResyncPasswordsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/resyncPasswords{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resyncPasswordsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDeviceResyncPasswordsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceResyncPasswordsResponseDeserializer(result.body);
}

/** Updates the Network Bootstrap Device to use the latest passwords. Does not generate new passwords. Allows network bootstrap devices missed during a previous password rotation to be brought back into sync. */
export function resyncPasswords(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesResyncPasswordsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkBootstrapDeviceResyncPasswordsResponse>,
  NetworkBootstrapDeviceResyncPasswordsResponse
> {
  return getLongRunningPoller(context, _resyncPasswordsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncPasswordsSend(context, resourceGroupName, networkBootstrapDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkBootstrapDeviceResyncPasswordsResponse>,
    NetworkBootstrapDeviceResyncPasswordsResponse
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/updateAdministrativeState{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateDeviceAdministrativeStateSerializer(body),
  });
}

export async function _updateAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDeviceUpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceUpdateAdministrativeStateResponseDeserializer(result.body);
}

/** Updates the Administrative state of the Network Bootstrap Device. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkBootstrapDevicesUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkBootstrapDeviceUpdateAdministrativeStateResponse>,
  NetworkBootstrapDeviceUpdateAdministrativeStateResponse
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
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<NetworkBootstrapDeviceUpdateAdministrativeStateResponse>,
    NetworkBootstrapDeviceUpdateAdministrativeStateResponse
  >;
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: UpdateVersion,
  options: NetworkBootstrapDevicesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/upgrade{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateVersionSerializer(body),
  });
}

export async function _upgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDeviceUpgradeResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceUpgradeResponseDeserializer(result.body);
}

/** Upgrades the version of the Network Bootstrap Device. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: UpdateVersion,
  options: NetworkBootstrapDevicesUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkBootstrapDeviceUpgradeResponse>,
  NetworkBootstrapDeviceUpgradeResponse
> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkBootstrapDeviceUpgradeResponse>,
    NetworkBootstrapDeviceUpgradeResponse
  >;
}

export function _refreshConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesRefreshConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/refreshConfiguration{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _refreshConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDeviceRefreshConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceRefreshConfigurationResponseDeserializer(result.body);
}

/** Refreshes the configuration of Network Bootstrap Device. */
export function refreshConfiguration(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesRefreshConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkBootstrapDeviceRefreshConfigurationResponse>,
  NetworkBootstrapDeviceRefreshConfigurationResponse
> {
  return getLongRunningPoller(context, _refreshConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshConfigurationSend(context, resourceGroupName, networkBootstrapDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkBootstrapDeviceRefreshConfigurationResponse>,
    NetworkBootstrapDeviceRefreshConfigurationResponse
  >;
}

export function _rebootSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesRebootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}/reboot{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _rebootDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDeviceRebootResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceRebootResponseDeserializer(result.body);
}

/** Reboot the Network Bootstrap Device. */
export function reboot(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesRebootOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkBootstrapDeviceRebootResponse>,
  NetworkBootstrapDeviceRebootResponse
> {
  return getLongRunningPoller(context, _rebootDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rebootSend(context, resourceGroupName, networkBootstrapDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkBootstrapDeviceRebootResponse>,
    NetworkBootstrapDeviceRebootResponse
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkBootstrapDevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkBootstrapDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkBootstrapDeviceListResultDeserializer(result.body);
}

/** List all the Network Bootstrap Device resources in a given subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkBootstrapDevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkBootstrapDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkBootstrapDevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkBootstrapDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkBootstrapDeviceListResultDeserializer(result.body);
}

/** Lists all the Network Bootstrap Device resources in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkBootstrapDevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkBootstrapDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}{?api%2Dversion}",
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

/** Deletes a Network Bootstrap Device resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkBootstrapDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: NetworkBootstrapDevicePatch,
  options: NetworkBootstrapDevicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkBootstrapDevicePatchSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDevice> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceDeserializer(result.body);
}

/** Update certain properties of the Network Bootstrap Device resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: NetworkBootstrapDevicePatch,
  options: NetworkBootstrapDevicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: NetworkBootstrapDevice,
  options: NetworkBootstrapDevicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkBootstrapDeviceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDevice> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceDeserializer(result.body);
}

/** Creates a Network Bootstrap Device resource */
export function create(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  body: NetworkBootstrapDevice,
  options: NetworkBootstrapDevicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkBootstrapDeviceName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkBootstrapDevice>, NetworkBootstrapDevice>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/{networkBootstrapDeviceName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkBootstrapDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkBootstrapDeviceDeserializer(result.body);
}

/** Gets a Network Bootstrap Device resource details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkBootstrapDeviceName: string,
  options: NetworkBootstrapDevicesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkBootstrapDevice> {
  const result = await _getSend(context, resourceGroupName, networkBootstrapDeviceName, options);
  return _getDeserialize(result);
}
