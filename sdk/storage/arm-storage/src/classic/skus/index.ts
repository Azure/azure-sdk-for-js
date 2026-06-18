// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list } from "../../api/skus/operations.js";
import { SkusListOptionalParams } from "../../api/skus/options.js";
import { SkuInformation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** Lists the available SKUs supported by Microsoft.Storage for given subscription. */
  list: (options?: SkusListOptionalParams) => PagedAsyncIterableIterator<SkuInformation>;
}

function _getSkus(context: StorageManagementContext) {
  return {
    list: (options?: SkusListOptionalParams) => list(context, options),
  };
}

export function _getSkusOperations(context: StorageManagementContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
