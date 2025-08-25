// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MetricsClient, Durations } from "@azure/monitor-query-metrics";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.com/";
    const metricsClient = new MetricsClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClientSovereign", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.cn/";
    const metricsClient = new MetricsClient(endpoint, credential, {
      audience: "https://monitor.azure.cn/.default",
    });
  });

  it("ReadmeSampleMetricsQueryMultipleResources", async () => {
    const resourceIds = [
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs2",
    ];
    const metricsNamespace = "Microsoft.OperationalInsights/workspaces";
    const metricNames = ["Heartbeat"];
    const endpoint = "https://westus3.metrics.monitor.azure.com";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const metricsClient = new MetricsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace, {
      aggregation: "Count",
    });
    // @ts-preserve-whitespace
    console.log(`Retrieved metrics for ${result.length} resources`);
    for (const resource of result) {
      console.log(`Resource: ${resource.resourceId}`);
      console.log(`Metrics: ${resource.metrics.length}`);
    }
  });

  it("ReadmeSampleMetricsTimeRange", async () => {
    const resourceIds = [
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
    ];
    const metricsNamespace = "Microsoft.OperationalInsights/workspaces";
    const metricNames = ["Heartbeat"];
    const endpoint = "https://westus3.metrics.monitor.azure.com";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const metricsClient = new MetricsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 60 * 60 * 1000); // 1 hour ago
    // @ts-preserve-whitespace
    const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace, {
      aggregation: "Count",
      startTime: startTime,
      endTime: endTime,
      interval: Durations.fiveMinutes, // 5-minute granularity
    });
    // @ts-preserve-whitespace
    console.log(`Query timespan: ${result[0].timespan}`);
    console.log(`Granularity: ${result[0].granularity}`);
  });

  it("ReadmeSampleMetricsAdvanced", async () => {
    const resourceIds = [
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
    ];
    const metricsNamespace = "Microsoft.OperationalInsights/workspaces";
    const metricNames = ["Heartbeat"];
    const endpoint = "https://westus3.metrics.monitor.azure.com";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const metricsClient = new MetricsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 60 * 60 * 1000); // 1 hour ago
    // @ts-preserve-whitespace
    const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace, {
      aggregation: "Count,Average", // Multiple aggregations
      startTime: startTime,
      endTime: endTime,
      interval: Durations.fiveMinutes,
      top: 10, // Limit results
      orderBy: "count desc", // Sort by count descending
      filter: "Computer eq '*'", // Filter criteria
    });
    // @ts-preserve-whitespace
    console.log(`Retrieved ${result.length} resources with advanced filtering`);
    for (const resource of result) {
      for (const metric of resource.metrics) {
        console.log(`Metric: ${metric.name}`);
        console.log(`Time series count: ${metric.timeseries.length}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
