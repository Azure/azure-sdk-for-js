// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import { listSkus } from "../../api/resourceSkus/operations.js";
import type { ResourceSkusListSkusOptionalParams } from "../../api/resourceSkus/options.js";
import type { ResourceSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceSkus operations. */
export interface ResourceSkusOperations {
  /** The skus action returns the list of SKUs that DMS (classic) supports. */
  listSkus: (
    options?: ResourceSkusListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getResourceSkus(context: DataMigrationManagementContext) {
  return {
    listSkus: (options?: ResourceSkusListSkusOptionalParams) => listSkus(context, options),
  };
}

export function _getResourceSkusOperations(
  context: DataMigrationManagementContext,
): ResourceSkusOperations {
  return {
    ..._getResourceSkus(context),
  };
}
