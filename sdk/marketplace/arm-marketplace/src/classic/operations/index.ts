// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext } from "../../api/marketplaceContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { SingleOperation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available Microsoft.Marketplace REST API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<SingleOperation>;
}

function _getOperations(context: MarketplaceContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: MarketplaceContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
