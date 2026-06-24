// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BenefitRecommendationsListOptionalParams extends OperationOptions {
  /** Can be used to filter benefitRecommendations by: properties/scope with allowed values ['Single', 'Shared'] and default value 'Shared'; and properties/lookBackPeriod with allowed values ['Last7Days', 'Last30Days', 'Last60Days'] and default value 'Last60Days'; properties/term with allowed values ['P1Y', 'P3Y'] and default value 'P3Y'; properties/subscriptionId; properties/resourceGroup */
  filter?: string;
  /** May be used to order the recommendations by: properties/armSkuName. For the savings plan, the results are in order by default. There is no need to use this clause. */
  orderby?: string;
  /** May be used to expand the properties by: properties/usage, properties/allRecommendationDetails */
  expand?: string;
}
