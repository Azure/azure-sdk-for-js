// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Browser telemetry sample
 *
 * Demonstrates enabling distributed tracing for the Azure Voice Live SDK
 * in a browser environment using @opentelemetry/sdk-trace-web.
 *
 * Captured spans are displayed in the page rather than a console exporter,
 * so you can inspect the connect → send/recv → close hierarchy visually.
 */

import {
  WebTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import type { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { useInstrumenter } from "@azure/core-tracing";
import { trace, context } from "@opentelemetry/api";
import { VoiceLiveClient } from "@azure/ai-voicelive";
import type { VoiceLiveSession } from "@azure/ai-voicelive";
import type { KeyCredential } from "@azure/core-auth";
import type { UserMessageItem } from "@azure/ai-voicelive";

// ---------------------------------------------------------------------------
// In-page span exporter — renders spans into a <div>
// ---------------------------------------------------------------------------
class PageSpanExporter implements SpanExporter {
  private _el: HTMLElement;

  constructor(elementId: string) {
    this._el = document.getElementById(elementId)!;
  }

  export(spans: ReadableSpan[], resultCallback: (result: { code: number }) => void): void {
    for (const span of spans) {
      const durationMs = (span.duration[0] * 1000 + span.duration[1] / 1e6).toFixed(1);
      const ctx = span.spanContext();
      // sdk-trace-base v2 exposes `parentSpanContext`, v1 exposes `parentSpanId`.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = span as any;
      const parentId = s.parentSpanContext?.spanId ?? s.parentSpanId ?? "(root)";
      const attrs = Object.entries(span.attributes)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join("\n");

      const entry = [
        `── ${span.name} (${durationMs}ms) ──`,
        `  traceId: ${ctx.traceId}`,
        `  spanId:  ${ctx.spanId}`,
        `  parent:  ${parentId}`,
        `  status:  ${span.status.code === 0 ? "UNSET" : span.status.code === 1 ? "OK" : "ERROR"}`,
        attrs,
        "",
      ].join("\n");

      this._el.textContent += entry;
      this._el.scrollTop = this._el.scrollHeight;
    }
    resultCallback({ code: 0 /* SUCCESS */ });
  }

  async shutdown(): Promise<void> {}
  async forceFlush(): Promise<void> {}
}

// ---------------------------------------------------------------------------
// Setup OpenTelemetry for the browser
// ---------------------------------------------------------------------------
const exporter = new PageSpanExporter("spans");
const provider = new WebTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});
provider.register();

// Bridge @azure/core-tracing into OpenTelemetry. The instrumentation library
// uses CommonJS require-hooks which don't work in ESM/bundler environments,
// so we call useInstrumenter directly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
useInstrumenter({
  startSpan(name: string, spanOptions: any) {
    const ctx = spanOptions.tracingContext ?? context.active();
    const tracer = trace.getTracer(
      spanOptions.packageName ?? "@azure/ai-voicelive",
      spanOptions.packageVersion,
    );
    const span = tracer.startSpan(
      name,
      { attributes: spanOptions.spanAttributes, kind: 0 },
      ctx,
    );
    return {
      span: {
        end() { span.end(); },
        setStatus(s: any) {
          if (s.status === "error") span.setStatus({ code: 2, message: String(s.error ?? "") });
        },
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
// UI wiring
// ---------------------------------------------------------------------------
const statusEl = document.getElementById("status")!;
const spansEl = document.getElementById("spans")!;
const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement;
const disconnectBtn = document.getElementById("disconnectBtn") as HTMLButtonElement;
const endpointInput = document.getElementById("endpoint") as HTMLInputElement;
const apiKeyInput = document.getElementById("apiKey") as HTMLInputElement;

// Pre-fill from Vite env vars (set in .env.local) so devs don't have to
// re-enter credentials on every reload.
const envEndpoint = (import.meta as any).env?.VITE_VOICELIVE_ENDPOINT as string | undefined;
const envApiKey = (import.meta as any).env?.VITE_VOICELIVE_API_KEY as string | undefined;
if (envEndpoint && !endpointInput.value) endpointInput.value = envEndpoint;
if (envApiKey && !apiKeyInput.value) apiKeyInput.value = envApiKey;

let session: VoiceLiveSession | undefined;

function setStatus(msg: string): void {
  statusEl.textContent = `Status: ${msg}`;
}

connectBtn.addEventListener("click", async () => {
  const endpoint = (document.getElementById("endpoint") as HTMLInputElement).value.trim();
  const apiKey = (document.getElementById("apiKey") as HTMLInputElement).value.trim();

  if (!endpoint || !apiKey) {
    setStatus("Please enter both endpoint and API key.");
    return;
  }

  connectBtn.disabled = true;
  spansEl.textContent = "";
  setStatus("Connecting...");

  try {
    // KeyCredential for browser (no DefaultAzureCredential in browsers)
    const credential: KeyCredential = { key: apiKey };
    const client = new VoiceLiveClient(endpoint, credential);
    session = client.createSession("gpt-realtime");

    // connect() creates the parent "connect" span
    await session.connect();
    setStatus(`Connected — session ID: ${session.sessionId ?? "(pending)"}`);
    disconnectBtn.disabled = false;

    // Configure session
    await session.updateSession({
      modalities: ["text", "audio"],
      instructions: "You are a helpful assistant. Keep answers brief.",
      turnDetection: { type: "server_vad" },
    });

    // Send a text message to trigger a response
    const item: UserMessageItem = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "What is OpenTelemetry?" }],
    };
    await session.addConversationItem(item);
    await session.sendEvent({ type: "response.create" });

    // Subscribe to events
    session.subscribe({
      onResponseDone: async () => {
        setStatus("Response complete — check spans below.");
      },
      onError: async (args) => {
        setStatus(`Error: ${args.error.message}`);
      },
    });
  } catch (err: any) {
    setStatus(`Connection failed: ${err.message}`);
    connectBtn.disabled = false;
  }
});

disconnectBtn.addEventListener("click", async () => {
  disconnectBtn.disabled = true;
  setStatus("Disconnecting...");
  if (session) {
    await session.disconnect();
    session = undefined;
  }
  await provider.forceFlush();
  setStatus("Disconnected — all spans flushed.");
  connectBtn.disabled = false;
});

// Auto-connect when ?autoconnect=1 is in the URL (useful for E2E tests).
if (new URLSearchParams(location.search).get("autoconnect") === "1") {
  connectBtn.click();
}
