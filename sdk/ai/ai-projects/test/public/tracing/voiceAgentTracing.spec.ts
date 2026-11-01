// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { trace, SpanStatusCode } from "@opentelemetry/api";
import type {
  Attributes,
  Context,
  Link,
  Span,
  SpanContext,
  SpanOptions,
  SpanStatus,
  TimeInput,
  Tracer,
} from "@opentelemetry/api";
import { AIProjectClient, VoiceAgentRealtimeClient } from "@azure/ai-projects";
import type { GenAITracingOptions, VoiceAgentRealtimeClientOptions } from "@azure/ai-projects";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransportLike.js";
import { resolveTracingConfig } from "$internal/tracing/configuration.js";
import * as metricHelpers from "$internal/tracing/metrics.js";

vi.mock("$internal/tracing/metrics.js", () => ({
  recordOperationDuration: vi.fn(),
  recordTokenUsage: vi.fn(),
}));

let spans: RecordedSpan[] = [];

class RecordedSpan implements Span {
  public attributes: Attributes = {};
  public events: { name: string; attributes?: Attributes }[] = [];
  public status: SpanStatus = { code: SpanStatusCode.UNSET };
  public endCount = 0;
  public readonly id: string;
  public readonly parentId?: string;

  public constructor(
    public name: string,
    parent?: Context,
  ) {
    this.id = String(spans.length + 1).padStart(16, "0");
    this.parentId = parent ? trace.getSpan(parent)?.spanContext().spanId : undefined;
    spans.push(this);
  }
  public spanContext(): SpanContext {
    return { traceId: "00000000000000000000000000000001", spanId: this.id, traceFlags: 1 };
  }
  public setAttribute(key: string, value: Attributes[string]): this {
    this.attributes[key] = value;
    return this;
  }
  public setAttributes(values: Attributes): this {
    Object.assign(this.attributes, values);
    return this;
  }
  public addEvent(name: string, attributes?: Attributes | TimeInput): this {
    this.events.push({
      name,
      attributes:
        typeof attributes === "object" &&
        !Array.isArray(attributes) &&
        !(attributes instanceof Date)
          ? attributes
          : undefined,
    });
    return this;
  }
  public addLink(_link: Link): this {
    return this;
  }
  public addLinks(_links: Link[]): this {
    return this;
  }
  public setStatus(status: SpanStatus): this {
    this.status = status;
    return this;
  }
  public updateName(name: string): this {
    this.name = name;
    return this;
  }
  public end(): void {
    this.endCount++;
  }
  public isRecording(): boolean {
    return this.endCount === 0;
  }
  public recordException(): void {}
}

const tracer: Tracer = {
  startSpan: (name: string, _options?: SpanOptions, parent?: Context) =>
    new RecordedSpan(name, parent),
  startActiveSpan: () => {
    throw new Error("Not used by this suite.");
  },
};
const endpoint = "https://example.services.ai.azure.com/api/projects/test";
const credential = {
  getToken: async () => ({ token: "PRIVATE_TOKEN", expiresOnTimestamp: Infinity }),
};
const enabled: GenAITracingOptions = { experimental: true };

class MockTransport implements VoiceAgentWebSocketTransport {
  public handlers?: VoiceAgentWebSocketHandlers;
  public options?: VoiceAgentWebSocketConnectOptions;
  public connectError?: Error;
  public sendError?: Error;
  public sendHandler?: (data: string) => Promise<void>;
  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }
  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    this.options = options;
    if (this.connectError) throw this.connectError;
    if (options.abortSignal?.aborted) throw new Error("aborted");
  }
  public async send(data: string): Promise<void> {
    if (this.sendError) throw this.sendError;
    await this.sendHandler?.(data);
  }
  public async close(code: number, reason: string): Promise<void> {
    this.handlers?.onClose(code, reason, code === 1000);
  }
  public receive(value: unknown): void {
    this.handlers?.onMessage(JSON.stringify(value));
  }
}

function client(tracingOptions: GenAITracingOptions | undefined = enabled): {
  realtime: VoiceAgentRealtimeClient;
  transport: MockTransport;
} {
  const transport = new MockTransport();
  const factory: VoiceAgentWebSocketFactory = { create: () => transport };
  const realtime = new AIProjectClient(endpoint, credential, {
    realtimeOptions: { webSocketFactory: factory },
    tracingOptions,
  }).beta.voiceAgents.realtime;
  return { realtime, transport };
}

function session(transport: MockTransport): void {
  transport.receive({
    type: "session.created",
    event_id: "event-session",
    conversation_id: "conv-1",
    session: {
      id: "sess-1",
      object: "realtime.session",
      type: "realtime",
      model: "voice-model",
      instructions: "PRIVATE_INSTRUCTIONS",
    },
  });
}

function inputAudioCommitted(transport: MockTransport, itemId: string): void {
  transport.receive({
    type: "input_audio_buffer.committed",
    event_id: `committed-${itemId}`,
    item_id: itemId,
  });
}

function inputTranscribed(transport: MockTransport, itemId: string, transcript: string): void {
  transport.receive({
    type: "conversation.item.input_audio_transcription.completed",
    event_id: `transcribed-${itemId}`,
    item_id: itemId,
    content_index: 0,
    transcript,
    usage: { type: "duration", seconds: 1 },
  });
}

function inputAudioCreated(transport: MockTransport, itemId: string): void {
  transport.receive({
    type: "conversation.item.created",
    event_id: `created-${itemId}`,
    item: {
      id: itemId,
      type: "message",
      role: "user",
      content: [{ type: "input_audio" }],
    },
  });
}

function created(transport: MockTransport, id = "resp-1"): void {
  transport.receive({
    type: "response.created",
    event_id: `event-${id}`,
    response: { id, status: "in_progress", conversation_id: "conv-1" },
  });
}

