// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/usages/operations.js";
import type { UsagesListOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** List network usages for a subscription. */
  list: (location: string, options?: UsagesListOptionalParams) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(context: NetworkManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
