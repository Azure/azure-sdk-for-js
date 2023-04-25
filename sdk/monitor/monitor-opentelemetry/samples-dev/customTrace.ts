// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom traces that will be sent to Azure Monitor
 */

import * as opentelemetry from "@opentelemetry/api";
import {
  AzureMonitorOpenTelemetryClient,
  AzureMonitorOpenTelemetryConfig,
} from "@azure/monitor-opentelemetry";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

let config = new AzureMonitorOpenTelemetryConfig();
const client = new AzureMonitorOpenTelemetryClient(config);

export async function main() {
  // Ge Tracer and create Span
  const tracer = client.getTraceHandler().getTracer();
  // Create a span. A span must be closed.
  const parentSpan = tracer.startSpan("main");
  for (let i = 0; i < 10; i += 1) {
    doWork(parentSpan);
  }
  // Be sure to end the span.
  parentSpan.end();

  // flush and close the connection.
  client.getTraceHandler().flush();
}

function doWork(parent: opentelemetry.Span) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parent);
  const span = client.getTraceHandler().getTracer().startSpan("doWork", undefined, ctx);

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

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
