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
import { SimpleSpanProcessor, Tracer } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/*********************************************************************
 *  OPEN TELEMETRY SETUP
 **********************************************************************/
let serverTracer: Tracer;
let clientTracer: Tracer;
setupOpenTelemetry();

// Open Telemetry setup need to happen before http library is loaded
import http from "http";

/*********************************************************************
 *  HTTP SERVER SETUP
 **********************************************************************/
/** Starts a HTTP server that receives requests on sample server port. */
let server: http.Server;
function startServer(port: number) {
  // Creates a server
  server = http.createServer(handleRequest);
  // Starts the server
  server.listen(port, () => {
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequest(request: any, response: any) {
  const currentSpan = api.trace.getSpan(api.context.active());
  if (currentSpan) {
    // display traceid in the terminal
    console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  }
  const span = serverTracer.startSpan("handleRequest", {
    kind: 1, // server
    attributes: { key: "value" },
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent("invoking handleRequest");

  const body = [];
  request.on("error", (err: Error) => console.log(err));
  request.on("data", (chunk: string) => body.push(chunk));
  request.on("end", () => {
    // deliberately sleeping to mock some action.
    setTimeout(() => {
      span.end();
      response.end("Hello World!");
      // terminate the process to stop CI pipeline from running forever
      server.close();
    }, 2000);
  });
}

startServer(8080);

/*********************************************************************
 *  HTTP CLIENT SETUP
 **********************************************************************/
/** A function which makes requests and handles response. */
function makeRequest() {
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
      (response) => {
        const body: any = [];
        response.on("data", (chunk) => body.push(chunk));
        response.on("end", () => {
          console.log(body.toString());
          span.end();
        });
      }
    );
  });
}
makeRequest();

function setupOpenTelemetry() {
  const provider = new NodeTracerProvider();
  const exporter = new AzureMonitorTraceExporter({
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter as any));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  registerInstrumentations({
    // // when boostraping with lerna for testing purposes
    instrumentations: [new HttpInstrumentation()],
  });
  serverTracer = provider.getTracer("serverTracer");
  clientTracer = provider.getTracer("clientTracer");
}
