// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { list } from "../../api/skus/operations.js";
import { SkusListOptionalParams } from "../../api/skus/options.js";
import { ResourceSku } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** Get the list of StorageCache.Cache SKUs available to this subscription. */
  list: (options?: SkusListOptionalParams) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getSkus(context: StorageCacheManagementContext) {
  return {
    list: (options?: SkusListOptionalParams) => list(context, options),
  };
}

export function _getSkusOperations(context: StorageCacheManagementContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
