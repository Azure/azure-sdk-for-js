// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  PublicIPAddress,
  TagsObject,
  PublicIpDdosProtectionStatusResult,
  ReserveCloudServicePublicIpAddressRequest,
  DisassociateCloudServicePublicIpRequest,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  publicIPAddressSerializer,
  publicIPAddressDeserializer,
  tagsObjectSerializer,
  publicIpDdosProtectionStatusResultDeserializer,
  reserveCloudServicePublicIpAddressRequestSerializer,
  disassociateCloudServicePublicIpRequestSerializer,
} from "../../models/microsoft/network/models.js";
import type { _PublicIPAddressListResult } from "../../models/models.js";
import { _publicIPAddressListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams,
  PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams,
  PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  PublicIPAddressesDdosProtectionStatusOptionalParams,
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesGetOptionalParams,
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams,
  PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVirtualMachineScaleSetPublicIPAddressesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/publicipaddresses{?api%2Dversion}",
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

export async function _listVirtualMachineScaleSetPublicIPAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets information about all public IP addresses on a virtual machine scale set level. */
export function listVirtualMachineScaleSetPublicIPAddresses(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listVirtualMachineScaleSetPublicIPAddressesSend(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        options,
      ),
    _listVirtualMachineScaleSetPublicIPAddressesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-10-01" },
  );
}

export function _listCloudServicePublicIPAddressesSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  options: PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/publicipaddresses{?api%2Dversion}",
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

export async function _listCloudServicePublicIPAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets information about all public IP addresses on a cloud service level. */
export function listCloudServicePublicIPAddresses(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  options: PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listCloudServicePublicIPAddressesSend(context, resourceGroupName, cloudServiceName, options),
    _listCloudServicePublicIPAddressesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _disassociateCloudServiceReservedPublicIpSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: DisassociateCloudServicePublicIpRequest,
  options: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/disassociateCloudServiceReservedPublicIp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: disassociateCloudServicePublicIpRequestSerializer(parameters),
  });
}

