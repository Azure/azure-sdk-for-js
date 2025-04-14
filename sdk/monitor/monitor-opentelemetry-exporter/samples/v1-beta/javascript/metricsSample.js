// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-metrics](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-metrics-base)
 * to generate Metrics in a simple Node.js application and export them to Azure Monitor.
 *
 * @summary Basic use of Metrics in Node.js application.
 */

const { MeterProvider, PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { Resource } = require("@opentelemetry/resources");
const { ATTR_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");
const { AzureMonitorMetricExporter } = require("@azure/monitor-opentelemetry-exporter");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  const exporter = new AzureMonitorMetricExporter({
    connectionString:
      // Replace with your Application Insights Connection String
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ||
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;",
  });
  const metricReaderOptions = {
    exporter: exporter,
  };
  const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);

  const provider = new MeterProvider({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: "basic-service",
    }),
    readers: [metricReader],
  });

  const meter = provider.getMeter("example-meter-node");
  // Create Counter instrument with the meter
  const counter = meter.createCounter("counter");
  counter.add(1);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
