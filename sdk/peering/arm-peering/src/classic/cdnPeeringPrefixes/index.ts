// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/cdnPeeringPrefixes/operations.js";
import { CdnPeeringPrefixesListOptionalParams } from "../../api/cdnPeeringPrefixes/options.js";
import { CdnPeeringPrefix } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CdnPeeringPrefixes operations. */
export interface CdnPeeringPrefixesOperations {
  /** Lists all of the advertised prefixes for the specified peering location */
  list: (
    peeringLocation: string,
    options?: CdnPeeringPrefixesListOptionalParams,
  ) => PagedAsyncIterableIterator<CdnPeeringPrefix>;
}

function _getCdnPeeringPrefixes(context: PeeringManagementContext) {
  return {
    list: (peeringLocation: string, options?: CdnPeeringPrefixesListOptionalParams) =>
      list(context, peeringLocation, options),
  };
}

export function _getCdnPeeringPrefixesOperations(
  context: PeeringManagementContext,
): CdnPeeringPrefixesOperations {
  return {
    ..._getCdnPeeringPrefixes(context),
  };
}
