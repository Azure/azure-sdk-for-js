// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to configure Azure Monitor OpenTelemetry using a connection string.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured successfully!");
  console.log("Telemetry will be sent to Azure Application Insights");
}

main().catch(console.error);
