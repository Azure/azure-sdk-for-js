// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/locations/operations.js";
import type {
  LocationsListOptionalParams,
  LocationsGetOptionalParams,
} from "../../api/locations/options.js";
import type { AscLocation } from "../../models/locationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Locations operations. */
export interface LocationsOperations {
  /** The location of the responsible ASC of the specific subscription (home region). For each subscription there is only one responsible location. The location in the response should be used to read or write other resources in ASC according to their ID. */
  list: (options?: LocationsListOptionalParams) => PagedAsyncIterableIterator<AscLocation>;
  /** Details of a specific location */
  get: (ascLocation: string, options?: LocationsGetOptionalParams) => Promise<AscLocation>;
}

function _getLocations(context: SecurityCenterContext) {
  return {
    list: (options?: LocationsListOptionalParams) => list(context, options),
    get: (ascLocation: string, options?: LocationsGetOptionalParams) =>
      get(context, ascLocation, options),
  };
}

export function _getLocationsOperations(context: SecurityCenterContext): LocationsOperations {
  return {
    ..._getLocations(context),
  };
}
