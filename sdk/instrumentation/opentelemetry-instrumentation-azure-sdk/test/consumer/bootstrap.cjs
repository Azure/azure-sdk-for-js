// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NodeSDK } = require("@opentelemetry/sdk-node");
const { InMemorySpanExporter, SimpleSpanProcessor } = require("@opentelemetry/sdk-trace");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { AzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
const exporter = new InMemorySpanExporter();
const sdk = new NodeSDK({
  autoDetectResources: false,
  spanProcessors: [new SimpleSpanProcessor({ exporter })],
  logRecordProcessors: [],
  metricReaders: [],
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new AzureSdkInstrumentation(),
  ],
});
sdk.start();
module.exports = { sdk, exporter };
