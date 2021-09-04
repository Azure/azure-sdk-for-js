// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to query metrics using the MetricsClient.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { Durations, MetricsQueryClient } = require("@azure/monitor-query");
const dotenv = require("dotenv");

dotenv.config();

const metricsResourceId = process.env.METRICS_RESOURCE_ID;

async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!metricsResourceId) {
    throw new Error("METRICS_RESOURCE_ID must be set in the environment for this sample");
  }

  const iterator = metricsQueryClient.listMetricDefinitions(metricsResourceId);
  let result = await iterator.next();
  const firstMetric = result.value;
  let secondMetricName;
  while (!result.done) {
    console.log(` metricDefinitions - ${result.value.id}, ${result.value.name}`);
    secondMetricName = result.value.name;
    result = await iterator.next();
  }
  console.log(`First Metric Definition = ${firstMetric.name}`);

  console.log(`Picking an example metric to query: ${firstMetric.name}`);

  const metricsResponse = await metricsQueryClient.query(
    metricsResourceId,
    [firstMetric.name, secondMetricName],
    {
      granularity: "PT1M",
      timespan: { duration: Durations.FiveMinutes }
    }
  );

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`
  );

  const metrics = metricsResponse.metrics;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
  const metric = metricsResponse.getMetricByName(firstMetric.name);
  console.log(`Selected Metric: ${firstMetric.name}`, JSON.stringify(metric, undefined, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
