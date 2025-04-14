// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-metrics](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/sdk-logs)
 * to instrument a simple Node.js application.
 *
 * @summary use opentelemetry logs in a Node.js application.
 */

const { AzureMonitorLogExporter } = require("@azure/monitor-opentelemetry-exporter");
const { Resource } = require("@opentelemetry/resources");
const { ATTR_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");
const { LoggerProvider, SimpleLogRecordProcessor } = require("@opentelemetry/sdk-logs");

// Load the .env file if it exists
require("dotenv/config");
const { SeverityNumber } = require("@opentelemetry/api-logs");

// Logger setup
const loggerProvider = new LoggerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "basic-service",
  }),
});
// Configure processor to send logs to the exporter
const logExporter = new AzureMonitorLogExporter({
  connectionString:
    // Replace with your Application Insights Connection String
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ||
    "InstrumentationKey=00000000-0000-0000-0000-000000000000;",
});
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(logExporter));
const logger = loggerProvider.getLogger("example-basic-logger-node");

async function main() {
  // Add logs
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "test message",
    attributes: { key: "value" },
  });

  // flush and shutdown
  await loggerProvider.forceFlush();
  await loggerProvider.shutdown();
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
