// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";
import { useInstrumenter } from "@azure/core-tracing";

// Setup all the necessary instrumenters, exporters, etc.
export const inMemoryExporter = new InMemorySpanExporter();
// Use BasicTracerProvider in the browser.
const provider = new BasicTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
provider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
