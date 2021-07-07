// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenTelemetry HTTPS Instrumentation allows the user to 
 * automatically collect trace data and export them to 
 * the backend of choice (we can use Zipkin or Jaeger for this example), 
 * to give observability to distributed systems.
 * 
 * This is a simple example that demonstrates tracing HTTPS request from client to server.
 * The example shows key aspects of tracing such as
 * - Root Span (on Client)
 * - Child Span (on Client)
 * - Child Span from a Remote Parent (on Server)
 * - SpanContext Propagation (from Client to Server)
 * - Span Events
 * - Span Attributes
 *
 * @summary demonstrates OpenTelemetry https Instrumentation. It is about how OpenTelemetry will instrument the Node.js native https module.
 */

import { tracer } from "./httpTracer";
import * as api from "@opentelemetry/api";
import https from "https";

/** A function which makes requests and handles response. */
function makeRequest() {
  // span corresponds to outgoing requests. Here, we have manually created
  // the span, which is created to track work that happens outside of the
  // request lifecycle entirely.
  const span = tracer("example-https-client").startSpan('makeRequest');
  api.context.with(api.trace.setSpan(api.context.active(), span), () => {
    https.get({
      host: 'localhost',
      port: 443,
      path: '/helloworld',
    }, (response) => {
      const body: any = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        console.log(body.toString());
        span.end();
      });
    });
  });

  // The process must live for at least the interval past any traces that
  // must be exported, or some risk being lost if they are recorded after the
  // last export.
  console.log('Sleeping 5 seconds before shutdown to ensure all records are flushed.');
  setTimeout(() => { console.log('Completed.'); }, 5000);
}

makeRequest();
