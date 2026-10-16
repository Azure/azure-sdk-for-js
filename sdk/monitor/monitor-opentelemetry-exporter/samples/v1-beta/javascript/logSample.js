// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-logs](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/sdk-logs)
 * to instrument a simple Node.js application.
 * It also demonstrates how to associate custom measurements with logs.
 *
 * @summary use opentelemetry logs in a Node.js application.
 */

const { AzureMonitorLogExporter } = require("@azure/monitor-opentelemetry-exporter");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { LoggerProvider, SimpleLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const { SeverityNumber } = require("@opentelemetry/api-logs");

// Load the .env file if it exists
require("dotenv/config");

// Configure processor to send logs to the exporter
const logExporter = new AzureMonitorLogExporter({
  connectionString:
    // Replace with your Application Insights Connection String
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ||
    "InstrumentationKey=00000000-0000-0000-0000-000000000000;",
});

// Logger setup
const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
  }),
  processors: [new SimpleLogRecordProcessor({ exporter: logExporter })],
});
const logger = loggerProvider.getLogger("example-basic-logger-node");

async function main() {
  // Add logs
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "test message",
    attributes: {
      key: "value",
      "microsoft.custom_measurements": JSON.stringify({
        itemsProcessed: 42,
        queueDepth: 7,
      }),
    },
  });

  // Add an availability result
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "Homepage availability test completed.",
    attributes: {
      "microsoft.availability.id": "availability-test-run-123",
      "microsoft.availability.name": "Homepage",
      "microsoft.availability.duration": "00:00:00.250",
      "microsoft.availability.success": true,
      "microsoft.availability.runLocation": "westus2",
      "microsoft.availability.message": "HTTP 200",
    },
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
