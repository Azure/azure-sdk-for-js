// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import opentelemetry from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/tracing";
import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";

describe("snippets", function () {
  it("enable_instrumentation", async function () {
    // Set-up and configure a Node Tracer Provider using OpenTelemetry SDK.

    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    provider.register();
    // @ts-preserve-whitespace
    registerInstrumentations({
      instrumentations: [createAzureSdkInstrumentation()],
    });
    // @ts-preserve-whitespace
    // Continue to import any Azure SDK client libraries after registering the instrumentation.
    // import { KeyClient } from "@azure/keyvault-keys";
    // import { DefaultAzureCredential } from "@azure/identity";
    // @ts-preserve-whitespace
    const keyClient = new KeyClient("https://my.keyvault.azure.net", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    // Tracing is now enabled using automatic span propagation with an active context.
    await keyClient.getKey("MyKeyName");
    // @ts-preserve-whitespace
    // If your scenario requires manual span propagation, all Azure client libraries
    // support explicitly passing a parent context via an `options` parameter.
    // Get a tracer from a registered provider, create a span, and get the current context.
    const tracer = opentelemetry.trace.getTracer("my-tracer");
    const span = tracer.startSpan("main");
    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), span);
    // @ts-preserve-whitespace
    await keyClient.getKey("MyKeyName", {
      tracingOptions: {
        // ctx will be used as the parent context for all operations.
        tracingContext: ctx,
      },
    });
  });

  it("instrumentation_usage", async function () {
    registerInstrumentations({
      instrumentations: [createAzureSdkInstrumentation()],
    });
  });

  it("logging", async function () {
    setLogLevel("info");
  });
});
