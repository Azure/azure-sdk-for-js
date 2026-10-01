// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { $delete, put, get, list } from "../../api/analyticsItems/operations.js";
import {
  AnalyticsItemsDeleteOptionalParams,
  AnalyticsItemsPutOptionalParams,
  AnalyticsItemsGetOptionalParams,
  AnalyticsItemsListOptionalParams,
} from "../../api/analyticsItems/options.js";
import {
  ApplicationInsightsComponentAnalyticsItem,
  ItemScopePath,
} from "../../models/analyticsItems/models.js";

/** Interface representing a AnalyticsItems operations. */
export interface AnalyticsItemsOperations {
  /** Deletes a specific Analytics Items defined within an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    scopePath: ItemScopePath,
    options?: AnalyticsItemsDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds or Updates a specific Analytics Item within an Application Insights component. */
  put: (
    resourceGroupName: string,
    resourceName: string,
    scopePath: ItemScopePath,
    itemProperties: ApplicationInsightsComponentAnalyticsItem,
    options?: AnalyticsItemsPutOptionalParams,
  ) => Promise<ApplicationInsightsComponentAnalyticsItem>;
  /** Gets a specific Analytics Items defined within an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    scopePath: ItemScopePath,
    options?: AnalyticsItemsGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentAnalyticsItem>;
  /** Gets a list of Analytics Items defined within an Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    scopePath: ItemScopePath,
    options?: AnalyticsItemsListOptionalParams,
  ) => Promise<ApplicationInsightsComponentAnalyticsItem[]>;
}

function _getAnalyticsItems(context: ApplicationInsightsManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      resourceName: string,
      scopePath: ItemScopePath,
      options?: AnalyticsItemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, scopePath, options),
    put: (
      resourceGroupName: string,
      resourceName: string,
      scopePath: ItemScopePath,
      itemProperties: ApplicationInsightsComponentAnalyticsItem,
      options?: AnalyticsItemsPutOptionalParams,
    ) => put(context, resourceGroupName, resourceName, scopePath, itemProperties, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      scopePath: ItemScopePath,
      options?: AnalyticsItemsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, scopePath, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      scopePath: ItemScopePath,
      options?: AnalyticsItemsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, scopePath, options),
  };
}

export function _getAnalyticsItemsOperations(
  context: ApplicationInsightsManagementContext,
): AnalyticsItemsOperations {
  return {
    ..._getAnalyticsItems(context),
  };
}
