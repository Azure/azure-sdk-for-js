// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to query metrics using the MetricsClient.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { Metric, MetricsClient } from "@azure/monitor-query";
import * as dotenv from "dotenv";

dotenv.config();

const monitorWorkspaceId = process.env.METRICS_RESOURCE_ID_TO_QUERY;

export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsClient = new MetricsClient(tokenCredential);

  if (!monitorWorkspaceId) {
    throw new Error("METRICS_RESOURCE_ID_TO_QUERY must be set in the environment for this sample");
  }

  const metricsResponse = await metricsClient.queryMetrics(monitorWorkspaceId, {
    metricnames: "SuccessfulRequests",
    interval: "P1D"
  });

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.interval}, time span: ${metricsResponse.timespan}`
  );

  const metrics: Metric[] = metricsResponse.value;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
