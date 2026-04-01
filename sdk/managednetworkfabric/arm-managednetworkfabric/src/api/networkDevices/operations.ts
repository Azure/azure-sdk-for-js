// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  OperationStatusResult,
  NetworkDevice,
  NetworkDevicePatchParameters,
  _NetworkDevicesListResult,
  RebootProperties,
  NetworkDeviceRefreshConfigurationResponse,
  UpdateDeviceAdministrativeState,
  NetworkDeviceUpdateAdministrativeStateResponse,
  NetworkDeviceUpgradeRequest,
  NetworkDeviceUpgradeResponse,
  DeviceRoCommand,
  CommonPostActionResponseForDeviceROCommandsOperationStatusResult,
  DeviceRwCommand,
  NetworkDeviceRunRwCommandResponse,
  NetworkDeviceResyncPasswordsResponse,
  NetworkFabricResyncCertificatesResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationStatusResultDeserializer,
  networkDeviceSerializer,
  networkDeviceDeserializer,
  networkDevicePatchParametersSerializer,
  _networkDevicesListResultDeserializer,
  rebootPropertiesSerializer,
  networkDeviceRefreshConfigurationResponseDeserializer,
  updateDeviceAdministrativeStateSerializer,
  networkDeviceUpdateAdministrativeStateResponseDeserializer,
  networkDeviceUpgradeRequestSerializer,
  networkDeviceUpgradeResponseDeserializer,
  deviceRoCommandSerializer,
  commonPostActionResponseForDeviceROCommandsOperationStatusResultDeserializer,
  deviceRwCommandSerializer,
  networkDeviceRunRwCommandResponseDeserializer,
  networkDeviceResyncPasswordsResponseDeserializer,
  networkFabricResyncCertificatesResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkDevicesResyncCertificatesOptionalParams,
  NetworkDevicesResyncPasswordsOptionalParams,
  NetworkDevicesRunRwCommandOptionalParams,
  NetworkDevicesRunRoCommandOptionalParams,
  NetworkDevicesUpgradeOptionalParams,
  NetworkDevicesUpdateAdministrativeStateOptionalParams,
  NetworkDevicesRefreshConfigurationOptionalParams,
  NetworkDevicesRebootOptionalParams,
  NetworkDevicesListBySubscriptionOptionalParams,
  NetworkDevicesListByResourceGroupOptionalParams,
  NetworkDevicesDeleteOptionalParams,
  NetworkDevicesUpdateOptionalParams,
  NetworkDevicesCreateOptionalParams,
  NetworkDevicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resyncCertificatesSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesResyncCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/resyncCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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

export async function _resyncCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFabricResyncCertificatesResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkFabricResyncCertificatesResponseDeserializer(result.body);
}

/** Updates the Network Device to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync. */
export function resyncCertificates(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesResyncCertificatesOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkFabricResyncCertificatesResponse>,
  NetworkFabricResyncCertificatesResponse
> {
  return getLongRunningPoller(context, _resyncCertificatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncCertificatesSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkFabricResyncCertificatesResponse>,
    NetworkFabricResyncCertificatesResponse
  >;
}

export function _resyncPasswordsSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesResyncPasswordsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/resyncPasswords{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
): Promise<NetworkDeviceResyncPasswordsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceResyncPasswordsResponseDeserializer(result.body);
}

/** Updates the Network Device to use the latest passwords. Does not generate new passwords. Allows network devices missed during a previous password rotation to be brought back into sync. */
export function resyncPasswords(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesResyncPasswordsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkDeviceResyncPasswordsResponse>,
  NetworkDeviceResyncPasswordsResponse
> {
  return getLongRunningPoller(context, _resyncPasswordsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncPasswordsSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkDeviceResyncPasswordsResponse>,
    NetworkDeviceResyncPasswordsResponse
  >;
}

export function _runRwCommandSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: DeviceRwCommand,
  options: NetworkDevicesRunRwCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/runRwCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: deviceRwCommandSerializer(body),
  });
}

export async function _runRwCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkDeviceRunRwCommandResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceRunRwCommandResponseDeserializer(result.body);
}

