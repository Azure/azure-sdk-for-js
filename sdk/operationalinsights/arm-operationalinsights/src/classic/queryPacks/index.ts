// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  createOrUpdateWithoutName,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/queryPacks/operations.js";
import {
  QueryPacksCreateOrUpdateWithoutNameOptionalParams,
  QueryPacksListOptionalParams,
  QueryPacksListByResourceGroupOptionalParams,
  QueryPacksDeleteOptionalParams,
  QueryPacksUpdateTagsOptionalParams,
  QueryPacksCreateOrUpdateOptionalParams,
  QueryPacksGetOptionalParams,
} from "../../api/queryPacks/options.js";
import { LogAnalyticsQueryPack, TagsResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QueryPacks operations. */
export interface QueryPacksOperations {
  /** Creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdateWithoutName: (
    resourceGroupName: string,
    logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
    options?: QueryPacksCreateOrUpdateWithoutNameOptionalParams,
  ) => Promise<LogAnalyticsQueryPack>;
  /** Gets a list of all Log Analytics QueryPacks within a subscription. */
  list: (
    options?: QueryPacksListOptionalParams,
  ) => PagedAsyncIterableIterator<LogAnalyticsQueryPack>;
  /** Gets a list of Log Analytics QueryPacks within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: QueryPacksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LogAnalyticsQueryPack>;
  /** Deletes a Log Analytics QueryPack. */
  delete: (
    resourceGroupName: string,
    queryPackName: string,
    options?: QueryPacksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method. */
  updateTags: (
    resourceGroupName: string,
    queryPackName: string,
    queryPackTags: TagsResource,
    options?: QueryPacksUpdateTagsOptionalParams,
  ) => Promise<LogAnalyticsQueryPack>;
  /** Creates (or updates) a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdate: (
    resourceGroupName: string,
    queryPackName: string,
    logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
    options?: QueryPacksCreateOrUpdateOptionalParams,
  ) => Promise<LogAnalyticsQueryPack>;
  /** Returns a Log Analytics QueryPack. */
  get: (
    resourceGroupName: string,
    queryPackName: string,
    options?: QueryPacksGetOptionalParams,
  ) => Promise<LogAnalyticsQueryPack>;
}

function _getQueryPacks(context: OperationalInsightsManagementContext) {
  return {
    createOrUpdateWithoutName: (
      resourceGroupName: string,
      logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
      options?: QueryPacksCreateOrUpdateWithoutNameOptionalParams,
    ) =>
      createOrUpdateWithoutName(context, resourceGroupName, logAnalyticsQueryPackPayload, options),
    list: (options?: QueryPacksListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: QueryPacksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      queryPackName: string,
      options?: QueryPacksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, queryPackName, options),
    updateTags: (
      resourceGroupName: string,
      queryPackName: string,
      queryPackTags: TagsResource,
      options?: QueryPacksUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, queryPackName, queryPackTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      queryPackName: string,
      logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
      options?: QueryPacksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        queryPackName,
        logAnalyticsQueryPackPayload,
        options,
      ),
    get: (
      resourceGroupName: string,
      queryPackName: string,
      options?: QueryPacksGetOptionalParams,
    ) => get(context, resourceGroupName, queryPackName, options),
  };
}

export function _getQueryPacksOperations(
  context: OperationalInsightsManagementContext,
): QueryPacksOperations {
  return {
    ..._getQueryPacks(context),
  };
}
