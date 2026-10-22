// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VoiceAgentLiveConnection,
  VoiceAgentLiveDefinition,
  VoiceAgentLiveEvent,
} from "@azure/ai-projects";
import { delay as delayWithAbort } from "@azure/core-util";

export type LiveE2EFlow = "text" | "audio" | "tools";
export type LiveE2ERuntime = "node" | "chromium";

export interface LiveE2EFailure {
  stage: string;
  code: string;
  status?: number;
}

export interface LiveE2EObservedEvent {
  sequence: number;
  elapsedMs: number;
  type: string;
  eventId?: string;
  sessionId?: string;
  delegationId?: string;
  responseId?: string;
  itemId?: string;
  callId?: string;
  responseEventType?: string;
  startMs?: number;
  endMs?: number;
  offsetMs?: number;
  audioBytes?: number;
  transcriptDelta?: string;
  status?: string;
  code?: string;
  reason?: string;
}

export interface LiveE2EToolCall {
  itemId?: string;
  callId: string;
  name: string;
  argumentsDeltaCount: number;
  argumentsDoneObserved: boolean;
  outputItemDone: true;
  resultSent: boolean;
}

export interface LiveE2EObservation {
  runtime: LiveE2ERuntime;
  flow: LiveE2EFlow;
  startedAt: string;
  sessionId?: string;
  inputTranscript: string;
  outputTranscript: string;
  backendTranscript: string;
  inputAudioBytes: number;
  inputSpeechBytes: number;
  outputAudioBytes: number;
  outputNonSilentSamples: number;
  tools: LiveE2EToolCall[];
  nativeEvents: LiveE2EObservedEvent[];
  terminal?: {
    sessionId: string;
    reason: string;
    usageSeconds: number;
    socketCode: number;
    wasClean: boolean;
  };
  diagnostics: {
    stage: string;
    outcome: "running" | "passed" | "failed";
    failures: LiveE2EFailure[];
    agentName?: string;
    agentDeleted?: boolean;
    nativeBrowserWebSocket?: boolean;
    browserSocketCreated?: number;
    browserSocketOpened?: number;
    browserSocketClosed?: number;
    browserHandshakeStatus?: number;
    toolResultsSent: number;
    continuationRequested: boolean;
  };
}

export interface BrowserLiveE2EInput {
  endpoint: string;
  agentName: string;
  flow: LiveE2EFlow;
  token: string;
  expiresOnTimestamp: number;
  pcm: number[];
}

export interface BrowserLiveE2EApi {
  run: (input: BrowserLiveE2EInput) => Promise<LiveE2EObservation>;
  snapshot: () => LiveE2EObservation | undefined;
}

export const liveE2ETimeouts = {
  connection: 15_000,
  session: 20_000,
  close: 8_000,
  flow: 55_000,
} as const;

export function createLiveE2EObservation(
  runtime: LiveE2ERuntime,
  flow: LiveE2EFlow,
): LiveE2EObservation {
  return {
    runtime,
    flow,
    startedAt: new Date().toISOString(),
    inputTranscript: "",
    outputTranscript: "",
    backendTranscript: "",
    inputAudioBytes: 0,
    inputSpeechBytes: 0,
    outputAudioBytes: 0,
    outputNonSilentSamples: 0,
    tools: [],
    nativeEvents: [],
    diagnostics: {
      stage: "setup",
      outcome: "running",
      failures: [],
      toolResultsSent: 0,
      continuationRequested: false,
    },
  };
}

