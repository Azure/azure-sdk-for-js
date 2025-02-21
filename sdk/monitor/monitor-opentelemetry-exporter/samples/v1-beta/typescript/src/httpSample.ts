// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenTelemetry HTTP Instrumentation allows the user to
 * automatically collect trace data and export them to
 * the backend of choice (we can use Zipkin or Jaeger for this example),
 * to give observability to distributed systems.
 *
 * This is a simple example that demonstrates tracing HTTP request from client to server.
 * The example shows key aspects of tracing such as
 * - Root Span (on Client)
 * - Child Span (on Client)
 * - Child Span from a Remote Parent (on Server)
 * - SpanContext Propagation (from Client to Server)
 * - Span Events
 * - Span Attributes
 *
 * @summary demonstrates OpenTelemetry http Instrumentation. It is about how OpenTelemetry will instrument the Node.js native http module.
 */
import api from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import type { Tracer } from "@opentelemetry/sdk-trace-base";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import type { IncomingMessage, ServerResponse } from "node:http";

// Load the .env file if it exists
import "dotenv/config";

// OPEN TELEMETRY SETUP
let serverTracer: Tracer;
let clientTracer: Tracer;
setupOpenTelemetry();

// Open Telemetry setup need to happen before http library is loaded
import http from "node:http";

// HTTP SERVER SETUP
/** Starts a HTTP server that receives requests on sample server port. */
let server: http.Server;
function startServer(port: number): void {
  // Creates a server
  server = http.createServer(handleRequest);
  // Starts the server
  server.listen(port, () => {
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequest(request: IncomingMessage, response: ServerResponse): void {
  const currentSpan = api.trace.getSpan(api.context.active());
  if (currentSpan) {
    // display traceId in the terminal
    console.log(`traceId: ${currentSpan.spanContext().traceId}`);
  }
  const span = serverTracer.startSpan("handleRequest", {
    kind: 1, // server
    attributes: { key: "value" },
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent("invoking handleRequest");

  const body: string[] = [];
  request.on("error", (err: Error) => console.log(err));
  request.on("data", (chunk: string) => body.push(chunk));
  request.on("end", () => {
    // deliberately sleeping to mock some action.
    setTimeout(() => {
      span.end();
      response.end(body.length > 0 ? body.join("") : "Hello World!");
      // terminate the process to stop CI pipeline from running forever
      server.close();
      server.unref();
      process.exit(0);
    }, 2000);
  });
}

startServer(8080);

// HTTP CLIENT SETUP
function makeRequest(): void {
  // span corresponds to outgoing requests. Here, we have manually created
  // the span, which is created to track work that happens outside of the
  // request lifecycle entirely.
  const span = clientTracer.startSpan("makeRequest");
  api.context.with(api.trace.setSpan(api.context.active(), span), () => {
    http.get(
      {
        host: "localhost",
        port: 8080,
      },
      (response: IncomingMessage) => {
        const body: string[] = [];
        response.on("data", (chunk: string) => body.push(chunk));
        response.on("end", () => {
          console.log(body);
          span.end();
        });
      },
    );
  });
}
makeRequest();

function setupOpenTelemetry(): void {
  const exporter = new AzureMonitorTraceExporter({
    connectionString:
      // Replace with your Application Insights Connection String
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ||
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;",
  });

  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
  });
  serverTracer = provider.getTracer("serverTracer");
  clientTracer = provider.getTracer("clientTracer");
}
