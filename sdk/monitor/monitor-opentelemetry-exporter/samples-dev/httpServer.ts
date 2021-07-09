// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A function which handles requests and send response.
 *
 * @summary a https server does / shows what with respect to the library and its most important scenarios.
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import * as api from "@opentelemetry/api";
// Tracer MUST be setup first to correctly apply module patching!
import { tracer } from "./httpTracer";
import express from 'express';

const app = express();

/** A function which handles requests and send response. */
app.get("/helloworld", (_req, res) => {
  const currentSpan = api.trace.getSpan(api.context.active()) as api.Span;
  // display traceid in the terminal
  console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  const span = tracer("example-https-server").startSpan("handleRequest", {
    kind: 1, // server
    attributes: { key: "value" }
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent("invoking handleRequest");
  try {
    // deliberately sleeping to mock some action.
    setTimeout(() => {
      span.end();
      res.status(200).end("Hello World!");
    }, 2000);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    span.end();
  }
});

app.listen(443);
console.log("App is listening on localhost:443");
