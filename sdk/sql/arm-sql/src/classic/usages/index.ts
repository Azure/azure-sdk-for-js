// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByInstancePool } from "../../api/usages/operations.js";
import { UsagesListByInstancePoolOptionalParams } from "../../api/usages/options.js";
import { Usage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets all instance pool usage metrics */
  listByInstancePool: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: UsagesListByInstancePoolOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: SqlManagementContext) {
  return {
    listByInstancePool: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: UsagesListByInstancePoolOptionalParams,
    ) => listByInstancePool(context, resourceGroupName, instancePoolName, options),
  };
}

export function _getUsagesOperations(context: SqlManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
