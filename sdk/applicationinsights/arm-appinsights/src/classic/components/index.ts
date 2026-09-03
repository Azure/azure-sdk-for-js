// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  getPurgeStatus,
  purge,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/components/operations.js";
import {
  ComponentsGetPurgeStatusOptionalParams,
  ComponentsPurgeOptionalParams,
  ComponentsListOptionalParams,
  ComponentsListByResourceGroupOptionalParams,
  ComponentsDeleteOptionalParams,
  ComponentsUpdateTagsOptionalParams,
  ComponentsCreateOrUpdateOptionalParams,
  ComponentsGetOptionalParams,
} from "../../api/components/options.js";
import { TagsResource } from "../../models/applicationInsightsCommonTypes/models.js";
import {
  ApplicationInsightsComponent,
  ComponentPurgeBody,
  ComponentPurgeResponse,
  ComponentPurgeStatusResponse,
} from "../../models/components/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Components operations. */
export interface ComponentsOperations {
  /** Get status for an ongoing purge operation. */
  getPurgeStatus: (
    resourceGroupName: string,
    resourceName: string,
    purgeId: string,
    options?: ComponentsGetPurgeStatusOptionalParams,
  ) => Promise<ComponentPurgeStatusResponse>;
  /**
   * Purges data in an Application Insights component by a set of user-defined filters.
   *
   * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
   * Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(https://docs.microsoft.com/en-us/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
   */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    body: ComponentPurgeBody,
    options?: ComponentsPurgeOptionalParams,
  ) => Promise<ComponentPurgeResponse>;
  /** Gets a list of all Application Insights components within a subscription. */
  list: (
    options?: ComponentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationInsightsComponent>;
  /** Gets a list of Application Insights components within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ComponentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationInsightsComponent>;
  /** Deletes an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing component's tags. To update other fields use the CreateOrUpdate method. */
  updateTags: (
    resourceGroupName: string,
    resourceName: string,
    componentTags: TagsResource,
    options?: ComponentsUpdateTagsOptionalParams,
  ) => Promise<ApplicationInsightsComponent>;
  /** Creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    insightProperties: ApplicationInsightsComponent,
    options?: ComponentsCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationInsightsComponent>;
  /** Returns an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentsGetOptionalParams,
  ) => Promise<ApplicationInsightsComponent>;
}

function _getComponents(context: ApplicationInsightsManagementContext) {
  return {
    getPurgeStatus: (
      resourceGroupName: string,
      resourceName: string,
      purgeId: string,
      options?: ComponentsGetPurgeStatusOptionalParams,
    ) => getPurgeStatus(context, resourceGroupName, resourceName, purgeId, options),
    purge: (
      resourceGroupName: string,
      resourceName: string,
      body: ComponentPurgeBody,
      options?: ComponentsPurgeOptionalParams,
    ) => purge(context, resourceGroupName, resourceName, body, options),
    list: (options?: ComponentsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ComponentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: ComponentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    updateTags: (
      resourceGroupName: string,
      resourceName: string,
      componentTags: TagsResource,
      options?: ComponentsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, resourceName, componentTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      insightProperties: ApplicationInsightsComponent,
      options?: ComponentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, insightProperties, options),
    get: (resourceGroupName: string, resourceName: string, options?: ComponentsGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getComponentsOperations(
  context: ApplicationInsightsManagementContext,
): ComponentsOperations {
  return {
    ..._getComponents(context),
  };
}
