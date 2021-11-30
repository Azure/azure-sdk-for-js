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

  const iterator = metricsQueryClient.listMetricDefinitions(metricsResourceId);
  let metricNames: string[] = [];
  for await (const result of iterator) {
    console.log(` metricDefinitions - ${result.id}, ${result.name}`);
    if (result.name) {
      metricNames.push(result.name);
    }
  }

  if (metricNames.length > 0) {
    console.log(`Picking an example list of metrics to query: ${metricNames}`);
    const metricsResponse = await metricsQueryClient.queryResource(metricsResourceId, metricNames, {
      granularity: "PT1M",
      timespan: { duration: Durations.fiveMinutes }
    });

    console.log(
      `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`
    );

    const metrics: Metric[] = metricsResponse.metrics;
    console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
    const metric = metricsResponse.getMetricByName(metricNames[0]);
    console.log(`Selected Metric: ${metricNames[0]}`, JSON.stringify(metric, undefined, 2));
  } else {
    console.error(`Metric names are not defined - ${metricNames}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
