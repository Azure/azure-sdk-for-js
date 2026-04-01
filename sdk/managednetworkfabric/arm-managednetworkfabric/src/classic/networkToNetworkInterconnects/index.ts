// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  updateBfdAdministrativeState,
  updateAdministrativeState,
  updateNpbStaticRouteBfdAdministrativeState,
  listByNetworkFabric,
  $delete,
  update,
  create,
  get,
} from "../../api/networkToNetworkInterconnects/operations.js";
import type {
  NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
  NetworkToNetworkInterconnectsDeleteOptionalParams,
  NetworkToNetworkInterconnectsUpdateOptionalParams,
  NetworkToNetworkInterconnectsCreateOptionalParams,
  NetworkToNetworkInterconnectsGetOptionalParams,
} from "../../api/networkToNetworkInterconnects/options.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  NetworkToNetworkInterconnect,
  NetworkToNetworkInterconnectPatch,
  NniUpdateBfdAdministrativeStateRequest,
  NniUpdateBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkToNetworkInterconnects operations. */
export interface NetworkToNetworkInterconnectsOperations {
  /** Updates the Admin State. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NniUpdateBfdAdministrativeStateRequest,
    options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<NniUpdateBfdAdministrativeStateResponse>,
    NniUpdateBfdAdministrativeStateResponse
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NniUpdateBfdAdministrativeStateRequest,
    options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NniUpdateBfdAdministrativeStateResponse>,
      NniUpdateBfdAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NniUpdateBfdAdministrativeStateRequest,
    options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<NniUpdateBfdAdministrativeStateResponse>;
  /** Updates the Admin State. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Updates the NPB Static Route BFD Administrative State. */
  updateNpbStaticRouteBfdAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateNpbStaticRouteBfdAdministrativeState instead */
  beginUpdateNpbStaticRouteBfdAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateNpbStaticRouteBfdAdministrativeState instead */
  beginUpdateNpbStaticRouteBfdAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Implements Network To Network Interconnects list by Network Fabric GET method. */
  listByNetworkFabric: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkToNetworkInterconnect>;
  /** Implements NetworkToNetworkInterconnects DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network To NetworkInterconnects resource. */
  update: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnectPatch,
    options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnectPatch,
    options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnectPatch,
    options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
  ) => Promise<NetworkToNetworkInterconnect>;
  /** Configuration used to setup CE-PE connectivity PUT Method. */
  create: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnect,
    options?: NetworkToNetworkInterconnectsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnect,
    options?: NetworkToNetworkInterconnectsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NetworkToNetworkInterconnect,
    options?: NetworkToNetworkInterconnectsCreateOptionalParams,
  ) => Promise<NetworkToNetworkInterconnect>;
  /** Implements NetworkToNetworkInterconnects GET method. */
  get: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsGetOptionalParams,
  ) => Promise<NetworkToNetworkInterconnect>;
}

function _getNetworkToNetworkInterconnects(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NniUpdateBfdAdministrativeStateRequest,
      options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    beginUpdateBfdAdministrativeState: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NniUpdateBfdAdministrativeStateRequest,
      options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      const poller = updateBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateBfdAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NniUpdateBfdAdministrativeStateRequest,
      options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      return await updateBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
    },
    updateNpbStaticRouteBfdAdministrativeState: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
    ) =>
      updateNpbStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    beginUpdateNpbStaticRouteBfdAdministrativeState: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
    ) => {
      const poller = updateNpbStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateNpbStaticRouteBfdAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateNpbStaticRouteBfdAdministrativeStateOptionalParams,
    ) => {
      return await updateNpbStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
    },
    listByNetworkFabric: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
    ) => listByNetworkFabric(context, resourceGroupName, networkFabricName, options),
    delete: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnectPatch,
      options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnectPatch,
      options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnectPatch,
      options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnect,
      options?: NetworkToNetworkInterconnectsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnect,
      options?: NetworkToNetworkInterconnectsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NetworkToNetworkInterconnect,
      options?: NetworkToNetworkInterconnectsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, networkFabricName, networkToNetworkInterconnectName, options),
  };
}

export function _getNetworkToNetworkInterconnectsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkToNetworkInterconnectsOperations {
  return {
    ..._getNetworkToNetworkInterconnects(context),
  };
}
