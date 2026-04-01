// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
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
  UpdateAdministrativeStateResponse,
  NetworkInterface,
  NetworkInterfacePatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Interface resource. */
  update: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterfacePatch,
    options?: NetworkInterfacesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterfacePatch,
    options?: NetworkInterfacesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkInterface>, NetworkInterface>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterfacePatch,
    options?: NetworkInterfacesUpdateOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Create a Network Interface resource. */
  create: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterface,
    options?: NetworkInterfacesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterface,
    options?: NetworkInterfacesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkInterface>, NetworkInterface>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    body: NetworkInterface,
    options?: NetworkInterfacesCreateOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Get the Network Interface resource details. */
  get: (
    resourceGroupName: string,
    networkDeviceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetOptionalParams,
  ) => Promise<NetworkInterface>;
}

function _getNetworkInterfaces(context: AzureNetworkFabricManagementServiceAPIContext) {
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
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkInterfacesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterfacePatch,
      options?: NetworkInterfacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkDeviceName, networkInterfaceName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterfacePatch,
      options?: NetworkInterfacesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterfacePatch,
      options?: NetworkInterfacesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterface,
      options?: NetworkInterfacesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkDeviceName, networkInterfaceName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterface,
      options?: NetworkInterfacesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      body: NetworkInterface,
      options?: NetworkInterfacesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        networkDeviceName,
        networkInterfaceName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkDeviceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetOptionalParams,
    ) => get(context, resourceGroupName, networkDeviceName, networkInterfaceName, options),
  };
}

export function _getNetworkInterfacesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkInterfacesOperations {
  return {
    ..._getNetworkInterfaces(context),
  };
}
