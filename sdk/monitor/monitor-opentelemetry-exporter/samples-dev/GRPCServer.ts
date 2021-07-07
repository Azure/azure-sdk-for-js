// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A gRPC server that receives requests on sample server port.
 *
 * @summary a gRPC server does / shows what with respect to the library and its most important scenarios.
 */

import * as api from "@opentelemetry/api";
import { tracer } from "./grpcTracer";
import grpc from "grpc";

import messages from './utils/helloworld_pb';
import services from './utils/helloworld_grpc_pb';

const PORT = 50051;

/** Starts a gRPC server that receives requests on sample server port. */
function startServer() {
  // Creates a server
  const server = new grpc.Server();
  server.addService(services.GreeterService, { sayHello });
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  console.log(`binding server on 0.0.0.0:${PORT}`);
  server.start();
}

function sayHello(call: any, callback: Function) {
  const currentSpan = api.trace.getSpan(api.context.active()) as api.Span;
  // display traceid in the terminal
  console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  const span = tracer("example-grpc-server").startSpan('server.js:sayHello()', {
    kind: 1, // server
    attributes: { key: 'value' },
  });
  span.addEvent(`invoking sayHello() to ${call.request.getName()}`);
  const reply = new messages.HelloReply();
  reply.setMessage(`Hello ${call.request.getName()}`);
  callback(null, reply);
  span.end();
}

startServer();
