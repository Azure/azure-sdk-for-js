// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";
import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics-base";
import {
  SemanticResourceAttributes,
  SemanticAttributes,
} from "@opentelemetry/semantic-conventions";
import { Tags } from "../types";
import { getInstance } from "../platform";
import {
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  MetricsData,
  MetricDataPoint,
} from "../generated";
import { Resource } from "@opentelemetry/resources";

function createTagsFromResource(resource: Resource): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };
  if (resource && resource.attributes) {
    const serviceName = resource.attributes[SemanticResourceAttributes.SERVICE_NAME];
    const serviceNamespace = resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        tags[KnownContextTagKeys.AiCloudRole] = `${serviceNamespace}.${serviceName}`;
      } else {
        tags[KnownContextTagKeys.AiCloudRole] = String(serviceName);
      }
    }
    const serviceInstanceId = resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
    if (serviceInstanceId) {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = String(serviceInstanceId);
    } else {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = os && os.hostname();
    }
    const endUserId = resource.attributes[SemanticAttributes.ENDUSER_ID];
    if (endUserId) {
      tags[KnownContextTagKeys.AiUserId] = String(endUserId);
    }
  }
  return tags;
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
