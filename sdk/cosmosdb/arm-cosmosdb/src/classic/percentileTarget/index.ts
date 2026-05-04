// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/percentileTarget/operations.js";
import type { PercentileTargetListMetricsOptionalParams } from "../../api/percentileTarget/options.js";
import type { PercentileMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PercentileTarget operations. */
export interface PercentileTargetOperations {
  /** Retrieves the metrics determined by the given filter for the given account target region. This url is only for PBS and Replication Latency data */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    targetRegion: string,
    filter: string,
    options?: PercentileTargetListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PercentileMetric>;
}

function _getPercentileTarget(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      targetRegion: string,
      filter: string,
      options?: PercentileTargetListMetricsOptionalParams,
    ) => listMetrics(context, resourceGroupName, accountName, targetRegion, filter, options),
  };
}

export function _getPercentileTargetOperations(
  context: CosmosDBManagementContext,
): PercentileTargetOperations {
  return {
    ..._getPercentileTarget(context),
  };
}
