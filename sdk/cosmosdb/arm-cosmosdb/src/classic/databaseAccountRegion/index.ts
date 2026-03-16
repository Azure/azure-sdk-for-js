// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/databaseAccountRegion/operations.js";
import type { DatabaseAccountRegionListMetricsOptionalParams } from "../../api/databaseAccountRegion/options.js";
import type { Metric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseAccountRegion operations. */
export interface DatabaseAccountRegionOperations {
  /** Retrieves the metrics determined by the given filter for the given database account and region. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    region: string,
    filter: string,
    options?: DatabaseAccountRegionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<Metric>;
}

function _getDatabaseAccountRegion(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      region: string,
      filter: string,
      options?: DatabaseAccountRegionListMetricsOptionalParams,
    ) => listMetrics(context, resourceGroupName, accountName, region, filter, options),
  };
}

export function _getDatabaseAccountRegionOperations(
  context: CosmosDBManagementContext,
): DatabaseAccountRegionOperations {
  return {
    ..._getDatabaseAccountRegion(context),
  };
}
