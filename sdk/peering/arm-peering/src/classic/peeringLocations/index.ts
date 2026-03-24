// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/peeringLocations/operations.js";
import type { PeeringLocationsListOptionalParams } from "../../api/peeringLocations/options.js";
import type { PeeringLocation, PeeringLocationsKind } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeeringLocations operations. */
export interface PeeringLocationsOperations {
  /** Lists all of the available peering locations for the specified kind of peering. */
  list: (
    kind: PeeringLocationsKind,
    options?: PeeringLocationsListOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringLocation>;
}

function _getPeeringLocations(context: PeeringManagementContext) {
  return {
    list: (kind: PeeringLocationsKind, options?: PeeringLocationsListOptionalParams) =>
      list(context, kind, options),
  };
}

export function _getPeeringLocationsOperations(
  context: PeeringManagementContext,
): PeeringLocationsOperations {
  return {
    ..._getPeeringLocations(context),
  };
}
