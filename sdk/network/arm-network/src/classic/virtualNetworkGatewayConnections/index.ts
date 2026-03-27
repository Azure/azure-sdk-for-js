// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  resetConnection,
  getIkeSas,
  stopPacketCapture,
  startPacketCapture,
  resetSharedKey,
  getSharedKey,
  setSharedKey,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkGatewayConnections/operations.js";
import type {
  VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsListOptionalParams,
  VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  VirtualNetworkGatewayConnectionsGetOptionalParams,
} from "../../api/virtualNetworkGatewayConnections/options.js";
import type {
  TagsObject,
  VpnPacketCaptureStopParameters,
  VirtualNetworkGatewayConnection,
  ConnectionSharedKey,
  ConnectionResetSharedKey,
} from "../../models/microsoft/network/models.js";
import type {
  ArmAcceptedLroResponse7,
  ArmAcceptedLroResponse8,
  ArmAcceptedLroResponse9,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkGatewayConnections operations. */
export interface VirtualNetworkGatewayConnectionsOperations {
  /** Resets the virtual network gateway connection specified. */
  resetConnection: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetConnection instead */
  beginResetConnection: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetConnection instead */
  beginResetConnectionAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  ) => Promise<void>;
  /** Lists IKE Security Associations for the virtual network gateway connection in the specified resource group. */
  getIkeSas: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  ) => PollerLike<OperationState<ArmAcceptedLroResponse9>, ArmAcceptedLroResponse9>;
  /** @deprecated use getIkeSas instead */
  beginGetIkeSas: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArmAcceptedLroResponse9>, ArmAcceptedLroResponse9>>;
  /** @deprecated use getIkeSas instead */
  beginGetIkeSasAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  ) => Promise<ArmAcceptedLroResponse9>;
  /** Stops packet capture on virtual network gateway connection in the specified resource group. */
  stopPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<ArmAcceptedLroResponse8>, ArmAcceptedLroResponse8>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArmAcceptedLroResponse8>, ArmAcceptedLroResponse8>>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCaptureAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  ) => Promise<ArmAcceptedLroResponse8>;
  /** Starts packet capture on virtual network gateway connection in the specified resource group. */
  startPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<ArmAcceptedLroResponse7>, ArmAcceptedLroResponse7>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArmAcceptedLroResponse7>, ArmAcceptedLroResponse7>>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCaptureAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  ) => Promise<ArmAcceptedLroResponse7>;
  /** The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
  resetSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionResetSharedKey,
    options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  ) => PollerLike<OperationState<ConnectionResetSharedKey>, ConnectionResetSharedKey>;
  /** @deprecated use resetSharedKey instead */
  beginResetSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionResetSharedKey,
    options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ConnectionResetSharedKey>, ConnectionResetSharedKey>
  >;
  /** @deprecated use resetSharedKey instead */
  beginResetSharedKeyAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionResetSharedKey,
    options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  ) => Promise<ConnectionResetSharedKey>;
  /** The Get VirtualNetworkGatewayConnectionSharedKey operation retrieves information about the specified virtual network gateway connection shared key through Network resource provider. */
  getSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams,
  ) => Promise<ConnectionSharedKey>;
  /** The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
  setSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionSharedKey,
    options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  ) => PollerLike<OperationState<ConnectionSharedKey>, ConnectionSharedKey>;
  /** @deprecated use setSharedKey instead */
  beginSetSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionSharedKey,
    options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectionSharedKey>, ConnectionSharedKey>>;
  /** @deprecated use setSharedKey instead */
  beginSetSharedKeyAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionSharedKey,
    options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  ) => Promise<ConnectionSharedKey>;
  /** The List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created. */
  list: (
    resourceGroupName: string,
    options?: VirtualNetworkGatewayConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkGatewayConnection>;
  /** Deletes the specified virtual network Gateway connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual network gateway connection tags. */
  updateTags: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGatewayConnection>, VirtualNetworkGatewayConnection>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkGatewayConnection>,
      VirtualNetworkGatewayConnection
    >
  >;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  ) => Promise<VirtualNetworkGatewayConnection>;
  /** Creates or updates a virtual network gateway connection in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VirtualNetworkGatewayConnection,
    options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGatewayConnection>, VirtualNetworkGatewayConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VirtualNetworkGatewayConnection,
    options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkGatewayConnection>,
      VirtualNetworkGatewayConnection
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VirtualNetworkGatewayConnection,
    options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkGatewayConnection>;
  /** Gets the specified virtual network gateway connection by resource group. */
  get: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsGetOptionalParams,
  ) => Promise<VirtualNetworkGatewayConnection>;
}

function _getVirtualNetworkGatewayConnections(context: NetworkManagementContext) {
  return {
    resetConnection: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
    ) => resetConnection(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    beginResetConnection: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
    ) => {
      const poller = resetConnection(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetConnectionAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
    ) => {
      return await resetConnection(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
    },
    getIkeSas: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
    ) => getIkeSas(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    beginGetIkeSas: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
    ) => {
      const poller = getIkeSas(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetIkeSasAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
    ) => {
      return await getIkeSas(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
    },
    stopPacketCapture: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
    ) =>
      stopPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    beginStopPacketCapture: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
    ) => {
      const poller = stopPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopPacketCaptureAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
    ) => {
      return await stopPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
    },
    startPacketCapture: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
    ) =>
      startPacketCapture(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    beginStartPacketCapture: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
    ) => {
      const poller = startPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartPacketCaptureAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
    ) => {
      return await startPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
    },
    resetSharedKey: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionResetSharedKey,
      options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
    ) =>
      resetSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    beginResetSharedKey: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionResetSharedKey,
      options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
    ) => {
      const poller = resetSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetSharedKeyAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionResetSharedKey,
      options?: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
    ) => {
      return await resetSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
    },
    getSharedKey: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams,
    ) => getSharedKey(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    setSharedKey: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionSharedKey,
      options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
    ) =>
      setSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    beginSetSharedKey: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionSharedKey,
      options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
    ) => {
      const poller = setSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetSharedKeyAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: ConnectionSharedKey,
      options?: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
    ) => {
      return await setSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      options?: VirtualNetworkGatewayConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      );
    },
    updateTags: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    beginUpdateTags: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VirtualNetworkGatewayConnection,
      options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VirtualNetworkGatewayConnection,
      options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VirtualNetworkGatewayConnection,
      options?: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      options?: VirtualNetworkGatewayConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
  };
}

export function _getVirtualNetworkGatewayConnectionsOperations(
  context: NetworkManagementContext,
): VirtualNetworkGatewayConnectionsOperations {
  return {
    ..._getVirtualNetworkGatewayConnections(context),
  };
}
