// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import { list } from "../../api/usages/operations.js";
import { UsagesListOptionalParams } from "../../api/usages/options.js";
import { SignalRUsage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
