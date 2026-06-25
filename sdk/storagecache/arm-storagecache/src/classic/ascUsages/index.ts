// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { list } from "../../api/ascUsages/operations.js";
import { AscUsagesListOptionalParams } from "../../api/ascUsages/options.js";
import { ResourceUsage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AscUsages operations. */
export interface AscUsagesOperations {
  /** Gets the quantity used and quota limit for resources */
  list: (
    location: string,
    options?: AscUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceUsage>;
}

function _getAscUsages(context: StorageCacheManagementContext) {
  return {
    list: (location: string, options?: AscUsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAscUsagesOperations(
  context: StorageCacheManagementContext,
): AscUsagesOperations {
  return {
    ..._getAscUsages(context),
  };
}
