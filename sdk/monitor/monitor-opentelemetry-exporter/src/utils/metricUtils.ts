// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Attributes } from "@opentelemetry/api";
import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { TelemetryItem as Envelope, MetricsData, MetricDataPoint } from "../generated";
import { createTagsFromResource } from "./common";
import { BreezePerformanceCounterNames, OTelPerformanceCounterNames } from "../types";

const breezePerformanceCountersMap = new Map<string, string>([
  [OTelPerformanceCounterNames.PRIVATE_BYTES, BreezePerformanceCounterNames.PRIVATE_BYTES],
  [OTelPerformanceCounterNames.AVAILABLE_BYTES, BreezePerformanceCounterNames.AVAILABLE_BYTES],
  [OTelPerformanceCounterNames.PROCESSOR_TIME, BreezePerformanceCounterNames.PROCESSOR_TIME],
  [OTelPerformanceCounterNames.PROCESS_TIME, BreezePerformanceCounterNames.PROCESS_TIME],
  [OTelPerformanceCounterNames.REQUEST_RATE, BreezePerformanceCounterNames.REQUEST_RATE],
  [OTelPerformanceCounterNames.REQUEST_DURATION, BreezePerformanceCounterNames.REQUEST_DURATION],
]);

function createPropertiesFromMetricAttributes(attributes?: Attributes): {
  [propertyName: string]: string;
} {
  const properties: { [propertyName: string]: string } = {};
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      properties[key] = attributes[key] as string;
    }
  }
  return properties;
}

/**
 * Metric to Azure envelope parsing.
 * @internal
 */
export function resourceMetricsToEnvelope(
  metrics: ResourceMetrics,
  ikey: string,
  isStatsbeat?: boolean,
): Envelope[] {
  const envelopes: Envelope[] = [];
  const time = new Date();
  const instrumentationKey = ikey;
  const tags = createTagsFromResource(metrics.resource);
  let envelopeName: string;

  if (isStatsbeat) {
    envelopeName = "Microsoft.ApplicationInsights.Statsbeat";
  } else {
    envelopeName = "Microsoft.ApplicationInsights.Metric";
  }

  metrics.scopeMetrics.forEach((scopeMetric) => {
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        const baseData: MetricsData = {
          metrics: [],
          version: 2,
          properties: {},
        };
        baseData.properties = createPropertiesFromMetricAttributes(dataPoint.attributes);
        let perfCounterName;
        if (breezePerformanceCountersMap.has(metric.descriptor.name)) {
          perfCounterName = breezePerformanceCountersMap.get(metric.descriptor.name);
        }
        const metricDataPoint: MetricDataPoint = {
          name: perfCounterName ? perfCounterName : metric.descriptor.name,
          value: 0,
          dataPointType: "Aggregation",
        };
        if (
          metric.dataPointType === DataPointType.SUM ||
          metric.dataPointType === DataPointType.GAUGE
        ) {
          metricDataPoint.value = dataPoint.value as number;
          metricDataPoint.count = 1;
        } else {
          metricDataPoint.value = (dataPoint.value as Histogram).sum || 0;
          metricDataPoint.count = (dataPoint.value as Histogram).count;
          metricDataPoint.max = (dataPoint.value as Histogram).max;
          metricDataPoint.min = (dataPoint.value as Histogram).min;
        }
        baseData.metrics.push(metricDataPoint);
        const envelope: Envelope = {
          name: envelopeName,
          time: time,
          sampleRate: 100, // Metrics are never sampled
          instrumentationKey: instrumentationKey,
          tags: tags,
          version: 1,
          data: {
            baseType: "MetricData",
            baseData: {
              ...baseData,
            },
          },
        };
        envelopes.push(envelope);
      });
    });
  });

  return envelopes;
}
