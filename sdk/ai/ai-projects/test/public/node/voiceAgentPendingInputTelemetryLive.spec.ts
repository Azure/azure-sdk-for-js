// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AbortSignalLike } from "@azure/abort-controller";
import { context, trace, SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { inspect } from "node:util";
import type { InspectOptions } from "node:util";
import { isRestError } from "@azure/ai-projects";
import type {
  AIProjectClient,
  VoiceAgentAudioInputConfig,
  VoiceAgentConnection,
  VoiceAgentInputTranscriptionModel,
} from "@azure/ai-projects";
import { NodeWebSocketTransport } from "$internal/webSocketTransport.js";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransportLike.js";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import "dotenv/config";

const transcriptionPrefix = "conversation.item.input_audio_transcription.";
const transcriptionCompleted = `${transcriptionPrefix}completed`;
const sessionSpanName = "voice_agents.realtime.session";
const transcriptionModels = [
  "whisper-1",
  "gpt-realtime-whisper",
  "gpt-4o-transcribe",
  "gpt-4o-mini-transcribe",
  "gpt-4o-transcribe-diarize",
  "gpt-transcribe",
  "gpt-live-transcribe",
  "mai-transcribe",
  "azure-speech",
] as const satisfies readonly VoiceAgentInputTranscriptionModel[];

interface EventMetadata {
  type: string;
  eventId?: string;
  itemId?: string;
  previousItemId?: string;
  sessionId?: string;
  conversationId?: string;
  contentIndex?: number;
  contentPartIndices?: number[];
  audioBytes?: number;
  transcriptCharacters?: number;
  errorType?: string;
  errorCode?: string;
  errorParam?: string;
}

interface TimelineEntry {
  sequence: number;
  observedAt: string;
  elapsedInMs: number;
  channel: "wire" | "sdk_delivery" | "sdk_observation" | "client" | "control";
  action: string;
  metadata: Record<string, unknown>;
}

interface LiveRun {
  scenario: string;
  stage: string;
  failureStage?: string;
  checksPassed: boolean;
  cleanupFailures: string[];
  sessionSpanId?: string;
  transcriptionModel?: VoiceAgentInputTranscriptionModel;
  sentAudioBytes: number;
  timeline: TimelineEntry[];
}

interface WireMessage {
  data: string | ArrayBuffer;
  raw: Record<string, unknown>;
  metadata: EventMetadata;
  wireSequence: number;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function base64Bytes(value: string): number {
  return (
    Math.floor((value.length * 3) / 4) - (value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0)
  );
}

function eventMetadata(raw: Record<string, unknown>): EventMetadata {
  const item = asRecord(raw["item"]);
  const session = asRecord(raw["session"]);
  const metadata: EventMetadata = { type: String(raw["type"]) };
  for (const [key, value] of [
    ["eventId", raw["event_id"]],
    ["itemId", raw["item_id"] ?? item?.["id"]],
    ["previousItemId", raw["previous_item_id"]],
    ["sessionId", session?.["id"]],
    ["conversationId", raw["conversation_id"]],
  ] as const) {
    if (typeof value === "string") metadata[key] = value;
  }
  if (typeof raw["content_index"] === "number") {
    metadata.contentIndex = raw["content_index"];
  }
  if (Array.isArray(item?.["content"])) {
    metadata.contentPartIndices = item["content"].map((_, index) => index);
  }
  if (typeof raw["audio"] === "string") metadata.audioBytes = base64Bytes(raw["audio"]);
  if (raw["type"] === "response.output_audio.delta") {
    const delta = raw["delta"];
    if (typeof delta === "string") metadata.audioBytes = base64Bytes(delta);
    else if (delta instanceof Uint8Array) metadata.audioBytes = delta.byteLength;
  }
  if (typeof raw["transcript"] === "string") {
    metadata.transcriptCharacters = raw["transcript"].length;
  }
  const error = asRecord(raw["error"]);
  for (const [key, value] of [
    ["errorType", error?.["type"]],
    ["errorCode", error?.["code"]],
  ] as const) {
    if (
      typeof value === "string" &&
      [
        "invalid_request_error",
        "invalid_value",
        "invalid_type",
        "invalid_parameter",
        "model_not_found",
        "unsupported_value",
        "unsupported_parameter",
        "unsupported_model",
        "rate_limit_exceeded",
        "server_error",
      ].includes(value)
    ) {
      metadata[key] = value;
    }
  }
  const param = error?.["param"];
  if (typeof param === "string" && /^(session\.|audio\.)[a-zA-Z0-9_.]{1,120}$/.test(param)) {
    metadata.errorParam = param;
  }
  return metadata;
}

function recordTimeline(
  run: LiveRun,
  started: number,
  channel: TimelineEntry["channel"],
  action: string,
  metadata: Record<string, unknown> = {},
): void {
  run.timeline.push({
    sequence: run.timeline.length + 1,
    observedAt: new Date().toISOString(),
    elapsedInMs: performance.now() - started,
    channel,
    action,
    metadata,
  });
}

// Only SDK delivery is controlled: every forwarded message is the original real transport data.
class PendingInputTransport implements VoiceAgentWebSocketTransport {
  public readonly wire: WireMessage[] = [];
  public readonly delivered: WireMessage[] = [];
  public readonly held = new Set<WireMessage>();
  public failed = false;
  public closed = false;
  public turn: "A" | "B" | undefined;
  private readonly transport = new NodeWebSocketTransport();
  private handlers?: VoiceAgentWebSocketHandlers;
  private firstItemId?: string;
  private holdSecondTurn = false;
  private closeRequested = false;

  public constructor(
    private readonly run: LiveRun,
    private readonly started: number,
  ) {}

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
    this.transport.setHandlers({
      onMessage: (data) => {
        let raw: Record<string, unknown> | undefined;
        try {
          const parsed: unknown = JSON.parse(
            typeof data === "string" ? data : new TextDecoder().decode(data),
          );
          raw = asRecord(parsed);
        } catch {
          // Let the SDK process the genuine invalid message, without logging its payload.
        }
        if (!raw || typeof raw["type"] !== "string") {
          this.failed = true;
          this.note("wire", "unparseable_message");
          handlers.onMessage(data);
          return;
        }
        const message: WireMessage = {
          data,
          raw,
          metadata: eventMetadata(raw),
          wireSequence: this.wire.length + 1,
        };
        this.wire.push(message);
        this.note("wire", "received", { wireSequence: message.wireSequence, ...message.metadata });
        if (
          raw["type"] === "error" ||
          raw["type"] === `${transcriptionPrefix}failed` ||
          raw["type"] === "rtc.call.error"
        ) {
          this.failed = true;
        }
        const holdTranscription = message.metadata.type.startsWith(transcriptionPrefix);
        const holdSecondIdentity =
          this.holdSecondTurn &&
          (message.metadata.type.startsWith("input_audio_buffer.speech_") ||
            (message.metadata.itemId !== undefined &&
              message.metadata.itemId !== this.firstItemId));
        if (holdTranscription || holdSecondIdentity) {
          this.held.add(message);
          this.note("control", "held_original_message", {
            wireSequence: message.wireSequence,
            reason: holdTranscription ? "ASR delivery gate" : "B identity delivery gate",
            ...message.metadata,
          });
        } else {
          this.deliver(message);
        }
      },
      onClose: (code, reason, wasClean) => {
        this.closed = true;
        this.note("wire", "closed", { code, wasClean });
        this.note("sdk_delivery", "closed", { code, wasClean });
        handlers.onClose(code, reason, wasClean);
      },
      onError: (error) => {
        this.failed = true;
        this.note("wire", "transport_error");
        handlers.onError(error);
      },
    });
  }

  public connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    return this.transport.connect(options);
  }

  public async send(data: string, abortSignal?: AbortSignalLike): Promise<void> {
    const parsed: unknown = JSON.parse(data);
    const metadata = eventMetadata(asRecord(parsed) ?? {});
    this.note("client", "send_started", { turn: this.turn, ...metadata });
    await this.transport.send(data, abortSignal);
    this.note("client", "send_completed", { turn: this.turn, ...metadata });
  }

  public holdBIdentity(firstItemId: string): void {
    this.firstItemId = firstItemId;
    this.holdSecondTurn = true;
    this.turn = "B";
    this.note("control", "armed_B_identity_gate", { firstItemId });
  }

  public release(message: WireMessage): void {
    if (!this.held.delete(message)) {
      throw new Error("The requested genuine wire message was not held.");
    }
    this.note("control", "released_original_message", {
      wireSequence: message.wireSequence,
      ...message.metadata,
    });
    this.deliver(message);
  }

  public async close(code: number, reason: string): Promise<void> {
    if (!this.closeRequested) {
      this.closeRequested = true;
      this.note("control", "public_close_keeps_delivery_gates_closed", {
        heldMessages: this.held.size,
      });
    }
    await this.transport.close(code, reason);
    // Never flush held B messages as a side effect of closing the public connection.
  }

  private deliver(message: WireMessage): void {
    this.note("sdk_delivery", "original_onMessage_callback", {
      wireSequence: message.wireSequence,
      ...message.metadata,
    });
    this.handlers?.onMessage(message.data);
    this.delivered.push(message);
  }

  private note(
    channel: TimelineEntry["channel"],
    action: string,
    metadata?: Record<string, unknown>,
  ): void {
    recordTimeline(this.run, this.started, channel, action, metadata);
  }
}

