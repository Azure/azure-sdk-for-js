// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to query metrics using the MetricsClient.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { Durations, Metric, MetricsQueryClient, MetricDefinition } from "@azure/monitor-query";
import * as dotenv from "dotenv";

dotenv.config();

const metricsResourceId = process.env.METRICS_RESOURCE_ID;

export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!metricsResourceId) {
    throw new Error("METRICS_RESOURCE_ID must be set in the environment for this sample");
  }

  const iterator = metricsQueryClient.listMetricDefinitions(metricsResourceId);
  let result = await iterator.next();
  const firstMetric: MetricDefinition = result.value;

  while (!result.done) {
    console.log(` metricDefinitions - ${result.value.id}, ${result.value.name}`);
    result = await iterator.next();
  }
  console.log(`First Metric Definition = ${firstMetric.name}`);

  console.log(`Picking an example metric to query: ${firstMetric.name!}`);

  const metricsResponse = await metricsQueryClient.query(metricsResourceId, [firstMetric.name!], {
    granularity: "PT1M",
    timespan: { duration: Durations.FiveMinutes }
  });

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`
  );

  const metrics: Metric[] = metricsResponse.metrics;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
