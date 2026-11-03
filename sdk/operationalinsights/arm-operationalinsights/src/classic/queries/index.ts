// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { listSearch, list, $delete, update, put, get } from "../../api/queries/operations.js";
import {
  QueriesListSearchOptionalParams,
  QueriesListOptionalParams,
  QueriesDeleteOptionalParams,
  QueriesUpdateOptionalParams,
  QueriesPutOptionalParams,
  QueriesGetOptionalParams,
} from "../../api/queries/options.js";
import {
  LogAnalyticsQueryPackQuery,
  LogAnalyticsQueryPackQuerySearchProperties,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Queries operations. */
export interface QueriesOperations {
  /** Search a list of Queries defined within a Log Analytics QueryPack according to given search properties. */
  listSearch: (
    resourceGroupName: string,
    queryPackName: string,
    querySearchProperties: LogAnalyticsQueryPackQuerySearchProperties,
    options?: QueriesListSearchOptionalParams,
  ) => PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery>;
  /** Gets a list of Queries defined within a Log Analytics QueryPack. */
  list: (
    resourceGroupName: string,
    queryPackName: string,
    options?: QueriesListOptionalParams,
  ) => PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery>;
  /** Deletes a specific Query defined within an Log Analytics QueryPack. */
  delete: (
    resourceGroupName: string,
    queryPackName: string,
    id: string,
    options?: QueriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds or Updates a specific Query within a Log Analytics QueryPack. */
  update: (
    resourceGroupName: string,
    queryPackName: string,
    id: string,
    queryPayload: LogAnalyticsQueryPackQuery,
    options?: QueriesUpdateOptionalParams,
  ) => Promise<LogAnalyticsQueryPackQuery>;
  /** Adds or Updates a specific Query within a Log Analytics QueryPack. */
  put: (
    resourceGroupName: string,
    queryPackName: string,
    id: string,
    queryPayload: LogAnalyticsQueryPackQuery,
    options?: QueriesPutOptionalParams,
  ) => Promise<LogAnalyticsQueryPackQuery>;
  /** Gets a specific Log Analytics Query defined within a Log Analytics QueryPack. */
  get: (
    resourceGroupName: string,
    queryPackName: string,
    id: string,
    options?: QueriesGetOptionalParams,
  ) => Promise<LogAnalyticsQueryPackQuery>;
}

function _getQueries(context: OperationalInsightsManagementContext) {
  return {
    listSearch: (
      resourceGroupName: string,
      queryPackName: string,
      querySearchProperties: LogAnalyticsQueryPackQuerySearchProperties,
      options?: QueriesListSearchOptionalParams,
    ) => listSearch(context, resourceGroupName, queryPackName, querySearchProperties, options),
    list: (resourceGroupName: string, queryPackName: string, options?: QueriesListOptionalParams) =>
      list(context, resourceGroupName, queryPackName, options),
    delete: (
      resourceGroupName: string,
      queryPackName: string,
      id: string,
      options?: QueriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, queryPackName, id, options),
    update: (
      resourceGroupName: string,
      queryPackName: string,
      id: string,
      queryPayload: LogAnalyticsQueryPackQuery,
      options?: QueriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, queryPackName, id, queryPayload, options),
    put: (
      resourceGroupName: string,
      queryPackName: string,
      id: string,
      queryPayload: LogAnalyticsQueryPackQuery,
      options?: QueriesPutOptionalParams,
    ) => put(context, resourceGroupName, queryPackName, id, queryPayload, options),
    get: (
      resourceGroupName: string,
      queryPackName: string,
      id: string,
      options?: QueriesGetOptionalParams,
    ) => get(context, resourceGroupName, queryPackName, id, options),
  };
}

export function _getQueriesOperations(
  context: OperationalInsightsManagementContext,
): QueriesOperations {
  return {
    ..._getQueries(context),
  };
}
