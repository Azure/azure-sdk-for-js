// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  updateAdministrativeState,
  listByNetworkBootstrapDevice,
  $delete,
  update,
  create,
  get,
} from "../../api/networkBootstrapInterfaces/operations.js";
import type {
  NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
  NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams,
  NetworkBootstrapInterfacesDeleteOptionalParams,
  NetworkBootstrapInterfacesUpdateOptionalParams,
  NetworkBootstrapInterfacesCreateOptionalParams,
  NetworkBootstrapInterfacesGetOptionalParams,
} from "../../api/networkBootstrapInterfaces/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkBootstrapInterface,
  NetworkBootstrapInterfacePatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkBootstrapInterfaces operations. */
export interface NetworkBootstrapInterfacesOperations {
  /** Update the admin state of the Network Interface. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: UpdateAdministrativeState,
    options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** List all the Network Bootstrap Interface resources in a given resource group. */
  listByNetworkBootstrapDevice: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    options?: NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkBootstrapInterface>;
  /** Delete the Network Bootstrap Interface resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    options?: NetworkBootstrapInterfacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    options?: NetworkBootstrapInterfacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    options?: NetworkBootstrapInterfacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Bootstrap Interface resource. */
  update: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterfacePatch,
    options?: NetworkBootstrapInterfacesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterfacePatch,
    options?: NetworkBootstrapInterfacesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterfacePatch,
    options?: NetworkBootstrapInterfacesUpdateOptionalParams,
  ) => Promise<NetworkBootstrapInterface>;
  /** Create a Network Bootstrap Interface resource. */
  create: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterface,
    options?: NetworkBootstrapInterfacesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterface,
    options?: NetworkBootstrapInterfacesCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkBootstrapInterface>, NetworkBootstrapInterface>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    body: NetworkBootstrapInterface,
    options?: NetworkBootstrapInterfacesCreateOptionalParams,
  ) => Promise<NetworkBootstrapInterface>;
  /** Get the Network Bootstrap Interface resource details. */
  get: (
    resourceGroupName: string,
    networkBootstrapDeviceName: string,
    networkBootstrapInterfaceName: string,
    options?: NetworkBootstrapInterfacesGetOptionalParams,
  ) => Promise<NetworkBootstrapInterface>;
}

function _getNetworkBootstrapInterfaces(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    updateAdministrativeState: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      ),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: UpdateAdministrativeState,
      options?: NetworkBootstrapInterfacesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
    },
    listByNetworkBootstrapDevice: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      options?: NetworkBootstrapInterfacesListByNetworkBootstrapDeviceOptionalParams,
    ) =>
      listByNetworkBootstrapDevice(context, resourceGroupName, networkBootstrapDeviceName, options),
    delete: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      options?: NetworkBootstrapInterfacesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      options?: NetworkBootstrapInterfacesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      options?: NetworkBootstrapInterfacesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterfacePatch,
      options?: NetworkBootstrapInterfacesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterfacePatch,
      options?: NetworkBootstrapInterfacesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterfacePatch,
      options?: NetworkBootstrapInterfacesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterface,
      options?: NetworkBootstrapInterfacesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterface,
      options?: NetworkBootstrapInterfacesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      body: NetworkBootstrapInterface,
      options?: NetworkBootstrapInterfacesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkBootstrapDeviceName: string,
      networkBootstrapInterfaceName: string,
      options?: NetworkBootstrapInterfacesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkBootstrapDeviceName,
        networkBootstrapInterfaceName,
        options,
      ),
  };
}

export function _getNetworkBootstrapInterfacesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkBootstrapInterfacesOperations {
  return {
    ..._getNetworkBootstrapInterfaces(context),
  };
}
