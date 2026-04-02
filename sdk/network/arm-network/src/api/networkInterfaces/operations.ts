// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NetworkInterfaceIPConfiguration,
  NetworkInterface,
  TagsObject,
  EffectiveRouteListResult,
  EffectiveNetworkSecurityGroupListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkInterfaceIPConfigurationDeserializer,
  networkInterfaceSerializer,
  networkInterfaceDeserializer,
  tagsObjectSerializer,
  effectiveRouteListResultDeserializer,
  effectiveNetworkSecurityGroupListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type {
  _NetworkInterfaceListResult,
  _NetworkInterfaceIPConfigurationListResult,
} from "../../models/models.js";
import {
  _networkInterfaceListResultDeserializer,
  _networkInterfaceIPConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
  NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
  NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateTagsOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
  NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
  NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVirtualMachineScaleSetNetworkInterfacesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      "api%2Dversion": "2018-10-01",
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

export async function _listVirtualMachineScaleSetNetworkInterfacesDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets all network interfaces in a virtual machine scale set. */
export function listVirtualMachineScaleSetNetworkInterfaces(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listVirtualMachineScaleSetNetworkInterfacesSend(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        options,
      ),
    _listVirtualMachineScaleSetNetworkInterfacesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-10-01" },
  );
}

export function _listCloudServiceNetworkInterfacesSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  options: NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudServiceName: cloudServiceName,
      "api%2Dversion": "2025-05-01",
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

