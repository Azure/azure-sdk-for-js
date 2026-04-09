// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Browser telemetry sample for Azure VoiceLive SDK.
 *
 * Shows how to instrument VoiceLive sessions with OpenTelemetry in the browser.
 * Spans are displayed in the page and optionally exported to an OTLP endpoint
 * (e.g., Jaeger or Aspire Dashboard running on localhost).
 *
 * Usage:
 *   npm install
 *   npm run dev        # opens http://localhost:3001
 */

import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import {
  SimpleSpanProcessor,
  SpanExporter,
  ReadableSpan,
} from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import * as otelApi from "@opentelemetry/api";
import { VoiceLiveClient, VoiceLiveInstrumentor } from "@azure/ai-voicelive";
import { AzureKeyCredential } from "@azure/core-auth";
import type { VoiceLiveSession } from "@azure/ai-voicelive";

// The SDK's tryLoadOtel() first tries globalThis.require("@opentelemetry/api")
// which returns the full API (including trace.setSpan/getSpan). If require is
// missing it falls back to the OTel global symbol, which only stores the
// registered TracerProvider — missing setSpan/getSpan/getActiveSpan etc.
// Polyfill require so the SDK gets the full API object in the browser.
(globalThis as any).require = (id: string) => {
  if (id === "@opentelemetry/api") return otelApi;
  throw new Error(`Cannot require '${id}' in browser`);
};

// ------------------------------------------------------------------ //
// DOM references                                                     //
// ------------------------------------------------------------------ //

const $endpoint = document.getElementById("endpoint") as HTMLInputElement;
const $apiKey = document.getElementById("apiKey") as HTMLInputElement;
const $otlpEndpoint = document.getElementById("otlpEndpoint") as HTMLInputElement;
const $contentRecording = document.getElementById("contentRecording") as HTMLSelectElement;
const $connectBtn = document.getElementById("connectBtn") as HTMLButtonElement;
const $sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const $micBtn = document.getElementById("micBtn") as HTMLButtonElement;
const $disconnectBtn = document.getElementById("disconnectBtn") as HTMLButtonElement;
const $status = document.getElementById("status") as HTMLElement;
const $transcript = document.getElementById("transcript") as HTMLElement;
const $spanLog = document.getElementById("spanLog") as HTMLElement;
const $spanCount = document.getElementById("spanCount") as HTMLElement;
const $clearSpans = document.getElementById("clearSpans") as HTMLButtonElement;

// ------------------------------------------------------------------ //
// In-page span exporter — renders spans into the DOM                 //
// ------------------------------------------------------------------ //

let totalSpans = 0;

class DomSpanExporter implements SpanExporter {
  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    for (const span of spans) {
      totalSpans++;
      $spanCount.textContent = String(totalSpans);

      const attrs = Object.entries(span.attributes)
        .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
        .join("\n");

      // Render span events (e.g., gen_ai.event.content when content recording is enabled)
      const events = span.events
        .map((evt) => {
          const evtAttrs = Object.entries(evt.attributes ?? {})
            .map(([k, v]) => {
              const val = typeof v === "string" && v.length > 200 ? v.slice(0, 200) + "…" : JSON.stringify(v);
              return `    ${k}: ${val}`;
            })
            .join("\n");
          return `  event: ${evt.name}${evtAttrs ? "\n" + evtAttrs : ""}`;
        })
        .join("\n");

      const entry = document.createElement("div");
      entry.className = "span-entry";

      const nameEl = document.createElement("span");
      nameEl.className = "span-name";
      nameEl.textContent = span.name;
      entry.appendChild(nameEl);

      const timeEl = document.createElement("span");
      timeEl.className = "span-time";
      timeEl.textContent = ` [${fmtDuration(span.duration)}]`;
      entry.appendChild(timeEl);

      const attrEl = document.createElement("span");
      attrEl.className = "span-attr";
      attrEl.textContent = "\n" + attrs;
      entry.appendChild(attrEl);

      if (events) {
        const evtEl = document.createElement("span");
        evtEl.className = "span-attr";
        evtEl.textContent = "\n" + events;
        entry.appendChild(evtEl);
      }

      $spanLog.appendChild(entry);
      $spanLog.scrollTop = $spanLog.scrollHeight;
    }
    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  async shutdown(): Promise<void> {
    /* no-op */
  }
}

