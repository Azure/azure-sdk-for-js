// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenTelemetry gRPC Instrumentation allows the user to 
 * automatically collect trace data and export them 
 * to the backend of choice (we can use Zipkin or Jaeger for this example), 
 * to give observability to distributed systems.
 *
 * @summary OpenTelemetry gRPC Instrumentation
 */

import { tracer } from "./utils/Tracer";
import grpc from "grpc";
import api from "@opentelemetry/api";
import messages from "./utils/helloworld_pb";
import services from "./utils/helloworld_grpc_pb";

const PORT = 50051;

/** A function which makes requests and handles response. */
function main() {
  // span corresponds to outgoing requests. Here, we have manually created
  // the span, which is created to track work that happens outside of the
  // request lifecycle entirely.
  const span = tracer("example-grpc-client", "grpc-example").startSpan('client.js:main()');
  api.context.with(api.trace.setSpan(api.context.active(), span), () => {
    console.log('Client traceId ', span.spanContext().traceId);
    const client = new services.GreeterClient(
      `localhost:${PORT}`,
      grpc.credentials.createInsecure(),
    );
    const request = new messages.HelloRequest();
    let user;
    if (process.argv.length >= 3) {
      user = process.argv[2];
    } else {
      user = 'world';
    }
    request.setName(user);
    client.sayHello(request, (err: any, response: any) => {
      span.end();
      if (err) throw err;
      console.log('Greeting:', response.getMessage());
    });
  });

  // The process must live for at least the interval past any traces that
  // must be exported, or some risk being lost if they are recorded after the
  // last export.
  console.log('Sleeping 5 seconds before shutdown to ensure all records are flushed.');
  setTimeout(() => { console.log('Completed.'); }, 5000);
}

main();
