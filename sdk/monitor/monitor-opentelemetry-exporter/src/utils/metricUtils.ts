// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics-base";
import { TelemetryItem as Envelope, MetricsData, MetricDataPoint } from "../generated";
import { createTagsFromResource } from "./resourceUtils";

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
    let baseData: MetricsData = {
      metrics: [],
      version: 2,
    };
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        var metricDataPoint: MetricDataPoint = {
          name: metric.descriptor.name,
          value: 0,
          dataPointType: "Aggregation",
        };
        if (metric.dataPointType == DataPointType.SINGULAR) {
          metricDataPoint.value = dataPoint.value as number;
          metricDataPoint.count = 1;
        } else {
          metricDataPoint.value = (dataPoint.value as Histogram).sum;
          metricDataPoint.count = (dataPoint.value as Histogram).count;
        }
        baseData.metrics.push(metricDataPoint);
      });
    });
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

  return envelopes;
}
