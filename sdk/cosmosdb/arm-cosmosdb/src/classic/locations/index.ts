// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, get } from "../../api/locations/operations.js";
import type {
  LocationsListOptionalParams,
  LocationsGetOptionalParams,
} from "../../api/locations/options.js";
import type { LocationGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Locations operations. */
export interface LocationsOperations {
  /** List Cosmos DB locations and their properties */
  list: (options?: LocationsListOptionalParams) => PagedAsyncIterableIterator<LocationGetResult>;
  /** Get the properties of an existing Cosmos DB location */
  get: (location: string, options?: LocationsGetOptionalParams) => Promise<LocationGetResult>;
}

function _getLocations(context: CosmosDBManagementContext) {
  return {
    list: (options?: LocationsListOptionalParams) => list(context, options),
    get: (location: string, options?: LocationsGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getLocationsOperations(context: CosmosDBManagementContext): LocationsOperations {
  return {
    ..._getLocations(context),
  };
}