// Spy only during the standard exporter's synchronous console.dir calls, not on other diagnostics.
class CapturingConsoleSpanExporter extends ConsoleSpanExporter {
  public constructor(
    private readonly records: unknown[],
    private readonly logs: string[],
  ) {
    super();
  }

  public override export(
    spans: ReadableSpan[],
    resultCallback: Parameters<ConsoleSpanExporter["export"]>[1],
  ): void {
    const capture = vi
      .spyOn(console, "dir")
      .mockImplementation((record: unknown, options?: InspectOptions) => {
        this.records.push(structuredClone(record));
        this.logs.push(inspect(record, { ...options, colors: false }));
      });
    try {
      super.export(spans, resultCallback);
    } finally {
      capture.mockRestore();
    }
  }
}

function genuineTranscript(message: WireMessage): string {
  const transcript = message.raw["transcript"];
  if (typeof transcript !== "string" || !transcript.trim()) {
    throw new Error("The real service did not return a nonempty input transcription.");
  }
  return transcript;
}

describe.runIf(isLiveMode())("Voice Agents pending-input telemetry (live)", () => {
  let recorder: Recorder | undefined;
  let client: AIProjectClient | undefined;
  let provider: NodeTracerProvider | undefined;
  let exporter: InMemorySpanExporter;
  let connection: VoiceAgentConnection | undefined;
  let transport: PendingInputTransport;
  let consume: Promise<void> | undefined;
  let streamFailed: boolean;
  let agentName: string | undefined;
  let run: LiveRun;
  let started: number;
  let sdkObservations: EventMetadata[];
  let consoleRecords: unknown[];
  const capturedRecords: unknown[] = [];
  const capturedLogs: string[] = [];
  const capturedRuns: LiveRun[] = [];

  beforeEach(async (testContext: VitestTestContext) => {
    started = performance.now();
    run = {
      scenario: testContext.task.name,
      stage: "setup",
      checksPassed: false,
      cleanupFailures: [],
      sentAudioBytes: 0,
      timeline: [],
    };
    recorder = undefined;
    client = undefined;
    provider = undefined;
    connection = undefined;
    consume = undefined;
    agentName = undefined;
    streamFailed = false;
    sdkObservations = [];
    consoleRecords = [];
    transport = new PendingInputTransport(run, started);
    trace.disable();
    context.disable();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({
      spanProcessors: [
        new SimpleSpanProcessor(exporter),
        new SimpleSpanProcessor(new CapturingConsoleSpanExporter(consoleRecords, capturedLogs)),
      ],
    });
    provider.register();
    try {
      recorder = await createRecorder(testContext);
    } catch {
      run.failureStage = run.stage;
      throw new Error("Live pending-input telemetry setup failed; no service error is logged.");
    }
  });

  afterEach(async () => {
    if (!run.checksPassed) run.failureStage ??= run.stage;
    for (const [stage, cleanup] of [
      ["close_connection", async () => connection?.close()],
      ["drain_public_iterator", async () => consume],
      [
        "delete_temporary_agent",
        async () => {
          if (!agentName || !client) return;
          try {
            await client.agents.delete(agentName, { abortSignal: AbortSignal.timeout(20_000) });
          } catch (error) {
            if (!isRestError(error) || error.statusCode !== 404) throw error;
          }
        },
      ],
      ["flush_provider", async () => provider?.forceFlush()],
    ] as const) {
      try {
        await cleanup();
      } catch {
        run.cleanupFailures.push(stage);
      }
    }
    run.sessionSpanId = exporter
      .getFinishedSpans()
      .find((span) => span.name === sessionSpanName)
      ?.spanContext().spanId;
    try {
      await provider?.shutdown();
    } catch {
      run.cleanupFailures.push("shutdown_provider");
    } finally {
      trace.disable();
      context.disable();
      try {
        await recorder?.stop();
      } catch {
        run.cleanupFailures.push("stop_recorder");
      }
    }
    capturedRecords.push(...consoleRecords);
    capturedRuns.push(run);
    const prefix = process.env["OUTPUT_PREFIX"]?.trim();
    const directory = process.env["VOICE_AGENT_PENDING_INPUT_TELEMETRY_OUTPUT_DIR"]?.trim();
    if (prefix || directory) {
      const output = prefix
        ? resolve(prefix)
        : resolve(directory!, "voice-agent-pending-input-telemetry");
      try {
        await mkdir(dirname(output), { recursive: true });
        await Promise.all([
          writeFile(`${output}.json`, JSON.stringify(capturedRecords, null, 2)),
          writeFile(`${output}.log`, `${capturedLogs.join("\n\n")}\n`),
          writeFile(
            `${output}.timeline.json`,
            JSON.stringify(
              {
                source: "Real Foundry WebSocket events with explicitly controlled SDK delivery",
                timingControl:
                  "A ASR completion is held until B is committed; B identity and ASR messages remain held until explicitly released or the public connection closes. Wire order is not claimed to reproduce the race naturally.",
                excludes: ["credentials", "handshake URLs", "raw media", "raw service errors"],
                runs: capturedRuns,
              },
              null,
              2,
            ),
          ),
        ]);
      } catch {
        throw new Error("Could not write the requested live telemetry artifacts.");
      }
    }
    if (run.cleanupFailures.length) {
      throw new Error("Live pending-input telemetry cleanup failed; see stage-only timeline.");
    }
  }, 90_000);

  async function waitFor<T>(lookup: () => T | undefined): Promise<T> {
    const activeTransport = transport;
    const deadline = performance.now() + 60_000;
    while (performance.now() < deadline) {
      if (activeTransport.failed || activeTransport.closed || streamFailed) {
        throw new Error("The real live stream failed before the expected event was observed.");
      }
      const result = lookup();
      if (result !== undefined) return result;
      await delay(25);
    }
    throw new Error("Timed out waiting for a genuine live service event.");
  }

  async function sendTurn(audio: Uint8Array, turn: "A" | "B"): Promise<void> {
    transport.turn = turn;
    run.stage = `send_audio_${turn}`;
    recordTimeline(run, started, "client", "audio_turn_started", {
      turn,
      audioBytes: audio.byteLength,
    });
    for (let offset = 0; offset < audio.byteLength; offset += 4800) {
      const chunk = audio.subarray(offset, offset + 4800);
      await connection!.sendAudio(chunk, { abortSignal: AbortSignal.timeout(20_000) });
      run.sentAudioBytes += chunk.byteLength;
      await delay((chunk.byteLength / 48_000) * 1000);
    }
    run.stage = `commit_audio_${turn}`;
    await connection!.commitAudio({ abortSignal: AbortSignal.timeout(20_000) });
    recordTimeline(run, started, "client", "public_commit_completed", {
      turn,
      audioBytes: audio.byteLength,
      totalAudioBytes: run.sentAudioBytes,
    });
  }

  it.each(["close_with_B_pending", "release_B_then_close"] as const)(
    "keeps late genuine A transcription correlated with A (%s)",
    async (scenario) => {
      run.scenario = scenario;
      try {
        run.stage = "select_managed_ASR";
        const requestedModel =
          process.env["FOUNDRY_VOICE_TRANSCRIPTION_MODEL"]?.trim() || "gpt-4o-mini-transcribe";
        const transcriptionModel = transcriptionModels.find((model) => model === requestedModel);
        if (!transcriptionModel) throw new Error("Unsupported typed managed ASR model.");
        run.transcriptionModel = transcriptionModel;
        const input: VoiceAgentAudioInputConfig = {
          format: { type: "audio/pcm", rate: 24000 },
          transcription: { model: transcriptionModel, language: "en" },
          // The serializer supports documented null, which the generated TS union omits.
          turn_detection: null as unknown as VoiceAgentAudioInputConfig["turn_detection"],
        };
        run.stage = "read_real_PCM_fixture";
        const audio = await readFile(resolve("samples-dev", "agents", "assets", "input.pcm"));
        expect(audio.byteLength).toBeGreaterThan(4800);
        expect(audio.byteLength % 2).toBe(0);
        client = createProjectsClient(recorder, {
          tracingOptions: { experimental: true, contentRecording: true },
          realtimeOptions: { webSocketFactory: { create: () => transport } },
          retryOptions: { maxRetries: 0 },
        });
        agentName = `voice-pending-otel-${randomUUID().slice(0, 12)}`;
        run.stage = "create_temporary_agent";
        await client.agents.create(
          agentName,
          {
            kind: "voice",
            model_type: "managed",
            model: process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime",
            instructions: "Wait for an explicit client response request before answering.",
            output_modalities: ["text"],
            audio: { input },
            store: false,
          },
          { foundryFeatures: "VoiceAgents=V1Preview", abortSignal: AbortSignal.timeout(30_000) },
        );
        run.stage = "connect_real_WebSocket";
        connection = await client.beta.voiceAgents.realtime.connect(agentName, {
          connectionTimeoutInMs: 20_000,
          abortSignal: AbortSignal.timeout(30_000),
          store: false,
        });
        const activeConnection = connection;
        consume = (async () => {
          try {
            for await (const event of activeConnection) {
              const raw = event.type === "unknown" ? event.rawEvent : asRecord(event);
              if (!raw) throw new Error("Expected an object-shaped SDK event.");
              const metadata = eventMetadata(raw);
              sdkObservations.push(metadata);
              recordTimeline(run, started, "sdk_observation", "public_iterator", { ...metadata });
            }
          } catch {
            streamFailed = true;
            recordTimeline(run, started, "sdk_observation", "iterator_failed");
          }
        })();
        run.stage = "wait_for_session_created";
        const created = await waitFor(() =>
          transport.delivered.find((message) => message.metadata.type === "session.created"),
        );
        expect(created.metadata.sessionId?.length).toBeGreaterThan(0);
        run.stage = "configure_manual_turns_and_ASR";
        await connection.configureSession(
          { type: "realtime", audio: { input }, output_modalities: ["text"] },
          { abortSignal: AbortSignal.timeout(20_000) },
        );
        const updated = await waitFor(() =>
          transport.delivered.find((message) => message.metadata.type === "session.updated"),
        );
        const session = asRecord(updated.raw["session"]);
        const effectiveInput = asRecord(asRecord(session?.["audio"])?.["input"]);
        expect(effectiveInput?.["turn_detection"]).toBeNull();
        expect(asRecord(effectiveInput?.["transcription"])?.["model"]).toBe(transcriptionModel);

        await sendTurn(audio, "A");
        run.stage = "wait_for_real_A_commit";
        const commitA = await waitFor(() =>
          transport.delivered.find(
            (message) => message.metadata.type === "input_audio_buffer.committed",
          ),
        );
        const itemA = commitA.metadata.itemId;
        expect(typeof itemA).toBe("string");
        expect(itemA?.length).toBeGreaterThan(0);
        await waitFor(() =>
          sdkObservations.find(
            (event) => event.type === "input_audio_buffer.committed" && event.itemId === itemA,
          ),
        );
        run.stage = "wait_for_real_A_ASR_while_held";
        const transcriptA = await waitFor(() =>
          transport.wire.find(
            (message) =>
              message.metadata.type === transcriptionCompleted && message.metadata.itemId === itemA,
          ),
        );
        genuineTranscript(transcriptA);
        expect(transcriptA.metadata.contentIndex).toBe(0);
        expect(transport.held.has(transcriptA)).toBe(true);

        transport.holdBIdentity(itemA!);
        await sendTurn(audio, "B");
        run.stage = "wait_for_real_B_commit_while_held";
        const commitB = await waitFor(() =>
          transport.wire.find(
            (message) =>
              message.metadata.type === "input_audio_buffer.committed" &&
              message.metadata.itemId !== itemA,
          ),
        );
        const itemB = commitB.metadata.itemId;
        expect(typeof itemB).toBe("string");
        expect(itemB?.length).toBeGreaterThan(0);
        expect(itemB).not.toBe(itemA);
        expect(transport.held.has(commitB)).toBe(true);
        run.stage = "wait_for_real_B_ASR_while_held";
        const transcriptB = await waitFor(() =>
          transport.wire.find(
            (message) =>
              message.metadata.type === transcriptionCompleted && message.metadata.itemId === itemB,
          ),
        );
        const textB = genuineTranscript(transcriptB);
        expect(transcriptB.metadata.contentIndex).toBe(0);
        expect(transport.held.has(transcriptB)).toBe(true);

        run.stage = "deliver_late_A_without_B_identity";
        transport.release(transcriptA);
        await waitFor(() =>
          sdkObservations.find(
            (event) => event.type === transcriptionCompleted && event.itemId === itemA,
          ),
        );
        expect(transport.delivered.some((message) => message.metadata.itemId === itemB)).toBe(
          false,
        );
        expect(sdkObservations.some((event) => event.itemId === itemB)).toBe(false);
        expect(transport.held.has(commitB)).toBe(true);

        if (scenario === "release_B_then_close") {
          run.stage = "deliver_B_acknowledgement_then_B_ASR";
          transport.release(commitB);
          await waitFor(() =>
            sdkObservations.find(
              (event) => event.type === "input_audio_buffer.committed" && event.itemId === itemB,
            ),
          );
          for (const message of transport.wire) {
            if (
              transport.held.has(message) &&
              message.metadata.itemId === itemB &&
              !message.metadata.type.startsWith(transcriptionPrefix)
            ) {
              transport.release(message);
            }
          }
          transport.release(transcriptB);
          await waitFor(() =>
            sdkObservations.find(
              (event) => event.type === transcriptionCompleted && event.itemId === itemB,
            ),
          );
        }
        run.stage = "full_public_close";
        await connection.close();
        const close = await connection.closed;
        await consume;
        expect(close.code).toBe(1000);
        expect(close.wasClean).toBe(true);
        expect(close.error).toBeUndefined();
        expect(connection.state).toBe("disconnected");
        expect(streamFailed).toBe(false);
        expect(transport.failed).toBe(false);
        if (scenario === "close_with_B_pending") {
          expect(transport.delivered.some((message) => message.metadata.itemId === itemB)).toBe(
            false,
          );
          expect(transport.held.has(commitB)).toBe(true);
          expect(transport.held.has(transcriptB)).toBe(true);
        }
        expect(transport.wire.some((message) => message.metadata.type === "response.created")).toBe(
          false,
        );
        expect(
          transport.wire.some((message) =>
            message.metadata.type.startsWith("input_audio_buffer.speech_"),
          ),
        ).toBe(false);

        run.stage = "assert_actual_exported_telemetry";
        await provider!.forceFlush();
        const spans = exporter.getFinishedSpans();
        const sessions = spans.filter((span) => span.name === sessionSpanName);
        expect(sessions).toHaveLength(1);
        const exported = sessions[0];
        const expectedMessages = [
          {
            role: "user",
            parts: [
              scenario === "close_with_B_pending"
                ? { type: "audio" }
                : { type: "audio", content: textB },
            ],
          },
        ];
        expect(JSON.parse(String(exported.attributes["gen_ai.input.messages"]))).toEqual(
          expectedMessages,
        );
        expect(run.sentAudioBytes).toBe(audio.byteLength * 2);
        expect(exported.attributes["az.ai.voice_agents.input.audio.bytes"]).toBe(
          run.sentAudioBytes,
        );
        expect(exported.attributes["az.ai.voice_agents.session.id"]).toBe(
          created.metadata.sessionId,
        );
        expect(exported.attributes["az.ai.voice_agents.connected"]).toBe(true);
        expect(exported.attributes["az.ai.voice_agents.close.code"]).toBe(1000);
        expect(exported.attributes["az.ai.voice_agents.close.was_clean"]).toBe(true);
        expect(exported.attributes["az.ai.voice_agents.responses.finished"]).toBe(0);
        expect(exported.status.code).not.toBe(SpanStatusCode.ERROR);
        expect(exported.kind).toBe(SpanKind.CLIENT);
        expect(exported.instrumentationScope.name).toBe("@azure/ai-projects");
        expect(spans.filter((span) => span.name === "invoke_agent")).toHaveLength(0);
        expect(
          exported.events.filter((event) => event.name === "voice_agents.transcription.completed"),
        ).toHaveLength(scenario === "close_with_B_pending" ? 1 : 2);
        expect(
          exported.events.filter((event) =>
            [
              "voice_agents.transcription.failed",
              "voice_agents.server_error",
              "voice_agents.send.failed",
            ].includes(event.name),
          ),
        ).toHaveLength(0);
        const consoleSession = consoleRecords
          .map(asRecord)
          .find((record) => record?.["name"] === sessionSpanName);
        expect(consoleSession?.["id"]).toBe(exported.spanContext().spanId);
        expect(consoleSession?.["events"]).toEqual(exported.events);
        const consoleAttributes = asRecord(consoleSession?.["attributes"]);
        expect(consoleAttributes?.["gen_ai.input.messages"]).toBe(
          exported.attributes["gen_ai.input.messages"],
        );
        expect(consoleAttributes?.["az.ai.voice_agents.input.audio.bytes"]).toBe(
          run.sentAudioBytes,
        );
        run.checksPassed = true;
        run.stage = "completed";
      } catch {
        run.failureStage = run.stage;
        recordTimeline(run, started, "control", "verification_failed", { stage: run.stage });
        throw new Error(
          `Live pending-input telemetry failed at ${run.stage}; inspect the timeline.`,
        );
      }
    },
    600_000,
  );
});
