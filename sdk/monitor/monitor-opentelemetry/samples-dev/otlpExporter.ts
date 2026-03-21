// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to enable the OTLP exporter alongside Azure Monitor to send telemetry to two locations.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import "dotenv/config";

async function main(): Promise<void> {
  const otlpExporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  });

  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
    spanProcessors: [new BatchSpanProcessor(otlpExporter)],
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with dual export:");
  console.log("  Azure Monitor: Enabled");
  console.log("  OTLP Exporter: Enabled (http://localhost:4318/v1/traces)");
}

main().catch(console.error);
