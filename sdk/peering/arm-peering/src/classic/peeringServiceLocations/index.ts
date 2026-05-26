// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/peeringServiceLocations/operations.js";
import { PeeringServiceLocationsListOptionalParams } from "../../api/peeringServiceLocations/options.js";
import { PeeringServiceLocation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeeringServiceLocations operations. */
export interface PeeringServiceLocationsOperations {
  /** Lists all of the available locations for peering service. */
  list: (
    options?: PeeringServiceLocationsListOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringServiceLocation>;
}

function _getPeeringServiceLocations(context: PeeringManagementContext) {
  return {
    list: (options?: PeeringServiceLocationsListOptionalParams) => list(context, options),
  };
}

export function _getPeeringServiceLocationsOperations(
  context: PeeringManagementContext,
): PeeringServiceLocationsOperations {
  return {
    ..._getPeeringServiceLocations(context),
  };
}
