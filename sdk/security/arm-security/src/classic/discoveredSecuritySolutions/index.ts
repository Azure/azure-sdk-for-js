// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, listByHomeRegion, get } from "../../api/discoveredSecuritySolutions/operations.js";
import type {
  DiscoveredSecuritySolutionsListOptionalParams,
  DiscoveredSecuritySolutionsListByHomeRegionOptionalParams,
  DiscoveredSecuritySolutionsGetOptionalParams,
} from "../../api/discoveredSecuritySolutions/options.js";
import type { DiscoveredSecuritySolution } from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiscoveredSecuritySolutions operations. */
export interface DiscoveredSecuritySolutionsOperations {
  /** Gets a list of discovered Security Solutions for the subscription. */
  list: (
    options?: DiscoveredSecuritySolutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveredSecuritySolution>;
  /** Gets a list of discovered Security Solutions for the subscription and location. */
  listByHomeRegion: (
    ascLocation: string,
    options?: DiscoveredSecuritySolutionsListByHomeRegionOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveredSecuritySolution>;
  /** Gets a specific discovered Security Solution. */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    discoveredSecuritySolutionName: string,
    options?: DiscoveredSecuritySolutionsGetOptionalParams,
  ) => Promise<DiscoveredSecuritySolution>;
}

function _getDiscoveredSecuritySolutions(context: SecurityCenterContext) {
  return {
    list: (options?: DiscoveredSecuritySolutionsListOptionalParams) => list(context, options),
    listByHomeRegion: (
      ascLocation: string,
      options?: DiscoveredSecuritySolutionsListByHomeRegionOptionalParams,
    ) => listByHomeRegion(context, ascLocation, options),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      discoveredSecuritySolutionName: string,
      options?: DiscoveredSecuritySolutionsGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, discoveredSecuritySolutionName, options),
  };
}

export function _getDiscoveredSecuritySolutionsOperations(
  context: SecurityCenterContext,
): DiscoveredSecuritySolutionsOperations {
  return {
    ..._getDiscoveredSecuritySolutions(context),
  };
}
