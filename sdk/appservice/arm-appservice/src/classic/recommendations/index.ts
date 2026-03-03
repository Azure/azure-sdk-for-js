// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  disableRecommendationForSubscription,
  resetAllFilters,
  list,
  resetAllFiltersForWebApp,
  disableAllForWebApp,
  listRecommendedRulesForWebApp,
  listHistoryForWebApp,
  disableRecommendationForHostingEnvironment,
  getRuleDetailsByHostingEnvironment,
  resetAllFiltersForHostingEnvironment,
  disableAllForHostingEnvironment,
  listRecommendedRulesForHostingEnvironment,
  listHistoryForHostingEnvironment,
  disableRecommendationForSite,
  getRuleDetailsByWebApp,
} from "../../api/recommendations/operations.js";
import type {
  RecommendationsDisableRecommendationForSubscriptionOptionalParams,
  RecommendationsResetAllFiltersOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsResetAllFiltersForWebAppOptionalParams,
  RecommendationsDisableAllForWebAppOptionalParams,
  RecommendationsListRecommendedRulesForWebAppOptionalParams,
  RecommendationsListHistoryForWebAppOptionalParams,
  RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams,
  RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams,
  RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams,
  RecommendationsDisableAllForHostingEnvironmentOptionalParams,
  RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams,
  RecommendationsListHistoryForHostingEnvironmentOptionalParams,
  RecommendationsDisableRecommendationForSiteOptionalParams,
  RecommendationsGetRuleDetailsByWebAppOptionalParams,
} from "../../api/recommendations/options.js";
import type { RecommendationRule, Recommendation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Recommendations operations. */
export interface RecommendationsOperations {
  /** Description for Disables the specified rule so it will not apply to a subscription in the future. */
  disableRecommendationForSubscription: (
    name: string,
    options?: RecommendationsDisableRecommendationForSubscriptionOptionalParams,
  ) => Promise<void>;
  /** Description for Reset all recommendation opt-out settings for a subscription. */
  resetAllFilters: (options?: RecommendationsResetAllFiltersOptionalParams) => Promise<void>;
  /** Description for List all recommendations for a subscription. */
  list: (options?: RecommendationsListOptionalParams) => PagedAsyncIterableIterator<Recommendation>;
  /** Description for Reset all recommendation opt-out settings for an app. */
  resetAllFiltersForWebApp: (
    resourceGroupName: string,
    siteName: string,
    options?: RecommendationsResetAllFiltersForWebAppOptionalParams,
  ) => Promise<void>;
  /** Description for Disable all recommendations for an app. */
  disableAllForWebApp: (
    resourceGroupName: string,
    siteName: string,
    options?: RecommendationsDisableAllForWebAppOptionalParams,
  ) => Promise<void>;
  /** Description for Get all recommendations for an app. */
  listRecommendedRulesForWebApp: (
    resourceGroupName: string,
    siteName: string,
    options?: RecommendationsListRecommendedRulesForWebAppOptionalParams,
  ) => PagedAsyncIterableIterator<Recommendation>;
  /** Description for Get past recommendations for an app, optionally specified by the time range. */
  listHistoryForWebApp: (
    resourceGroupName: string,
    siteName: string,
    options?: RecommendationsListHistoryForWebAppOptionalParams,
  ) => PagedAsyncIterableIterator<Recommendation>;
  /** Description for Disables the specific rule for a web site permanently. */
  disableRecommendationForHostingEnvironment: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    hostingEnvironmentName: string,
    options?: RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams,
  ) => Promise<void>;
  /** Description for Get a recommendation rule for an app. */
  getRuleDetailsByHostingEnvironment: (
    resourceGroupName: string,
    hostingEnvironmentName: string,
    name: string,
    options?: RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams,
  ) => Promise<RecommendationRule>;
  /** Description for Reset all recommendation opt-out settings for an app. */
  resetAllFiltersForHostingEnvironment: (
    resourceGroupName: string,
    environmentName: string,
    hostingEnvironmentName: string,
    options?: RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams,
  ) => Promise<void>;
  /** Description for Disable all recommendations for an app. */
  disableAllForHostingEnvironment: (
    resourceGroupName: string,
    environmentName: string,
    hostingEnvironmentName: string,
    options?: RecommendationsDisableAllForHostingEnvironmentOptionalParams,
  ) => Promise<void>;
  /** Description for Get all recommendations for a hosting environment. */
  listRecommendedRulesForHostingEnvironment: (
    resourceGroupName: string,
    hostingEnvironmentName: string,
    options?: RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams,
  ) => PagedAsyncIterableIterator<Recommendation>;
  /** Description for Get past recommendations for an app, optionally specified by the time range. */
  listHistoryForHostingEnvironment: (
    resourceGroupName: string,
    hostingEnvironmentName: string,
    options?: RecommendationsListHistoryForHostingEnvironmentOptionalParams,
  ) => PagedAsyncIterableIterator<Recommendation>;
  /** Description for Disables the specific rule for a web site permanently. */
  disableRecommendationForSite: (
    resourceGroupName: string,
    siteName: string,
    name: string,
    options?: RecommendationsDisableRecommendationForSiteOptionalParams,
  ) => Promise<void>;
  /** Description for Get a recommendation rule for an app. */
  getRuleDetailsByWebApp: (
    resourceGroupName: string,
    siteName: string,
    name: string,
    options?: RecommendationsGetRuleDetailsByWebAppOptionalParams,
  ) => Promise<RecommendationRule>;
}