function done(transport: MockTransport, status = "completed", id = "resp-1"): void {
  transport.receive({
    type: "response.done",
    event_id: `event-done-${id}`,
    response: {
      id,
      status,
      conversation_id: "conv-1",
      output_modalities: ["audio"],
      usage: { input_tokens: 7, output_tokens: 12 },
    },
  });
}

function span(name: string): RecordedSpan {
  const found = spans.find((value) => value.name === name);
  if (!found) throw new Error(`No span ${name}`);
  return found;
}

function inputSummary(): unknown {
  return JSON.parse(
    String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
  );
}

describe("Voice Agents tracing", () => {
  beforeEach(() => {
    spans = [];
    vi.spyOn(trace, "getTracer").mockReturnValue(tracer);
    vi.mocked(metricHelpers.recordOperationDuration).mockClear();
    vi.mocked(metricHelpers.recordTokenUsage).mockClear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("uses the existing experimental tracing gate", async () => {
    vi.stubEnv("AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING", "false");
    for (const options of [{}, { experimental: false }]) {
      const { realtime } = client(options);
      await (await realtime.connect("voice")).close();
    }
    expect(spans).toHaveLength(0);
    expect(resolveTracingConfig({ experimental: true }).enabled).toBe(true);
    expect(resolveTracingConfig({ experimental: false }).enabled).toBe(false);
  });

  it("inherits project tracing for connection and response parentage", async () => {
    const { realtime, transport } = client(enabled);
    expect(spans).toHaveLength(0);
    const connection = await realtime.connect("voice", {
      structuredInputs: { secret: "PRIVATE_INPUT" },
      query: { custom: "PRIVATE_QUERY" },
    });
    session(transport);
    created(transport);
    done(transport);
    await connection.close(1000, "PRIVATE_CLOSE_REASON");
    expect(span("voice_agents.realtime.connect").parentId).toBe(
      span("voice_agents.realtime.session").id,
    );
    expect(span("invoke_agent").parentId).toBe(span("voice_agents.realtime.session").id);
    expect(span("invoke_agent").attributes).toMatchObject({
      "gen_ai.provider.name": "microsoft.foundry",
      "gen_ai.operation.name": "invoke_agent",
      "gen_ai.request.model": "voice-model",
      "gen_ai.response.id": "resp-1",
      "gen_ai.usage.input_tokens": 7,
      "gen_ai.usage.output_tokens": 12,
      "az.ai.voice_agents.response.status": "completed",
    });
    expect(metricHelpers.recordTokenUsage).toHaveBeenCalledWith(
      7,
      12,
      expect.objectContaining({ operationName: "invoke_agent", responseModel: "voice-model" }),
    );
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("keeps tracing configuration private to each project", async () => {
    const withoutTracing = client({ experimental: false });
    const withTracing = client(enabled);
    await (await withoutTracing.realtime.connect("voice")).close();
    expect(spans).toHaveLength(0);
    await (await withTracing.realtime.connect("voice")).close();
    expect(spans).toHaveLength(2);
    spans = [];
    const transport = new MockTransport();
    const standalone = new VoiceAgentRealtimeClient(endpoint, credential, {
      webSocketFactory: { create: () => transport },
    });
    await (await standalone.connect("voice")).close();
    expect(spans).toHaveLength(0);
  });

  it("preserves the existing public realtime options", () => {
    expectTypeOf<VoiceAgentRealtimeClientOptions>().not.toHaveProperty("tracingOptions");
  });

  it.each([false, true])(
    "preserves system-message roles (contentRecording=%s)",
    async (contentRecording) => {
      const { realtime } = client({ ...enabled, contentRecording });
      const connection = await realtime.connect("voice");
      await connection.sendEvent({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "system",
          content: [{ type: "input_text", text: "Recorded system instructions." }],
        },
      });
      await connection.close();
      expect(
        JSON.parse(
          String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
        ),
      ).toEqual([
        {
          role: "system",
          parts: [
            contentRecording
              ? { type: "text", content: "Recorded system instructions." }
              : { type: "text" },
          ],
        },
      ]);
    },
  );

  it.each([
    { mode: "manual", failed: false },
    { mode: "manual", failed: true },
    { mode: "vad", failed: false },
    { mode: "vad", failed: true },
  ])(
    "refreshes audio summaries between turns ($mode, failed=$failed)",
    async ({ mode, failed }) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      if (mode === "manual") await connection.commitAudio();
      inputAudioCommitted(transport, "turn-1");
      // Continuous input can arrive before the previous turn's transcription.
      await connection.sendAudio(new Uint8Array([4, 5, 6]));
      inputTranscribed(transport, "turn-1", "First turn transcript.");
      await connection.sendAudio(new Uint8Array([7, 8, 9]));
      if (mode === "manual") {
        await connection.commitAudio();
      } else {
        transport.receive({
          type: "input_audio_buffer.speech_started",
          event_id: "speech-started-2",
          item_id: "turn-2",
          audio_start_ms: 1000,
        });
        expect(
          JSON.parse(
            String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
          ),
        ).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
      }
      inputAudioCommitted(transport, "turn-2");
      if (failed) {
        transport.receive({
          type: "conversation.item.input_audio_transcription.failed",
          event_id: "transcription-failed-2",
          item_id: "turn-2",
          content_index: 0,
          error: { type: "server_error" },
        });
      }
      await connection.close();
      expect(
        JSON.parse(
          String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
        ),
      ).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
      expect(
        span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.audio.bytes"],
      ).toBe(9);
      if (failed) {
        expect(span("voice_agents.realtime.session").events).toContainEqual({
          name: "voice_agents.transcription.failed",
          attributes: undefined,
        });
      }
    },
  );

  it.each(["completed", "failed"])(
    "does not replace the latest audio transcript with an older turn (%s)",
    async (outcome) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      inputAudioCommitted(transport, "turn-1");
      await connection.sendAudio(new Uint8Array([4, 5, 6]));
      inputAudioCommitted(transport, "turn-2");
      inputTranscribed(transport, "turn-2", "Latest turn transcript.");
      if (outcome === "completed") {
        inputTranscribed(transport, "turn-1", "Older turn transcript.");
      } else {
        transport.receive({
          type: "conversation.item.input_audio_transcription.failed",
          event_id: "transcription-failed-1",
          item_id: "turn-1",
          content_index: 0,
          error: { type: "server_error" },
        });
      }
      await connection.close();
      expect(
        JSON.parse(
          String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
        ),
      ).toEqual([{ role: "user", parts: [{ type: "audio", content: "Latest turn transcript." }] }]);
    },
  );

  it.each([false, true])(
    "records explicit audio-message transcripts after buffered turns (hasItemId=%s)",
    async (hasItemId) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      inputAudioCommitted(transport, "turn-1");
      await connection.sendEvent({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          id: hasItemId ? "turn-2" : undefined,
          content: [{ type: "input_audio", audio: "AQID" }],
        },
      });
      inputAudioCreated(transport, "turn-2");
      inputTranscribed(transport, "turn-2", "Explicit audio transcript.");
      await connection.close();
      expect(
        JSON.parse(
          String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
        ),
      ).toEqual([
        { role: "user", parts: [{ type: "audio", content: "Explicit audio transcript." }] },
      ]);
    },
  );

  it.each([
    { committed: false, contentRecording: false },
    { committed: false, contentRecording: true },
    { committed: true, contentRecording: false },
    { committed: true, contentRecording: true },
  ])(
    "keeps newer pending audio when an older transcript arrives (committed=$committed, recording=$contentRecording)",
    async ({ committed, contentRecording }) => {
      const { realtime, transport } = client({ ...enabled, contentRecording });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      await connection.commitAudio();
      inputAudioCommitted(transport, "turn-A");
      await connection.sendAudio(new Uint8Array([4, 5, 6]));
      if (committed) await connection.commitAudio();
      inputTranscribed(transport, "turn-A", "PRIVATE_OLDER_TRANSCRIPT");
      await connection.close();
      expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
      expect(
        span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.audio.bytes"],
      ).toBe(6);
      expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    },
  );

  it("correlates overlapping commit acknowledgements to the input that was sent", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    for (let turn = 0; turn < 3; turn++) {
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      await connection.commitAudio();
    }
    for (const id of ["item-A", "item-B"]) {
      inputAudioCommitted(transport, id);
      inputTranscribed(transport, id, "PRIVATE_OLDER_TRANSCRIPT");
      expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    }
    inputAudioCommitted(transport, "item-C");
    inputTranscribed(transport, "item-C", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("does not associate an older acknowledgement with a newer uncommitted buffer", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.commitAudio();
    await connection.sendAudio(new Uint8Array([4, 5, 6]));
    inputAudioCommitted(transport, "item-A");
    inputTranscribed(transport, "item-A", "PRIVATE_OLDER_TRANSCRIPT");
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    await connection.commitAudio();
    inputAudioCommitted(transport, "item-B");
    inputTranscribed(transport, "item-B", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("does not consume a newer pending commit for a repeated older acknowledgement", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.commitAudio();
    inputAudioCommitted(transport, "item-A");
    await connection.sendAudio(new Uint8Array([4, 5, 6]));
    await connection.commitAudio();
    inputAudioCommitted(transport, "item-A");
    inputTranscribed(transport, "item-A", "PRIVATE_OLDER_TRANSCRIPT");
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    inputAudioCommitted(transport, "item-B");
    inputTranscribed(transport, "item-B", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
  });

  it.each([
    { input: "text", outcome: "completed" },
    { input: "text", outcome: "failed" },
    { input: "tool", outcome: "completed" },
    { input: "tool", outcome: "failed" },
  ])(
    "keeps newer non-audio input when older transcription finishes ($input, $outcome)",
    async ({ input, outcome }) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      await connection.commitAudio();
      inputAudioCommitted(transport, "item-A");
      if (input === "text") {
        await connection.sendText("Latest text.", { createResponse: false });
      } else {
        await connection.sendToolOutput("tool-B", "Latest result.", { createResponse: false });
      }
      const latest = inputSummary();
      if (outcome === "completed") {
        inputTranscribed(transport, "item-A", "PRIVATE_OLDER_TRANSCRIPT");
      } else {
        transport.receive({
          type: "conversation.item.input_audio_transcription.failed",
          event_id: "failed-A",
          item_id: "item-A",
          content_index: 0,
          error: { type: "server_error" },
        });
      }
      await connection.close();
      expect(inputSummary()).toEqual(latest);
      expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    },
  );

  it("correlates server-assigned IDs for overlapping explicit audio messages", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    for (let turn = 0; turn < 2; turn++) {
      await connection.sendEvent({
        type: "conversation.item.create",
        item: { type: "message", role: "user", content: [{ type: "input_audio", audio: "AQID" }] },
      });
    }
    inputAudioCreated(transport, "item-A");
    inputTranscribed(transport, "item-A", "PRIVATE_OLDER_TRANSCRIPT");
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    inputAudioCreated(transport, "item-B");
    inputTranscribed(transport, "item-B", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("correlates an audio acknowledgement received before its send resolves", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    let resolveSend!: () => void;
    transport.sendHandler = () => {
      inputAudioCreated(transport, "item-pending");
      inputTranscribed(transport, "item-pending", "Early transcript.");
      return new Promise<void>((resolve) => {
        resolveSend = resolve;
      });
    };

    const sending = connection.sendEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_audio", audio: "AQID" }],
      },
    });
    expect(resolveSend).toBeTypeOf("function");
    resolveSend();
    await sending;

    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Early transcript." }] },
    ]);
    await connection.close();
  });

  it.each([false, true])(
    "keeps newer text when an older audio send completes last (hasItemId=%s)",
    async (hasItemId) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      let resolveSend!: () => void;
      transport.sendHandler = () =>
        new Promise<void>((resolve) => {
          resolveSend = resolve;
        });
      const sending = connection.sendEvent({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          id: hasItemId ? "item-older" : undefined,
          content: [{ type: "input_audio", audio: "AQID" }],
        },
      });
      transport.sendHandler = undefined;
      await connection.sendText("Latest text.", { createResponse: false });
      const latest = [{ role: "user", parts: [{ type: "text", content: "Latest text." }] }];
      expect(inputSummary()).toEqual(latest);
      inputAudioCreated(transport, "item-older");
      inputTranscribed(transport, "item-older", "Older early transcript.");
      resolveSend();
      await sending;
      expect(inputSummary()).toEqual(latest);
      inputTranscribed(transport, "item-older", "Older late transcript.");
      expect(inputSummary()).toEqual(latest);
      await connection.close();
    },
  );

  it("preserves earlier audio input when a newer reserved text send fails", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_audio", audio: "AQID" }],
      },
    });
    inputAudioCreated(transport, "item-earlier");
    transport.sendError = new Error("send failed");
    await expect(
      connection.sendText("Unsent text.", { createResponse: false }),
    ).rejects.toMatchObject({ code: "sendFailed" });
    inputTranscribed(transport, "item-earlier", "Earlier transcript.");
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Earlier transcript." }] },
    ]);
    await connection.close();
  });

  it("rolls back reserved audio correlation when a send fails", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    const sendAudioMessage = (): Promise<void> =>
      connection.sendEvent({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_audio", audio: "AQID" }],
        },
      });

    transport.sendError = new Error("send failed");
    await expect(sendAudioMessage()).rejects.toMatchObject({ code: "sendFailed" });
    transport.sendError = undefined;
    await sendAudioMessage();
    inputAudioCreated(transport, "item-after-failure");
    inputTranscribed(transport, "item-after-failure", "Latest transcript.");
    await connection.close();

    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
  });

  it("does not clear a newer audio buffer when an earlier clear is acknowledged", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.clearInputAudio();
    await connection.sendAudio(new Uint8Array([4, 5, 6]));
    transport.receive({ type: "input_audio_buffer.cleared", event_id: "cleared-A" });
    await connection.sendAudio(new Uint8Array([7, 8, 9]));
    await connection.commitAudio();
    inputAudioCommitted(transport, "item-B");
    inputTranscribed(transport, "item-B", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
  });

  it("keeps a newer VAD item when an older commit arrives later", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    for (const id of ["item-A", "item-B"]) {
      transport.receive({
        type: "input_audio_buffer.speech_started",
        event_id: `speech-${id}`,
        item_id: id,
        audio_start_ms: 0,
      });
    }
    inputAudioCommitted(transport, "item-A");
    inputTranscribed(transport, "item-A", "PRIVATE_OLDER_TRANSCRIPT");
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    inputAudioCommitted(transport, "item-B");
    inputTranscribed(transport, "item-B", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
  });

  it("does not guess which pending audio item an uncorrelated transcript belongs to", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.commitAudio();
    inputTranscribed(transport, "unknown-item", "PRIVATE_UNCORRELATED_TRANSCRIPT");
    await connection.close();
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("bounds pending input correlation without assigning dropped acknowledgements to newer input", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    for (let turn = 0; turn < 65; turn++) {
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      await connection.commitAudio();
    }
    for (let turn = 0; turn < 65; turn++) {
      inputAudioCommitted(transport, `item-${turn}`);
      inputTranscribed(transport, `item-${turn}`, "PRIVATE_OLDER_TRANSCRIPT");
    }
    expect(inputSummary()).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    await connection.sendAudio(new Uint8Array([4, 5, 6]));
    await connection.commitAudio();
    inputAudioCommitted(transport, "latest-item");
    inputTranscribed(transport, "latest-item", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
    expect(
      span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.items.untracked"],
    ).toBe(1);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("retains the latest input identity when older delayed acknowledgements fill the cache", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    for (let turn = 0; turn < 64; turn++) {
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      await connection.commitAudio();
    }
    await connection.sendEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        id: "latest-item",
        content: [{ type: "input_audio", audio: "AQID" }],
      },
    });
    for (let turn = 0; turn < 64; turn++) {
      inputAudioCommitted(transport, `item-${turn}`);
    }
    inputTranscribed(transport, "latest-item", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
  });

  it("recovers the pending queue after overflowing VAD-identified commits are acknowledged", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    for (let turn = 0; turn < 65; turn++) {
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      transport.receive({
        type: "input_audio_buffer.speech_started",
        event_id: `speech-${turn}`,
        item_id: `item-${turn}`,
        audio_start_ms: 0,
      });
      await connection.commitAudio();
    }
    for (let turn = 0; turn < 65; turn++) {
      inputAudioCommitted(transport, `item-${turn}`);
    }
    await connection.sendAudio(new Uint8Array([4, 5, 6]));
    await connection.commitAudio();
    inputAudioCommitted(transport, "latest-item");
    inputTranscribed(transport, "latest-item", "Latest transcript.");
    await connection.close();
    expect(inputSummary()).toEqual([
      { role: "user", parts: [{ type: "audio", content: "Latest transcript." }] },
    ]);
    expect(
      span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.items.untracked"],
    ).toBe(1);
  });

  it.each(["client", "server"])(
    "refreshes the audio summary after clearing the input buffer (%s)",
    async (source) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      await connection.sendAudio(new Uint8Array([1, 2, 3]));
      inputAudioCommitted(transport, "turn-1");
      await connection.sendAudio(new Uint8Array([4, 5, 6]));
      inputTranscribed(transport, "turn-1", "First turn transcript.");
      if (source === "client") {
        await connection.clearInputAudio();
      } else {
        transport.receive({ type: "input_audio_buffer.cleared", event_id: "cleared" });
      }
      await connection.sendAudio(new Uint8Array([7, 8, 9]));
      await connection.close();
      expect(
        JSON.parse(
          String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
        ),
      ).toEqual([{ role: "user", parts: [{ type: "audio" }] }]);
    },
  );

  it("updates audio summaries once per input buffer, not for every chunk", async () => {
    const { realtime } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    const setAttribute = vi.spyOn(span("voice_agents.realtime.session"), "setAttribute");
    for (let buffer = 0; buffer < 2; buffer++) {
      for (let chunk = 0; chunk < 20; chunk++) {
        await connection.sendAudio(new Uint8Array([1, 2, 3]));
      }
      await connection.commitAudio();
    }
    await connection.close();
    expect(
      setAttribute.mock.calls.filter(([name]) => name === "gen_ai.input.messages"),
    ).toHaveLength(2);
    expect(
      span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.audio.bytes"],
    ).toBe(120);
  });

  it("captures text/audio/tool structure without contents and without chunk events", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    session(transport);
    await connection.sendText("PRIVATE_TEXT", { createResponse: false });
    expect(
      JSON.parse(String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"])),
    ).toEqual([{ role: "user", parts: [{ type: "text" }] }]);
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.sendAudio(new Uint8Array([4]));
    created(transport);
    for (let i = 0; i < 100; i++) {
      transport.receive({
        type: "response.output_audio.delta",
        event_id: `audio-${i}`,
        response_id: "resp-1",
        item_id: "item-1",
        delta: "AQID",
        output_index: 0,
        content_index: 0,
      });
    }
    transport.receive({
      type: "response.output_text.done",
      event_id: "text-done",
      response_id: "resp-1",
      item_id: "item-1",
      text: "PRIVATE_RESPONSE",
      output_index: 0,
      content_index: 0,
    });
    transport.receive({
      type: "response.function_call_arguments.done",
      event_id: "tool-done",
      response_id: "resp-1",
      call_id: "tool-1",
      item_id: "item-2",
      name: "PRIVATE_TOOL",
      arguments: '{"secret":"PRIVATE_ARGUMENT"}',
      output_index: 1,
    });
    transport.receive({
      type: "response.output_audio.done",
      event_id: "audio-done",
      response_id: "resp-1",
      item_id: "item-1",
      output_index: 0,
      content_index: 0,
    });
    done(transport);
    await connection.sendToolOutput("tool-1", "PRIVATE_TOOL_RESULT", { createResponse: false });
    await connection.close();
    expect(spans).toHaveLength(3);
    expect(span("invoke_agent").attributes["az.ai.voice_agents.output.audio.bytes"]).toBe(300);
    expect(
      span("voice_agents.realtime.session").attributes["az.ai.voice_agents.input.audio.bytes"],
    ).toBe(4);
    expect(span("invoke_agent").events).toHaveLength(1);
    expect(span("invoke_agent").attributes["gen_ai.output.messages"]).toBeDefined();
    expect(String(span("invoke_agent").attributes["gen_ai.output.messages"])).toContain(
      '"type":"audio"',
    );
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("records bounded text/transcript/tool content only when explicitly enabled", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendText("recorded text", { createResponse: false });
    created(transport);
    transport.receive({
      type: "response.output_audio_transcript.done",
      event_id: "transcript-done",
      response_id: "resp-1",
      item_id: "item-1",
      transcript: "recorded transcript",
      output_index: 0,
      content_index: 0,
    });
    done(transport);
    await connection.close();
    expect(
      String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
    ).toContain("recorded text");
    expect(String(span("invoke_agent").attributes["gen_ai.output.messages"])).toContain(
      "recorded transcript",
    );
    expect(JSON.stringify(spans)).not.toContain("PRIVATE_TOKEN");
  });

  it("bounds captured content and includes a local tool result only with content opt-in", async () => {
    const { realtime } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    await connection.sendText("x".repeat(10_000), { createResponse: false });
    const summary = String(
      span("voice_agents.realtime.session").attributes["gen_ai.input.messages"],
    );
    expect(summary.length).toBeLessThan(4200);
    await connection.sendToolOutput("tool-1", "recorded result", { createResponse: false });
    expect(
      String(span("voice_agents.realtime.session").attributes["gen_ai.input.messages"]),
    ).toContain("recorded result");
    await connection.close();
  });

  it.each([false, true])(
    "merges audio completion and transcript for the same part (transcriptFirst=%s)",
    async (transcriptFirst) => {
      const { realtime, transport } = client({ ...enabled, contentRecording: true });
      const connection = await realtime.connect("voice");
      created(transport);
      const audio = {
        type: "response.output_audio.done",
        event_id: "audio-done",
        response_id: "resp-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
      };
      const transcript = {
        ...audio,
        type: "response.output_audio_transcript.done",
        event_id: "transcript-done",
        transcript: "Hello.",
      };
      for (const event of transcriptFirst ? [transcript, audio] : [audio, transcript]) {
        transport.receive(event);
      }
      done(transport);
      await connection.close();
      expect(JSON.parse(String(span("invoke_agent").attributes["gen_ai.output.messages"]))).toEqual(
        [{ role: "assistant", parts: [{ type: "audio", content: "Hello." }] }],
      );
    },
  );

  it("ends tracing on authentication and malformed-event failures", async () => {
    const transport = new MockTransport();
    const badCredential = {
      getToken: async () => {
        throw new Error("PRIVATE_AUTH_FAILURE");
      },
    };
    const realtime = new AIProjectClient(endpoint, badCredential, {
      tracingOptions: enabled,
      realtimeOptions: { webSocketFactory: { create: () => transport } },
    }).beta.voiceAgents.realtime;
    await expect(realtime.connect("voice")).rejects.toMatchObject({ code: "authenticationFailed" });
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    spans = [];
    const next = client();
    const connection = await next.realtime.connect("voice");
    created(next.transport);
    next.transport.handlers?.onMessage("{");
    await connection.closed;
    expect(span("invoke_agent").status.code).toBe(SpanStatusCode.ERROR);
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
  });

  it("preserves distinct items with identical content-free summaries", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    created(transport);
    const output = ["item-1", "item-2"].map((id) => ({
      id,
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "PRIVATE_TEXT" }],
    }));
    for (const item of output) {
      transport.receive({
        type: "response.output_text.done",
        event_id: `done-${item.id}`,
        response_id: "resp-1",
        item_id: item.id,
        output_index: 0,
        content_index: 0,
        text: "PRIVATE_TEXT",
      });
    }
    transport.receive({
      type: "response.done",
      event_id: "response-done",
      response: { id: "resp-1", status: "completed", output },
    });
    await connection.close();
    expect(JSON.parse(String(span("invoke_agent").attributes["gen_ai.output.messages"]))).toEqual([
      { role: "assistant", parts: [{ type: "text" }] },
      { role: "assistant", parts: [{ type: "text" }] },
    ]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("uses final multipart output once, reconciling observed parts by item identity", async () => {
    const { realtime, transport } = client({ ...enabled, contentRecording: true });
    const connection = await realtime.connect("voice");
    created(transport);
    for (const content_index of [1, 0]) {
      transport.receive({
        type: "response.output_text.done",
        event_id: `done-${content_index}`,
        response_id: "resp-1",
        item_id: "item-1",
        output_index: 0,
        content_index,
        text: `part-${content_index}`,
      });
    }
    transport.receive({
      type: "response.done",
      event_id: "response-done",
      response: {
        id: "resp-1",
        status: "completed",
        output: [
          {
            id: "item-1",
            type: "message",
            role: "assistant",
            content: [
              { type: "output_text", text: "part-0" },
              { type: "output_text", text: "part-1" },
            ],
          },
        ],
      },
    });
    await connection.close();
    expect(JSON.parse(String(span("invoke_agent").attributes["gen_ai.output.messages"]))).toEqual([
      {
        role: "assistant",
        parts: [
          { type: "text", content: "part-0" },
          { type: "text", content: "part-1" },
        ],
      },
    ]);
  });

  it("reconciles final function output by call ID when the item ID is omitted", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    created(transport);
    transport.receive({
      type: "response.function_call_arguments.done",
      event_id: "tool-request",
      response_id: "resp-1",
      item_id: "item-1",
      output_index: 0,
      call_id: "tool-1",
      name: "PRIVATE_TOOL",
      arguments: "{}",
    });
    transport.receive({
      type: "response.done",
      event_id: "response-done",
      response: {
        id: "resp-1",
        status: "completed",
        output: [
          { type: "function_call", call_id: "tool-1", name: "PRIVATE_TOOL", arguments: "{}" },
        ],
      },
    });
    await connection.close();
    expect(JSON.parse(String(span("invoke_agent").attributes["gen_ai.output.messages"]))).toEqual([
      { role: "assistant", parts: [{ type: "tool_call", id: "tool-1" }] },
    ]);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it.each([false, true])(
    "retains known audio measurements on interruption (unexpected=%s)",
    async (unexpected) => {
      let now = 0;
      vi.spyOn(performance, "now").mockImplementation(() => now);
      const { realtime, transport } = client();
      const connection = await realtime.connect("voice");
      created(transport);
      now = 100;
      transport.receive({
        type: "response.output_audio.delta",
        event_id: "audio",
        response_id: "resp-1",
        item_id: "item-1",
        delta: "AQID",
        output_index: 0,
        content_index: 0,
      });
      now = 200;
      if (unexpected) transport.handlers?.onClose(1006, "PRIVATE_ERROR", false);
      else await connection.close();
      await connection.closed;
      expect(span("invoke_agent").attributes).toMatchObject({
        "az.ai.voice_agents.response.status": "interrupted",
        "az.ai.voice_agents.output.audio.bytes": 3,
        "az.ai.voice_agents.response.time_to_first_audio_seconds": 0.1,
      });
      expect(span("invoke_agent").endCount).toBe(1);
      expect(metricHelpers.recordTokenUsage).not.toHaveBeenCalled();
      expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    },
  );

  it("keeps send failures recoverable while recording their safe category", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    transport.sendError = new Error("PRIVATE_SEND_ERROR");
    await expect(connection.sendText("PRIVATE_TEXT")).rejects.toMatchObject({ code: "sendFailed" });
    expect(connection.state).toBe("connected");
    transport.sendError = undefined;
    await connection.close();
    expect(span("voice_agents.realtime.session").events).toContainEqual({
      name: "voice_agents.send.failed",
      attributes: { "error.type": "Error" },
    });
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("does not change REST results or create spans when tracing is disabled", async () => {
    const httpClient: HttpClient = {
      async sendRequest(request) {
        return { request, status: 204, headers: createHttpHeaders() };
      },
    };
    const project = new AIProjectClient(endpoint, credential, {
      tracingOptions: { experimental: false },
      httpClient,
    });
    await project.beta.voiceAgents.telephony.deleteBinding("voice", "binding", "*");
    await project.beta.voiceAgents.conversations.delete("voice", "conversation");
    expect(spans).toHaveLength(0);
  });

  it("records REST failures without recording service error messages", async () => {
    const httpClient: HttpClient = {
      async sendRequest(request) {
        return {
          request,
          status: 400,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify({
            error: { code: "invalid_request", message: "PRIVATE_REST_ERROR" },
          }),
        };
      },
    };
    const project = new AIProjectClient(endpoint, credential, {
      tracingOptions: enabled,
      httpClient,
      retryOptions: { maxRetries: 0 },
    });
    await expect(
      project.beta.agents.createFromPrompt({ kind: "voice", name: "voice" }),
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(span("create_agent").attributes["http.response.status_code"]).toBe(400);
    expect(span("create_agent").status.code).toBe(SpanStatusCode.ERROR);
    expect(span("create_agent").endCount).toBe(1);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("measures received-first-audio from response.created without assuming playback time", async () => {
    let now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    created(transport);
    now = 100;
    transport.receive({
      type: "response.output_audio.delta",
      event_id: "empty-audio",
      response_id: "resp-1",
      item_id: "item-1",
      delta: "",
      output_index: 0,
      content_index: 0,
    });
    now = 200;
    transport.receive({
      type: "response.output_audio.delta",
      event_id: "audio",
      response_id: "resp-1",
      item_id: "item-1",
      delta: "AQID",
      output_index: 0,
      content_index: 0,
    });
    now = 500;
    done(transport);
    await connection.close();
    expect(
      span("invoke_agent").attributes["az.ai.voice_agents.response.time_to_first_audio_seconds"],
    ).toBe(0.2);
    expect(metricHelpers.recordOperationDuration).toHaveBeenCalledWith(
      0.5,
      expect.objectContaining({ operationName: "invoke_agent" }),
    );
  });

  it.each(["completed", "cancelled", "incomplete", "failed"])(
    "preserves terminal response status %s",
    async (status) => {
      const { realtime, transport } = client();
      const connection = await realtime.connect("voice");
      created(transport);
      done(transport, status);
      done(transport, status);
      await connection.close();
      expect(span("invoke_agent").endCount).toBe(1);
      expect(span("invoke_agent").status.code).toBe(
        status === "failed"
          ? SpanStatusCode.ERROR
          : status === "completed"
            ? SpanStatusCode.OK
            : SpanStatusCode.UNSET,
      );
      expect(span("voice_agents.realtime.session").status.code).toBe(SpanStatusCode.UNSET);
      expect(metricHelpers.recordTokenUsage).toHaveBeenCalledTimes(1);
    },
  );

  it("records recoverable errors and MCP/subagent milestones without payloads", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    transport.receive({
      type: "error",
      event_id: "error",
      error: {
        type: "invalid_request_error",
        code: "PRIVATE_ERROR_CODE",
        message: "PRIVATE_ERROR",
      },
    });
    transport.receive({
      type: "response.mcp_call.completed",
      event_id: "mcp",
      item_id: "mcp-1",
      output_index: 0,
    });
    transport.receive({
      type: "session.subagent.completed",
      event_id: "sub",
      consultation_id: "consult-1",
      call_id: "tool-1",
      subagent_name: "PRIVATE_SUBAGENT",
    });
    expect(connection.state).toBe("connected");
    await connection.close();
    expect(span("voice_agents.realtime.session").events.map((event) => event.name)).toEqual([
      "voice_agents.server_error",
      "response.mcp_call.completed",
      "session.subagent.completed",
    ]);
    expect(span("voice_agents.realtime.session").status.code).toBe(SpanStatusCode.UNSET);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it.each(
    [
      {
        name: "warning",
        event: {
          type: "warning",
          event_id: "warning-1",
          warning: { message: "PRIVATE_WARNING", code: "PRIVATE_CODE", param: "PRIVATE_PARAM" },
        },
        expectedName: "voice_agents.warning",
        attributes: undefined,
      },
      ...["completed", "failed"].map((status) => ({
        name: `MCP ${status}`,
        event: {
          type: `response.mcp_call.${status}`,
          event_id: `mcp-${status}`,
          item_id: "mcp-1",
          output_index: 0,
        },
        expectedName: `response.mcp_call.${status}`,
        attributes: { "az.ai.voice_agents.item.id": "mcp-1" },
      })),
      ...["started", "completed"].map((status) => ({
        name: `subagent ${status}`,
        event: {
          type: `session.subagent.${status}`,
          event_id: `subagent-${status}`,
          consultation_id: "consult-1",
          call_id: "call-1",
          subagent_name: "PRIVATE_SUBAGENT",
        },
        expectedName: `session.subagent.${status}`,
        attributes: { "az.ai.voice_agents.subagent.consultation.id": "consult-1" },
      })),
      {
        name: "safe RTC error",
        event: {
          type: "rtc.call.error",
          operation: "PRIVATE_OPERATION",
          rtc_call_id: "PRIVATE_RTC_CALL",
          error: {
            type: "rate_limit_error",
            code: "rate_limit_exceeded",
            message: "PRIVATE_ERROR",
            param: "PRIVATE_PARAM",
          },
        },
        expectedName: "rtc.call.error",
        attributes: {
          "error.type": "rate_limit_error",
          "az.ai.voice_agents.error.code": "rate_limit_exceeded",
        },
      },
      {
        name: "unknown RTC error category",
        event: {
          type: "rtc.call.error",
          error: { type: "PRIVATE_TYPE", code: "PRIVATE_CODE", message: "PRIVATE_ERROR" },
        },
        expectedName: "rtc.call.error",
        attributes: { "error.type": "Error" },
      },
      {
        name: "failed input transcription",
        event: {
          type: "conversation.item.input_audio_transcription.failed",
          event_id: "transcription-failed",
          item_id: "audio-1",
          content_index: 0,
          error: { type: "PRIVATE_TYPE", code: "PRIVATE_CODE", message: "PRIVATE_ERROR" },
        },
        expectedName: "voice_agents.transcription.failed",
        attributes: undefined,
      },
    ].flatMap((testCase) =>
      [false, true].map((contentRecording) => ({ ...testCase, contentRecording })),
    ),
  )(
    "records safe $name telemetry without failing the session (contentRecording=$contentRecording)",
    async ({ event, expectedName, attributes, contentRecording }) => {
      const { realtime, transport } = client({ ...enabled, contentRecording });
      const connection = await realtime.connect("voice");
      transport.receive(event);
      expect(connection.state).toBe("connected");
      await connection.close();
      expect(span("voice_agents.realtime.session").events).toEqual([
        { name: expectedName, attributes },
      ]);
      expect(span("voice_agents.realtime.session").status.code).toBe(SpanStatusCode.UNSET);
      expect(spans.every((value) => value.endCount === 1)).toBe(true);
      expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    },
  );

  it.each(
    [
      "unknown_target",
      "timeout",
      "cancelled",
      "stopped_by_user",
      "superseded",
      "failed",
      "PRIVATE_REASON",
    ].flatMap((reason) => [false, true].map((contentRecording) => ({ reason, contentRecording }))),
  )(
    "records only safe subagent abort reasons ($reason, contentRecording=$contentRecording)",
    async ({ reason, contentRecording }) => {
      const { realtime, transport } = client({ ...enabled, contentRecording });
      const connection = await realtime.connect("voice");
      transport.receive({
        type: "session.subagent.aborted",
        event_id: "subagent-aborted",
        consultation_id: "consult-1",
        call_id: "call-1",
        subagent_name: "PRIVATE_SUBAGENT",
        reason,
      });
      await connection.close();
      expect(span("voice_agents.realtime.session").events).toEqual([
        {
          name: "session.subagent.aborted",
          attributes: {
            "az.ai.voice_agents.subagent.consultation.id": "consult-1",
            ...(reason === "PRIVATE_REASON"
              ? {}
              : { "az.ai.voice_agents.subagent.abort_reason": reason }),
          },
        },
      ]);
      expect(span("voice_agents.realtime.session").status.code).toBe(SpanStatusCode.UNSET);
      expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    },
  );

  it("records response cancellation requests without ending the active response", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    created(transport);
    await connection.cancelResponse({ responseId: "resp-1" });
    expect(span("invoke_agent").endCount).toBe(0);
    expect(span("voice_agents.realtime.session").events).toEqual([
      { name: "voice_agents.response.cancel_requested", attributes: undefined },
    ]);
    done(transport, "cancelled");
    await connection.close();
    expect(span("invoke_agent").attributes["az.ai.voice_agents.response.status"]).toBe("cancelled");
    expect(span("invoke_agent").status.code).toBe(SpanStatusCode.UNSET);
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
  });

  it("ends all active spans once on unexpected disconnect", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    created(transport);
    transport.handlers?.onClose(1006, "PRIVATE_ERROR", false);
    await connection.closed;
    await connection.close();
    expect(span("invoke_agent").attributes["az.ai.voice_agents.response.status"]).toBe(
      "interrupted",
    );
    expect(span("invoke_agent").status.code).toBe(SpanStatusCode.ERROR);
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("ends connection spans on authentication/handshake failure and aborted connect", async () => {
    const { realtime, transport } = client();
    transport.connectError = new Error("PRIVATE_HANDSHAKE");
    await expect(realtime.connect("voice")).rejects.toMatchObject({ code: "connectionFailed" });
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
    expect(span("voice_agents.realtime.connect").status.code).toBe(SpanStatusCode.ERROR);
    spans = [];
    const next = client();
    const controller = new AbortController();
    controller.abort();
    await expect(
      next.realtime.connect("voice", { abortSignal: controller.signal }),
    ).rejects.toMatchObject({ code: "operationCancelled" });
    expect(span("voice_agents.realtime.session").status.code).toBe(SpanStatusCode.UNSET);
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
  });

  it("does not invent spans for missing response.created or unknown events", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    done(transport);
    transport.receive({ type: "PRIVATE_UNKNOWN_TYPE", secret: "PRIVATE_BODY" });
    await connection.close();
    expect(spans).toHaveLength(2);
    expect(metricHelpers.recordTokenUsage).not.toHaveBeenCalled();
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
  });

  it("bounds pending response state and still closes all tracked spans", async () => {
    const { realtime, transport } = client();
    const connection = await realtime.connect("voice");
    for (let i = 0; i < 100; i++) created(transport, `resp-${i}`);
    await connection.close();
    expect(spans.filter((value) => value.name === "invoke_agent")).toHaveLength(64);
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
  });

  it("does not break SDK operations when a tracing provider throws", async () => {
    vi.mocked(trace.getTracer).mockImplementation(() => {
      throw new Error("PRIVATE_PROVIDER_ERROR");
    });
    const { realtime } = client();
    await (await realtime.connect("voice")).close();
  });

  it("traces beta generation and telephony acceptance without bodies", async () => {
    const httpClient: HttpClient = {
      async sendRequest(request) {
        const generate = request.url.includes("agents:generate");
        return {
          request,
          status: generate ? 200 : 202,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(
            generate
              ? {
                  id: "agent-1",
                  name: "voice",
                  object: "agent",
                  versions: {
                    latest: {
                      id: "version-1",
                      name: "voice",
                      version: "1",
                      created_at: 1,
                      definition: { kind: "voice", model_type: "managed" },
                    },
                  },
                }
              : {
                  id: "job-1",
                  object: "telephony.call_job",
                  status: "accepted",
                  destination: { type: "phone_number", value: "+15555550100" },
                  source: "+15555550200",
                  agent_name: "voice",
                  created_at: 1,
                  updated_at: 1,
                  retry_policy: { type: "none" },
                },
          ),
        };
      },
    };
    const project = new AIProjectClient(endpoint, credential, {
      tracingOptions: enabled,
      httpClient,
      retryOptions: { maxRetries: 0 },
    });
    await project.beta.agents.createFromPrompt({
      kind: "voice",
      name: "voice",
      goal: "PRIVATE_GOAL",
    });
    await project.beta.voiceAgents.telephony.createCallJob("voice", "PRIVATE_IDEMPOTENCY", {
      connection_name: "PRIVATE_CONNECTION",
      source: "+15555550200",
      destination: { type: "phone_number", value: "+15555550100" },
    });
    expect(span("create_agent").attributes["gen_ai.operation.name"]).toBe("create_agent");
    expect(span("voice_agents.telephony.create_call_job").attributes).toMatchObject({
      "az.ai.voice_agents.call_job.status": "accepted",
      "az.ai.voice_agents.telephony.call_job.id": "job-1",
    });
    expect(spans.every((value) => value.endCount === 1)).toBe(true);
    expect(JSON.stringify(spans)).not.toContain("PRIVATE");
    expect(JSON.stringify(spans)).not.toContain("+1555");
  });
});
