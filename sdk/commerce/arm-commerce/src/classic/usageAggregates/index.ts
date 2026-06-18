// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { UsageManagementContext } from "../../api/usageManagementContext.js";
import { list } from "../../api/usageAggregates/operations.js";
import { UsageAggregatesListOptionalParams } from "../../api/usageAggregates/options.js";
import { UsageAggregation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UsageAggregates operations. */
export interface UsageAggregatesOperations {
  /** Query aggregated Azure subscription consumption data for a date range. */
  list: (
    reportedStartTime: Date,
    reportedEndTime: Date,
    options?: UsageAggregatesListOptionalParams,
  ) => PagedAsyncIterableIterator<UsageAggregation>;
}

function _getUsageAggregates(context: UsageManagementContext) {
  return {
    list: (
      reportedStartTime: Date,
      reportedEndTime: Date,
      options?: UsageAggregatesListOptionalParams,
    ) => list(context, reportedStartTime, reportedEndTime, options),
  };
}

export function _getUsageAggregatesOperations(
  context: UsageManagementContext,
): UsageAggregatesOperations {
  return {
    ..._getUsageAggregates(context),
  };
}
