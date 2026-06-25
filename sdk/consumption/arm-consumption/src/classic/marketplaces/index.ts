// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { list } from "../../api/marketplaces/operations.js";
import { MarketplacesListOptionalParams } from "../../api/marketplaces/options.js";
import { Marketplace } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Marketplaces operations. */
export interface MarketplacesOperations {
  /** Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later. */
  list: (
    scope: string,
    options?: MarketplacesListOptionalParams,
  ) => PagedAsyncIterableIterator<Marketplace>;
}

function _getMarketplaces(context: ConsumptionManagementContext) {
  return {
    list: (scope: string, options?: MarketplacesListOptionalParams) =>
      list(context, scope, options),
  };
}

export function _getMarketplacesOperations(
  context: ConsumptionManagementContext,
): MarketplacesOperations {
  return {
    ..._getMarketplaces(context),
  };
}