function fmtDuration(d: [number, number]): string {
  const ms = d[0] * 1000 + d[1] / 1e6;
  return ms < 1000 ? `${ms.toFixed(1)}ms` : `${(ms / 1000).toFixed(2)}s`;
}

// ------------------------------------------------------------------ //
// Session state                                                      //
// ------------------------------------------------------------------ //

let session: VoiceLiveSession | undefined;
let instrumentor: VoiceLiveInstrumentor | undefined;
let audioContext: AudioContext | undefined;
let mediaStream: MediaStream | undefined;
let scriptProcessor: ScriptProcessorNode | undefined;
let isMicActive = false;
let otlpAdded = false;

// ------------------------------------------------------------------ //
// OTel provider — created once, reused across sessions.              //
// The OTel API only allows a single global registration; calling     //
// provider.register() a second time is a no-op.                      //
// ------------------------------------------------------------------ //

const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new DomSpanExporter()));
provider.register();

// Polyfill process.env for the SDK's env-var gate (not available in browsers)
const g = globalThis as Record<string, unknown>;
if (!g.process) g.process = { env: {} } as unknown as typeof process;
(g.process as any).env ??= {};
(g.process as any).env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";

// ------------------------------------------------------------------ //
// Connect flow                                                       //
// ------------------------------------------------------------------ //

$connectBtn.addEventListener("click", () => {
  const endpoint = $endpoint.value.trim();
  const apiKey = $apiKey.value.trim();

  if (!endpoint) {
    log("ERROR: Please enter an endpoint.");
    return;
  }
  if (!apiKey) {
    log("ERROR: Please enter an API key.");
    return;
  }

  // Wrap in an immediately-invoked async so errors propagate visibly
  (async () => {
    // Optionally add OTLP exporter (once — avoid duplicates on reconnect)
    const otlpUrl = $otlpEndpoint.value.trim();
    if (otlpUrl && !otlpAdded) {
      provider.addSpanProcessor(
        new SimpleSpanProcessor(new OTLPTraceExporter({ url: `${otlpUrl}/v1/traces` })),
      );
      otlpAdded = true;
    }

    // Instrument the SDK
    const enableContent = $contentRecording.value === "true";
    (g.process as any).env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = enableContent ? "true" : "false";

    instrumentor = new VoiceLiveInstrumentor();
    instrumentor.instrument({ enableContentRecording: enableContent });

    log("Tracing enabled. Content recording: " + enableContent);

    // 3. Connect
    setStatus("connecting");
    log("Connecting to " + endpoint + " …");
    const credential = new AzureKeyCredential(apiKey);
    const client = new VoiceLiveClient(endpoint, credential);
    session = await client.startSession("gpt-4o-realtime-preview");
    log("Session started. Configuring…");

    await session.updateSession({
      modalities: ["audio", "text"],
      instructions: "You are a helpful assistant. Respond concisely.",
      turnDetection: {
        type: "server_vad",
        threshold: 0.5,
        silenceDurationMs: 500,
      },
    });

    // Subscribe to events
    session.subscribe({
      onResponseTextDelta: async (event) => {
        appendTranscript("assistant", event.delta ?? "");
      },
      onResponseDone: async () => {
        appendTranscript("system", "\n[turn complete]\n");
      },
    });

    setStatus("connected");
    log("Connected and ready. Use Send Text or Start Mic.");
    $connectBtn.disabled = true;
    $sendBtn.disabled = false;
    $micBtn.disabled = false;
    $disconnectBtn.disabled = false;
  })().catch((err: any) => {
    console.error("Connect failed:", err);
    log("Connection error: " + (err?.message ?? String(err)));
    setStatus("error");
  });
});

