// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { list } from "../../api/offerings/operations.js";
import type { OfferingsListOptionalParams } from "../../api/offerings/options.js";
import type { OfferingsByRegion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Offerings operations. */
export interface OfferingsOperations {
  /** Lists all of the features and SKUs offered by the Azure AI Search service in each region. Note: This API returns a non-ARM resource collection and is not RPC-compliant. It will be replaced with an action-style API in the next preview as a breaking change. Customers should avoid taking new dependencies on the current shape. */
  list: (options?: OfferingsListOptionalParams) => PagedAsyncIterableIterator<OfferingsByRegion>;
}

function _getOfferings(context: SearchManagementContext) {
  return {
    list: (options?: OfferingsListOptionalParams) => list(context, options),
  };
}

export function _getOfferingsOperations(context: SearchManagementContext): OfferingsOperations {
  return {
    ..._getOfferings(context),
  };
}
