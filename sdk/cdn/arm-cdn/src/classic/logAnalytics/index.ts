// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  getWafLogAnalyticsRankings,
  getWafLogAnalyticsMetrics,
  getLogAnalyticsResources,
  getLogAnalyticsLocations,
  getLogAnalyticsRankings,
  getLogAnalyticsMetrics,
} from "../../api/logAnalytics/operations.js";
import type {
  LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams,
  LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams,
  LogAnalyticsGetLogAnalyticsResourcesOptionalParams,
  LogAnalyticsGetLogAnalyticsLocationsOptionalParams,
  LogAnalyticsGetLogAnalyticsRankingsOptionalParams,
  LogAnalyticsGetLogAnalyticsMetricsOptionalParams,
} from "../../api/logAnalytics/options.js";
import type {
  MetricsResponse,
  RankingsResponse,
  ContinentsResponse,
  ResourcesResponse,
  WafMetricsResponse,
  WafRankingsResponse,
  LogMetric,
  LogMetricsGranularity,
  LogRanking,
  LogRankingMetric,
  WafMetric,
  WafGranularity,
  WafRankingType,
} from "../../models/models.js";

/** Interface representing a LogAnalytics operations. */
export interface LogAnalyticsOperations {
  /** Get WAF log analytics charts for AFD profile */
  getWafLogAnalyticsRankings: (
    resourceGroupName: string,
    profileName: string,
    metrics: WafMetric[],
    dateTimeBegin: Date,
    dateTimeEnd: Date,
    maxRanking: number,
    rankings: WafRankingType[],
    options?: LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams,
  ) => Promise<WafRankingsResponse>;
  /** Get Waf related log analytics report for AFD profile. */
  getWafLogAnalyticsMetrics: (
    resourceGroupName: string,
    profileName: string,
    metrics: WafMetric[],
    dateTimeBegin: Date,
    dateTimeEnd: Date,
    granularity: WafGranularity,
    options?: LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams,
  ) => Promise<WafMetricsResponse>;
  /** Get all endpoints and custom domains available for AFD log report */
  getLogAnalyticsResources: (
    resourceGroupName: string,
    profileName: string,
    options?: LogAnalyticsGetLogAnalyticsResourcesOptionalParams,
  ) => Promise<ResourcesResponse>;
  /** Get all available location names for AFD log analytics report. */
  getLogAnalyticsLocations: (
    resourceGroupName: string,
    profileName: string,
    options?: LogAnalyticsGetLogAnalyticsLocationsOptionalParams,
  ) => Promise<ContinentsResponse>;
  /** Get log analytics ranking report for AFD profile */
  getLogAnalyticsRankings: (
    resourceGroupName: string,
    profileName: string,
    rankings: LogRanking[],
    metrics: LogRankingMetric[],
    maxRanking: number,
    dateTimeBegin: Date,
    dateTimeEnd: Date,
    options?: LogAnalyticsGetLogAnalyticsRankingsOptionalParams,
  ) => Promise<RankingsResponse>;
  /** Get log report for AFD profile */
  getLogAnalyticsMetrics: (
    resourceGroupName: string,
    profileName: string,
    metrics: LogMetric[],
    dateTimeBegin: Date,
    dateTimeEnd: Date,
    granularity: LogMetricsGranularity,
    customDomains: string[],
    protocols: string[],
    options?: LogAnalyticsGetLogAnalyticsMetricsOptionalParams,
  ) => Promise<MetricsResponse>;
}

function _getLogAnalytics(context: CdnManagementContext) {
  return {
    getWafLogAnalyticsRankings: (
      resourceGroupName: string,
      profileName: string,
      metrics: WafMetric[],
      dateTimeBegin: Date,
      dateTimeEnd: Date,
      maxRanking: number,
      rankings: WafRankingType[],
      options?: LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams,
    ) =>
      getWafLogAnalyticsRankings(
        context,
        resourceGroupName,
        profileName,
        metrics,
        dateTimeBegin,
        dateTimeEnd,
        maxRanking,
        rankings,
        options,
      ),
    getWafLogAnalyticsMetrics: (
      resourceGroupName: string,
      profileName: string,
      metrics: WafMetric[],
      dateTimeBegin: Date,
      dateTimeEnd: Date,
      granularity: WafGranularity,
      options?: LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams,
    ) =>
      getWafLogAnalyticsMetrics(
        context,
        resourceGroupName,
        profileName,
        metrics,
        dateTimeBegin,
        dateTimeEnd,
        granularity,
        options,
      ),
    getLogAnalyticsResources: (
      resourceGroupName: string,
      profileName: string,
      options?: LogAnalyticsGetLogAnalyticsResourcesOptionalParams,
    ) => getLogAnalyticsResources(context, resourceGroupName, profileName, options),
    getLogAnalyticsLocations: (
      resourceGroupName: string,
      profileName: string,
      options?: LogAnalyticsGetLogAnalyticsLocationsOptionalParams,
    ) => getLogAnalyticsLocations(context, resourceGroupName, profileName, options),
    getLogAnalyticsRankings: (
      resourceGroupName: string,
      profileName: string,
      rankings: LogRanking[],
      metrics: LogRankingMetric[],
      maxRanking: number,
      dateTimeBegin: Date,
      dateTimeEnd: Date,
      options?: LogAnalyticsGetLogAnalyticsRankingsOptionalParams,
    ) =>
      getLogAnalyticsRankings(
        context,
        resourceGroupName,
        profileName,
        rankings,
        metrics,
        maxRanking,
        dateTimeBegin,
        dateTimeEnd,
        options,
      ),
    getLogAnalyticsMetrics: (
      resourceGroupName: string,
      profileName: string,
      metrics: LogMetric[],
      dateTimeBegin: Date,
      dateTimeEnd: Date,
      granularity: LogMetricsGranularity,
      customDomains: string[],
      protocols: string[],
      options?: LogAnalyticsGetLogAnalyticsMetricsOptionalParams,
    ) =>
      getLogAnalyticsMetrics(
        context,
        resourceGroupName,
        profileName,
        metrics,
        dateTimeBegin,
        dateTimeEnd,
        granularity,
        customDomains,
        protocols,
        options,
      ),
  };
}

export function _getLogAnalyticsOperations(context: CdnManagementContext): LogAnalyticsOperations {
  return {
    ..._getLogAnalytics(context),
  };
}
