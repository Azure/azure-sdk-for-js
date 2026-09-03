// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to enable or disable Live Metrics for real-time monitoring.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
    enableLiveMetrics: true,
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with Live Metrics:");
  console.log("  Live Metrics: ENABLED");
  console.log("  Check Azure Portal > Application Insights > Live Metrics Stream");
}

main().catch(console.error);
