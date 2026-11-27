// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeSDK } from "@opentelemetry/sdk-node";
import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { AzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
export const exporter = new InMemorySpanExporter();
export const sdk = new NodeSDK({
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
