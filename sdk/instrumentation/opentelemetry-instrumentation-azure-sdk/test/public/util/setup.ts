// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";
import { useInstrumenter } from "@azure/core-tracing";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
provider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
