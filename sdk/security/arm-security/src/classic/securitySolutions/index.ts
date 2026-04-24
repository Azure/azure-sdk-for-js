// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/securitySolutions/operations.js";
import type {
  SecuritySolutionsListOptionalParams,
  SecuritySolutionsGetOptionalParams,
} from "../../api/securitySolutions/options.js";
import type { SecuritySolutionsAPISecuritySolution } from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecuritySolutions operations. */
export interface SecuritySolutionsOperations {
  /** Gets a list of Security Solutions for the subscription. */
  list: (
    options?: SecuritySolutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySolutionsAPISecuritySolution>;
  /** Gets a specific Security Solution. */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    securitySolutionName: string,
    options?: SecuritySolutionsGetOptionalParams,
  ) => Promise<SecuritySolutionsAPISecuritySolution>;
}

function _getSecuritySolutions(context: SecurityCenterContext) {
  return {
    list: (options?: SecuritySolutionsListOptionalParams) => list(context, options),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      securitySolutionName: string,
      options?: SecuritySolutionsGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, securitySolutionName, options),
  };
}

export function _getSecuritySolutionsOperations(
  context: SecurityCenterContext,
): SecuritySolutionsOperations {
  return {
    ..._getSecuritySolutions(context),
  };
}
