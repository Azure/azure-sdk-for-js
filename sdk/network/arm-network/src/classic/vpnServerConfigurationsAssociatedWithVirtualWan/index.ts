// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/vpnServerConfigurationsAssociatedWithVirtualWan/operations.js";
import type { VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams } from "../../api/vpnServerConfigurationsAssociatedWithVirtualWan/options.js";
import type { VpnServerConfigurationsResponse } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnServerConfigurationsAssociatedWithVirtualWan operations. */
export interface VpnServerConfigurationsAssociatedWithVirtualWanOperations {
  /** Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group. */
  list: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
  ) => PollerLike<OperationState<VpnServerConfigurationsResponse>, VpnServerConfigurationsResponse>;
  /** @deprecated use list instead */
  beginList: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VpnServerConfigurationsResponse>,
      VpnServerConfigurationsResponse
    >
  >;
  /** @deprecated use list instead */
  beginListAndWait: (
    resourceGroupName: string,
    virtualWANName: string,
    options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
  ) => Promise<VpnServerConfigurationsResponse>;
}

function _getVpnServerConfigurationsAssociatedWithVirtualWan(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
    ) => list(context, resourceGroupName, virtualWANName, options),
    beginList: async (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
    ) => {
      const poller = list(context, resourceGroupName, virtualWANName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListAndWait: async (
      resourceGroupName: string,
      virtualWANName: string,
      options?: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams,
    ) => {
      return await list(context, resourceGroupName, virtualWANName, options);
    },
  };
}

export function _getVpnServerConfigurationsAssociatedWithVirtualWanOperations(
  context: NetworkManagementContext,
): VpnServerConfigurationsAssociatedWithVirtualWanOperations {
  return {
    ..._getVpnServerConfigurationsAssociatedWithVirtualWan(context),
  };
}
