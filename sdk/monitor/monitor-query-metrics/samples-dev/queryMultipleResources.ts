// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to query metrics for multiple Azure resources
 */

import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient, Durations } from "@azure/monitor-query-metrics";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["METRICS_ENDPOINT"] || "<metrics endpoint>";
  const credential = new DefaultAzureCredential();
  const metricsClient = new MetricsClient(endpoint, credential);

  // Get multiple resource IDs from environment variables
  const resourceIdsString = process.env["METRICS_RESOURCE_IDS"];
  if (!resourceIdsString) {
    throw new Error("METRICS_RESOURCE_IDS environment variable is not set");
  }

  const resourceIds = resourceIdsString.split(",").map((id) => id.trim());
  const metricNamespace =
    process.env["METRICS_RESOURCE_NAMESPACE"] || "Microsoft.Storage/storageAccounts";

  console.log(`Querying metrics for ${resourceIds.length} resources...`);

  const response = await metricsClient.queryResources(
    resourceIds,
    ["Transactions", "UsedCapacity"], // Query multiple metrics
    metricNamespace,
    {
      aggregation: "Total",
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      endTime: new Date(),
      interval: Durations.fiveMinutes,
    },
  );

  console.log(`Query completed. Processing results for ${response.length} resources...`);

  for (let i = 0; i < response.length; i++) {
    const metricsQueryResult = response[i];
    const resourceId = resourceIds[i];

    console.log(`\n--- Resource: ${resourceId} ---`);
    console.log(`Namespace: ${metricsQueryResult.namespace}`);
    console.log(`Time span: ${metricsQueryResult.timespan}`);
    console.log(`Granularity: ${metricsQueryResult.granularity}`);

    if (metricsQueryResult.cost !== undefined) {
      console.log(`Cost: ${metricsQueryResult.cost}`);
    }

    for (const metric of metricsQueryResult.metrics) {
      console.log(`\n  Metric: ${metric.name}`);
      console.log(`  Unit: ${metric.unit}`);
      console.log(`  Time series count: ${metric.timeseries.length}`);

      for (const timeSeries of metric.timeseries) {
        console.log(`\n    Time Series:`);

        if (timeSeries.metadatavalues && timeSeries.metadatavalues.length > 0) {
          console.log(`    Metadata:`);
          for (const metadata of timeSeries.metadatavalues) {
            console.log(`      ${metadata.name}: ${metadata.value}`);
          }
        }

        if (timeSeries.data && timeSeries.data.length > 0) {
          console.log(`    Data points: ${timeSeries.data.length}`);

          // Show first few data points as examples
          const sampleCount = Math.min(3, timeSeries.data.length);
          for (let j = 0; j < sampleCount; j++) {
            const dataPoint = timeSeries.data[j];
            console.log(`      [${dataPoint.timeStamp}]:`);

            if (dataPoint.total !== undefined) {
              console.log(`        Total: ${dataPoint.total}`);
            }
            if (dataPoint.average !== undefined) {
              console.log(`        Average: ${dataPoint.average}`);
            }
            if (dataPoint.count !== undefined) {
              console.log(`        Count: ${dataPoint.count}`);
            }
            if (dataPoint.maximum !== undefined) {
              console.log(`        Maximum: ${dataPoint.maximum}`);
            }
            if (dataPoint.minimum !== undefined) {
              console.log(`        Minimum: ${dataPoint.minimum}`);
            }
          }

          if (timeSeries.data.length > sampleCount) {
            console.log(`      ... and ${timeSeries.data.length - sampleCount} more data points`);
          }
        } else {
          console.log(`    No data points available`);
        }
      }
    }
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
  process.exit(1);
});
