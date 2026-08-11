// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  LogMetricsGroupBy,
  WafAction,
  WafRankingGroupBy,
  WafRuleType,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams extends OperationOptions {
  actions?: WafAction[];
  ruleTypes?: WafRuleType[];
}

/** Optional parameters. */
export interface LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams extends OperationOptions {
  actions?: WafAction[];
  groupBy?: WafRankingGroupBy[];
  ruleTypes?: WafRuleType[];
}

/** Optional parameters. */
export interface LogAnalyticsGetLogAnalyticsResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogAnalyticsGetLogAnalyticsLocationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogAnalyticsGetLogAnalyticsRankingsOptionalParams extends OperationOptions {
  customDomains?: string[];
}

/** Optional parameters. */
export interface LogAnalyticsGetLogAnalyticsMetricsOptionalParams extends OperationOptions {
  groupBy?: LogMetricsGroupBy[];
  continents?: string[];
  countryOrRegions?: string[];
}