export async function _listCloudServiceNetworkInterfacesDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets all network interfaces in a cloud service. */
export function listCloudServiceNetworkInterfaces(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  options: NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listCloudServiceNetworkInterfacesSend(context, resourceGroupName, cloudServiceName, options),
    _listCloudServiceNetworkInterfacesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listVirtualMachineScaleSetIpConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  options: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipConfigurations{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2018-10-01",
      "%24expand": options?.expand,
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

export async function _listVirtualMachineScaleSetIpConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceIPConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceIPConfigurationListResultDeserializer(result.body);
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export function listVirtualMachineScaleSetIpConfigurations(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  options: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listVirtualMachineScaleSetIpConfigurationsSend(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        options,
      ),
    _listVirtualMachineScaleSetIpConfigurationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-10-01" },
  );
}

export function _getVirtualMachineScaleSetIpConfigurationSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipConfigurations/{ipConfigurationName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
      "api%2Dversion": "2018-10-01",
      "%24expand": options?.expand,
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

export async function _getVirtualMachineScaleSetIpConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterfaceIPConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceIPConfigurationDeserializer(result.body);
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export async function getVirtualMachineScaleSetIpConfiguration(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkInterfaceIPConfiguration> {
  const result = await _getVirtualMachineScaleSetIpConfigurationSend(
    context,
    resourceGroupName,
    virtualMachineScaleSetName,
    virtualmachineIndex,
    networkInterfaceName,
    ipConfigurationName,
    options,
  );
  return _getVirtualMachineScaleSetIpConfigurationDeserialize(result);
}

export function _listEffectiveNetworkSecurityGroupsSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/effectiveNetworkSecurityGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
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

export async function _listEffectiveNetworkSecurityGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<EffectiveNetworkSecurityGroupListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return effectiveNetworkSecurityGroupListResultDeserializer(result.body);
}

/** Gets all network security groups applied to a network interface. */
export function listEffectiveNetworkSecurityGroups(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<EffectiveNetworkSecurityGroupListResult>,
  EffectiveNetworkSecurityGroupListResult
> {
  return getLongRunningPoller(
    context,
    _listEffectiveNetworkSecurityGroupsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listEffectiveNetworkSecurityGroupsSend(
          context,
          resourceGroupName,
          networkInterfaceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<EffectiveNetworkSecurityGroupListResult>,
    EffectiveNetworkSecurityGroupListResult
  >;
}

export function _getEffectiveRouteTableSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetEffectiveRouteTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/effectiveRouteTable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
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

export async function _getEffectiveRouteTableDeserialize(
  result: PathUncheckedResponse,
): Promise<EffectiveRouteListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return effectiveRouteListResultDeserializer(result.body);
}

/** Gets all route tables applied to a network interface. */
export function getEffectiveRouteTable(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetEffectiveRouteTableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EffectiveRouteListResult>, EffectiveRouteListResult> {
  return getLongRunningPoller(context, _getEffectiveRouteTableDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getEffectiveRouteTableSend(context, resourceGroupName, networkInterfaceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<EffectiveRouteListResult>, EffectiveRouteListResult>;
}

export function _listAllSend(
  context: Client,
  options: NetworkInterfacesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets all network interfaces in a subscription. */
export function listAll(
  context: Client,
  options: NetworkInterfacesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkInterfacesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets all network interfaces in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: NetworkInterfacesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified network interface. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkInterfaceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  parameters: TagsObject,
  options: NetworkInterfacesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Updates a network interface tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  parameters: TagsObject,
  options: NetworkInterfacesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<NetworkInterface> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    networkInterfaceName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  parameters: NetworkInterface,
  options: NetworkInterfacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkInterfaceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterface> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Creates or updates a network interface. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  parameters: NetworkInterface,
  options: NetworkInterfacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkInterface>, NetworkInterface> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, networkInterfaceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Gets information about the specified network interface. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkInterface> {
  const result = await _getSend(context, resourceGroupName, networkInterfaceName, options);
  return _getDeserialize(result);
}

export function _listVirtualMachineScaleSetVMNetworkInterfacesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  options: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      "api%2Dversion": "2018-10-01",
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

export async function _listVirtualMachineScaleSetVMNetworkInterfacesDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets information about all network interfaces in a virtual machine in a virtual machine scale set. */
export function listVirtualMachineScaleSetVMNetworkInterfaces(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  options: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listVirtualMachineScaleSetVMNetworkInterfacesSend(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        options,
      ),
    _listVirtualMachineScaleSetVMNetworkInterfacesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-10-01" },
  );
}

export function _getVirtualMachineScaleSetNetworkInterfaceSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2018-10-01",
      "%24expand": options?.expand,
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

export async function _getVirtualMachineScaleSetNetworkInterfaceDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Get the specified network interface in a virtual machine scale set. */
export async function getVirtualMachineScaleSetNetworkInterface(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkInterface> {
  const result = await _getVirtualMachineScaleSetNetworkInterfaceSend(
    context,
    resourceGroupName,
    virtualMachineScaleSetName,
    virtualmachineIndex,
    networkInterfaceName,
    options,
  );
  return _getVirtualMachineScaleSetNetworkInterfaceDeserialize(result);
}

export function _listCloudServiceRoleInstanceNetworkInterfacesSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  options: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudServiceName: cloudServiceName,
      roleInstanceName: roleInstanceName,
      "api%2Dversion": "2025-05-01",
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

export async function _listCloudServiceRoleInstanceNetworkInterfacesDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Gets information about all network interfaces in a role instance in a cloud service. */
export function listCloudServiceRoleInstanceNetworkInterfaces(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  options: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listCloudServiceRoleInstanceNetworkInterfacesSend(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        options,
      ),
    _listCloudServiceRoleInstanceNetworkInterfacesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getCloudServiceNetworkInterfaceSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/networkInterfaces/{networkInterfaceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudServiceName: cloudServiceName,
      roleInstanceName: roleInstanceName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getCloudServiceNetworkInterfaceDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Get the specified network interface in a cloud service. */
export async function getCloudServiceNetworkInterface(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams = { requestOptions: {} },
): Promise<NetworkInterface> {
  const result = await _getCloudServiceNetworkInterfaceSend(
    context,
    resourceGroupName,
    cloudServiceName,
    roleInstanceName,
    networkInterfaceName,
    options,
  );
  return _getCloudServiceNetworkInterfaceDeserialize(result);
}
