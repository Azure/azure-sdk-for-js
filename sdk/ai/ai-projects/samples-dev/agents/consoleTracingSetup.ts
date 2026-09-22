// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configures OpenTelemetry console tracing before Azure SDK modules are loaded.
 */

import {
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { context as activeContext, trace as activeTrace } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";

export const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});
provider.register();

registerInstrumentations({ instrumentations: [createAzureSdkInstrumentation()] });

export const context = activeContext;
export const trace = activeTrace;
