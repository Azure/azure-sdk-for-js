"use strict";

// Load the .env file if it exists
require("dotenv").config();

const opentelemetry = require("@opentelemetry/api");
// Tracer MUST be setup first to correctly apply module patching!
const tracer = require("./tracer")("example-https-server");

// eslint-disable-next-line import/order
const express = require("express");

const app = express();

/** A function which handles requests and send response. */
app.get("/helloworld", (req, res) => {
  const currentSpan = opentelemetry.getSpan(opentelemetry.context.active());
  // display traceid in the terminal
  console.log(`traceid: ${currentSpan.context().traceId}`);
  const span = tracer.startSpan("handleRequest", {
    parent: currentSpan,
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
