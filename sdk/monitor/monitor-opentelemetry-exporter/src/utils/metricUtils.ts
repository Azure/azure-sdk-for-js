// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetricAttributes } from "@opentelemetry/api-metrics";
import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { TelemetryItem as Envelope, MetricsData, MetricDataPoint } from "../generated";
import { createTagsFromResource } from "./resourceUtils";

function createPropertiesFromMetricAttributes(attributes?: MetricAttributes): {
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
export function resourceMetricsToEnvelope(metrics: ResourceMetrics, ikey: string): Envelope[] {
  let envelopes: Envelope[] = [];
  const time = new Date();
  const instrumentationKey = ikey;
  const tags = createTagsFromResource(metrics.resource);

  metrics.scopeMetrics.forEach((scopeMetric) => {
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        let baseData: MetricsData = {
          metrics: [],
          version: 2,
          properties: {},
        };
        baseData.properties = createPropertiesFromMetricAttributes(dataPoint.attributes);
        var metricDataPoint: MetricDataPoint = {
          name: metric.descriptor.name,
          value: 0,
          dataPointType: "Aggregation",
        };
        if (
          metric.dataPointType == DataPointType.SUM ||
          metric.dataPointType == DataPointType.GAUGE
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
        let envelope: Envelope = {
          name: "Microsoft.ApplicationInsights.Metric",
          time: time,
          sampleRate: 100,
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
