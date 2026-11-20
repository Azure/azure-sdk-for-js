// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecommendationMetadataListOptionalParams extends OperationOptions {
  /** The filter to apply to the recommendation metadata.<br>Filter can be applied to properties ['[recommendationCategory](#category)', '[recommendationSubCategory](#recommendationSubCategory)', 'RetirementDate'] with operators ['eq', 'and', 'le', 'ge']<br>The filter can also be applied to property ['[TrackingIds]']<br><br>⚠ **Note:** `recommendationControl` is a legacy filter property and will be deprecated in the future. Please use `recommendationSubCategory` for filtering recommendation subcategory.<br><br>Valid options for recommendationSubCategory: ['BusinessContinuity', 'DisasterRecovery', 'HighAvailability', 'MonitoringAndAlerting', 'Other', 'Personalized', 'PrioritizedRecommendations', 'Scalability', 'ServiceUpgradeAndRetirement', 'Validation']<br><br>Example:<br>- $filter=recommendationCategory eq 'HighAvailability' and recommendationSubCategory eq 'ServiceUpgradeAndRetirement' and retirementDate ge '2024-01-01' and retirementDate le '2028-01-01'. Filter can be applied on trackingIds as well.<br>- $filter=trackingIds/any(t: t eq 'some-guid')<br><br>⚠ **Note:** `trackingIDs` filter can be used for filtering one value at a time. The support to filter multiple values is not currently available. Also the support to add other filters along with `trackingIDs` is not available. */
  filter?: string;
}

/** Optional parameters. */
export interface RecommendationMetadataGetOptionalParams extends OperationOptions {}
