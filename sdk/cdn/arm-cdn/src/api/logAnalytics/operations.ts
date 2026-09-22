// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
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
import {
  errorResponseDeserializer,
  metricsResponseDeserializer,
  rankingsResponseDeserializer,
  continentsResponseDeserializer,
  resourcesResponseDeserializer,
  wafMetricsResponseDeserializer,
  wafRankingsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams,
  LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams,
  LogAnalyticsGetLogAnalyticsResourcesOptionalParams,
  LogAnalyticsGetLogAnalyticsLocationsOptionalParams,
  LogAnalyticsGetLogAnalyticsRankingsOptionalParams,
  LogAnalyticsGetLogAnalyticsMetricsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getWafLogAnalyticsRankingsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: WafMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  maxRanking: number,
  rankings: WafRankingType[],
  options: LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getWafLogAnalyticsRankings{?api%2Dversion,metrics*,dateTimeBegin,dateTimeEnd,maxRanking,rankings*,actions*,ruleTypes*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      metrics: metrics.map((p: any) => {
        return p;
      }),
      dateTimeBegin: dateTimeBegin.toISOString(),
      dateTimeEnd: dateTimeEnd.toISOString(),
      maxRanking: maxRanking,
      rankings: rankings.map((p: any) => {
        return p;
      }),
      actions: !options?.actions
        ? options?.actions
        : options?.actions.map((p: any) => {
            return p;
          }),
      ruleTypes: !options?.ruleTypes
        ? options?.ruleTypes
        : options?.ruleTypes.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getWafLogAnalyticsRankingsDeserialize(
  result: PathUncheckedResponse,
): Promise<WafRankingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return wafRankingsResponseDeserializer(result.body);
}

/** Get WAF log analytics charts for AFD profile */
export async function getWafLogAnalyticsRankings(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: WafMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  maxRanking: number,
  rankings: WafRankingType[],
  options: LogAnalyticsGetWafLogAnalyticsRankingsOptionalParams = { requestOptions: {} },
): Promise<WafRankingsResponse> {
  const result = await _getWafLogAnalyticsRankingsSend(
    context,
    resourceGroupName,
    profileName,
    metrics,
    dateTimeBegin,
    dateTimeEnd,
    maxRanking,
    rankings,
    options,
  );
  return _getWafLogAnalyticsRankingsDeserialize(result);
}

export function _getWafLogAnalyticsMetricsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: WafMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  granularity: WafGranularity,
  options: LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getWafLogAnalyticsMetrics{?api%2Dversion,metrics*,dateTimeBegin,dateTimeEnd,granularity,actions*,groupBy*,ruleTypes*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      metrics: metrics.map((p: any) => {
        return p;
      }),
      dateTimeBegin: dateTimeBegin.toISOString(),
      dateTimeEnd: dateTimeEnd.toISOString(),
      granularity: granularity,
      actions: !options?.actions
        ? options?.actions
        : options?.actions.map((p: any) => {
            return p;
          }),
      groupBy: !options?.groupBy
        ? options?.groupBy
        : options?.groupBy.map((p: any) => {
            return p;
          }),
      ruleTypes: !options?.ruleTypes
        ? options?.ruleTypes
        : options?.ruleTypes.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getWafLogAnalyticsMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<WafMetricsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return wafMetricsResponseDeserializer(result.body);
}

/** Get Waf related log analytics report for AFD profile. */
export async function getWafLogAnalyticsMetrics(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: WafMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  granularity: WafGranularity,
  options: LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams = { requestOptions: {} },
): Promise<WafMetricsResponse> {
  const result = await _getWafLogAnalyticsMetricsSend(
    context,
    resourceGroupName,
    profileName,
    metrics,
    dateTimeBegin,
    dateTimeEnd,
    granularity,
    options,
  );
  return _getWafLogAnalyticsMetricsDeserialize(result);
}

export function _getLogAnalyticsResourcesSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: LogAnalyticsGetLogAnalyticsResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLogAnalyticsResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourcesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourcesResponseDeserializer(result.body);
}

