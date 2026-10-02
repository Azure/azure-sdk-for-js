// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configures OpenTelemetry console tracing before Azure SDK modules are loaded.
 */

const {
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { context: activeContext, trace: activeTrace } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});
provider.register();

registerInstrumentations({ instrumentations: [createAzureSdkInstrumentation()] });

const context = activeContext;
const trace = activeTrace;

module.exports = { provider, context, trace };
