// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Node.js telemetry sample — console exporter
 *
 * Demonstrates enabling distributed tracing for the Azure Voice Live SDK
 * using OpenTelemetry with a console span exporter. Spans are printed to
 * stdout so you can inspect the connect → send/recv → close hierarchy.
 *
 * Prerequisites:
 *   - Set AZURE_VOICELIVE_ENDPOINT (e.g. https://your-resource.cognitiveservices.azure.com)
 *   - Authenticate via DefaultAzureCredential (az login) or set AZURE_VOICELIVE_API_KEY
 *
 * Usage:
 *   npm install
 *   npm run dev
 */

import {
  NodeTracerProvider,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-node";
import { useInstrumenter } from "@azure/core-tracing";
import { trace, context } from "@opentelemetry/api";
import { VoiceLiveClient } from "@azure/ai-voicelive";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import type { VoiceLiveSession, UserMessageItem } from "@azure/ai-voicelive";

// ---------------------------------------------------------------------------
// 1. Configure OpenTelemetry with a console exporter
// ---------------------------------------------------------------------------
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});
provider.register();

// 2. Bridge @azure/core-tracing into OpenTelemetry.
//
//    The standard bridge is `createAzureSdkInstrumentation` from
//    `@azure/opentelemetry-instrumentation-azure-sdk`, but it relies on
//    CommonJS require-hooks that don't fire when the SDK is loaded as
//    ESM. Since this sample (and many modern Node apps) is `"type":
//    "module"`, we register a minimal Instrumenter directly via
//    `useInstrumenter`. This produces identical spans.
//
//    For CommonJS apps, prefer the standard bridge — see the README.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
useInstrumenter({
  startSpan(name: string, spanOptions: any) {
    const ctx = spanOptions.tracingContext ?? context.active();
    const tracer = trace.getTracer(spanOptions.packageName ?? "@azure/ai-voicelive", spanOptions.packageVersion);
    const span = tracer.startSpan(name, { attributes: spanOptions.spanAttributes, kind: 0 }, ctx);
    return {
      span: {
        end() { span.end(); },
        setStatus(s: any) { if (s.status === "error") span.setStatus({ code: 2, message: String(s.error ?? "") }); },
        setAttribute(k: string, v: unknown) { span.setAttribute(k, v as string); },
        isRecording() { return span.isRecording(); },
        recordException(e: Error | string) { span.recordException(e); },
      },
      tracingContext: trace.setSpan(ctx, span),
    };
  },
  withContext(ctx: any, fn: any, ...args: any[]) {
    return context.with(ctx, fn, undefined, ...args);
  },
  parseTraceparentHeader() { return undefined; },
  createRequestHeaders() { return {}; },
} as any);

// ---------------------------------------------------------------------------
// 3. Use VoiceLive as normal — spans are emitted automatically
// ---------------------------------------------------------------------------
const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT;
if (!endpoint) {
  console.error("Set AZURE_VOICELIVE_ENDPOINT before running this sample.");
  process.exit(1);
}

const credential = process.env.AZURE_VOICELIVE_API_KEY
  ? new AzureKeyCredential(process.env.AZURE_VOICELIVE_API_KEY)
  : new DefaultAzureCredential();
const client = new VoiceLiveClient(endpoint, credential);

let session: VoiceLiveSession | undefined;

try {
  // Create and connect a session — this starts the "connect" parent span
  session = client.createSession("gpt-realtime");
  await session.connect();
  console.log("Connected — session ID:", session.sessionId);

  // Configure the session (generates a "send session.update" child span)
  await session.updateSession({
    modalities: ["text", "audio"],
    instructions: "You are a helpful voice assistant. Keep answers concise.",
    turnDetection: { type: "server_vad" },
  });

  // Send a text message (generates "send conversation.item.create" + "send response.create")
  await session.addConversationItem({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What is distributed tracing?" }],
  } as UserMessageItem);
  await session.sendEvent({ type: "response.create", eventId: `evt_${Date.now()}` });

  // Listen for the response
  const sub = session.subscribe({
    onServerEvent: async (event, _context) => {
      // Each recv generates a child span (unless it's a high-frequency delta)
      if (event.type === "response.done") {
        console.log("Response complete.");
      }
    },
    onError: async (args, _context) => {
      console.error("Session error:", args.error.message);
    },
  });

  // Wait a bit for the response to arrive
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  await sub.close();
} catch (err) {
  console.error("Error:", err);
} finally {
  // Disconnect — this creates the "close" child span and finalizes
  // session-level counters on the connect span before ending it.
  if (session) {
    await session.disconnect();
  }

  // Flush all buffered spans so they appear on the console
  await provider.forceFlush();
  console.log("\nDone — check the span output above.");
}