/** Run the RW Command on the Network Device. */
export function runRwCommand(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: DeviceRwCommand,
  options: NetworkDevicesRunRwCommandOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkDeviceRunRwCommandResponse>,
  NetworkDeviceRunRwCommandResponse
> {
  return getLongRunningPoller(context, _runRwCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runRwCommandSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkDeviceRunRwCommandResponse>,
    NetworkDeviceRunRwCommandResponse
  >;
}

export function _runRoCommandSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: DeviceRoCommand,
  options: NetworkDevicesRunRoCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/runRoCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: deviceRoCommandSerializer(body),
  });
}

export async function _runRoCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForDeviceROCommandsOperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commonPostActionResponseForDeviceROCommandsOperationStatusResultDeserializer(result.body);
}

/** Run the RO Command on the Network Device. */
export function runRoCommand(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: DeviceRoCommand,
  options: NetworkDevicesRunRoCommandOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>,
  CommonPostActionResponseForDeviceROCommandsOperationStatusResult
> {
  return getLongRunningPoller(context, _runRoCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runRoCommandSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>,
    CommonPostActionResponseForDeviceROCommandsOperationStatusResult
  >;
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDeviceUpgradeRequest,
  options: NetworkDevicesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: networkDeviceUpgradeRequestSerializer(body),
  });
}

export async function _upgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkDeviceUpgradeResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceUpgradeResponseDeserializer(result.body);
}

/** Upgrades the version of the Network Device. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDeviceUpgradeRequest,
  options: NetworkDevicesUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkDeviceUpgradeResponse>, NetworkDeviceUpgradeResponse> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkDeviceUpgradeResponse>, NetworkDeviceUpgradeResponse>;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkDevicesUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
): Promise<NetworkDeviceUpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceUpdateAdministrativeStateResponseDeserializer(result.body);
}

/** Updates the Administrative state of the Network Device. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkDevicesUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkDeviceUpdateAdministrativeStateResponse>,
  NetworkDeviceUpdateAdministrativeStateResponse
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
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<NetworkDeviceUpdateAdministrativeStateResponse>,
    NetworkDeviceUpdateAdministrativeStateResponse
  >;
}

export function _refreshConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesRefreshConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/refreshConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
): Promise<NetworkDeviceRefreshConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceRefreshConfigurationResponseDeserializer(result.body);
}

/** Refreshes the configuration the Network Device. */
export function refreshConfiguration(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesRefreshConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkDeviceRefreshConfigurationResponse>,
  NetworkDeviceRefreshConfigurationResponse
> {
  return getLongRunningPoller(context, _refreshConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshConfigurationSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkDeviceRefreshConfigurationResponse>,
    NetworkDeviceRefreshConfigurationResponse
  >;
}

export function _rebootSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: RebootProperties,
  options: NetworkDevicesRebootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/reboot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: rebootPropertiesSerializer(body),
  });
}

export async function _rebootDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Reboot the Network Device. */
export function reboot(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: RebootProperties,
  options: NetworkDevicesRebootOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _rebootDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rebootSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkDevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDevices{?api%2Dversion}",
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
): Promise<_NetworkDevicesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkDevicesListResultDeserializer(result.body);
}

/** List all the Network Device resources in a given subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkDevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkDevice> {
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
  options: NetworkDevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices{?api%2Dversion}",
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
): Promise<_NetworkDevicesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkDevicesListResultDeserializer(result.body);
}

/** List all the Network Device resources in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkDevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkDevice> {
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
  networkDeviceName: string,
  options: NetworkDevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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

/** Delete the Network Device resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDevicePatchParameters,
  options: NetworkDevicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: networkDevicePatchParametersSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NetworkDevice> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceDeserializer(result.body);
}

/** Update certain properties of the Network Device resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDevicePatchParameters,
  options: NetworkDevicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkDevice>, NetworkDevice> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDevice,
  options: NetworkDevicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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
    body: networkDeviceSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<NetworkDevice> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceDeserializer(result.body);
}

/** Create a Network Device resource */
export function create(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: NetworkDevice,
  options: NetworkDevicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkDevice>, NetworkDevice> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkDeviceName: networkDeviceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkDeviceDeserializer(result.body);
}

/** Gets the Network Device resource details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkDevice> {
  const result = await _getSend(context, resourceGroupName, networkDeviceName, options);
  return _getDeserialize(result);
}
