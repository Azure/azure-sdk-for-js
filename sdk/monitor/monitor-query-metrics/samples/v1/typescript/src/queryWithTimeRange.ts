// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to query metrics with custom time range and granularity
 */

import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient, Durations } from "@azure/monitor-query-metrics";
import "dotenv/config";

const resourceIds = process.env.METRICS_RESOURCE_IDS?.split(",") || [];
const metricsNamespace = process.env.METRICS_RESOURCE_NAMESPACE || "";
const endpoint = process.env.METRICS_ENDPOINT || "";

export async function main(): Promise<void> {
  if (resourceIds.length === 0) {
    throw new Error(
      "METRICS_RESOURCE_IDS must be set in the environment for this sample. " +
        "Provide comma-separated resource IDs.",
    );
  }

  if (!metricsNamespace) {
    throw new Error("METRICS_RESOURCE_NAMESPACE must be set in the environment for this sample.");
  }

  if (!endpoint) {
    throw new Error("METRICS_ENDPOINT must be set in the environment for this sample.");
  }

  const credential = new DefaultAzureCredential();
  const metricsClient = new MetricsClient(endpoint, credential);

  // Set up time range - last 2 hours
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

  console.log("Querying metrics with custom time range and granularity...");
  console.log(`Time range: ${startTime.toISOString()} to ${endTime.toISOString()}`);
  console.log(`Interval: ${Durations.fiveMinutes} (5 minutes)`);
  console.log(`Resources: ${resourceIds.length} resources`);

  const result = await metricsClient.queryResources(resourceIds, ["Heartbeat"], metricsNamespace, {
    aggregation: "Count",
    startTime: startTime,
    endTime: endTime,
    interval: Durations.fiveMinutes, // 5-minute intervals
  });

  console.log(`\nSuccessfully retrieved time-series metrics for ${result.length} resources:`);

  for (const resource of result) {
    console.log(`\n--- Resource: ${resource.resourceId} ---`);

    // Extract time range from timespan
    const timespan = resource.timespan;
    let timeRangeString = "Unknown timespan";
    if (typeof timespan === "object" && "startTime" in timespan && "endTime" in timespan) {
      timeRangeString = `${timespan.startTime.toISOString()} to ${timespan.endTime.toISOString()}`;
    }
    console.log(`Time range: ${timeRangeString}`);
    console.log(`Granularity: ${resource.granularity}`);
    console.log(`Namespace: ${resource.namespace}`);

    for (const metric of resource.metrics) {
      console.log(`\n  Metric: ${metric.name}`);
      console.log(`  Unit: ${metric.unit}`);
      console.log(`  Time series: ${metric.timeseries.length}`);

      for (const [index, series] of metric.timeseries.entries()) {
        console.log(`\n    Time Series ${index + 1}:`);
        if (series.metadatavalues) {
          console.log(`    Metadata: ${JSON.stringify(series.metadatavalues)}`);
        }

        if (series.data && series.data.length > 0) {
          console.log(`    Data points: ${series.data.length}`);
          console.log("    Sample values:");

          // Show first 3 and last 3 data points
          const samplePoints =
            series.data.length > 6
              ? [...series.data.slice(0, 3), ...series.data.slice(-3)]
              : series.data;

          for (const point of samplePoints) {
            const timestamp = new Date(point.timeStamp).toLocaleString();
            console.log(`      ${timestamp}: ${point.count} (${metric.unit})`);
          }

          if (series.data.length > 6) {
            console.log(`      ... (${series.data.length - 6} more data points)`);
          }
        } else {
          console.log("    No data points in this time range");
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