export async function _disassociateCloudServiceReservedPublicIpDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend. */
export function disassociateCloudServiceReservedPublicIp(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: DisassociateCloudServicePublicIpRequest,
  options: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PublicIPAddress>, PublicIPAddress> {
  return getLongRunningPoller(
    context,
    _disassociateCloudServiceReservedPublicIpDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _disassociateCloudServiceReservedPublicIpSend(
          context,
          resourceGroupName,
          publicIpAddressName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
}

export function _reserveCloudServicePublicIpAddressSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: ReserveCloudServicePublicIpAddressRequest,
  options: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/reserveCloudServicePublicIpAddress{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: reserveCloudServicePublicIpAddressRequestSerializer(parameters),
  });
}

export async function _reserveCloudServicePublicIpAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic. */
export function reserveCloudServicePublicIpAddress(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: ReserveCloudServicePublicIpAddressRequest,
  options: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PublicIPAddress>, PublicIPAddress> {
  return getLongRunningPoller(
    context,
    _reserveCloudServicePublicIpAddressDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _reserveCloudServicePublicIpAddressSend(
          context,
          resourceGroupName,
          publicIpAddressName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
}

export function _ddosProtectionStatusSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesDdosProtectionStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/ddosProtectionStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
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

export async function _ddosProtectionStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIpDdosProtectionStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIpDdosProtectionStatusResultDeserializer(result.body);
}

/** Gets the Ddos Protection Status of a Public IP Address */
export function ddosProtectionStatus(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesDdosProtectionStatusOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<PublicIpDdosProtectionStatusResult>,
  PublicIpDdosProtectionStatusResult
> {
  return getLongRunningPoller(context, _ddosProtectionStatusDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _ddosProtectionStatusSend(context, resourceGroupName, publicIpAddressName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<PublicIpDdosProtectionStatusResult>,
    PublicIpDdosProtectionStatusResult
  >;
}

export function _listAllSend(
  context: Client,
  options: PublicIPAddressesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/publicIPAddresses{?api%2Dversion}",
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
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets all the public IP addresses in a subscription. */
export function listAll(
  context: Client,
  options: PublicIPAddressesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicIPAddress> {
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
  options: PublicIPAddressesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses{?api%2Dversion}",
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
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets all public IP addresses in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PublicIPAddressesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicIPAddress> {
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
  publicIpAddressName: string,
  options: PublicIPAddressesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
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

/** Deletes the specified public IP address. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, publicIpAddressName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: TagsObject,
  options: PublicIPAddressesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
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
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Updates public IP address tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: TagsObject,
  options: PublicIPAddressesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<PublicIPAddress> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    publicIpAddressName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: PublicIPAddress,
  options: PublicIPAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
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
    body: publicIPAddressSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Creates or updates a static or dynamic public IP address. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  parameters: PublicIPAddress,
  options: PublicIPAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PublicIPAddress>, PublicIPAddress> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, publicIpAddressName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIpAddressName: publicIpAddressName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Gets the specified public IP address in a specified resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetOptionalParams = { requestOptions: {} },
): Promise<PublicIPAddress> {
  const result = await _getSend(context, resourceGroupName, publicIpAddressName, options);
  return _getDeserialize(result);
}

export function _listVirtualMachineScaleSetVMPublicIPAddressesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
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

export async function _listVirtualMachineScaleSetVMPublicIPAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set. */
export function listVirtualMachineScaleSetVMPublicIPAddresses(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listVirtualMachineScaleSetVMPublicIPAddressesSend(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    _listVirtualMachineScaleSetVMPublicIPAddressesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-10-01" },
  );
}

export function _getVirtualMachineScaleSetPublicIPAddressSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses/{publicIpAddressName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      virtualmachineIndex: virtualmachineIndex,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
      publicIpAddressName: publicIpAddressName,
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

export async function _getVirtualMachineScaleSetPublicIPAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Get the specified public IP address in a virtual machine scale set. */
export async function getVirtualMachineScaleSetPublicIPAddress(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams = {
    requestOptions: {},
  },
): Promise<PublicIPAddress> {
  const result = await _getVirtualMachineScaleSetPublicIPAddressSend(
    context,
    resourceGroupName,
    virtualMachineScaleSetName,
    virtualmachineIndex,
    networkInterfaceName,
    ipConfigurationName,
    publicIpAddressName,
    options,
  );
  return _getVirtualMachineScaleSetPublicIPAddressDeserialize(result);
}

export function _listCloudServiceRoleInstancePublicIPAddressesSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudServiceName: cloudServiceName,
      roleInstanceName: roleInstanceName,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
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

export async function _listCloudServiceRoleInstancePublicIPAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Gets information about all public IP addresses in a role instance IP configuration in a cloud service. */
export function listCloudServiceRoleInstancePublicIPAddresses(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listCloudServiceRoleInstancePublicIPAddressesSend(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    _listCloudServiceRoleInstancePublicIPAddressesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getCloudServicePublicIPAddressSend(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses/{publicIpAddressName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudServiceName: cloudServiceName,
      roleInstanceName: roleInstanceName,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
      publicIpAddressName: publicIpAddressName,
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

export async function _getCloudServicePublicIPAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Get the specified public IP address in a cloud service. */
export async function getCloudServicePublicIPAddress(
  context: Client,
  resourceGroupName: string,
  cloudServiceName: string,
  roleInstanceName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  publicIpAddressName: string,
  options: PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams = { requestOptions: {} },
): Promise<PublicIPAddress> {
  const result = await _getCloudServicePublicIPAddressSend(
    context,
    resourceGroupName,
    cloudServiceName,
    roleInstanceName,
    networkInterfaceName,
    ipConfigurationName,
    publicIpAddressName,
    options,
  );
  return _getCloudServicePublicIPAddressDeserialize(result);
}
