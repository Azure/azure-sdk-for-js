// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { listByPeering } from "../../api/receivedRoutes/operations.js";
import type { ReceivedRoutesListByPeeringOptionalParams } from "../../api/receivedRoutes/options.js";
import type { PeeringReceivedRoute } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReceivedRoutes operations. */
export interface ReceivedRoutesOperations {
  /** Lists the prefixes received over the specified peering under the given subscription and resource group. */
  listByPeering: (
    resourceGroupName: string,
    peeringName: string,
    options?: ReceivedRoutesListByPeeringOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringReceivedRoute>;
}

function _getReceivedRoutes(context: PeeringManagementContext) {
  return {
    listByPeering: (
      resourceGroupName: string,
      peeringName: string,
      options?: ReceivedRoutesListByPeeringOptionalParams,
    ) => listByPeering(context, resourceGroupName, peeringName, options),
  };
}

export function _getReceivedRoutesOperations(
  context: PeeringManagementContext,
): ReceivedRoutesOperations {
  return {
    ..._getReceivedRoutes(context),
  };
}
