// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  CommonPostActionResponseForStateUpdate,
  NetworkDevice,
  NetworkDevicePatchParameters,
  _NetworkDeviceListResult,
  RebootProperties,
  UpdateDeviceAdministrativeState,
  UpdateVersion,
  DeviceRoCommand,
  CommonPostActionResponseForDeviceROCommandsOperationStatusResult,
  DeviceRwCommand,
  CommonPostActionResponseForDeviceRWCommands,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  commonPostActionResponseForStateUpdateDeserializer,
  networkDeviceSerializer,
  networkDeviceDeserializer,
  networkDevicePatchParametersSerializer,
  _networkDeviceListResultDeserializer,
  rebootPropertiesSerializer,
  updateDeviceAdministrativeStateSerializer,
  updateVersionSerializer,
  deviceRoCommandSerializer,
  commonPostActionResponseForDeviceROCommandsOperationStatusResultDeserializer,
  deviceRwCommandSerializer,
  commonPostActionResponseForDeviceRWCommandsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
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
    body: deviceRwCommandSerializer(body),
  });
}

export async function _runRwCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForDeviceRWCommands> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForDeviceRWCommandsDeserializer(result.body);
}

/** Run the RW Command on the Network Device. */
export function runRwCommand(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: DeviceRwCommand,
  options: NetworkDevicesRunRwCommandOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForDeviceRWCommands>,
  CommonPostActionResponseForDeviceRWCommands
> {
  return getLongRunningPoller(context, _runRwCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runRwCommandSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceRWCommands>,
    CommonPostActionResponseForDeviceRWCommands
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
  }) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceROCommandsOperationStatusResult>,
    CommonPostActionResponseForDeviceROCommandsOperationStatusResult
  >;
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateVersion,
  options: NetworkDevicesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/upgrade{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateVersionSerializer(body),
  });
}

export async function _upgradeDeserialize(
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

/** Upgrades the version of the Network Device. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateVersion,
  options: NetworkDevicesUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkDevicesUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/updateAdministrativeState{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateDeviceAdministrativeStateSerializer(body),
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

/** Updates the Administrative state of the Network Device. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: UpdateDeviceAdministrativeState,
  options: NetworkDevicesUpdateAdministrativeStateOptionalParams = {
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

export function _refreshConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesRefreshConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/refreshConfiguration{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _refreshConfigurationDeserialize(
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

/** Refreshes the configuration the Network Device. */
export function refreshConfiguration(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  options: NetworkDevicesRefreshConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _refreshConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshConfigurationSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
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
    body: rebootPropertiesSerializer(body),
  });
}

export async function _rebootDeserialize(
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

/** Reboot the Network Device. */
export function reboot(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  body: RebootProperties,
  options: NetworkDevicesRebootOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _rebootDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rebootSend(context, resourceGroupName, networkDeviceName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkDevicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDevices{?api%2Dversion}",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkDeviceListResultDeserializer(result.body);
}

/** List all the Network Device resources in a given subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkDevicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkDevice> {
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
  options: NetworkDevicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices{?api%2Dversion}",
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
): Promise<_NetworkDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkDeviceListResultDeserializer(result.body);
}

/** List all the Network Device resources in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkDevicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkDevice> {
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
  networkDeviceName: string,
  options: NetworkDevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
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
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, networkDeviceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  properties: NetworkDevicePatchParameters,
  options: NetworkDevicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: networkDevicePatchParametersSerializer(properties),
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
  properties: NetworkDevicePatchParameters,
  options: NetworkDevicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkDevice>, NetworkDevice> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkDeviceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkDevice>, NetworkDevice>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkDeviceName: string,
  resource: NetworkDevice,
  options: NetworkDevicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: networkDeviceSerializer(resource),
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
  resource: NetworkDevice,
  options: NetworkDevicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkDevice>, NetworkDevice> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkDeviceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
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
