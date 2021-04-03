# Overview

OpenTelemetry HTTPS Instrumentation allows the user to automatically collect trace data and export them to the backend of choice (we can use Zipkin or Jaeger for this example), to give observability to distributed systems.

This is a simple example that demonstrates tracing HTTPS request from client to server. The example
shows key aspects of tracing such as

- Root Span (on Client)
- Child Span (on Client)
- Child Span from a Remote Parent (on Server)
- SpanContext Propagation (from Client to Server)
- Span Events
- Span Attributes

## Installation

```sh
$ # from this directory
$ npm install
```

## Run the Application

- Run the server

  ```sh
  # from this directory
  npm run server
  ```

- Run the client

  ```sh
  # from this directory
  npm run client
  ```

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more information on OpenTelemetry for Node.js, visit: <https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-node>

## LICENSE

Apache License 2.0
