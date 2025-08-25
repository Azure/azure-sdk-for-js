// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OpenTelemetryInstrumenter } from "$internal/instrumenter.js";
import { useInstrumenter } from "@azure/core-tracing";
import { createTracerProvider } from "./tracerProvider.js";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
const tracerProvider = createTracerProvider([new SimpleSpanProcessor(inMemoryExporter)]);
tracerProvider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
