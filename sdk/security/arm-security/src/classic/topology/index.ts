// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, listByHomeRegion, get } from "../../api/topology/operations.js";
import type {
  TopologyListOptionalParams,
  TopologyListByHomeRegionOptionalParams,
  TopologyGetOptionalParams,
} from "../../api/topology/options.js";
import type { TopologyResource } from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Topology operations. */
export interface TopologyOperations {
  /** Gets a list that allows to build a topology view of a subscription. */
  list: (options?: TopologyListOptionalParams) => PagedAsyncIterableIterator<TopologyResource>;
  /** Gets a list that allows to build a topology view of a subscription and location. */
  listByHomeRegion: (
    ascLocation: string,
    options?: TopologyListByHomeRegionOptionalParams,
  ) => PagedAsyncIterableIterator<TopologyResource>;
  /** Gets a specific topology component. */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    topologyResourceName: string,
    options?: TopologyGetOptionalParams,
  ) => Promise<TopologyResource>;
}

function _getTopology(context: SecurityCenterContext) {
  return {
    list: (options?: TopologyListOptionalParams) => list(context, options),
    listByHomeRegion: (ascLocation: string, options?: TopologyListByHomeRegionOptionalParams) =>
      listByHomeRegion(context, ascLocation, options),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      topologyResourceName: string,
      options?: TopologyGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, topologyResourceName, options),
  };
}

export function _getTopologyOperations(context: SecurityCenterContext): TopologyOperations {
  return {
    ..._getTopology(context),
  };
}
