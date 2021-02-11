"use strict";

const tracer = require("./tracer")("example-https-client");
const api = require('@opentelemetry/api');
// eslint-disable-next-line import/order
const http = require("http");

/** A function which makes requests and handles response. */
function makeRequest() {
  // span corresponds to outgoing requests. Here, we have manually created
  // the span, which is created to track work that happens outside of the
  // request lifecycle entirely.
  const span = tracer.startSpan("makeRequest", {
    kind: 2 // client
  });
  api.context.with(api.setSpan(api.context.active(), span), () => {
    // simulate 1 second of work, then make a request
    setTimeout(() => {
      http.get(
        {
          host: "localhost",
          port: 443,
          path: "/helloworld"
        },
        (response) => {
          const body = [];
          response.on("data", (chunk) => body.push(chunk));
          response.on("end", () => {
            console.log(body.toString());
            setTimeout(() => span.end(), 1000);
          });
        }
      );
    }, 1000);
  });

  // The process must live for at least the interval past any traces that
  // must be exported, or some risk being lost if they are recorded after the
  // last export.
  console.log("Sleeping 5 seconds before shutdown to ensure all records are flushed.");
  setTimeout(() => {
    console.log("Completed.");
  }, 5000);
}

makeRequest();
