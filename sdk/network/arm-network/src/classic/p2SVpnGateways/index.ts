// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  disconnectP2SVpnConnections,
  getP2SVpnConnectionHealthDetailed,
  getP2SVpnConnectionHealth,
  generateVpnProfile,
  reset,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/p2SVpnGateways/operations.js";
import type {
  P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  P2SVpnGatewaysResetOptionalParams,
  P2SVpnGatewaysListOptionalParams,
  P2SVpnGatewaysListByResourceGroupOptionalParams,
  P2SVpnGatewaysDeleteOptionalParams,
  P2SVpnGatewaysUpdateTagsOptionalParams,
  P2SVpnGatewaysCreateOrUpdateOptionalParams,
  P2SVpnGatewaysGetOptionalParams,
} from "../../api/p2SVpnGateways/options.js";
import type {
  VpnProfileResponse,
  TagsObject,
  P2SVpnConnectionRequest,
  P2SVpnGateway,
  P2SVpnProfileParameters,
  P2SVpnConnectionHealthRequest,
  P2SVpnConnectionHealth,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a P2SVpnGateways operations. */
export interface P2SVpnGatewaysOperations {
  /** Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group. */
  disconnectP2SVpnConnections: (
    resourceGroupName: string,
    p2SVpnGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disconnectP2SVpnConnections instead */
  beginDisconnectP2SVpnConnections: (
    resourceGroupName: string,
    p2SVpnGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disconnectP2SVpnConnections instead */
  beginDisconnectP2SVpnConnectionsAndWait: (
    resourceGroupName: string,
    p2SVpnGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  ) => Promise<void>;
  /** Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
  getP2SVpnConnectionHealthDetailed: (
    resourceGroupName: string,
    gatewayName: string,
    request: P2SVpnConnectionHealthRequest,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  ) => PollerLike<OperationState<P2SVpnConnectionHealth>, P2SVpnConnectionHealth>;
  /** @deprecated use getP2SVpnConnectionHealthDetailed instead */
  beginGetP2SVpnConnectionHealthDetailed: (
    resourceGroupName: string,
    gatewayName: string,
    request: P2SVpnConnectionHealthRequest,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<P2SVpnConnectionHealth>, P2SVpnConnectionHealth>>;
  /** @deprecated use getP2SVpnConnectionHealthDetailed instead */
  beginGetP2SVpnConnectionHealthDetailedAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    request: P2SVpnConnectionHealthRequest,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  ) => Promise<P2SVpnConnectionHealth>;
  /** Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
  getP2SVpnConnectionHealth: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  ) => PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
  /** @deprecated use getP2SVpnConnectionHealth instead */
  beginGetP2SVpnConnectionHealth: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>>;
  /** @deprecated use getP2SVpnConnectionHealth instead */
  beginGetP2SVpnConnectionHealthAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  ) => Promise<P2SVpnGateway>;
  /** Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group. */
  generateVpnProfile: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: P2SVpnProfileParameters,
    options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  ) => PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse>;
  /** @deprecated use generateVpnProfile instead */
  beginGenerateVpnProfile: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: P2SVpnProfileParameters,
    options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse>>;
  /** @deprecated use generateVpnProfile instead */
  beginGenerateVpnProfileAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: P2SVpnProfileParameters,
    options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  ) => Promise<VpnProfileResponse>;
  /** Resets the primary of the p2s vpn gateway in the specified resource group. */
  reset: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysResetOptionalParams,
  ) => PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
  /** @deprecated use reset instead */
  beginReset: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysResetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>>;
  /** @deprecated use reset instead */
  beginResetAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysResetOptionalParams,
  ) => Promise<P2SVpnGateway>;
  /** Lists all the P2SVpnGateways in a subscription. */
  list: (options?: P2SVpnGatewaysListOptionalParams) => PagedAsyncIterableIterator<P2SVpnGateway>;
  /** Lists all the P2SVpnGateways in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: P2SVpnGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<P2SVpnGateway>;
  /** Deletes a virtual wan p2s vpn gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates virtual wan p2s vpn gateway tags. */
  updateTags: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: TagsObject,
    options?: P2SVpnGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: TagsObject,
    options?: P2SVpnGatewaysUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: TagsObject,
    options?: P2SVpnGatewaysUpdateTagsOptionalParams,
  ) => Promise<P2SVpnGateway>;
  /** Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: P2SVpnGateway,
    options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: P2SVpnGateway,
    options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    p2SVpnGatewayParameters: P2SVpnGateway,
    options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<P2SVpnGateway>;
  /** Retrieves the details of a virtual wan p2s vpn gateway. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    options?: P2SVpnGatewaysGetOptionalParams,
  ) => Promise<P2SVpnGateway>;
}

function _getP2SVpnGateways(context: NetworkManagementContext) {
  return {
    disconnectP2SVpnConnections: (
      resourceGroupName: string,
      p2SVpnGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
    ) =>
      disconnectP2SVpnConnections(context, resourceGroupName, p2SVpnGatewayName, request, options),
    beginDisconnectP2SVpnConnections: async (
      resourceGroupName: string,
      p2SVpnGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
    ) => {
      const poller = disconnectP2SVpnConnections(
        context,
        resourceGroupName,
        p2SVpnGatewayName,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisconnectP2SVpnConnectionsAndWait: async (
      resourceGroupName: string,
      p2SVpnGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
    ) => {
      return await disconnectP2SVpnConnections(
        context,
        resourceGroupName,
        p2SVpnGatewayName,
        request,
        options,
      );
    },
    getP2SVpnConnectionHealthDetailed: (
      resourceGroupName: string,
      gatewayName: string,
      request: P2SVpnConnectionHealthRequest,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
    ) =>
      getP2SVpnConnectionHealthDetailed(context, resourceGroupName, gatewayName, request, options),
    beginGetP2SVpnConnectionHealthDetailed: async (
      resourceGroupName: string,
      gatewayName: string,
      request: P2SVpnConnectionHealthRequest,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
    ) => {
      const poller = getP2SVpnConnectionHealthDetailed(
        context,
        resourceGroupName,
        gatewayName,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetP2SVpnConnectionHealthDetailedAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      request: P2SVpnConnectionHealthRequest,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
    ) => {
      return await getP2SVpnConnectionHealthDetailed(
        context,
        resourceGroupName,
        gatewayName,
        request,
        options,
      );
    },
    getP2SVpnConnectionHealth: (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
    ) => getP2SVpnConnectionHealth(context, resourceGroupName, gatewayName, options),
    beginGetP2SVpnConnectionHealth: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
    ) => {
      const poller = getP2SVpnConnectionHealth(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetP2SVpnConnectionHealthAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
    ) => {
      return await getP2SVpnConnectionHealth(context, resourceGroupName, gatewayName, options);
    },
    generateVpnProfile: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: P2SVpnProfileParameters,
      options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
    ) => generateVpnProfile(context, resourceGroupName, gatewayName, parameters, options),
    beginGenerateVpnProfile: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: P2SVpnProfileParameters,
      options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
    ) => {
      const poller = generateVpnProfile(
        context,
        resourceGroupName,
        gatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateVpnProfileAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: P2SVpnProfileParameters,
      options?: P2SVpnGatewaysGenerateVpnProfileOptionalParams,
    ) => {
      return await generateVpnProfile(context, resourceGroupName, gatewayName, parameters, options);
    },
    reset: (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysResetOptionalParams,
    ) => reset(context, resourceGroupName, gatewayName, options),
    beginReset: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysResetOptionalParams,
    ) => {
      const poller = reset(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysResetOptionalParams,
    ) => {
      return await reset(context, resourceGroupName, gatewayName, options);
    },
    list: (options?: P2SVpnGatewaysListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: P2SVpnGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: TagsObject,
      options?: P2SVpnGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, gatewayName, p2SVpnGatewayParameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: TagsObject,
      options?: P2SVpnGatewaysUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        gatewayName,
        p2SVpnGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: TagsObject,
      options?: P2SVpnGatewaysUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        gatewayName,
        p2SVpnGatewayParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: P2SVpnGateway,
      options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, gatewayName, p2SVpnGatewayParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: P2SVpnGateway,
      options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        p2SVpnGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      p2SVpnGatewayParameters: P2SVpnGateway,
      options?: P2SVpnGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        p2SVpnGatewayParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      gatewayName: string,
      options?: P2SVpnGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getP2SVpnGatewaysOperations(
  context: NetworkManagementContext,
): P2SVpnGatewaysOperations {
  return {
    ..._getP2SVpnGateways(context),
  };
}
