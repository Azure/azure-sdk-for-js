// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";
import { tracerProvider } from "./tracerProvider";
import { useInstrumenter } from "@azure/core-tracing";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
tracerProvider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
