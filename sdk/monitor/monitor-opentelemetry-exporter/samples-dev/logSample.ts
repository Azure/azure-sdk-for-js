// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-logs](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/sdk-logs)
 * to instrument a simple Node.js application.
 *
 * @summary use opentelemetry logs in a Node.js application.
 */

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { LoggerProvider, SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { SeverityNumber } from "@opentelemetry/api-logs";

// Load the .env file if it exists
import "dotenv/config";

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
  processors: [new SimpleLogRecordProcessor(logExporter)],
});
const logger = loggerProvider.getLogger("example-basic-logger-node");

export async function main(): Promise<void> {
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
