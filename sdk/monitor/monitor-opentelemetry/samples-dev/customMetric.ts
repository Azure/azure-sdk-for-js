// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom metrics that will be sent to Azure Monitor
 */

import {
  AzureMonitorOpenTelemetryClient,
  AzureMonitorOpenTelemetryConfig,
} from "@azure/monitor-opentelemetry";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

let config = new AzureMonitorOpenTelemetryConfig();
const client = new AzureMonitorOpenTelemetryClient(config);

export async function main() {
  // Ge Meter and create custom metric
  const meter = client.getMetricHandler().getMeter();
  const customCounter = meter.createCounter("TestCounter");
  customCounter.add(1);
  customCounter.add(2);
  customCounter.add(3);

  // Flush telemetry
  //client.getMetricHandler().flush();
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
