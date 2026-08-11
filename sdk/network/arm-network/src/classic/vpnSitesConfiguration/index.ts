// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { download } from "../../api/vpnSitesConfiguration/operations.js";
import type { VpnSitesConfigurationDownloadOptionalParams } from "../../api/vpnSitesConfiguration/options.js";
import type { GetVpnSitesConfigurationRequest } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnSitesConfiguration operations. */
export interface VpnSitesConfigurationOperations {
  /** Gives the sas-url to download the configurations for vpn-sites in a resource group. */
  download: (
    resourceGroupName: string,
    virtualWANName: string,
    request: GetVpnSitesConfigurationRequest,
    options?: VpnSitesConfigurationDownloadOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use download instead */
  beginDownload: (
    resourceGroupName: string,
    virtualWANName: string,
    request: GetVpnSitesConfigurationRequest,
    options?: VpnSitesConfigurationDownloadOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use download instead */
  beginDownloadAndWait: (
    resourceGroupName: string,
    virtualWANName: string,
    request: GetVpnSitesConfigurationRequest,
    options?: VpnSitesConfigurationDownloadOptionalParams,
  ) => Promise<void>;
}

function _getVpnSitesConfiguration(context: NetworkManagementContext) {
  return {
    download: (
      resourceGroupName: string,
      virtualWANName: string,
      request: GetVpnSitesConfigurationRequest,
      options?: VpnSitesConfigurationDownloadOptionalParams,
    ) => download(context, resourceGroupName, virtualWANName, request, options),
    beginDownload: async (
      resourceGroupName: string,
      virtualWANName: string,
      request: GetVpnSitesConfigurationRequest,
      options?: VpnSitesConfigurationDownloadOptionalParams,
    ) => {
      const poller = download(context, resourceGroupName, virtualWANName, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadAndWait: async (
      resourceGroupName: string,
      virtualWANName: string,
      request: GetVpnSitesConfigurationRequest,
      options?: VpnSitesConfigurationDownloadOptionalParams,
    ) => {
      return await download(context, resourceGroupName, virtualWANName, request, options);
    },
  };
}

export function _getVpnSitesConfigurationOperations(
  context: NetworkManagementContext,
): VpnSitesConfigurationOperations {
  return {
    ..._getVpnSitesConfiguration(context),
  };
}
