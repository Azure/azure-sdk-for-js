// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { listByHomeRegion, list } from "../../api/securitySolutionsReferenceData/operations.js";
import type {
  SecuritySolutionsReferenceDataListByHomeRegionOptionalParams,
  SecuritySolutionsReferenceDataListOptionalParams,
} from "../../api/securitySolutionsReferenceData/options.js";
import type { SecuritySolutionsReferenceDataList } from "../../models/securitySolutionsAPI/models.js";

/** Interface representing a SecuritySolutionsReferenceData operations. */
export interface SecuritySolutionsReferenceDataOperations {
  /** Gets list of all supported Security Solutions for subscription and location. */
  listByHomeRegion: (
    ascLocation: string,
    options?: SecuritySolutionsReferenceDataListByHomeRegionOptionalParams,
  ) => Promise<SecuritySolutionsReferenceDataList>;
  /** Gets a list of all supported Security Solutions for the subscription. */
  list: (
    options?: SecuritySolutionsReferenceDataListOptionalParams,
  ) => Promise<SecuritySolutionsReferenceDataList>;
}

function _getSecuritySolutionsReferenceData(context: SecurityCenterContext) {
  return {
    listByHomeRegion: (
      ascLocation: string,
      options?: SecuritySolutionsReferenceDataListByHomeRegionOptionalParams,
    ) => listByHomeRegion(context, ascLocation, options),
    list: (options?: SecuritySolutionsReferenceDataListOptionalParams) => list(context, options),
  };
}

export function _getSecuritySolutionsReferenceDataOperations(
  context: SecurityCenterContext,
): SecuritySolutionsReferenceDataOperations {
  return {
    ..._getSecuritySolutionsReferenceData(context),
  };
}
