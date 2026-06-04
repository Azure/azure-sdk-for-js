// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { listByLocation } from "../../api/usages/operations.js";
import type { UsagesListByLocationOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets the current usage count and the limit for the resources of the location under the subscription. */
  listByLocation: (
    location: string,
    options?: UsagesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: StorageManagementContext) {
  return {
    listByLocation: (location: string, options?: UsagesListByLocationOptionalParams) =>
      listByLocation(context, location, options),
  };
}

export function _getUsagesOperations(context: StorageManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
