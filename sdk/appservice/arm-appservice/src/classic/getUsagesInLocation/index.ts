// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { list } from "../../api/getUsagesInLocation/operations.js";
import type { GetUsagesInLocationListOptionalParams } from "../../api/getUsagesInLocation/options.js";
import type { CsmUsageQuota } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GetUsagesInLocation operations. */
export interface GetUsagesInLocationOperations {
  /** List usages in cores for all skus used by a subscription in a given location, for a specific quota type. */
  list: (
    location: string,
    options?: GetUsagesInLocationListOptionalParams,
  ) => PagedAsyncIterableIterator<CsmUsageQuota>;
}

function _getGetUsagesInLocation(context: WebSiteManagementContext) {
  return {
    list: (location: string, options?: GetUsagesInLocationListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getGetUsagesInLocationOperations(
  context: WebSiteManagementContext,
): GetUsagesInLocationOperations {
  return {
    ..._getGetUsagesInLocation(context),
  };
}
