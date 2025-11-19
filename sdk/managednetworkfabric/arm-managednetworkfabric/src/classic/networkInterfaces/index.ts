// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  updateAdministrativeState,
  listByNetworkDevice,
  $delete,
  update,
  create,
  get,
} from "../../api/networkInterfaces/operations.js";
import type {
  NetworkInterfacesUpdateAdministrativeStateOptionalParams,
  NetworkInterfacesListByNetworkDeviceOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateOptionalParams,
  NetworkInterfacesCreateOptionalParams,
  NetworkInterfacesGetOptionalParams,
} from "../../api/networkInterfaces/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkInterface,
  NetworkInterfacePatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkInterfaces operations. */
export interface NetworkInterfacesOperations {
  /** Update the admin state of the Network Interface. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** List all the Network Interface resources in a given resource group. */
  listByNetworkDevice: (
    resourceGroupName: string,
    networkDeviceName: string,
    options?: NetworkInterfacesListByNetworkDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Delete the Network Interface resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update certain properties of the Network Interface resource. */
  update: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    properties: NetworkInterfacePatch,
    options?: NetworkInterfacesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** Create a Network Interface resource. */
  create: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    resource: NetworkInterface,
    options?: NetworkInterfacesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** Get the Network Interface resource details. */
  get: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetOptionalParams,
  ) => Promise<NetworkInterface>;
}

function _getNetworkInterfaces(context: ManagedNetworkFabricContext) {
  return {
    updateAdministrativeState: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      ),
    listByNetworkDevice: (
      resourceGroupName: string,
      networkDeviceName: string,
      options?: NetworkInterfacesListByNetworkDeviceOptionalParams,
    ) => listByNetworkDevice(context, resourceGroupName, networkDeviceName, options),
    delete: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkDeviceName, networkInterfaceName, options),
    update: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      properties: NetworkInterfacePatch,
      options?: NetworkInterfacesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      resource: NetworkInterface,
      options?: NetworkInterfacesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetOptionalParams,
    ) => get(context, resourceGroupName, networkDeviceName, networkInterfaceName, options),
  };
}

export function _getNetworkInterfacesOperations(
  context: ManagedNetworkFabricContext,
): NetworkInterfacesOperations {
  return {
    ..._getNetworkInterfaces(context),
  };
}
