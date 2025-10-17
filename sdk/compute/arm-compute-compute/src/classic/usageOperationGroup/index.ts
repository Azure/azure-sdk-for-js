// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { list } from "../../api/usageOperationGroup/operations.js";
import type { UsageOperationGroupListOptionalParams } from "../../api/usageOperationGroup/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UsageOperationGroup operations. */
export interface UsageOperationGroupOperations {
  /** Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription. */
  list: (
    location: string,
    options?: UsageOperationGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsageOperationGroup(context: ComputeContext) {
  return {
    list: (location: string, options?: UsageOperationGroupListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsageOperationGroupOperations(
  context: ComputeContext,
): UsageOperationGroupOperations {
  return {
    ..._getUsageOperationGroup(context),
  };
}
