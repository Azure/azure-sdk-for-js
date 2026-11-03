// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to configure offline storage and automatic retries for telemetry.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
      storageDirectory: "path/to/storage/directory",
      disableOfflineStorage: false,
    },
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with offline storage:");
  console.log("  Offline Storage: ENABLED");
  console.log("  Telemetry will be cached locally when disconnected");
}

main().catch(console.error);
