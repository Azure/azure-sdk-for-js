// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes } from "@opentelemetry/api";
import type {
  DataPoint,
  ExponentialHistogram,
  Histogram,
  ResourceMetrics,
} from "@opentelemetry/sdk-metrics";
import { DataPointType } from "@opentelemetry/sdk-metrics";
import type {
  TelemetryItem as Envelope,
  MetricsData,
  MetricDataPoint,
} from "../generated/index.js";
import { createTagsFromResource } from "./common.js";
import { BreezePerformanceCounterNames, OTelPerformanceCounterNames, Tags } from "../types.js";
import {
  ENV_OTEL_METRICS_EXPORTER,
  ENV_OTLP_METRICS_ENDPOINT,
  ENV_AZURE_MONITOR_AUTO_ATTACH,
  ENV_APPLICATIONINSIGHTS_METRICS_TO_LOGANALYTICS_ENABLED,
} from "../Declarations/Constants.js";
import { AttachTypeName, AZURE_MONITOR_AUTO_ATTACH } from "../export/statsbeat/types.js";
import { getInstance } from "../platform/index.js";

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
  let tags: Tags;
  let envelopeName: string;

  if (isStatsbeat) {
    envelopeName = "Microsoft.ApplicationInsights.Statsbeat";
    const context = getInstance();
    tags = { ...context.tags };
  } else {
    envelopeName = "Microsoft.ApplicationInsights.Metric";
    tags = createTagsFromResource(metrics.resource);
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

        // If we're not exporting statsbeat, the metric is *not* a standard metric and the env var is set to false, we should not send the metric.
        if (
          shouldSendToOtlp() &&
          isAksAttach() &&
          !isStandardMetric(dataPoint) &&
          process.env[ENV_APPLICATIONINSIGHTS_METRICS_TO_LOGANALYTICS_ENABLED] === "false" &&
          !isStatsbeat
        ) {
          return;
        }

        if (shouldSendToOtlp() && isAksAttach() && !isStatsbeat) {
          baseData.properties["_MS.SentToAMW"] = "True";
        } else if (isAksAttach() && !isStatsbeat) {
          baseData.properties["_MS.SentToAMW"] = "False";
        }
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

export function isAksAttach(): boolean {
  return !!(
    process.env[ENV_AZURE_MONITOR_AUTO_ATTACH] === "true" && process.env.AKS_ARM_NAMESPACE_ID
  );
}

export function shouldSendToOtlp(): boolean {
  return !!(
    process.env[ENV_OTLP_METRICS_ENDPOINT] &&
    process.env[ENV_OTEL_METRICS_EXPORTER]?.includes("otlp")
  );
}

export function isStandardMetric(
  dataPoint: DataPoint<number> | DataPoint<Histogram> | DataPoint<ExponentialHistogram>,
): boolean {
  return dataPoint.attributes?.["_MS.IsAutocollected"] === "True";
}

export function getAttachType(): AttachTypeName {
  if (process.env[AZURE_MONITOR_AUTO_ATTACH] === "true") {
    return AttachTypeName.INTEGRATED_AUTO;
  }
  return AttachTypeName.MANUAL;
}
