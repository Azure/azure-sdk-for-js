// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom metrics that will be sent to Azure Monitor
 */

import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
  shutdownAzureMonitor,
} from "@azure/monitor-opentelemetry";
import { metrics } from "@opentelemetry/api";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
};

useAzureMonitor(options);

export async function main() {
  // Get Meter and create custom metric
  const meter = metrics.getMeter("testMeter");
  const customCounter = meter.createCounter("TestCounter");
  customCounter.add(1);
  customCounter.add(2);
  customCounter.add(3);
}

main().catch(async (error) => {
  console.error("An error occurred:", error);
  await shutdownAzureMonitor();
  process.exit(1);
});
