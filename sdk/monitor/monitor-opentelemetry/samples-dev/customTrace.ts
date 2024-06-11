// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom traces that will be sent to Azure Monitor
 */

import { context, trace, Span } from "@opentelemetry/api";
import {
  useAzureMonitor,
  shutdownAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
} from "@azure/monitor-opentelemetry";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
};
useAzureMonitor(options);

export async function main() {
  // Ge Tracer and create Span
  const tracer = trace.getTracer("testTracer");
  // Create a span. A span must be closed.
  const parentSpan = tracer.startSpan("main");
  for (let i = 0; i < 10; i += 1) {
    doWork(parentSpan);
  }
  // Be sure to end the span.
  parentSpan.end();
}

function doWork(parent: Span) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const ctx = trace.setSpan(context.active(), parent);
  const span = trace.getTracer("testTracer").startSpan("doWork", undefined, ctx);

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }

  // Set attributes to the span.
  span.setAttribute("key", "value");

  // Annotate our span to capture metadata about our operation
  span.addEvent("invoking doWork");

  span.end();
}

main().catch(async (error) => {
  console.error("An error occurred:", error);
  await shutdownAzureMonitor();
  process.exit(1);
});