export function createLiveE2EDefinition(
  flow: LiveE2EFlow,
  model: string,
  backendModel: string,
): VoiceAgentLiveDefinition {
  return {
    kind: "voice",
    sub_protocol: "live",
    model_type: "self_deployed",
    model,
    instructions:
      flow === "audio"
        ? "Answer the user's spoken question in one short sentence. Do not speak before the user."
        : "Communicate appended commentary promptly and briefly. Include any verification word exactly. Do not speak unless given commentary or an instruction to speak.",
    audio: { format: { type: "audio/pcm", rate: 24000 }, output: { voice: "marin" } },
    delegation:
      flow === "tools"
        ? {
            type: "responses",
            responses: {
              model: backendModel,
              instructions:
                "Use get_fixture_weather exactly once to answer the user's weather question. After its result, do not call tools again. Include the returned weather and verification_word in your answer, wrapped in [commentary] and [/commentary] tags so the Live speaker can read it.",
              parallel_tool_calls: false,
              tools: [
                {
                  type: "function",
                  name: "get_fixture_weather",
                  description: "Get the test weather and a verification word for a city.",
                  parameters: {
                    type: "object",
                    properties: { city: { type: "string" } },
                    required: ["city"],
                    additionalProperties: false,
                  },
                  strict: true,
                },
              ],
            },
          }
        : { type: "client" },
    store: false,
  };
}

export function requireLiveE2E(condition: unknown, code: string, stage: string): asserts condition {
  if (!condition) {
    const error = new Error(`GPT Live E2E: stage=${stage} code=${code}`);
    Object.assign(error, { code, stage });
    throw error;
  }
}

export function recordLiveE2EFailure(
  observation: LiveE2EObservation,
  error: unknown,
  stage = observation.diagnostics.stage,
): void {
  const details = isRecord(error) ? error : {};
  const failure: LiveE2EFailure = {
    stage: safeLabel(details.stage) ?? safeLabel(stage) ?? "unknown_stage",
    code: safeLabel(details.code) ?? safeLabel(details.name) ?? "unexpected_failure",
    status:
      typeof details.statusCode === "number" &&
      Number.isInteger(details.statusCode) &&
      details.statusCode >= 100 &&
      details.statusCode <= 599
        ? details.statusCode
        : undefined,
  };
  if (
    !observation.diagnostics.failures.some(
      (previous) =>
        previous.stage === failure.stage &&
        previous.code === failure.code &&
        previous.status === failure.status,
    )
  ) {
    observation.diagnostics.failures.push(failure);
  }
  observation.diagnostics.outcome = "failed";
}

interface PendingToolCall {
  observation: LiveE2EToolCall;
  arguments: string;
}

