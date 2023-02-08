// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Attributes } from "@opentelemetry/api";
import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import {
  TelemetryItem as Envelope,
  MetricsData,
  MetricDataPoint,
  KnownContextTagKeys,
} from "../generated";
import { Tags } from "../types";
import {
  PreAggregatedMetricPropertyNames,
  StandardMetricIds,
  StandardMetrics,
} from "./constants/applicationinsights";
import { createTagsFromResource, getDependencyTarget } from "./common";

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
  isStatsbeat?: boolean
): Envelope[] {
  let envelopes: Envelope[] = [];
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
      const isStandardMetric = metric.descriptor?.name?.startsWith("azureMonitor.");
      metric.dataPoints.forEach((dataPoint) => {
        let baseData: MetricsData = {
          metrics: [],
          version: 2,
          properties: {},
        };
        if (isStandardMetric) {
          baseData.properties = createStandardMetricsProperties(
            metric.descriptor.name,
            dataPoint.attributes,
            tags
          );
        } else {
          baseData.properties = createPropertiesFromMetricAttributes(dataPoint.attributes);
        }
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

function createStandardMetricsProperties(
  name: string,
  attributes: Attributes,
  tags: Tags
): {
  [propertyName: string]: string;
} {
  const properties: { [propertyName: string]: string } = {};
  properties[PreAggregatedMetricPropertyNames.IsAutocollected] = "True";
  properties[PreAggregatedMetricPropertyNames.cloudRoleInstance] =
    tags[KnownContextTagKeys.AiCloudRoleInstance];
  properties[PreAggregatedMetricPropertyNames.cloudRoleName] =
    tags[KnownContextTagKeys.AiCloudRole];

  if (name == StandardMetrics.HTTP_REQUEST_DURATION) {
    properties[PreAggregatedMetricPropertyNames.metricId] = StandardMetricIds.REQUEST_DURATION;
    let statusCode = String(attributes["http.status_code"]);
    properties[PreAggregatedMetricPropertyNames.requestResultCode] = statusCode;
    properties[PreAggregatedMetricPropertyNames.requestSuccess] =
      statusCode == "200" ? "True" : "False";
  } else if (name == StandardMetrics.HTTP_DEPENDENCY_DURATION) {
    properties[PreAggregatedMetricPropertyNames.metricId] = StandardMetricIds.DEPENDENCY_DURATION;
    let statusCode = String(attributes["http.status_code"]);
    properties[PreAggregatedMetricPropertyNames.dependencyTarget] = getDependencyTarget(attributes);
    properties[PreAggregatedMetricPropertyNames.dependencyResultCode] = statusCode;
    properties[PreAggregatedMetricPropertyNames.dependencyType] = "http";
    properties[PreAggregatedMetricPropertyNames.dependencySuccess] =
      statusCode == "200" ? "True" : "False";
  } else if (name == StandardMetrics.TRACE_COUNT) {
    properties[PreAggregatedMetricPropertyNames.metricId] = StandardMetricIds.TRACE_COUNT;
  } else if (name == StandardMetrics.EXCEPTION_COUNT) {
    properties[PreAggregatedMetricPropertyNames.metricId] = StandardMetricIds.EXCEPTION_COUNT;
  }

  return properties;
}
