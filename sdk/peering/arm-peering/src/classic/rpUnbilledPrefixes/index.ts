// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/rpUnbilledPrefixes/operations.js";
import type { RpUnbilledPrefixesListOptionalParams } from "../../api/rpUnbilledPrefixes/options.js";
import type { RpUnbilledPrefix } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RpUnbilledPrefixes operations. */
export interface RpUnbilledPrefixesOperations {
  /** Lists all of the RP unbilled prefixes for the specified peering */
  list: (
    resourceGroupName: string,
    peeringName: string,
    options?: RpUnbilledPrefixesListOptionalParams,
  ) => PagedAsyncIterableIterator<RpUnbilledPrefix>;
}

function _getRpUnbilledPrefixes(context: PeeringManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      peeringName: string,
      options?: RpUnbilledPrefixesListOptionalParams,
    ) => list(context, resourceGroupName, peeringName, options),
  };
}

export function _getRpUnbilledPrefixesOperations(
  context: PeeringManagementContext,
): RpUnbilledPrefixesOperations {
  return {
    ..._getRpUnbilledPrefixes(context),
  };
}
