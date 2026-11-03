// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/percentileSourceTarget/operations.js";
import type { PercentileSourceTargetListMetricsOptionalParams } from "../../api/percentileSourceTarget/options.js";
import type { PercentileMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PercentileSourceTarget operations. */
export interface PercentileSourceTargetOperations {
  /** Retrieves the metrics determined by the given filter for the given account, source and target region. This url is only for PBS and Replication Latency data */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    sourceRegion: string,
    targetRegion: string,
    filter: string,
    options?: PercentileSourceTargetListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PercentileMetric>;
}

function _getPercentileSourceTarget(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      sourceRegion: string,
      targetRegion: string,
      filter: string,
      options?: PercentileSourceTargetListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        sourceRegion,
        targetRegion,
        filter,
        options,
      ),
  };
}

export function _getPercentileSourceTargetOperations(
  context: CosmosDBManagementContext,
): PercentileSourceTargetOperations {
  return {
    ..._getPercentileSourceTarget(context),
  };
}
