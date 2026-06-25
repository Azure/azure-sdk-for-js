// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecommendationsDisableRecommendationForSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsResetAllFiltersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsListOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationsResetAllFiltersForWebAppOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsDisableAllForWebAppOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsListRecommendedRulesForWebAppOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Return only channels specified in the filter. Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationsListHistoryForWebAppOptionalParams extends OperationOptions {
  /** Specify <code>false</code> to return all recommendations. The default is <code>true</code>, which returns only expired recommendations. */
  expiredOnly?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to update the last-seen timestamp of the recommendation object. */
  updateSeen?: boolean;
  /** The GUID of the recommendation object if you query an expired one. You don't need to specify it to query an active entry. */
  recommendationId?: string;
}

/** Optional parameters. */
export interface RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsDisableAllForHostingEnvironmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations. */
  featured?: boolean;
  /** Return only channels specified in the filter. Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationsListHistoryForHostingEnvironmentOptionalParams extends OperationOptions {
  /** Specify <code>false</code> to return all recommendations. The default is <code>true</code>, which returns only expired recommendations. */
  expiredOnly?: boolean;
  /** Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D] */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationsDisableRecommendationForSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsGetRuleDetailsByWebAppOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to update the last-seen timestamp of the recommendation object. */
  updateSeen?: boolean;
  /** The GUID of the recommendation object if you query an expired one. You don't need to specify it to query an active entry. */
  recommendationId?: string;
}
