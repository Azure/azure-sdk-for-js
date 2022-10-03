// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-metrics](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-metrics)
 * to generate Metrics in a simple Node.js application and export them to Azure Monitor.
 *
 * @summary Basic use of Metrics in Node.js application.
 */

const { MeterProvider, PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { AzureMonitorMetricExporter } = require("@azure/monitor-opentelemetry-exporter");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const provider = new MeterProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
    }),
  });
  const exporter = new AzureMonitorMetricExporter({
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  });
  const metricReaderOptions = {
    exporter: exporter,
  };
  const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
  provider.addMetricReader(metricReader);
  const meter = provider.getMeter("example-meter-node");
  // Create Counter instrument with the meter
  let counter = meter.createCounter("counter");
  counter.add(1);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
