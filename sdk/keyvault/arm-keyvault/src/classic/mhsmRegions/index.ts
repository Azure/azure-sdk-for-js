// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import { listByResource } from "../../api/mhsmRegions/operations.js";
import type { MhsmRegionsListByResourceOptionalParams } from "../../api/mhsmRegions/options.js";
import type { MhsmGeoReplicatedRegion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MhsmRegions operations. */
export interface MhsmRegionsOperations {
  /** The List operation gets information about the regions associated with the managed HSM Pool. */
  listByResource: (
    resourceGroupName: string,
    name: string,
    options?: MhsmRegionsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<MhsmGeoReplicatedRegion>;
}

function _getMhsmRegions(context: KeyVaultManagementContext) {
  return {
    listByResource: (
      resourceGroupName: string,
      name: string,
      options?: MhsmRegionsListByResourceOptionalParams,
    ) => listByResource(context, resourceGroupName, name, options),
  };
}

export function _getMhsmRegionsOperations(
  context: KeyVaultManagementContext,
): MhsmRegionsOperations {
  return {
    ..._getMhsmRegions(context),
  };
}
