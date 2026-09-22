// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/peeringServiceCountries/operations.js";
import { PeeringServiceCountriesListOptionalParams } from "../../api/peeringServiceCountries/options.js";
import { PeeringServiceCountry } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeeringServiceCountries operations. */
export interface PeeringServiceCountriesOperations {
  /** Lists all of the available countries for peering service. */
  list: (
    options?: PeeringServiceCountriesListOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringServiceCountry>;
}

function _getPeeringServiceCountries(context: PeeringManagementContext) {
  return {
    list: (options?: PeeringServiceCountriesListOptionalParams) => list(context, options),
  };
}

export function _getPeeringServiceCountriesOperations(
  context: PeeringManagementContext,
): PeeringServiceCountriesOperations {
  return {
    ..._getPeeringServiceCountries(context),
  };
}