// ------------------------------------------------------------------ //
// Send a text message                                                //
// ------------------------------------------------------------------ //

$sendBtn.addEventListener("click", async () => {
  if (!session) return;

  const text = prompt("Enter a message to send:");
  if (!text) return;

  appendTranscript("user", text + "\n");

  await session.addConversationItem({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text }],
  });
  await session.sendEvent({ type: "response.create" });
});

// ------------------------------------------------------------------ //
// Microphone capture                                                 //
// ------------------------------------------------------------------ //

function convertToPCM16(floatData: Float32Array): Int16Array {
  const pcm16 = new Int16Array(floatData.length);
  for (let i = 0; i < floatData.length; i++) {
    const s = Math.max(-1, Math.min(1, floatData[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return pcm16;
}

async function startMic(): Promise<void> {
  if (!session) return;

  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, sampleRate: 24000, echoCancellation: true, noiseSuppression: true },
  });
  audioContext = new AudioContext({ sampleRate: 24000 });
  const source = audioContext.createMediaStreamSource(mediaStream);
  scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
  source.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);

  scriptProcessor.onaudioprocess = (e) => {
    if (!isMicActive || !session) return;
    const floatData = e.inputBuffer.getChannelData(0);
    const pcm16 = convertToPCM16(floatData);
    const buf = pcm16.buffer.slice(pcm16.byteOffset, pcm16.byteOffset + pcm16.byteLength);
    session.sendAudio(buf).catch((err) => {
      console.warn("sendAudio failed:", err);
    });
  };

  isMicActive = true;
  $micBtn.textContent = "🎤 Stop Mic";
  log("Microphone active — speak now.");
}

function stopMic(): void {
  isMicActive = false;
  scriptProcessor?.disconnect();
  scriptProcessor = undefined;
  audioContext?.close();
  audioContext = undefined;
  mediaStream?.getTracks().forEach((t) => t.stop());
  mediaStream = undefined;
  $micBtn.textContent = "🎤 Start Mic";
  log("Microphone stopped.");
}

$micBtn.addEventListener("click", () => {
  if (isMicActive) {
    stopMic();
  } else {
    startMic().catch((err) => log("Mic error: " + err.message));
  }
});

// ------------------------------------------------------------------ //
// Disconnect                                                         //
// ------------------------------------------------------------------ //

$disconnectBtn.addEventListener("click", async () => {
  stopMic();
  if (session) {
    await session.disconnect();
    session = undefined;
  }
  instrumentor?.uninstrument();
  instrumentor = undefined;

  setStatus("disconnected");
  $connectBtn.disabled = false;
  $sendBtn.disabled = true;
  $micBtn.disabled = true;
  $disconnectBtn.disabled = true;
  log("Disconnected.");
});

// ------------------------------------------------------------------ //
// Clear spans                                                        //
// ------------------------------------------------------------------ //

$clearSpans.addEventListener("click", () => {
  $spanLog.innerHTML = "No spans yet.";
  totalSpans = 0;
  $spanCount.textContent = "0";
});

// ------------------------------------------------------------------ //
// Helpers                                                            //
// ------------------------------------------------------------------ //

function setStatus(state: "disconnected" | "connecting" | "connected" | "error"): void {
  const labels: Record<string, string> = {
    disconnected: "Disconnected",
    connecting: "Connecting…",
    connected: "Connected",
    error: "Connection error",
  };
  $status.textContent = labels[state];
  $status.className = state === "connected" ? "status-connected" : "status-disconnected";
}

function appendTranscript(role: string, text: string): void {
  if ($transcript.textContent === "Waiting for connection…") {
    $transcript.textContent = "";
  }
  const prefix = role === "system" ? "" : `[${role}] `;
  $transcript.textContent += prefix + text;
  $transcript.scrollTop = $transcript.scrollHeight;
}

function log(msg: string): void {
  appendTranscript("system", msg + "\n");
}
