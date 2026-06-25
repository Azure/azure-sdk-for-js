// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecommendationsGetGenerateStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsGenerateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsListByTenantOptionalParams extends OperationOptions {
  /** The filter to apply to the recommendations.<br>Filter can be applied to properties ['ResourceId', 'ResourceGroup', 'RecommendationTypeGuid', '[Category](#category)'] with operators ['eq', 'and', 'or'].<br>Example:<br>- $filter=Category eq 'Cost' and ResourceGroup eq 'MyResourceGroup' */
  filter?: string;
  /** The number of recommendations per page if a paged version of this API is being used. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
}

/** Optional parameters. */
export interface RecommendationsListOptionalParams extends OperationOptions {
  /**
   * The filter to apply to the recommendations.<br>Filter can be applied to properties ['ResourceId', 'ResourceGroup', 'RecommendationTypeGuid', '[Category](#category)', 'SubCategory', 'RetirementDate', '[RecommendationStatus](#recommendationStatus)'] with operators ['eq', 'and', 'or', 'lt', 'gt', 'le', 'ge']<br>.
   * <br>**Note:** `Control` is a legacy filter property and will be deprecated in the future. Please use `SubCategory` for filtering recommendation subcategory.<br>
   * <br>**Note:** `RecommendationStatus` filter is available from API Version 2026-02-01-preview and onwards.<br>
   * <br>Valid options for SubCategory:<br>['BusinessContinuity', 'DisasterRecovery', 'HighAvailability', 'MonitoringAndAlerting', 'Other', 'Personalized', 'PrioritizedRecommendations', 'Scalability', 'ServiceUpgradeAndRetirement', 'Validation']<br>
   * <br>Example:<br>- $filter=Category eq 'Cost' and ResourceGroup eq 'MyResourceGroup'<br>-$filter=SubCategory eq 'ServiceUpgradeAndRetirement' and RetirementDate le '2024-01-01' and RetirementDate ge '2028-01-01'
   */
  filter?: string;
  /** The number of recommendations per page if a paged version of this API is being used. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
}

/** Optional parameters. */
export interface RecommendationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecommendationsGetOptionalParams extends OperationOptions {}
