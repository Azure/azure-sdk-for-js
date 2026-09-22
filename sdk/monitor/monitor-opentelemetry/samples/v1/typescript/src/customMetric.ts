// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to generate custom metrics that will be sent to Azure Monitor.
 */

import { useAzureMonitor, shutdownAzureMonitor } from "@azure/monitor-opentelemetry";
import { metrics } from "@opentelemetry/api";
import "dotenv/config";

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
  };

  useAzureMonitor(options);

  const meter = metrics.getMeter("testMeter");
  const customCounter = meter.createCounter("TestCounter");
  customCounter.add(1);
  customCounter.add(2);
  customCounter.add(3);

  console.log("Custom metrics sent to Azure Monitor");

  await shutdownAzureMonitor();
}

main().catch(console.error);
