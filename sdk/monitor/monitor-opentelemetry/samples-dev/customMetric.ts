// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom metrics that will be sent to Azure Monitor
 */

import { useAzureMonitor, AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";
import { metrics } from "@opentelemetry/api";

// Load the .env file if it exists
import "dotenv/config";
const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
};

useAzureMonitor(options);

const express = require("express");
const app = express();
const PORT = 8080;

async function metricExport(): Promise<void> {
  const meter = metrics.getMeter("testMeter");
  const customCounter = meter.createCounter("TestCounter");
  await customCounter.add(1);
  await customCounter.add(2);
  await customCounter.add(3);
}

async function setupRoutes(): Promise<void> {
  await app.get("/", async (_req: any, res: any) => {
    await metricExport().then(() => {
      res.send("Metrics sent to Azure Monitor");
    });
  });
}

setupRoutes().then(() => {
  app.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
});
