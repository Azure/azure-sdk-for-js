// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByInstancePool } from "../../api/usages/operations.js";
import type { UsagesListByInstancePoolOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets all instance pool usage metrics */
  listByInstancePool: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: UsagesListByInstancePoolOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: SqlContext) {
  return {
    listByInstancePool: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: UsagesListByInstancePoolOptionalParams,
    ) => listByInstancePool(context, resourceGroupName, instancePoolName, options),
  };
}

export function _getUsagesOperations(context: SqlContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