export async function exerciseLiveE2E(
  connection: VoiceAgentLiveConnection,
  flow: LiveE2EFlow,
  pcm: Uint8Array,
  observation: LiveE2EObservation,
): Promise<void> {
  const started = Date.now();
  const deadline = started + liveE2ETimeouts.flow;
  const tools = new Map<string, PendingToolCall>();
  const argumentStreams = new Map<string, { deltaCount: number; doneObserved: boolean }>();
  const completedResponses: { id?: string; afterToolResult: boolean }[] = [];
  let instructionsAcknowledged = false;
  let commentaryAcknowledged = false;
  let sending = true;
  let socketClosed = false;
  let lastOutputTranscriptAt = 0;
  const seenEvents = new Set<string>();

  const observe = (event: VoiceAgentLiveEvent): void => {
    if ("event_id" in event && seenEvents.has(event.event_id)) return;
    if ("event_id" in event) seenEvents.add(event.event_id);
    const metadata: LiveE2EObservedEvent = {
      sequence: observation.nativeEvents.length,
      elapsedMs: Date.now() - started,
      type: event.type === "unknown" ? (safeLabel(event.eventType) ?? "unknown") : event.type,
      eventId: "event_id" in event ? safeIdentifier(event.event_id) : undefined,
      startMs: "start_ms" in event ? event.start_ms : undefined,
      endMs: "end_ms" in event ? event.end_ms : undefined,
      offsetMs: "offset_ms" in event ? event.offset_ms : undefined,
    };
    observation.nativeEvents.push(metadata);
    switch (event.type) {
      case "session.started":
      case "session.updated":
      case "session.closed":
        metadata.sessionId = safeIdentifier(event.session.id);
        observation.sessionId = metadata.sessionId;
        requireLiveE2E(event.session.store !== true, "unexpected_native_persistence", "session");
        if (event.type === "session.started") {
          requireLiveE2E(!event.conversation_id, "unexpected_stored_conversation", "session");
        }
        if (event.type === "session.closed") metadata.reason = event.reason;
        break;
      case "session.instructions.appended":
        instructionsAcknowledged = true;
        break;
      case "session.commentary.appended":
        commentaryAcknowledged = true;
        break;
      case "session.output_audio.delta": {
        let audio = "";
        try {
          audio = atob(event.delta);
        } catch {
          requireLiveE2E(false, "invalid_base64_audio", "output-audio");
        }
        metadata.audioBytes = audio.length;
        requireLiveE2E(audio.length % 2 === 0, "invalid_pcm_output", "output-audio");
        for (let offset = 0; offset < audio.length; offset += 2) {
          const sample = audio.charCodeAt(offset) | (audio.charCodeAt(offset + 1) << 8);
          const signed = sample >= 32768 ? sample - 65536 : sample;
          if (Math.abs(signed) > 64) observation.outputNonSilentSamples++;
        }
        observation.outputAudioBytes += audio.length;
        break;
      }
      case "session.input_transcript.delta":
        metadata.transcriptDelta = event.delta;
        observation.inputTranscript += event.delta;
        break;
      case "session.output_transcript.delta":
        metadata.transcriptDelta = event.delta;
        observation.outputTranscript += event.delta;
        lastOutputTranscriptAt = Date.now();
        break;
      case "session.delegation.created":
        metadata.delegationId = safeIdentifier(event.delegation.id);
        metadata.responseId = safeIdentifier(event.delegation.response_id);
        break;
      case "error":
      case "transport.failed":
        metadata.code = safeLabel(event.error.code);
        requireLiveE2E(false, metadata.code ?? "live_service_error", "native-error");
        break;
      case "response.event": {
        metadata.delegationId = safeIdentifier(event.delegation_id);
        const backend: Record<string, unknown> = event.event;
        metadata.responseEventType = safeLabel(backend.type);
        const response = isRecord(backend.response) ? backend.response : undefined;
        const item = isRecord(backend.item) ? backend.item : undefined;
        metadata.responseId = safeIdentifier(response?.id);
        metadata.status = safeLabel(response?.status);
        metadata.itemId = safeIdentifier(backend.item_id) ?? safeIdentifier(item?.id);
        metadata.callId = safeIdentifier(item?.call_id);
        if (
          backend.type === "response.function_call_arguments.delta" ||
          backend.type === "response.function_call_arguments.done"
        ) {
          if (metadata.itemId) {
            const stream = argumentStreams.get(metadata.itemId) ?? {
              deltaCount: 0,
              doneObserved: false,
            };
            if (backend.type === "response.function_call_arguments.delta") stream.deltaCount++;
            else stream.doneObserved = true;
            argumentStreams.set(metadata.itemId, stream);
            for (const tool of tools.values()) {
              if (tool.observation.itemId !== metadata.itemId) continue;
              tool.observation.argumentsDeltaCount = stream.deltaCount;
              tool.observation.argumentsDoneObserved = stream.doneObserved;
            }
          }
        }
        if (backend.type === "response.output_item.done" && item?.type === "function_call") {
          const callId = safeIdentifier(item.call_id);
          const name = safeLabel(item.name);
          requireLiveE2E(
            callId && name && typeof item.arguments === "string",
            "invalid_function_call",
            "tool-call",
          );
          // Completed items are authoritative; forwarding granular argument events is optional.
          if (!tools.has(callId)) {
            const stream = metadata.itemId ? argumentStreams.get(metadata.itemId) : undefined;
            const tool: LiveE2EToolCall = {
              itemId: metadata.itemId,
              callId,
              name,
              argumentsDeltaCount: stream?.deltaCount ?? 0,
              argumentsDoneObserved: stream?.doneObserved ?? false,
              outputItemDone: true,
              resultSent: false,
            };
            observation.tools.push(tool);
            tools.set(callId, { observation: tool, arguments: item.arguments });
          }
        }
        if (backend.type === "response.output_text.delta") {
          requireLiveE2E(typeof backend.delta === "string", "invalid_backend_text", "backend-text");
          observation.backendTranscript += backend.delta;
        }
        if (backend.type === "response.completed") {
          requireLiveE2E(
            response?.status === "completed",
            "backend_not_completed",
            "backend-response",
          );
          completedResponses.push({
            id: metadata.responseId,
            afterToolResult: observation.diagnostics.toolResultsSent > 0,
          });
        }
        if (
          backend.type === "response.failed" ||
          backend.type === "response.incomplete" ||
          backend.type === "error"
        ) {
          const details = isRecord(backend.error) ? backend.error : undefined;
          metadata.code = safeLabel(details?.code);
          requireLiveE2E(false, metadata.code ?? "backend_response_failed", "backend-response");
        }
        break;
      }
    }
  };

  const receive = (async () => {
    for await (const event of connection) observe(event);
  })().catch((error: unknown) => recordLiveE2EFailure(observation, error, "receive"));
  void connection.closed.then(() => {
    socketClosed = true;
    return undefined;
  });
  const send = (async () => {
    // Live advances on a continuous audio clock, including for appended text and Responses.
    if (flow === "audio") {
      requireLiveE2E(pcm.length > 0 && pcm.length % 2 === 0, "invalid_pcm_fixture", "input-audio");
      for (let offset = 0; sending && offset < pcm.length; offset += 4800) {
        const chunk = pcm.subarray(offset, offset + 4800);
        await connection.sendAudio(chunk);
        observation.inputAudioBytes += chunk.length;
        observation.inputSpeechBytes += chunk.length;
        await delay((chunk.length / 48_000) * 1000);
      }
    }
    const silence = new Uint8Array(4800);
    while (sending) {
      await connection.sendAudio(silence);
      observation.inputAudioBytes += silence.length;
      await delay(100);
    }
  })().catch((error: unknown) => recordLiveE2EFailure(observation, error, "send-audio"));

  async function until(predicate: () => boolean, stage: string): Promise<void> {
    observation.diagnostics.stage = stage;
    while (!predicate()) {
      requireLiveE2E(observation.diagnostics.failures.length === 0, "stream_failed", stage);
      requireLiveE2E(!socketClosed, "premature_socket_close", stage);
      requireLiveE2E(Date.now() < deadline, "flow_timeout", stage);
      await delay(25);
    }
  }

  try {
    observation.diagnostics.stage = "session";
    requireLiveE2E(connection.session.id, "missing_session_id", "session");
    requireLiveE2E(connection.session.store !== true, "unexpected_native_persistence", "session");
    if (flow === "text") {
      observation.diagnostics.stage = "append-text";
      await connection.appendInstructions(
        "Speak the next commentary now, in one sentence. Include the words amber lighthouse, then listen silently.",
      );
      await connection.appendCommentary("The amber lighthouse is ready.");
      await until(
        () =>
          instructionsAcknowledged &&
          commentaryAcknowledged &&
          /amber lighthouse.*ready/i.test(observation.outputTranscript) &&
          observation.outputAudioBytes >= 4800,
        "text-output",
      );
    } else if (flow === "audio") {
      await until(
        () =>
          observation.inputSpeechBytes === pcm.length &&
          observation.inputTranscript.trim().length >= 8 &&
          observation.outputTranscript.trim().length >= 20 &&
          observation.outputAudioBytes >= 4800,
        "audio-output",
      );
    } else {
      observation.diagnostics.stage = "request-tool";
      await connection.sendResponseItem({
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "What is the weather in Seattle? Call get_fixture_weather, then tell me the weather and the verification word returned by that tool.",
          },
        ],
      });
      await connection.requestResponse();
      await until(
        () => observation.tools.length > 0 && completedResponses.length > 0,
        "tool-output-item",
      );
      requireLiveE2E(tools.size === 1, "unexpected_tool_count", "tool-result");
      const tool = tools.values().next().value;
      requireLiveE2E(tool, "missing_tool_call", "tool-result");
      requireLiveE2E(
        tool.observation.name === "get_fixture_weather",
        "unexpected_function",
        "tool-result",
      );
      let args: unknown;
      try {
        args = JSON.parse(tool.arguments);
      } catch {
        requireLiveE2E(false, "invalid_function_arguments_json", "tool-result");
      }
      requireLiveE2E(
        isRecord(args) && typeof args.city === "string" && /^seattle$/i.test(args.city.trim()),
        "unexpected_city_argument",
        "tool-result",
      );
      const beforeTranscript = observation.outputTranscript.length;
      const beforeAudio = observation.outputAudioBytes;
      observation.diagnostics.stage = "send-tool-result";
      await connection.sendToolOutput(
        tool.observation.callId,
        JSON.stringify({
          city: "Seattle",
          condition: "sunny",
          temperature_celsius: 21,
          verification_word: "bluebird",
        }),
        { createResponse: false },
      );
      tool.observation.resultSent = true;
      observation.diagnostics.toolResultsSent++;
      await connection.requestResponse();
      observation.diagnostics.continuationRequested = true;
      await until(
        () =>
          completedResponses.some((response) => response.afterToolResult) &&
          /bluebird/i.test(observation.backendTranscript) &&
          /bluebird/i.test(observation.outputTranscript.slice(beforeTranscript)) &&
          observation.outputAudioBytes > beforeAudio,
        "tool-continuation",
      );
      requireLiveE2E(tools.size === 1, "repeated_function_call", "tool-continuation");
    }
    // Live has no transcript/audio done event. Let the last spoken fragment settle before closing.
    await until(() => Date.now() - lastOutputTranscriptAt >= 750, "settle-output");
    requireLiveE2E(observation.inputAudioBytes > 0, "no_input_audio", "assertions");
    requireLiveE2E(observation.outputAudioBytes > 0, "no_output_audio", "assertions");
    requireLiveE2E(observation.outputNonSilentSamples > 200, "no_audible_output", "assertions");
  } catch (error) {
    recordLiveE2EFailure(observation, error);
  } finally {
    sending = false;
    await send;
    observation.diagnostics.stage = "close-session";
    try {
      await connection.close();
    } catch (error) {
      recordLiveE2EFailure(observation, error);
    }
    const closed = await connection.closed;
    await receive;
    if (closed.error) recordLiveE2EFailure(observation, closed.error, "socket-close");
    if (closed.sessionClosed) {
      try {
        observe(closed.sessionClosed);
      } catch (error) {
        recordLiveE2EFailure(observation, error, "terminal-event");
      }
      observation.terminal = {
        sessionId: closed.sessionClosed.session.id,
        reason: closed.sessionClosed.reason,
        usageSeconds: closed.sessionClosed.usage.seconds,
        socketCode: closed.code,
        wasClean: closed.wasClean,
      };
    } else {
      recordLiveE2EFailure(observation, { code: "missing_session_closed" }, "terminal-event");
    }
    if (
      !observation.terminal ||
      observation.terminal.reason !== "close_requested" ||
      !observation.terminal.wasClean
    ) {
      recordLiveE2EFailure(observation, { code: "unclean_session_outcome" }, "terminal-event");
    }
    observation.diagnostics.stage = "finished";
    observation.diagnostics.outcome =
      observation.diagnostics.failures.length > 0 ? "failed" : "passed";
  }
}

