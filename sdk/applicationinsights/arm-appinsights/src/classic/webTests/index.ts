// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  listByComponent,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/webTests/operations.js";
import {
  WebTestsListByComponentOptionalParams,
  WebTestsListOptionalParams,
  WebTestsListByResourceGroupOptionalParams,
  WebTestsDeleteOptionalParams,
  WebTestsUpdateTagsOptionalParams,
  WebTestsCreateOrUpdateOptionalParams,
  WebTestsGetOptionalParams,
} from "../../api/webTests/options.js";
import { TagsResource } from "../../models/applicationInsightsCommonTypes/models.js";
import { WebTest } from "../../models/webTestsApi/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WebTests operations. */
export interface WebTestsOperations {
  /** Get all Application Insights web tests defined for the specified component. */
  listByComponent: (
    componentName: string,
    resourceGroupName: string,
    options?: WebTestsListByComponentOptionalParams,
  ) => PagedAsyncIterableIterator<WebTest>;
  /** Get all Application Insights web test definitions for the specified subscription. */
  list: (options?: WebTestsListOptionalParams) => PagedAsyncIterableIterator<WebTest>;
  /** Get all Application Insights web tests defined for the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WebTestsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<WebTest>;
  /** Deletes an Application Insights web test. */
  delete: (
    resourceGroupName: string,
    webTestName: string,
    options?: WebTestsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the tags associated with an Application Insights web test. */
  updateTags: (
    resourceGroupName: string,
    webTestName: string,
    webTestTags: TagsResource,
    options?: WebTestsUpdateTagsOptionalParams,
  ) => Promise<WebTest>;
  /** Creates or updates an Application Insights web test definition. */
  createOrUpdate: (
    resourceGroupName: string,
    webTestName: string,
    webTestDefinition: WebTest,
    options?: WebTestsCreateOrUpdateOptionalParams,
  ) => Promise<WebTest>;
  /** Get a specific Application Insights web test definition. */
  get: (
    resourceGroupName: string,
    webTestName: string,
    options?: WebTestsGetOptionalParams,
  ) => Promise<WebTest>;
}

function _getWebTests(context: ApplicationInsightsManagementContext) {
  return {
    listByComponent: (
      componentName: string,
      resourceGroupName: string,
      options?: WebTestsListByComponentOptionalParams,
    ) => listByComponent(context, componentName, resourceGroupName, options),
    list: (options?: WebTestsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WebTestsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      webTestName: string,
      options?: WebTestsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, webTestName, options),
    updateTags: (
      resourceGroupName: string,
      webTestName: string,
      webTestTags: TagsResource,
      options?: WebTestsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, webTestName, webTestTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      webTestName: string,
      webTestDefinition: WebTest,
      options?: WebTestsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, webTestName, webTestDefinition, options),
    get: (resourceGroupName: string, webTestName: string, options?: WebTestsGetOptionalParams) =>
      get(context, resourceGroupName, webTestName, options),
  };
}

export function _getWebTestsOperations(
  context: ApplicationInsightsManagementContext,
): WebTestsOperations {
  return {
    ..._getWebTests(context),
  };
}
