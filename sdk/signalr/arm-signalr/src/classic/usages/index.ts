// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import { list } from "../../api/usages/operations.js";
import type { UsagesListOptionalParams } from "../../api/usages/options.js";
import type { SignalRUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** List resource usage quotas by location. */
  list: (
    location: string,
    options?: UsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<SignalRUsage>;
}

function _getUsages(context: SignalRManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(context: SignalRManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
