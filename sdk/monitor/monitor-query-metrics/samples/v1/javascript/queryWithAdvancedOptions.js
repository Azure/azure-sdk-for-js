// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates advanced metrics querying with filtering, ordering, and rollup
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { MetricsClient, Durations } = require("@azure/monitor-query-metrics");
require("dotenv/config");

const resourceIds = process.env.METRICS_RESOURCE_IDS?.split(",") || [];
const metricsNamespace = process.env.METRICS_RESOURCE_NAMESPACE || "";
const endpoint = process.env.METRICS_ENDPOINT || "";

async function main() {
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

  // Set up time range - last 24 hours
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  console.log("Querying metrics with advanced parameters...");
  console.log(`Time range: ${startTime.toISOString()} to ${endTime.toISOString()}`);
  console.log(`Interval: ${Durations.oneHour} (1 hour)`);
  console.log(`Resources: ${resourceIds.length} resources`);
  console.log("Advanced options: Top 5 results, ordered by count descending");

  const result = await metricsClient.queryResources(resourceIds, ["Heartbeat"], metricsNamespace, {
    aggregation: "Count",
    startTime: startTime,
    endTime: endTime,
    interval: Durations.oneHour, // 1-hour intervals
    top: 5, // Limit to top 5 results
    orderBy: "Count desc", // Order by count descending
    filter: "Computer eq '*'", // Include all computers
  });

  console.log(`\nSuccessfully retrieved advanced metrics for ${result.length} resources:`);

  for (const resource of result) {
    console.log(`\n--- Resource: ${resource.resourceId} ---`);

    // Extract time range from timespan
    const timespan = resource.timespan;
    let timeRangeString = "Unknown timespan";
    if (typeof timespan === "object" && "startTime" in timespan && "endTime" in timespan) {
      timeRangeString = `${timespan.startTime.toISOString()} to ${timespan.endTime.toISOString()}`;
    }
    console.log(`Time range: ${timeRangeString}`);
    console.log(`Region: ${resource.resourceRegion}`);
    console.log(`Namespace: ${resource.namespace}`);
    console.log(`Granularity: ${resource.granularity}`);

    for (const metric of resource.metrics) {
      console.log(`\n  Metric: ${metric.name})`);
      console.log(`  Unit: ${metric.unit}`);
      console.log(`  Description: ${metric.description || "No description available"}`);
      console.log(`  Time series: ${metric.timeseries.length}`);

      // Calculate total values across all time series
      let totalDataPoints = 0;
      let totalValue = 0;

      for (const [index, series] of metric.timeseries.entries()) {
        console.log(`\n    Time Series ${index + 1}:`);

        if (series.metadatavalues && series.metadatavalues.length > 0) {
          console.log("    Metadata filters:");
          for (const metadata of series.metadatavalues) {
            console.log(`      ${metadata.name}: ${metadata.value}`);
          }
        }

        if (series.data && series.data.length > 0) {
          console.log(`    Data points: ${series.data.length}`);
          totalDataPoints += series.data.length;

          // Show aggregated statistics for this time series
          const values = series.data
            .map((d) => d.count || 0)
            .filter((v) => v !== null && v !== undefined);
          if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = sum / values.length;
            const max = Math.max(...values);
            const min = Math.min(...values);

            totalValue += sum;

            console.log(`    Statistics:`);
            console.log(`      Total: ${sum}`);
            console.log(`      Average: ${avg.toFixed(2)}`);
            console.log(`      Maximum: ${max}`);
            console.log(`      Minimum: ${min}`);
          }

          // Show first and last data points
          const firstPoint = series.data[0];
          const lastPoint = series.data[series.data.length - 1];
          console.log(
            `    First data point: ${firstPoint.count} at ${new Date(firstPoint.timeStamp).toLocaleString()}`,
          );
          console.log(
            `    Last data point: ${lastPoint.count} at ${new Date(lastPoint.timeStamp).toLocaleString()}`,
          );
        } else {
          console.log("    No data points in this time series");
        }
      }

      // Show overall metric summary
      if (totalDataPoints > 0) {
        console.log(`\n  Overall Metric Summary:`);
        console.log(`    Total data points across all series: ${totalDataPoints}`);
        console.log(`    Total metric value: ${totalValue}`);
        console.log(`    Average per data point: ${(totalValue / totalDataPoints).toFixed(2)}`);
      }
    }

    // Show cost information if available
    if (resource.cost !== undefined) {
      console.log(`\n  Query cost: ${resource.cost}`);
    }
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
