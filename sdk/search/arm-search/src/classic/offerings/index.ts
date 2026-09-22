// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { fetch } from "../../api/offerings/operations.js";
import type { OfferingsFetchOptionalParams } from "../../api/offerings/options.js";
import type { OfferingsResult } from "../../models/models.js";

/** Interface representing a Offerings operations. */
export interface OfferingsOperations {
  /** Fetches the features and SKUs offered by the Azure AI Search service in each region, along with the recommended default region for creating new services. */
  fetch: (options?: OfferingsFetchOptionalParams) => Promise<OfferingsResult>;
}
function _getOfferings(context: SearchManagementContext) {
  return {
    fetch: (options?: OfferingsFetchOptionalParams) => fetch(context, options),
  };
}
export function _getOfferingsOperations(context: SearchManagementContext): OfferingsOperations {
  return {
    ..._getOfferings(context),
  };
}