function _getRecommendations(context: WebSiteManagementContext) {
  return {
    disableRecommendationForSubscription: (
      name: string,
      options?: RecommendationsDisableRecommendationForSubscriptionOptionalParams,
    ) => disableRecommendationForSubscription(context, name, options),
    resetAllFilters: (options?: RecommendationsResetAllFiltersOptionalParams) =>
      resetAllFilters(context, options),
    list: (options?: RecommendationsListOptionalParams) => list(context, options),
    resetAllFiltersForWebApp: (
      resourceGroupName: string,
      siteName: string,
      options?: RecommendationsResetAllFiltersForWebAppOptionalParams,
    ) => resetAllFiltersForWebApp(context, resourceGroupName, siteName, options),
    disableAllForWebApp: (
      resourceGroupName: string,
      siteName: string,
      options?: RecommendationsDisableAllForWebAppOptionalParams,
    ) => disableAllForWebApp(context, resourceGroupName, siteName, options),
    listRecommendedRulesForWebApp: (
      resourceGroupName: string,
      siteName: string,
      options?: RecommendationsListRecommendedRulesForWebAppOptionalParams,
    ) => listRecommendedRulesForWebApp(context, resourceGroupName, siteName, options),
    listHistoryForWebApp: (
      resourceGroupName: string,
      siteName: string,
      options?: RecommendationsListHistoryForWebAppOptionalParams,
    ) => listHistoryForWebApp(context, resourceGroupName, siteName, options),
    disableRecommendationForHostingEnvironment: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      hostingEnvironmentName: string,
      options?: RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams,
    ) =>
      disableRecommendationForHostingEnvironment(
        context,
        resourceGroupName,
        environmentName,
        name,
        hostingEnvironmentName,
        options,
      ),
    getRuleDetailsByHostingEnvironment: (
      resourceGroupName: string,
      hostingEnvironmentName: string,
      name: string,
      options?: RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams,
    ) =>
      getRuleDetailsByHostingEnvironment(
        context,
        resourceGroupName,
        hostingEnvironmentName,
        name,
        options,
      ),
    resetAllFiltersForHostingEnvironment: (
      resourceGroupName: string,
      environmentName: string,
      hostingEnvironmentName: string,
      options?: RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams,
    ) =>
      resetAllFiltersForHostingEnvironment(
        context,
        resourceGroupName,
        environmentName,
        hostingEnvironmentName,
        options,
      ),
    disableAllForHostingEnvironment: (
      resourceGroupName: string,
      environmentName: string,
      hostingEnvironmentName: string,
      options?: RecommendationsDisableAllForHostingEnvironmentOptionalParams,
    ) =>
      disableAllForHostingEnvironment(
        context,
        resourceGroupName,
        environmentName,
        hostingEnvironmentName,
        options,
      ),
    listRecommendedRulesForHostingEnvironment: (
      resourceGroupName: string,
      hostingEnvironmentName: string,
      options?: RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams,
    ) =>
      listRecommendedRulesForHostingEnvironment(
        context,
        resourceGroupName,
        hostingEnvironmentName,
        options,
      ),
    listHistoryForHostingEnvironment: (
      resourceGroupName: string,
      hostingEnvironmentName: string,
      options?: RecommendationsListHistoryForHostingEnvironmentOptionalParams,
    ) =>
      listHistoryForHostingEnvironment(context, resourceGroupName, hostingEnvironmentName, options),
    disableRecommendationForSite: (
      resourceGroupName: string,
      siteName: string,
      name: string,
      options?: RecommendationsDisableRecommendationForSiteOptionalParams,
    ) => disableRecommendationForSite(context, resourceGroupName, siteName, name, options),
    getRuleDetailsByWebApp: (
      resourceGroupName: string,
      siteName: string,
      name: string,
      options?: RecommendationsGetRuleDetailsByWebAppOptionalParams,
    ) => getRuleDetailsByWebApp(context, resourceGroupName, siteName, name, options),
  };
}

export function _getRecommendationsOperations(
  context: WebSiteManagementContext,
): RecommendationsOperations {
  return {
    ..._getRecommendations(context),
  };
}
