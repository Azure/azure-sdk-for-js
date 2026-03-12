// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryResourcesOptionalParams } from "./api/options.js";
import type {
  MetricsQueryResourcesOptions,
  MetricsQueryResult,
  QueryTimeInterval,
} from "./models.js";
import type { Metric, MetricResultsResponseValuesItem } from "./models/models.js";

export const getSubscriptionFromResourceId = function (resourceId: string): string {
  const startPos: number = resourceId.indexOf("subscriptions/") + 14;
  const subscriptionId: string = resourceId.substring(startPos, resourceId.indexOf("/", startPos));
  return subscriptionId;
};

/**
 * Helper function to convert Date objects to ISO string format
 */
function dateToISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Helper function to convert MetricsQueryResourcesOptions to the internal format
 */
export function mapToInternalQueryOptions(
  options: MetricsQueryResourcesOptions = {},
): QueryResourcesOptionalParams {
  if (!options) {
    return {};
  }
  return {
    ...options,
    startTime: options.startTime ? dateToISOString(options.startTime) : undefined,
    endTime: options.endTime ? dateToISOString(options.endTime) : undefined,
  };
}

/**
 * Helper function to reconstruct QueryTimeInterval from start/end times
 */
function reconstructTimeInterval(startTime: string, endTime: string): QueryTimeInterval {
  return {
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  };
}

/**
 * Helper function to create MetricsQueryResult from MetricResultsResponseValuesItem
 */
export function createMetricsQueryResult(
  item: MetricResultsResponseValuesItem,
): MetricsQueryResult {
  const timespan = reconstructTimeInterval(item.startTime, item.endTime);

  return {
    cost: undefined, // Not available in the new API
    granularity: item.interval,
    metrics: item.metrics,
    namespace: item.namespace,
    resourceId: item.resourceId,
    resourceRegion: item.resourceRegion,
    timespan,
    getMetricByName(metricName: string): Metric | undefined {
      return this.metrics.find((metric) => metric.name === metricName);
    },
  };
}
