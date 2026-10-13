// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { context, trace, SpanKind } from "@opentelemetry/api";
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import type {
  AIProjectClient,
  VoiceAgentConnection,
  VoiceAgentRealtimeEvent,
} from "@azure/ai-projects";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import "dotenv/config";

interface ObservedServerEvent {
  observedAt: string;
  type: VoiceAgentRealtimeEvent["type"];
  eventId?: string;
  sessionId?: string;
  conversationId?: string;
  responseId?: string;
  itemId?: string;
  toolCallId?: string;
  audioBytes?: number;
}

function eventMetadata(event: VoiceAgentRealtimeEvent): ObservedServerEvent {
  const entry: ObservedServerEvent = { observedAt: new Date().toISOString(), type: event.type };
  if (event.type === "unknown") return entry;
  if ("event_id" in event && typeof event.event_id === "string") entry.eventId = event.event_id;
  if ("response_id" in event && typeof event.response_id === "string") {
    entry.responseId = event.response_id;
  }
  if ("item_id" in event && typeof event.item_id === "string") entry.itemId = event.item_id;
  if ("call_id" in event && typeof event.call_id === "string") entry.toolCallId = event.call_id;
  if (event.type === "session.created" || event.type === "session.updated") {
    entry.sessionId = event.session.id;
  }
  if (event.type === "session.created") entry.conversationId = event.conversation_id;
  if (event.type === "response.created" || event.type === "response.done") {
    entry.responseId = event.response.id;
    entry.conversationId = event.response.conversation_id;
  }
  if (event.type === "response.output_audio.delta") entry.audioBytes = event.delta.byteLength;
  return entry;
}

