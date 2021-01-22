"use strict";

// Load the .env file if it exists
require("dotenv").config();

const opentelemetry = require("@opentelemetry/api");
const { BasicTracerProvider, SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { AzureMonitorTraceExporter } = require("@azure/opentelemetry-exporter-azure-monitor");

const provider = new BasicTracerProvider();

// Configure span processor to send spans to the exporter
const exporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>"
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

/**
 * Initialize the OpenTelemetry APIs to use the BasicTracerProvider bindings.
 *
 * This registers the tracer provider with the OpenTelemetry API as the global
 * tracer provider. This means when you call API methods like
 * `opentelemetry.trace.getTracer`, they will use this tracer provider. If you
 * do not register a global tracer provider, instrumentation which calls these
 * methods will recieve no-op implementations.
 */
provider.register();
const tracer = opentelemetry.trace.getTracer("example-basic-tracer-node");

// Create a span. A span must be closed.
const parentSpan = tracer.startSpan("main");
for (let i = 0; i < 10; i += 1) {
  doWork(parentSpan);
}
// Be sure to end the span.
parentSpan.end();

// flush and close the connection.
exporter.shutdown();

function doWork(parent) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const span = tracer.startSpan("doWork", {
    parent
  });

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
