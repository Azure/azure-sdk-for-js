// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkInterface, _NetworkInterfaceListResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  networkInterfaceDeserializer,
  _networkInterfaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listVirtualMachineScaleSetVMNetworkInterfacesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  options: VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams = {
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
      "api%2Dversion": context.apiVersion ?? "2018-10-01",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  options: VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams = {
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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-10-01" },
  );
}

export function _getVirtualMachineScaleSetNetworkInterfaceSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  options: VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams = {
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
      "api%2Dversion": context.apiVersion ?? "2018-10-01",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  options: VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams = {
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
