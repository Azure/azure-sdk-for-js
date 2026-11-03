// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetricDefinitions, listUsages, listMetrics } from "../../api/collection/operations.js";
import type {
  CollectionListMetricDefinitionsOptionalParams,
  CollectionListUsagesOptionalParams,
  CollectionListMetricsOptionalParams,
} from "../../api/collection/options.js";
import type { Metric, Usage, MetricDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Collection operations. */
export interface CollectionOperations {
  /** Retrieves metric definitions for the given collection. */
  listMetricDefinitions: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    options?: CollectionListMetricDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MetricDefinition>;
  /** Retrieves the usages (most recent storage data) for the given collection. */
  listUsages: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    options?: CollectionListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Retrieves the metrics determined by the given filter for the given database account and collection. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    filter: string,
    options?: CollectionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<Metric>;
}

function _getCollection(context: CosmosDBManagementContext) {
  return {
    listMetricDefinitions: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      options?: CollectionListMetricDefinitionsOptionalParams,
    ) =>
      listMetricDefinitions(
        context,
        resourceGroupName,
        accountName,
        databaseRid,
        collectionRid,
        options,
      ),
    listUsages: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      options?: CollectionListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, accountName, databaseRid, collectionRid, options),
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      filter: string,
      options?: CollectionListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        databaseRid,
        collectionRid,
        filter,
        options,
      ),
  };
}

export function _getCollectionOperations(context: CosmosDBManagementContext): CollectionOperations {
  return {
    ..._getCollection(context),
  };
}
