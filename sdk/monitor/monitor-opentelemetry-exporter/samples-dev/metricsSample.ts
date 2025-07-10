// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-metrics](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/sdk-metrics)
 * to generate Metrics in a simple Node.js application and export them to Azure Monitor.
 *
 * @summary Basic use of Metrics in Node.js application.
 */

import { PeriodicExportingMetricReader, MeterProvider } from "@opentelemetry/sdk-metrics";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  const exporter = new AzureMonitorMetricExporter({
    connectionString:
      // Replace with your Application Insights Connection String
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ||
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;",
  });

  const metricReader = new PeriodicExportingMetricReader({
    exporter: exporter,
    exportIntervalMillis: 1000,
  });

  const provider = new MeterProvider({
    resource: resourceFromAttributes({
      [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
    }),
    readers: [metricReader],
  });

  const meter = provider.getMeter("example-meter-node");
  // Create Counter instrument with the meter
  const counter = meter.createCounter("counter");
  counter.add(1);

  // Allow time for metrics to be exported
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Shutdown the provider
  await provider.shutdown();
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
