// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to query metrics using the MetricsClient.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { Durations, Metric, MetricsQueryClient } from "@azure/monitor-query";
import * as dotenv from "dotenv";

dotenv.config();

const metricsResourceId = process.env.METRICS_RESOURCE_ID;

export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!metricsResourceId) {
    throw new Error("METRICS_RESOURCE_ID must be set in the environment for this sample");
  }

  const result = await metricsQueryClient.getMetricDefinitions(metricsResourceId);

  for (const definition of result.definitions) {
    console.log(`Definition = ${definition.name}`);
  }

  const firstMetric = result.definitions[0];

  console.log(`Picking an example metric to query: ${firstMetric.name}`);

  const metricsResponse = await metricsQueryClient.queryMetrics(metricsResourceId, {
    metricNames: [firstMetric.name!],
    interval: "PT1M",
    timespan: Durations.last5Minutes
  });

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.interval}, time span: ${metricsResponse.timespan}`
  );

  const metrics: Metric[] = metricsResponse.metrics;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
