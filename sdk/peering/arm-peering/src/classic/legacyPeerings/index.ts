// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/legacyPeerings/operations.js";
import { LegacyPeeringsListOptionalParams } from "../../api/legacyPeerings/options.js";
import { Peering, LegacyPeeringsKind } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LegacyPeerings operations. */
export interface LegacyPeeringsOperations {
  /** Lists all of the legacy peerings under the given subscription matching the specified kind and location. */
  list: (
    peeringLocation: string,
    kind: LegacyPeeringsKind,
    options?: LegacyPeeringsListOptionalParams,
  ) => PagedAsyncIterableIterator<Peering>;
}

function _getLegacyPeerings(context: PeeringManagementContext) {
  return {
    list: (
      peeringLocation: string,
      kind: LegacyPeeringsKind,
      options?: LegacyPeeringsListOptionalParams,
    ) => list(context, peeringLocation, kind, options),
  };
}

export function _getLegacyPeeringsOperations(
  context: PeeringManagementContext,
): LegacyPeeringsOperations {
  return {
    ..._getLegacyPeerings(context),
  };
}
