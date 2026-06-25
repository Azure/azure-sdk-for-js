// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagementContext } from "../../api/elasticSanManagementContext.js";
import { list } from "../../api/skus/operations.js";
import { SkusListOptionalParams } from "../../api/skus/options.js";
import { SkuInformation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** List all the available Skus in the region and information related to them */
  list: (options?: SkusListOptionalParams) => PagedAsyncIterableIterator<SkuInformation>;
}

function _getSkus(context: ElasticSanManagementContext) {
  return {
    list: (options?: SkusListOptionalParams) => list(context, options),
  };
}

export function _getSkusOperations(context: ElasticSanManagementContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