function safeLabel(value: unknown): string | undefined {
  return typeof value === "string" && /^[A-Za-z0-9_.-]{1,80}$/.test(value) ? value : undefined;
}

function safeIdentifier(value: unknown): string | undefined {
  return typeof value === "string" && /^[A-Za-z0-9_:-]{1,160}$/.test(value) ? value : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** Audio activity used only by the live test harness, not by shipped samples. */
export class LiveSpeechActivity {
  private heardSpeech = false;
  private receivedTranscript = false;
  private lastActivity = 0;

  public reset(): void {
    this.heardSpeech = false;
    this.receivedTranscript = false;
    this.lastActivity = 0;
  }

  public observe(event: VoiceAgentLiveEvent): Uint8Array | undefined {
    if (event.type === "session.output_transcript.delta" && event.delta.trim()) {
      this.receivedTranscript = true;
      this.lastActivity = Date.now();
    }
    if (event.type !== "session.output_audio.delta") return undefined;
    const bytes = Uint8Array.from(atob(event.delta), (character) => character.charCodeAt(0));
    if (bytes.length % 2) throw new Error("The service returned incomplete PCM16 audio.");
    const pcm = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    for (let offset = 0; offset < bytes.length; offset += 2) {
      if (Math.abs(pcm.getInt16(offset, true)) > 256) {
        this.heardSpeech = true;
        this.lastActivity = Date.now();
        break;
      }
    }
    return bytes;
  }

  public async waitForSpeech(
    abortSignal: AbortSignal,
    ready: () => boolean = () => true,
    timeoutInMs = 30_000,
  ): Promise<void> {
    const deadline = Date.now() + timeoutInMs;
    while (
      !ready() ||
      !this.heardSpeech ||
      !this.receivedTranscript ||
      Date.now() - this.lastActivity < 1000
    ) {
      if (Date.now() >= deadline) {
        throw new Error("Timed out waiting for GPT Live spoken output to finish.");
      }
      await delayWithAbort(25, { abortSignal });
    }
    abortSignal.throwIfAborted();
  }
}

export async function streamLiveSilence(
  connection: VoiceAgentLiveConnection,
  abortSignal?: AbortSignal,
): Promise<void> {
  const silence = new Uint8Array(4800);
  while (connection.state === "connected" && !abortSignal?.aborted) {
    const started = Date.now();
    await connection.sendAudio(silence, { abortSignal });
    await delayWithAbort(Math.max(0, 100 - (Date.now() - started)), { abortSignal });
  }
}

export async function runLiveAudioSession(
  connection: VoiceAgentLiveConnection,
  onEvent: (event: VoiceAgentLiveEvent) => void | Promise<void>,
  operation: (abortSignal: AbortSignal, inputComplete: () => boolean) => Promise<void>,
  inputPcm?: Uint8Array,
): Promise<void> {
  const stop = new AbortController();
  let inputSent = inputPcm === undefined;
  const receive = (async () => {
    for await (const event of connection) {
      if (event.type === "error" || event.type === "transport.failed") {
        throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
      }
      if (
        event.type === "response.event" &&
        ["error", "response.failed", "response.incomplete"].includes(String(event.event.type))
      ) {
        throw new Error(`The Responses delegation returned ${String(event.event.type)}.`);
      }
      await onEvent(event);
    }
    throw new Error("The Live connection closed before the test completed.");
  })();
  const send = (async () => {
    if (inputPcm) {
      if (!inputPcm.length || inputPcm.length % 2) throw new Error("Invalid PCM16 test fixture.");
      for (let offset = 0; offset < inputPcm.length; offset += 4800) {
        const chunk = inputPcm.subarray(offset, offset + 4800);
        const started = Date.now();
        await connection.sendAudio(chunk, { abortSignal: stop.signal });
        await delayWithAbort(Math.max(0, chunk.length / 48 - (Date.now() - started)), {
          abortSignal: stop.signal,
        });
      }
      inputSent = true;
    }
    await streamLiveSilence(connection, stop.signal);
    throw new Error("The Live input stream stopped before the test completed.");
  })();
  const work = Promise.resolve().then(() => operation(stop.signal, () => inputSent));
  try {
    await Promise.race([receive, send, work]);
  } finally {
    stop.abort();
    try {
      await connection.close();
    } finally {
      await Promise.allSettled([receive, send, work]);
    }
  }
}
