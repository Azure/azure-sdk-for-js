// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/availableDelegations/operations.js";
import type { AvailableDelegationsListOptionalParams } from "../../api/availableDelegations/options.js";
import type { AvailableDelegation } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableDelegations operations. */
export interface AvailableDelegationsOperations {
  /** Gets all of the available subnet delegations for this subscription in this region. */
  list: (
    location: string,
    options?: AvailableDelegationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableDelegation>;
}

function _getAvailableDelegations(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: AvailableDelegationsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailableDelegationsOperations(
  context: NetworkManagementContext,
): AvailableDelegationsOperations {
  return {
    ..._getAvailableDelegations(context),
  };
}
