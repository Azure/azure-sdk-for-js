// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import { list } from "../../api/skus/operations.js";
import type { SkusListOptionalParams } from "../../api/skus/options.js";
import type { SkuDescription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** Lists eligible region SKUs for Kusto resource provider by Azure region. */
  list: (
    location: string,
    options?: SkusListOptionalParams,
  ) => PagedAsyncIterableIterator<SkuDescription>;
}

function _getSkus(context: KustoManagementContext) {
  return {
    list: (location: string, options?: SkusListOptionalParams) => list(context, location, options),
  };
}

export function _getSkusOperations(context: KustoManagementContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
