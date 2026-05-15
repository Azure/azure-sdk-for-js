// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/availableResourceGroupDelegations/operations.js";
import { AvailableResourceGroupDelegationsListOptionalParams } from "../../api/availableResourceGroupDelegations/options.js";
import { AvailableDelegation } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableResourceGroupDelegations operations. */
export interface AvailableResourceGroupDelegationsOperations {
  /** Gets all of the available subnet delegations for this resource group in this region. */
  list: (
    resourceGroupName: string,
    location: string,
    options?: AvailableResourceGroupDelegationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableDelegation>;
}

function _getAvailableResourceGroupDelegations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      location: string,
      options?: AvailableResourceGroupDelegationsListOptionalParams,
    ) => list(context, resourceGroupName, location, options),
  };
}

export function _getAvailableResourceGroupDelegationsOperations(
  context: NetworkManagementContext,
): AvailableResourceGroupDelegationsOperations {
  return {
    ..._getAvailableResourceGroupDelegations(context),
  };
}
