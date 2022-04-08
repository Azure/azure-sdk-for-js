// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This example shows how to use
 * [@opentelemetry/sdk-trace-base](https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-tracing)
 * to instrument a simple Node.js application - e.g. a batch job.
 *
 * @summary use opentelemetry tracing to instrument a Node.js application. Basic use of Tracing in Node.js application.
 */

import * as opentelemetry from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
  }),
});

// Configure span processor to send spans to the exporter
const exporter = new AzureMonitorTraceExporter({
  connectionString:
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter as any));

/**
 * Initialize the OpenTelemetry APIs to use the BasicTracerProvider bindings.
 *
 * This registers the tracer provider with the OpenTelemetry API as the global
 * tracer provider. This means when you call API methods like
 * `opentelemetry.trace.getTracer`, they will use this tracer provider. If you
 * do not register a global tracer provider, instrumentation which calls these
 * methods will receive no-op implementations.
 */
provider.register();
const tracer = opentelemetry.trace.getTracer("example-basic-tracer-node");

export async function main() {
  // Create a span. A span must be closed.
  const parentSpan = tracer.startSpan("main");
  for (let i = 0; i < 10; i += 1) {
    doWork(parentSpan);
  }
  // Be sure to end the span.
  parentSpan.end();

  // flush and close the connection.
  exporter.shutdown();
}

function doWork(parent: opentelemetry.Span) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parent);
  const span = tracer.startSpan("doWork", undefined, ctx);

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
