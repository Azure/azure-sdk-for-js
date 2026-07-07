// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/subgroups/operations.js";
import type {
  SubgroupsListOptionalParams,
  SubgroupsGetOptionalParams,
} from "../../api/subgroups/options.js";
import type { Subgroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Subgroups operations. */
export interface SubgroupsOperations {
  /** Gets all subgroups in an interconnect group. */
  list: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: SubgroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<Subgroup>;
  /** Gets the specified subgroup in an interconnect group. */
  get: (
    resourceGroupName: string,
    interconnectGroupName: string,
    subgroupName: string,
    options?: SubgroupsGetOptionalParams,
  ) => Promise<Subgroup>;
}

function _getSubgroups(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: SubgroupsListOptionalParams,
    ) => list(context, resourceGroupName, interconnectGroupName, options),
    get: (
      resourceGroupName: string,
      interconnectGroupName: string,
      subgroupName: string,
      options?: SubgroupsGetOptionalParams,
    ) => get(context, resourceGroupName, interconnectGroupName, subgroupName, options),
  };
}

export function _getSubgroupsOperations(context: NetworkManagementContext): SubgroupsOperations {
  return {
    ..._getSubgroups(context),
  };
}
