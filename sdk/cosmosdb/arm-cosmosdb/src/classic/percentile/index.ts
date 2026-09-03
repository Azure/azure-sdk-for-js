// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/percentile/operations.js";
import type { PercentileListMetricsOptionalParams } from "../../api/percentile/options.js";
import type { PercentileMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Percentile operations. */
export interface PercentileOperations {
  /** Retrieves the metrics determined by the given filter for the given database account. This url is only for PBS and Replication Latency data */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    filter: string,
    options?: PercentileListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PercentileMetric>;
}

function _getPercentile(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      filter: string,
      options?: PercentileListMetricsOptionalParams,
    ) => listMetrics(context, resourceGroupName, accountName, filter, options),
  };
}

export function _getPercentileOperations(context: CosmosDBManagementContext): PercentileOperations {
  return {
    ..._getPercentile(context),
  };
}
