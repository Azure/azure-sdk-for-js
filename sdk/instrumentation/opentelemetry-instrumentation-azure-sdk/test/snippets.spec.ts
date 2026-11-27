// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { context, trace } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace";
import { setLogLevel } from "@azure/logger";

describe("snippets", function () {
  it("enable_instrumentation", async function () {
    // Configure and start the SDK before importing any Azure client libraries.
    const sdk = new NodeSDK({
      spanProcessors: [new SimpleSpanProcessor({ exporter: new ConsoleSpanExporter() })],
      instrumentations: [createAzureSdkInstrumentation()],
    });
    sdk.start();
    // @ts-preserve-whitespace
    const { KeyClient } = await import("@azure/keyvault-keys");
    const { DefaultAzureCredential } = await import("@azure/identity");
    // @ts-preserve-whitespace
    const keyClient = new KeyClient("https://my.keyvault.azure.net", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    // Tracing is now enabled using automatic span propagation with an active context.
    await keyClient.getKey("MyKeyName");
    // @ts-preserve-whitespace
    // If your scenario requires manual span propagation, all Azure client libraries
    // support explicitly passing a parent context via an `options` parameter.
    // Get a tracer from a registered provider, create a span, and get the current context.
    const tracer = trace.getTracer("my-tracer");
    const span = tracer.startSpan("main");
    const ctx = trace.setSpan(context.active(), span);
    // @ts-preserve-whitespace
    try {
      await keyClient.getKey("MyKeyName", {
        tracingOptions: {
          // ctx will be used as the parent context for all operations.
          tracingContext: ctx,
        },
      });
    } finally {
      span.end();
      await sdk.shutdown();
    }
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