describe.runIf(isLiveMode())("Voice Agents live telemetry", () => {
  let client: AIProjectClient | undefined;
  let recorder: Recorder;
  let exporter: InMemorySpanExporter;
  let provider: NodeTracerProvider;
  let connection: VoiceAgentConnection | undefined;
  let agentName: string | undefined;
  let checksPassed: boolean;
  let stage: string;
  let requestedAgentName: string | undefined;
  let recordingEnabled: boolean;
  let scenarioName: string;
  let serverEventCounts: Map<string, number>;
  let observedServerEvents: ObservedServerEvent[];
  let sentAudioBytes: number;
  let receivedTextCharacters: number;
  const capturedRuns: {
    scenario: string;
    stage: string;
    contentRecording: boolean;
    conventionChecksPassed: boolean;
    receivedServerEventCounts: Record<string, number>;
    observedServerEvents: ObservedServerEvent[];
    sentAudioBytes: number;
    receivedTextCharacters: number;
    spans: unknown[];
  }[] = [];

  beforeEach(async (testContext: VitestTestContext) => {
    checksPassed = false;
    stage = "setup";
    recordingEnabled = false;
    scenarioName = "text_to_audio";
    serverEventCounts = new Map();
    observedServerEvents = [];
    sentAudioBytes = 0;
    receivedTextCharacters = 0;
    client = undefined;
    requestedAgentName = undefined;
    connection = undefined;
    agentName = undefined;
    trace.disable();
    context.disable();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
    provider.register();
    recorder = await createRecorder(testContext);
  });

  afterEach(async () => {
    try {
      await connection?.close();
      if (agentName && client) {
        await client.agents.delete(agentName, { abortSignal: AbortSignal.timeout(20_000) });
      }
    } finally {
      try {
        await provider.forceFlush();
        const outputPath = process.env["VOICE_AGENT_TELEMETRY_OUTPUT_PATH"];
        if (outputPath) {
          const spans = exporter
            .getFinishedSpans()
            .filter((span) => span.instrumentationScope.name === "@azure/ai-projects")
            .map((span) => ({
              name: requestedAgentName
                ? span.name.replaceAll(requestedAgentName, "<test-agent>")
                : span.name,
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
                  key === "server.address"
                    ? "<foundry-host>"
                    : typeof value === "string" && requestedAgentName
                      ? value.replaceAll(requestedAgentName, "<test-agent>")
                      : value,
                ]),
              ),
              events: span.events.map((event) => ({
                name: event.name,
                timestamp: new Date(event.time[0] * 1000 + event.time[1] / 1e6).toISOString(),
                attributes: event.attributes,
              })),
            }));
          capturedRuns.push({
            scenario: scenarioName,
            stage,
            contentRecording: recordingEnabled,
            conventionChecksPassed: checksPassed,
            receivedServerEventCounts: Object.fromEntries(serverEventCounts),
            observedServerEvents,
            sentAudioBytes,
            receivedTextCharacters,
            spans,
          });
          await writeFile(
            outputPath,
            JSON.stringify(
              {
                source: "Actual Node OpenTelemetry exports from the live Foundry test attempt",
                redactions: ["server.address", "temporary agent name"],
                captureDiagnostics:
                  "Protocol counts/timeline are observed by this test, not additional OTel events; observedAt is iterator observation time. Raw media and event payloads are excluded.",
                runs: capturedRuns,
              },
              null,
              2,
            ),
          );
        }
      } finally {
        await provider.shutdown();
        trace.disable();
        context.disable();
        await recorder.stop();
      }
    }
  });

  it.each([
    { scenario: "text_to_audio", contentRecording: false },
    { scenario: "text_to_audio", contentRecording: true },
    { scenario: "local_function", contentRecording: true },
    { scenario: "text_to_text", contentRecording: true },
    { scenario: "audio_to_audio", contentRecording: true },
    { scenario: "audio_local_function", contentRecording: true },
  ])(
    "exports actual voice response spans ($scenario, contentRecording=$contentRecording)",
    async ({ scenario, contentRecording }) => {
      recordingEnabled = contentRecording;
      scenarioName = scenario;
      const toolFlow = scenario === "local_function" || scenario === "audio_local_function";
      const audioInput = scenario === "audio_to_audio" || scenario === "audio_local_function";
      const textOutput = scenario === "text_to_text";
      const outputModality = textOutput ? "text" : "audio";
      const projects = createProjectsClient(recorder, {
        tracingOptions: { experimental: true, contentRecording },
        retryOptions: { maxRetries: 0 },
      });
      client = projects;
      const name = `voice-otel-e2e-${randomUUID().slice(0, 8)}`;
      requestedAgentName = name;
      stage = "create_agent";
      await projects.agents.create(
        name,
        {
          kind: "voice",
          model_type: "managed",
          model: process.env["FOUNDRY_VOICE_MODEL"] || "gpt-realtime",
          instructions: toolFlow
            ? "For every user message, call get_current_time exactly once before answering, then say the returned time briefly."
            : "Respond briefly to the user's message.",
          output_modalities: [outputModality],
          store: false,
          audio: audioInput
            ? {
                input: {
                  format: { type: "audio/pcm", rate: 24000 },
                  turn_detection: {
                    type: "server_vad",
                    create_response: true,
                    interrupt_response: false,
                    silence_duration_ms: 500,
                  },
                },
                output: { format: { type: "audio/pcm", rate: 24000 } },
              }
            : undefined,
          tools: toolFlow
            ? [
                {
                  type: "function",
                  name: "get_current_time",
                  description: "Get the current UTC time.",
                  parameters: { type: "object", properties: {}, additionalProperties: false },
                },
              ]
            : undefined,
        },
        { foundryFeatures: "VoiceAgents=V1Preview", abortSignal: AbortSignal.timeout(30_000) },
      );
      agentName = name;
      stage = "websocket_connect";
      connection = await projects.beta.voiceAgents.realtime.connect(name, {
        connectionTimeoutInMs: 20_000,
        store: false,
      });
      let responseCompleted = false;
      let receivedAudioBytes = 0;
      let toolRequests = 0;
      let toolOutputPending = false;
      let inputComplete = !audioInput;
      stage = "streaming_response";
      const timeout = setTimeout(() => {
        void connection?.close();
      }, 45_000);
      try {
        if (!audioInput) {
          await connection.sendText(
            toolFlow
              ? "VOICE_TRACE_TEST_PROMPT: use get_current_time to tell me the UTC time."
              : "VOICE_TRACE_TEST_PROMPT: say a brief hello.",
          );
        }
        const activeConnection = connection;
        const consume = async (): Promise<void> => {
          for await (const event of activeConnection) {
            observedServerEvents.push(eventMetadata(event));
            if (event.type !== "unknown") {
              serverEventCounts.set(event.type, (serverEventCounts.get(event.type) ?? 0) + 1);
            }
            if (event.type === "response.output_audio.delta") {
              receivedAudioBytes += event.delta.byteLength;
            } else if (event.type === "response.output_text.delta") {
              receivedTextCharacters += event.delta.length;
            } else if (event.type === "response.function_call_arguments.done") {
              expect(toolFlow).toBe(true);
              expect(event.name).toBe("get_current_time");
              expect(++toolRequests).toBeLessThanOrEqual(3);
              await activeConnection.sendToolOutput(
                event.call_id,
                JSON.stringify({ time: "18:30 UTC" }),
                {
                  createResponse: false,
                },
              );
              toolOutputPending = true;
            } else if (event.type === "error") {
              throw new Error("The live Voice Agent reported a service error.");
            } else if (event.type === "response.done") {
              expect(event.response.status).toBe("completed");
              if (toolOutputPending) {
                toolOutputPending = false;
                await activeConnection.requestResponse();
                continue;
              }
              responseCompleted = true;
              if (inputComplete) break;
            }
          }
        };
        if (audioInput) {
          const audio = await readFile(resolve("samples-dev", "agents", "assets", "input.pcm"));
          const send = async (): Promise<void> => {
            try {
              for (let offset = 0; offset < audio.byteLength; offset += 4800) {
                const chunk = audio.subarray(offset, offset + 4800);
                await activeConnection.sendAudio(chunk);
                sentAudioBytes += chunk.byteLength;
                await delay((chunk.byteLength / 48000) * 1000);
              }
              for (let index = 0; index < 10; index++) {
                await activeConnection.sendAudio(new Uint8Array(4800));
                sentAudioBytes += 4800;
                await delay(100);
              }
            } finally {
              inputComplete = true;
              if (responseCompleted) await activeConnection.close();
            }
          };
          const work = [consume(), send()];
          try {
            await Promise.all(work);
          } finally {
            await activeConnection.close();
            await Promise.allSettled(work);
          }
        } else {
          await consume();
        }
      } finally {
        clearTimeout(timeout);
        await connection.close();
      }
      expect(responseCompleted).toBe(true);
      if (textOutput) {
        expect(receivedTextCharacters).toBeGreaterThan(0);
      } else {
        expect(receivedAudioBytes).toBeGreaterThan(0);
      }
      if (audioInput) expect(sentAudioBytes).toBeGreaterThan(0);
      if (toolFlow) expect(toolRequests).toBeGreaterThan(0);
      await provider.forceFlush();
      const spans = exporter.getFinishedSpans();
      const baseline = spans.find((span) => span.name.startsWith("create_agent "));
      const session = spans.find((span) => span.name === "voice_agents.realtime.session");
      const responses = spans.filter((span) => span.name === "invoke_agent");
      const response = responses.find((span) =>
        textOutput
          ? span.attributes["az.ai.voice_agents.response.status"] === "completed"
          : Number(span.attributes["az.ai.voice_agents.output.audio.bytes"]) > 0,
      );
      expect(baseline).toBeDefined();
      expect(session).toBeDefined();
      expect(response).toBeDefined();
      for (const current of [session, ...responses]) {
        expect(current?.kind).toBe(SpanKind.CLIENT);
        expect(current?.instrumentationScope.name).toBe(baseline?.instrumentationScope.name);
        expect(current?.attributes["gen_ai.provider.name"]).toBe(
          baseline?.attributes["gen_ai.provider.name"],
        );
        expect(current?.attributes["az.namespace"]).toBe(baseline?.attributes["az.namespace"]);
      }
      expect(response?.parentSpanContext?.spanId).toBe(session?.spanContext().spanId);
      expect(response?.attributes["gen_ai.operation.name"]).toBe("invoke_agent");
      expect(
        responses.reduce(
          (bytes, span) =>
            bytes + Number(span.attributes["az.ai.voice_agents.output.audio.bytes"] ?? 0),
          0,
        ),
      ).toBe(receivedAudioBytes);
      const outputMessages = JSON.parse(String(response?.attributes["gen_ai.output.messages"]));
      expect(outputMessages).toHaveLength(1);
      expect(outputMessages[0].parts).toHaveLength(1);
      expect(outputMessages[0].parts[0].type).toBe(outputModality);
      if (audioInput) {
        expect(session?.attributes["az.ai.voice_agents.input.audio.bytes"]).toBe(sentAudioBytes);
      }
      const serialized = JSON.stringify(spans.map((span) => span.attributes));
      if (contentRecording) {
        if (!toolFlow && !audioInput) expect(serialized).toContain("VOICE_TRACE_TEST_PROMPT");
      } else {
        expect(serialized).not.toContain("VOICE_TRACE_TEST_PROMPT");
      }
      if (toolFlow) {
        const toolEvent = responses
          .flatMap((span) => span.events)
          .find((event) => event.name === "voice_agents.tool.requested");
        const outputEvent = session?.events.find(
          (event) => event.name === "voice_agents.tool.output_sent",
        );
        expect(toolEvent).toBeDefined();
        expect(outputEvent?.attributes?.["gen_ai.tool.call.id"]).toBe(
          toolEvent?.attributes?.["gen_ai.tool.call.id"],
        );
      }
      checksPassed = true;
      stage = "complete";
    },
    120_000,
  );
});
