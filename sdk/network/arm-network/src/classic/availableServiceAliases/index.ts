// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listByResourceGroup, list } from "../../api/availableServiceAliases/operations.js";
import type {
  AvailableServiceAliasesListByResourceGroupOptionalParams,
  AvailableServiceAliasesListOptionalParams,
} from "../../api/availableServiceAliases/options.js";
import type { AvailableServiceAlias } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableServiceAliases operations. */
export interface AvailableServiceAliasesOperations {
  /** Gets all available service aliases for this resource group in this region. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: AvailableServiceAliasesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableServiceAlias>;
  /** Gets all available service aliases for this subscription in this region. */
  list: (
    location: string,
    options?: AvailableServiceAliasesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableServiceAlias>;
}

function _getAvailableServiceAliases(context: NetworkManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: AvailableServiceAliasesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    list: (location: string, options?: AvailableServiceAliasesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailableServiceAliasesOperations(
  context: NetworkManagementContext,
): AvailableServiceAliasesOperations {
  return {
    ..._getAvailableServiceAliases(context),
  };
}
