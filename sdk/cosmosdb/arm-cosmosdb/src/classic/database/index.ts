// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetricDefinitions, listUsages, listMetrics } from "../../api/database/operations.js";
import type {
  DatabaseListMetricDefinitionsOptionalParams,
  DatabaseListUsagesOptionalParams,
  DatabaseListMetricsOptionalParams,
} from "../../api/database/options.js";
import type { Metric, Usage, MetricDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Database operations. */
export interface DatabaseOperations {
  /** Retrieves metric definitions for the given database. */
  listMetricDefinitions: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    options?: DatabaseListMetricDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MetricDefinition>;
  /** Retrieves the usages (most recent data) for the given database. */
  listUsages: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    options?: DatabaseListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Retrieves the metrics determined by the given filter for the given database account and database. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    filter: string,
    options?: DatabaseListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<Metric>;
}

function _getDatabase(context: CosmosDBManagementContext) {
  return {
    listMetricDefinitions: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      options?: DatabaseListMetricDefinitionsOptionalParams,
    ) => listMetricDefinitions(context, resourceGroupName, accountName, databaseRid, options),
    listUsages: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      options?: DatabaseListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, accountName, databaseRid, options),
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      filter: string,
      options?: DatabaseListMetricsOptionalParams,
    ) => listMetrics(context, resourceGroupName, accountName, databaseRid, filter, options),
  };
}

export function _getDatabaseOperations(context: CosmosDBManagementContext): DatabaseOperations {
  return {
    ..._getDatabase(context),
  };
}
