// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import { list } from "../../api/usages/operations.js";
import type { UsagesListOptionalParams } from "../../api/usages/options.js";
import type { Quota } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** This method returns region-specific quotas and resource usage information for the Azure Database Migration Service (classic). */
  list: (location: string, options?: UsagesListOptionalParams) => PagedAsyncIterableIterator<Quota>;
}

function _getUsages(context: DataMigrationManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(context: DataMigrationManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
