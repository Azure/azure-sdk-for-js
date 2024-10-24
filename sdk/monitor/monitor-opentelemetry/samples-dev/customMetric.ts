// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom metrics that will be sent to Azure Monitor
 */

import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
} from "@azure/monitor-opentelemetry";
const { metrics } = require("@opentelemetry/api");

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

const express = require('express');
const app = express();
const PORT = 8080;

async function metricExport(): Promise<void> {
  const meter = metrics.getMeter("testMeter");
  const customCounter = meter.createCounter("TestCounter");
  customCounter.add(1);
  customCounter.add(2);
  customCounter.add(3);
}

async function setupRoutes(): Promise<void> {
  app.get('/', async (req: any, res: any) => {
    await metricExport()
      .then(() => {
        res.send("Metrics sent to Azure Monitor");
      });
  });
}

setupRoutes().then(() => {
  app.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
});