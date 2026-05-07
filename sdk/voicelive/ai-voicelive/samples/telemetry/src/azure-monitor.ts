// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Node.js telemetry sample — Azure Monitor exporter
 *
 * Sends VoiceLive SDK spans to Azure Monitor (Application Insights) so you
 * can view the session trace in the Azure portal's Transaction Search /
 * End-to-End Transaction view.
 *
 * Prerequisites:
 *   - Set AZURE_VOICELIVE_ENDPOINT
 *   - Set APPLICATIONINSIGHTS_CONNECTION_STRING
 *   - Authenticate via DefaultAzureCredential
 *
 * Usage:
 *   npm install @azure/monitor-opentelemetry-exporter
 *   npm run start:monitor
 */

import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { useInstrumenter } from "@azure/core-tracing";
import { trace, context } from "@opentelemetry/api";
import { VoiceLiveClient } from "@azure/ai-voicelive";
import { DefaultAzureCredential } from "@azure/identity";
import type { VoiceLiveSession, UserMessageItem } from "@azure/ai-voicelive";

// ---------------------------------------------------------------------------
// 1. Configure OpenTelemetry with the Azure Monitor exporter
// ---------------------------------------------------------------------------
const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (!connectionString) {
  console.error("Set APPLICATIONINSIGHTS_CONNECTION_STRING before running this sample.");
  process.exit(1);
}

const exporter = new AzureMonitorTraceExporter({ connectionString });
const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});
provider.register();

// 2. Bridge @azure/core-tracing into OpenTelemetry.
//    See the comment in `index.ts` for why we use `useInstrumenter` directly
//    instead of `createAzureSdkInstrumentation` in ESM samples.
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
// 3. Use VoiceLive — spans flow to Azure Monitor
// ---------------------------------------------------------------------------
const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT;
if (!endpoint) {
  console.error("Set AZURE_VOICELIVE_ENDPOINT before running this sample.");
  process.exit(1);
}

const credential = new DefaultAzureCredential();
const client = new VoiceLiveClient(endpoint, credential);

let session: VoiceLiveSession | undefined;

try {
  session = client.createSession("gpt-4o-realtime-preview");
  await session.connect();
  console.log("Connected — session ID:", session.sessionId);

  await session.updateSession({
    modalities: ["text", "audio"],
    instructions: "You are a helpful assistant.",
    turnDetection: { type: "server_vad" },
  });

  await session.addConversationItem({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "Say hello in three languages." }],
  } as UserMessageItem);
  await session.sendEvent({ type: "response.create", eventId: `evt_${Date.now()}` });

  const sub = session.subscribe({
    onServerEvent: async (event, _context) => {
      if (event.type === "response.done") {
        console.log("Response complete.");
      }
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 10_000));
  await sub.close();
} catch (err) {
  console.error("Error:", err);
} finally {
  if (session) {
    await session.disconnect();
  }
  await provider.forceFlush();
  console.log("Spans sent to Azure Monitor — check the Azure portal.");
}
