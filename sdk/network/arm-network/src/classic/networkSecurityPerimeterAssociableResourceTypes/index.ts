// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/networkSecurityPerimeterAssociableResourceTypes/operations.js";
import type { NetworkSecurityPerimeterAssociableResourceTypesListOptionalParams } from "../../api/networkSecurityPerimeterAssociableResourceTypes/options.js";
import type { PerimeterAssociableResource } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterAssociableResourceTypes operations. */
export interface NetworkSecurityPerimeterAssociableResourceTypesOperations {
  /** Gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter */
  list: (
    location: string,
    options?: NetworkSecurityPerimeterAssociableResourceTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<PerimeterAssociableResource>;
}

function _getNetworkSecurityPerimeterAssociableResourceTypes(context: NetworkManagementContext) {
  return {
    list: (
      location: string,
      options?: NetworkSecurityPerimeterAssociableResourceTypesListOptionalParams,
    ) => list(context, location, options),
  };
}

export function _getNetworkSecurityPerimeterAssociableResourceTypesOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterAssociableResourceTypesOperations {
  return {
    ..._getNetworkSecurityPerimeterAssociableResourceTypes(context),
  };
}
