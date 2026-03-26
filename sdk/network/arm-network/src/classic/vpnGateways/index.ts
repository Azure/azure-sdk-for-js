// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  stopPacketCapture,
  startPacketCapture,
  reset,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/vpnGateways/operations.js";
import type {
  VpnGatewaysStopPacketCaptureOptionalParams,
  VpnGatewaysStartPacketCaptureOptionalParams,
  VpnGatewaysResetOptionalParams,
  VpnGatewaysListOptionalParams,
  VpnGatewaysListByResourceGroupOptionalParams,
  VpnGatewaysDeleteOptionalParams,
  VpnGatewaysUpdateTagsOptionalParams,
  VpnGatewaysCreateOrUpdateOptionalParams,
  VpnGatewaysGetOptionalParams,
} from "../../api/vpnGateways/options.js";
import type { TagsObject, VpnGateway } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnGateways operations. */
export interface VpnGatewaysOperations {
  /** Stops packet capture on vpn gateway in the specified resource group. */
  stopPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStopPacketCaptureOptionalParams,
  ) => PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStopPacketCaptureOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<{
        body: string;
      }>,
      {
        body: string;
      }
    >
  >;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCaptureAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStopPacketCaptureOptionalParams,
  ) => Promise<{
    body: string;
  }>;
  /** Starts packet capture on vpn gateway in the specified resource group. */
  startPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStartPacketCaptureOptionalParams,
  ) => PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStartPacketCaptureOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<{
        body: string;
      }>,
      {
        body: string;
      }
    >
  >;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCaptureAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysStartPacketCaptureOptionalParams,
  ) => Promise<{
    body: string;
  }>;
  /** Resets the primary of the vpn gateway in the specified resource group. */
  reset: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysResetOptionalParams,
  ) => PollerLike<OperationState<VpnGateway>, VpnGateway>;
  /** @deprecated use reset instead */
  beginReset: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysResetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnGateway>, VpnGateway>>;
  /** @deprecated use reset instead */
  beginResetAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysResetOptionalParams,
  ) => Promise<VpnGateway>;
  /** Lists all the VpnGateways in a subscription. */
  list: (options?: VpnGatewaysListOptionalParams) => PagedAsyncIterableIterator<VpnGateway>;
  /** Lists all the VpnGateways in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VpnGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VpnGateway>;
  /** Deletes a virtual wan vpn gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates virtual wan vpn gateway tags. */
  updateTags: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: TagsObject,
    options?: VpnGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<VpnGateway>, VpnGateway>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: TagsObject,
    options?: VpnGatewaysUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnGateway>, VpnGateway>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: TagsObject,
    options?: VpnGatewaysUpdateTagsOptionalParams,
  ) => Promise<VpnGateway>;
  /** Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: VpnGateway,
    options?: VpnGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VpnGateway>, VpnGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: VpnGateway,
    options?: VpnGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnGateway>, VpnGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    vpnGatewayParameters: VpnGateway,
    options?: VpnGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<VpnGateway>;
  /** Retrieves the details of a virtual wan vpn gateway. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnGatewaysGetOptionalParams,
  ) => Promise<VpnGateway>;
}

function _getVpnGateways(context: NetworkManagementContext) {
  return {
    stopPacketCapture: (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStopPacketCaptureOptionalParams,
    ) => stopPacketCapture(context, resourceGroupName, gatewayName, options),
    beginStopPacketCapture: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStopPacketCaptureOptionalParams,
    ) => {
      const poller = stopPacketCapture(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopPacketCaptureAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStopPacketCaptureOptionalParams,
    ) => {
      return await stopPacketCapture(context, resourceGroupName, gatewayName, options);
    },
    startPacketCapture: (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStartPacketCaptureOptionalParams,
    ) => startPacketCapture(context, resourceGroupName, gatewayName, options),
    beginStartPacketCapture: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStartPacketCaptureOptionalParams,
    ) => {
      const poller = startPacketCapture(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartPacketCaptureAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysStartPacketCaptureOptionalParams,
    ) => {
      return await startPacketCapture(context, resourceGroupName, gatewayName, options);
    },
    reset: (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysResetOptionalParams,
    ) => reset(context, resourceGroupName, gatewayName, options),
    beginReset: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysResetOptionalParams,
    ) => {
      const poller = reset(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysResetOptionalParams,
    ) => {
      return await reset(context, resourceGroupName, gatewayName, options);
    },
    list: (options?: VpnGatewaysListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VpnGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: TagsObject,
      options?: VpnGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, gatewayName, vpnGatewayParameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: TagsObject,
      options?: VpnGatewaysUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        gatewayName,
        vpnGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: TagsObject,
      options?: VpnGatewaysUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        gatewayName,
        vpnGatewayParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: VpnGateway,
      options?: VpnGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, gatewayName, vpnGatewayParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: VpnGateway,
      options?: VpnGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        vpnGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnGatewayParameters: VpnGateway,
      options?: VpnGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        vpnGatewayParameters,
        options,
      );
    },
    get: (resourceGroupName: string, gatewayName: string, options?: VpnGatewaysGetOptionalParams) =>
      get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getVpnGatewaysOperations(
  context: NetworkManagementContext,
): VpnGatewaysOperations {
  return {
    ..._getVpnGateways(context),
  };
}
