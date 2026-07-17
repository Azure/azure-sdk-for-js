// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/resourceNavigationLinks/operations.js";
import type { ResourceNavigationLinksListOptionalParams } from "../../api/resourceNavigationLinks/options.js";
import type { ResourceNavigationLinksListResult } from "../../models/microsoft/network/models.js";

/** Interface representing a ResourceNavigationLinks operations. */
export interface ResourceNavigationLinksOperations {
  /** Gets a list of resource navigation links for a subnet. */
  list: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: ResourceNavigationLinksListOptionalParams,
  ) => Promise<ResourceNavigationLinksListResult>;
}

function _getResourceNavigationLinks(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: ResourceNavigationLinksListOptionalParams,
    ) => list(context, resourceGroupName, virtualNetworkName, subnetName, options),
  };
}

export function _getResourceNavigationLinksOperations(
  context: NetworkManagementContext,
): ResourceNavigationLinksOperations {
  return {
    ..._getResourceNavigationLinks(context),
  };
}
