// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/serviceAssociationLinks/operations.js";
import type { ServiceAssociationLinksListOptionalParams } from "../../api/serviceAssociationLinks/options.js";
import type { ServiceAssociationLinksListResult } from "../../models/microsoft/network/models.js";

/** Interface representing a ServiceAssociationLinks operations. */
export interface ServiceAssociationLinksOperations {
  /** Gets a list of service association links for a subnet. */
  list: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: ServiceAssociationLinksListOptionalParams,
  ) => Promise<ServiceAssociationLinksListResult>;
}

function _getServiceAssociationLinks(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: ServiceAssociationLinksListOptionalParams,
    ) => list(context, resourceGroupName, virtualNetworkName, subnetName, options),
  };
}

export function _getServiceAssociationLinksOperations(
  context: NetworkManagementContext,
): ServiceAssociationLinksOperations {
  return {
    ..._getServiceAssociationLinks(context),
  };
}
