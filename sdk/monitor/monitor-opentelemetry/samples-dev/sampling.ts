// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to enable sampling to reduce data ingestion volume and control costs.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

async function main(): Promise<void> {
  // A sampling ratio of 0.1 means approximately 10% of traces are sent
  const options = {
    samplingRatio: 0.1,
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with sampling:");
  console.log("  Sampling Ratio: 10% (0.1)");
  console.log("  This reduces data ingestion volume and costs");
}

main().catch(console.error);
