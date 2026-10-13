// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "@azure/ai-projects";
import type { VoiceAgentConnection } from "@azure/ai-projects";
import { trace, context } from "@opentelemetry/api";
import type { BrowserVoiceInput, BrowserVoiceResult } from "../voiceAgentBrowserTestTypes.js";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

async function runVoiceTelemetryTest(input: BrowserVoiceInput): Promise<BrowserVoiceResult> {
  trace.disable();
  context.disable();
  const exporter = new InMemorySpanExporter();
  const provider = new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
  trace.setGlobalTracerProvider(provider);
  const result: BrowserVoiceResult = {
    completed: false,
    nativeWebSocket: WebSocket.toString().includes("[native code]"),
    sentAudioBytes: 0,
    receivedAudioBytes: 0,
    receivedTextCharacters: 0,
    toolRequests: 0,
    serverEventCounts: {},
    spans: [],
  };
  let connection: VoiceAgentConnection | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const client = new AIProjectClient(
      input.endpoint,
      {
        getToken: async () => ({
          token: input.token,
          expiresOnTimestamp: input.expiresOnTimestamp,
        }),
      },
      {
        tracingOptions: {
          experimental: true,
          contentRecording: input.contentRecording,
          traceContextPropagation: false,
        },
      },
    );
    connection = await client.beta.voiceAgents.realtime.connect(input.agentName, {
      store: false,
      connectionTimeoutInMs: 20_000,
    });
    const active = connection;
    let inputComplete = !input.audio;
    let pendingToolOutput = false;
    timeout = setTimeout(() => {
      void active.close();
    }, 45_000);
    if (!input.audio) {
      await active.sendText(
        input.tool
          ? "BROWSER_TRACE_TEST_PROMPT: use get_current_time to tell me the UTC time."
          : "BROWSER_TRACE_TEST_PROMPT: say a brief hello.",
      );
    }
    const consume = async (): Promise<void> => {
      for await (const event of active) {
        if (event.type !== "unknown") {
          result.serverEventCounts[event.type] = (result.serverEventCounts[event.type] ?? 0) + 1;
        }
        if (event.type === "response.output_audio.delta") {
          result.receivedAudioBytes += event.delta.byteLength;
        } else if (event.type === "response.output_text.delta") {
          result.receivedTextCharacters += event.delta.length;
        } else if (event.type === "response.function_call_arguments.done") {
          if (!input.tool || event.name !== "get_current_time" || ++result.toolRequests > 3) {
            throw new Error("Unexpected browser tool request.");
          }
          await active.sendToolOutput(event.call_id, JSON.stringify({ time: "18:30 UTC" }), {
            createResponse: false,
          });
          pendingToolOutput = true;
        } else if (event.type === "error") {
          throw new Error("The browser Voice Agent reported an error.");
        } else if (event.type === "response.done") {
          if (event.response.status !== "completed") {
            throw new Error("The browser response did not complete.");
          }
          if (pendingToolOutput) {
            pendingToolOutput = false;
            await active.requestResponse();
            continue;
          }
          result.completed = true;
          if (inputComplete) break;
        }
      }
    };
    if (input.audio) {
      const audio = new Uint8Array(input.audio);
      const send = async (): Promise<void> => {
        try {
          for (let offset = 0; offset < audio.byteLength; offset += 4800) {
            const chunk = audio.subarray(offset, offset + 4800);
            await active.sendAudio(chunk);
            result.sentAudioBytes += chunk.byteLength;
            await new Promise<void>((resolve) =>
              setTimeout(resolve, (chunk.byteLength / 48000) * 1000),
            );
          }
          for (let index = 0; index < 10; index++) {
            await active.sendAudio(new Uint8Array(4800));
            result.sentAudioBytes += 4800;
            await new Promise<void>((resolve) => setTimeout(resolve, 100));
          }
        } finally {
          inputComplete = true;
          if (result.completed) await active.close();
        }
      };
      const work = [consume(), send()];
      try {
        await Promise.all(work);
      } finally {
        await active.close();
        await Promise.allSettled(work);
      }
    } else {
      await consume();
    }
  } catch (error) {
    // Return a failed test result with safe diagnostics, never credentials or exception payloads.
    result.failure = { type: error instanceof Error ? error.name : "Error" };
  } finally {
    if (timeout) clearTimeout(timeout);
    await connection?.close();
    await provider.forceFlush();
    result.spans = exporter
      .getFinishedSpans()
      .filter((span) => span.instrumentationScope.name === "@azure/ai-projects")
      .map((span) => ({
        name: span.name.replaceAll(input.agentName, "<test-agent>"),
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
        parentSpanId: span.parentSpanContext?.spanId,
        kind: span.kind,
        scope: span.instrumentationScope,
        durationInMs: span.duration[0] * 1000 + span.duration[1] / 1e6,
        statusCode: span.status.code,
        attributes: Object.fromEntries(
          Object.entries(span.attributes).map(([key, value]) => [
            key,
            key === "server.address" ? "<foundry-host>" : value,
          ]),
        ),
        events: span.events.map((event) => ({
          name: event.name,
          timestamp: new Date(event.time[0] * 1000 + event.time[1] / 1e6).toISOString(),
          attributes: event.attributes,
        })),
      }));
    await provider.shutdown();
    trace.disable();
    context.disable();
  }
  return result;
}

globalThis.runVoiceTelemetryTest = runVoiceTelemetryTest;
