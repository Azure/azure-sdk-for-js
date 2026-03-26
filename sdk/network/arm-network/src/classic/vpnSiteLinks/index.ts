// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listByVpnSite, get } from "../../api/vpnSiteLinks/operations.js";
import type {
  VpnSiteLinksListByVpnSiteOptionalParams,
  VpnSiteLinksGetOptionalParams,
} from "../../api/vpnSiteLinks/options.js";
import type { VpnSiteLink } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VpnSiteLinks operations. */
export interface VpnSiteLinksOperations {
  /** Lists all the vpnSiteLinks in a resource group for a vpn site. */
  listByVpnSite: (
    resourceGroupName: string,
    vpnSiteName: string,
    options?: VpnSiteLinksListByVpnSiteOptionalParams,
  ) => PagedAsyncIterableIterator<VpnSiteLink>;
  /** Retrieves the details of a VPN site link. */
  get: (
    resourceGroupName: string,
    vpnSiteName: string,
    vpnSiteLinkName: string,
    options?: VpnSiteLinksGetOptionalParams,
  ) => Promise<VpnSiteLink>;
}

function _getVpnSiteLinks(context: NetworkManagementContext) {
  return {
    listByVpnSite: (
      resourceGroupName: string,
      vpnSiteName: string,
      options?: VpnSiteLinksListByVpnSiteOptionalParams,
    ) => listByVpnSite(context, resourceGroupName, vpnSiteName, options),
    get: (
      resourceGroupName: string,
      vpnSiteName: string,
      vpnSiteLinkName: string,
      options?: VpnSiteLinksGetOptionalParams,
    ) => get(context, resourceGroupName, vpnSiteName, vpnSiteLinkName, options),
  };
}

export function _getVpnSiteLinksOperations(
  context: NetworkManagementContext,
): VpnSiteLinksOperations {
  return {
    ..._getVpnSiteLinks(context),
  };
}
