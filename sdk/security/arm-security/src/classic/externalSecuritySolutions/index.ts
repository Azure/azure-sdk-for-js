// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, listByHomeRegion, get } from "../../api/externalSecuritySolutions/operations.js";
import type {
  ExternalSecuritySolutionsListOptionalParams,
  ExternalSecuritySolutionsListByHomeRegionOptionalParams,
  ExternalSecuritySolutionsGetOptionalParams,
} from "../../api/externalSecuritySolutions/options.js";
import type { SecuritySolutionsAPIExternalSecuritySolutionUnion } from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExternalSecuritySolutions operations. */
export interface ExternalSecuritySolutionsOperations {
  /** Gets a list of external security solutions for the subscription. */
  list: (
    options?: ExternalSecuritySolutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySolutionsAPIExternalSecuritySolutionUnion>;
  /** Gets a list of external Security Solutions for the subscription and location. */
  listByHomeRegion: (
    ascLocation: string,
    options?: ExternalSecuritySolutionsListByHomeRegionOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySolutionsAPIExternalSecuritySolutionUnion>;
  /** Gets a specific external Security Solution. */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    externalSecuritySolutionsName: string,
    options?: ExternalSecuritySolutionsGetOptionalParams,
  ) => Promise<SecuritySolutionsAPIExternalSecuritySolutionUnion>;
}

function _getExternalSecuritySolutions(context: SecurityCenterContext) {
  return {
    list: (options?: ExternalSecuritySolutionsListOptionalParams) => list(context, options),
    listByHomeRegion: (
      ascLocation: string,
      options?: ExternalSecuritySolutionsListByHomeRegionOptionalParams,
    ) => listByHomeRegion(context, ascLocation, options),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      externalSecuritySolutionsName: string,
      options?: ExternalSecuritySolutionsGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, externalSecuritySolutionsName, options),
  };
}

export function _getExternalSecuritySolutionsOperations(
  context: SecurityCenterContext,
): ExternalSecuritySolutionsOperations {
  return {
    ..._getExternalSecuritySolutions(context),
  };
}
