// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Enable OpenTelemetry tracing for Azure VoiceLive SDK sessions.
 *
 * This sample demonstrates how to instrument the VoiceLive SDK with
 * OpenTelemetry so that every WebSocket send/recv event, session connect,
 * and disconnect is traced with GenAI-semantic-convention attributes.
 *
 * Prerequisites:
 *   1. An Azure AI Foundry resource with a deployed realtime model.
 *   2. `npm install` in this directory.
 *   3. Set the environment variables listed in `sample.env`.
 *   4. (Optional) Run a local OTLP collector or Jaeger to visualise traces.
 *
 * Usage:
 *   AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true npx tsx index.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
  SpanExporter,
  ReadableSpan,
} from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { VoiceLiveClient, VoiceLiveInstrumentor } from "@azure/ai-voicelive";
import { DefaultAzureCredential } from "@azure/identity";

// ------------------------------------------------------------------ //
// File-based span exporter                                           //
// ------------------------------------------------------------------ //

/** Writes spans as newline-delimited JSON to a log file. */
class FileSpanExporter implements SpanExporter {
  private _stream: fs.WriteStream;

  constructor(filePath: string) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this._stream = fs.createWriteStream(filePath, { flags: "a" });
  }

  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    for (const span of spans) {
      // OTel v2 uses `parentSpanContext` instead of `parentSpanId`
      const parentCtx = (span as any).parentSpanContext;
      const entry = {
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
        parentSpanId: parentCtx?.spanId ?? (span as any).parentSpanId,
        name: span.name,
        kind: span.kind,
        startTime: span.startTime,
        endTime: span.endTime,
        duration: span.duration,
        status: span.status,
        attributes: span.attributes,
        events: span.events,
      };
      this._stream.write(JSON.stringify(entry) + "\n");
    }
    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  async shutdown(): Promise<void> {
    return new Promise((resolve) => this._stream.end(resolve));
  }
}

// ------------------------------------------------------------------ //
// 1. Set up the OpenTelemetry trace pipeline                         //
// ------------------------------------------------------------------ //

const logFile = process.env.VOICELIVE_TRACE_LOG ?? "voicelive-traces.jsonl";
const provider = new NodeTracerProvider();

// Export spans to a local log file (newline-delimited JSON)
provider.addSpanProcessor(new SimpleSpanProcessor(new FileSpanExporter(logFile)));
console.log(`Traces will be written to: ${path.resolve(logFile)}`);

// Also export to the console so you can see spans in the terminal
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Also export to an OTLP endpoint (e.g., Jaeger, Aspire Dashboard)
// Set OTEL_EXPORTER_OTLP_ENDPOINT to override the default http://localhost:4318
const otlpExporter = new OTLPTraceExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));

provider.register();

// ------------------------------------------------------------------ //
// 2. Instrument the VoiceLive SDK                                    //
// ------------------------------------------------------------------ //

const instrumentor = new VoiceLiveInstrumentor();

// `instrument()` is gated behind the AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING
// env var — it must be set to "true" for tracing to activate.
//
// To capture full event payloads (instructions, tool definitions, function call
// arguments, etc.) in span events, either:
//   1. Pass { enableContentRecording: true } below, or
//   2. Set the env var OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
instrumentor.instrument();

console.log("Instrumented:", instrumentor.isInstrumented());
console.log("Content recording:", instrumentor.isContentRecordingEnabled());

// ------------------------------------------------------------------ //
// 3. Use the SDK normally — traces are emitted automatically         //
// ------------------------------------------------------------------ //

async function main(): Promise<void> {
  const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT
    ?? "https://your-resource.cognitiveservices.azure.com";
  const credential = new DefaultAzureCredential();

  const client = new VoiceLiveClient(endpoint, credential);
  const session = await client.startSession("gpt-4o-realtime-preview");

  // Configure the session — this emits a "send session.update" span
  await session.updateSession({
    modalities: ["audio", "text"],
    instructions: "You are a helpful assistant. Respond concisely.",
    voice: {
      type: "azure-standard",
      name: "en-US-AvaNeural",
    },
    turnDetection: {
      type: "server_vad",
      threshold: 0.5,
      silenceDurationMs: 500,
    },
    inputAudioFormat: "pcm16",
    outputAudioFormat: "pcm16",
  });

  // Subscribe to events
  session.subscribe({
    onResponseAudioDelta: async (_event) => {
      // Audio deltas each emit a "recv response.audio.delta" span.
      // Note: text and audio_transcript deltas are skipped to reduce volume,
      // but audio deltas are traced because they carry byte-count metrics.
    },
    onResponseTextDelta: async (event) => {
      process.stdout.write(event.delta ?? "");
    },
    onResponseDone: async () => {
      console.log("\n[response.done — turn complete]");
    },
  });

  // Send a text message to start a conversation
  await session.addConversationItem({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What is Azure AI Foundry?" }],
  });

  await session.sendEvent({ type: "response.create" });

  // Wait for the response to complete
  await new Promise((resolve) => setTimeout(resolve, 10_000));

  // Disconnect — emits a "close" span and flushes session-level counters
  // (turn count, audio bytes sent/received, interruptions, etc.)
  await session.disconnect();

  // ------------------------------------------------------------------ //
  // 4. Shut down tracing                                               //
  // ------------------------------------------------------------------ //

  instrumentor.uninstrument();
  await provider.shutdown();
  console.log("\nTracing shut down. Spans have been exported.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
