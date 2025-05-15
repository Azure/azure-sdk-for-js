// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

import { OpenTelemetryInstrumenter } from "../../../src/instrumenter.js";
import { useInstrumenter } from "@azure/core-tracing";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
const tracerProvider = new NodeTracerProvider({
  spanProcessors: [
    new SimpleSpanProcessor(inMemoryExporter)]
});
tracerProvider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
