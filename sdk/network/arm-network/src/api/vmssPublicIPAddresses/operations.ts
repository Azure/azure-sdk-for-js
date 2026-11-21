// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { PublicIPAddress, _PublicIPAddressListResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  publicIPAddressDeserializer,
  _publicIPAddressListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listVirtualMachineScaleSetVMPublicIPAddressesSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  virtualmachineIndex: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams = {
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

export async function _listVirtualMachineScaleSetVMPublicIPAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  options: VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams = {
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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-10-01" },
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
  options: VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams = {
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

export async function _getVirtualMachineScaleSetPublicIPAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  options: VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams = {
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
