// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/bgpServiceCommunities/operations.js";
import { BgpServiceCommunitiesListOptionalParams } from "../../api/bgpServiceCommunities/options.js";
import { BgpServiceCommunity } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BgpServiceCommunities operations. */
export interface BgpServiceCommunitiesOperations {
  /** Gets all the available bgp service communities. */
  list: (
    options?: BgpServiceCommunitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<BgpServiceCommunity>;
}

function _getBgpServiceCommunities(context: NetworkManagementContext) {
  return {
    list: (options?: BgpServiceCommunitiesListOptionalParams) => list(context, options),
  };
}

export function _getBgpServiceCommunitiesOperations(
  context: NetworkManagementContext,
): BgpServiceCommunitiesOperations {
  return {
    ..._getBgpServiceCommunities(context),
  };
}
