// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace";

import { OpenTelemetryInstrumenter } from "../../../src/instrumenter.js";
import { useInstrumenter } from "@azure/core-tracing";
import { createTracerProvider } from "./tracerProvider.js";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
createTracerProvider([new SimpleSpanProcessor({ exporter: inMemoryExporter })]);
useInstrumenter(new OpenTelemetryInstrumenter());