/** Get all endpoints and custom domains available for AFD log report */
export async function getLogAnalyticsResources(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: LogAnalyticsGetLogAnalyticsResourcesOptionalParams = { requestOptions: {} },
): Promise<ResourcesResponse> {
  const result = await _getLogAnalyticsResourcesSend(
    context,
    resourceGroupName,
    profileName,
    options,
  );
  return _getLogAnalyticsResourcesDeserialize(result);
}

export function _getLogAnalyticsLocationsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: LogAnalyticsGetLogAnalyticsLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLogAnalyticsLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ContinentsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return continentsResponseDeserializer(result.body);
}

/** Get all available location names for AFD log analytics report. */
export async function getLogAnalyticsLocations(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: LogAnalyticsGetLogAnalyticsLocationsOptionalParams = { requestOptions: {} },
): Promise<ContinentsResponse> {
  const result = await _getLogAnalyticsLocationsSend(
    context,
    resourceGroupName,
    profileName,
    options,
  );
  return _getLogAnalyticsLocationsDeserialize(result);
}

export function _getLogAnalyticsRankingsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  rankings: LogRanking[],
  metrics: LogRankingMetric[],
  maxRanking: number,
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  options: LogAnalyticsGetLogAnalyticsRankingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsRankings{?api%2Dversion,rankings*,metrics*,maxRanking,dateTimeBegin,dateTimeEnd,customDomains*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      rankings: rankings.map((p: any) => {
        return p;
      }),
      metrics: metrics.map((p: any) => {
        return p;
      }),
      maxRanking: maxRanking,
      dateTimeBegin: dateTimeBegin.toISOString(),
      dateTimeEnd: dateTimeEnd.toISOString(),
      customDomains: !options?.customDomains
        ? options?.customDomains
        : options?.customDomains.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLogAnalyticsRankingsDeserialize(
  result: PathUncheckedResponse,
): Promise<RankingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return rankingsResponseDeserializer(result.body);
}

/** Get log analytics ranking report for AFD profile */
export async function getLogAnalyticsRankings(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  rankings: LogRanking[],
  metrics: LogRankingMetric[],
  maxRanking: number,
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  options: LogAnalyticsGetLogAnalyticsRankingsOptionalParams = { requestOptions: {} },
): Promise<RankingsResponse> {
  const result = await _getLogAnalyticsRankingsSend(
    context,
    resourceGroupName,
    profileName,
    rankings,
    metrics,
    maxRanking,
    dateTimeBegin,
    dateTimeEnd,
    options,
  );
  return _getLogAnalyticsRankingsDeserialize(result);
}

export function _getLogAnalyticsMetricsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: LogMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  granularity: LogMetricsGranularity,
  customDomains: string[],
  protocols: string[],
  options: LogAnalyticsGetLogAnalyticsMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsMetrics{?api%2Dversion,metrics*,dateTimeBegin,dateTimeEnd,granularity,groupBy*,continents*,countryOrRegions*,customDomains*,protocols*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      metrics: metrics.map((p: any) => {
        return p;
      }),
      dateTimeBegin: dateTimeBegin.toISOString(),
      dateTimeEnd: dateTimeEnd.toISOString(),
      granularity: granularity,
      groupBy: !options?.groupBy
        ? options?.groupBy
        : options?.groupBy.map((p: any) => {
            return p;
          }),
      continents: !options?.continents
        ? options?.continents
        : options?.continents.map((p: any) => {
            return p;
          }),
      countryOrRegions: !options?.countryOrRegions
        ? options?.countryOrRegions
        : options?.countryOrRegions.map((p: any) => {
            return p;
          }),
      customDomains: customDomains.map((p: any) => {
        return p;
      }),
      protocols: protocols.map((p: any) => {
        return p;
      }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLogAnalyticsMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricsResponseDeserializer(result.body);
}

/** Get log report for AFD profile */
export async function getLogAnalyticsMetrics(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  metrics: LogMetric[],
  dateTimeBegin: Date,
  dateTimeEnd: Date,
  granularity: LogMetricsGranularity,
  customDomains: string[],
  protocols: string[],
  options: LogAnalyticsGetLogAnalyticsMetricsOptionalParams = { requestOptions: {} },
): Promise<MetricsResponse> {
  const result = await _getLogAnalyticsMetricsSend(
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
  );
  return _getLogAnalyticsMetricsDeserialize(result);
}
