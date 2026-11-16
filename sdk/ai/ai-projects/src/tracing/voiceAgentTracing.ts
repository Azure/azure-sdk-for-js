// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes, Context, Span } from "@opentelemetry/api";
import { SpanStatusCode } from "@opentelemetry/api";
import { isRestError } from "@azure/core-rest-pipeline";
import type { ResolvedTracingConfig } from "./configuration.js";
import type {
  VoiceAgentClientEvent,
  VoiceAgentRealtimeResponse,
  VoiceAgentTransport,
} from "../models/models.js";
import type { VoiceAgentRealtimeEvent } from "../realtime/events.js";
import { logger } from "../logger.js";
import { setServerAttributes, parseEndpoint } from "./attributes.js";
import { startSpan, runInSpanContext } from "./tracingClient.js";
import { recordOperationDuration, recordTokenUsage } from "./metrics.js";
import {
  AGENTS_PROVIDER,
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  GEN_AI_PROVIDER_NAME,
  GEN_AI_OPERATION_NAME,
  GEN_AI_INPUT_MESSAGES,
  GEN_AI_OUTPUT_MESSAGES,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_RESPONSE_ID,
  GEN_AI_CONVERSATION_ID,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_TOOL_CALL_ID,
  ERROR_TYPE,
} from "./constants.js";

const prefix = "az.ai.voice_agents.";
const maxResponses = 64;
const maxInputItems = 64;
const maxParts = 32;
const maxContentLength = 4096;
const safeErrorTypes = new Set([
  "Error",
  "TypeError",
  "AbortError",
  "RestError",
  "VoiceAgentAuthenticationError",
  "VoiceAgentConnectionError",
  "VoiceAgentProtocolError",
  "invalid_request_error",
  "server_error",
  "authentication_error",
  "rate_limit_error",
]);
const safeErrorCodes = new Set([
  "agent_disabled",
  "invalid_request",
  "invalid_request_error",
  "invalid_event",
  "invalid_state",
  "rate_limit_exceeded",
  "insufficient_quota",
  "session_expired",
  "authentication_error",
  "permission_denied",
  "server_error",
]);

function serverErrorAttributes(type: unknown, code?: unknown): Attributes {
  const attributes: Attributes = {
    [ERROR_TYPE]: typeof type === "string" && safeErrorTypes.has(type) ? type : "Error",
  };
  if (typeof code === "string" && safeErrorCodes.has(code)) {
    attributes[`${prefix}error.code`] = code;
  }
  return attributes;
}

// Exporter/provider failures must not change a service operation's result.
function recordTelemetry(action: () => void): void {
  try {
    action();
  } catch {
    logger.warning("Unable to record Voice Agents telemetry.");
  }
}

function commonAttributes(span: Span, endpoint: string): void {
  span.setAttribute(GEN_AI_PROVIDER_NAME, AGENTS_PROVIDER);
  span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
  setServerAttributes(span, endpoint);
}

function fail(span: Span, error: unknown): void {
  const type = isRestError(error)
    ? "RestError"
    : error instanceof Error && safeErrorTypes.has(error.name)
      ? error.name
      : "Error";
  span.setAttribute(ERROR_TYPE, type);
  if (isRestError(error) && error.statusCode !== undefined) {
    span.setAttribute("http.response.status_code", error.statusCode);
  }
  span.setStatus({ code: SpanStatusCode.ERROR });
}

/** @internal */
export async function traceVoiceAgentOperation<T>(
  operationName: string,
  endpoint: string,
  config: ResolvedTracingConfig | undefined,
  operation: () => Promise<T>,
  resultAttributes?: (result: T) => Attributes,
): Promise<T> {
  if (!config?.enabled) {
    return operation();
  }
  let recording: { span: Span; ctx: Context } | undefined;
  recordTelemetry(() => {
    recording = startSpan(operationName);
    commonAttributes(recording.span, endpoint);
    recording.span.setAttribute(
      operationName === "create_agent" ? GEN_AI_OPERATION_NAME : `${prefix}operation`,
      operationName.slice(operationName.lastIndexOf(".") + 1),
    );
  });
  if (!recording) return operation();
  const { span, ctx } = recording;
  try {
    const result = await runInSpanContext(ctx, operation);
    recordTelemetry(() => {
      if (resultAttributes) span.setAttributes(resultAttributes(result));
    });
    return result;
  } catch (error) {
    recordTelemetry(() => {
      if (!(error instanceof Error && error.name === "AbortError")) fail(span, error);
      else span.setAttribute(`${prefix}cancelled`, true);
    });
    throw error;
  } finally {
    recordTelemetry(() => span.end());
  }
}

interface TrackedResponse {
  span: Span;
  started: number;
  firstAudioInSeconds?: number;
  audioBytes: number;
  model?: string;
  outputMessages: Map<string, MessageSummary>;
  outputParts: Map<string, { itemId: string; contentIndex: number; part: Record<string, unknown> }>;
}

interface TrackedInputAudio {
  sequence: number;
  itemId?: string;
  pendingQueue?: PendingInputAudio;
  pendingSkipped?: boolean;
  pendingSend?: boolean;
  pendingTranscript?: string;
}

interface PendingInputAudio {
  items: TrackedInputAudio[];
  skipped: number;
}

interface ReservedInput {
  sequence: number;
  audio?: TrackedInputAudio;
}

interface MessageSummary {
  role: "system" | "user" | "assistant" | "tool";
  parts: Record<string, unknown>[];
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function limitedContent(value: unknown): string | undefined {
  return typeof value === "string" ? value.slice(0, maxContentLength) : undefined;
}

function messagePart(
  value: unknown,
  contentRecording: boolean,
): Record<string, unknown> | undefined {
  const part = asRecord(value);
  const type = part?.type;
  if (
    !part ||
    typeof type !== "string" ||
    !["input_text", "output_text", "text", "input_audio", "output_audio", "audio"].includes(type)
  ) {
    return undefined;
  }
  const audio = type.includes("audio");
  const summary: Record<string, unknown> = { type: audio ? "audio" : "text" };
  if (contentRecording) {
    const content = limitedContent(audio ? part.transcript : part.text);
    if (content !== undefined) summary.content = content;
  }
  return summary;
}

function messages(item: unknown, contentRecording: boolean): MessageSummary | undefined {
  const record = asRecord(item);
  if (!record) return undefined;
  if (
    record.type === "function_call" ||
    record.type === "function_call_output" ||
    record.type === "mcp_call"
  ) {
    const part: Record<string, unknown> = {
      type: record.type === "function_call_output" ? "tool_call_response" : "tool_call",
    };
    if (typeof record.call_id === "string") part.id = record.call_id;
    if (contentRecording) {
      if (typeof record.name === "string") part.name = limitedContent(record.name);
      if (typeof record.arguments === "string") part.arguments = limitedContent(record.arguments);
      if (typeof record.output === "string") part.result = limitedContent(record.output);
    }
    return { role: record.type === "function_call_output" ? "tool" : "assistant", parts: [part] };
  }
  if (record.type !== "message") return undefined;
  const parts: Record<string, unknown>[] = [];
  if (Array.isArray(record.content)) {
    for (const value of record.content.slice(0, maxParts)) {
      const summary = messagePart(value, contentRecording);
      if (summary) parts.push(summary);
    }
  }
  const role = record.role === "system" || record.role === "user" ? record.role : "assistant";
  return parts.length ? { role, parts } : undefined;
}

/** Tracks SDK-observed realtime work, independently of the user's event iterator. @internal */
export class VoiceAgentRealtimeTracing {
  private readonly responses = new Map<string, TrackedResponse>();
  private session?: { span: Span; ctx: Context };
  private connectSpan?: Span;
  private ended = false;
  private connected = false;
  private model?: string;
  private inputAudioBytes = 0;
  private inputSequence = 0;
  private nextInputSequence = 0;
  private inputAudioBuffer?: TrackedInputAudio;
  private readonly inputAudioItems = new Map<string, TrackedInputAudio>();
  private readonly pendingAudioCommits: PendingInputAudio = { items: [], skipped: 0 };
  private readonly pendingAudioMessages: PendingInputAudio = { items: [], skipped: 0 };
  private pendingAudioClears = 0;
  private untrackedInputItems = 0;
  private finishedResponses = 0;
  private untrackedResponses = 0;

  public constructor(
    private readonly endpoint: string,
    private readonly config: ResolvedTracingConfig,
    transport: VoiceAgentTransport = "websocket",
  ) {
    recordTelemetry(() => {
      this.session = startSpan("voice_agents.realtime.session");
      commonAttributes(this.session.span, endpoint);
      this.session.span.setAttribute(`${prefix}connection.transport`, transport);
      this.connectSpan = startSpan("voice_agents.realtime.connect", this.session.ctx).span;
      commonAttributes(this.connectSpan, endpoint);
      this.connectSpan.setAttribute(`${prefix}connection.transport`, transport);
    });
  }

  public opened(): void {
    recordTelemetry(() => {
      if (this.ended) return;
      this.connected = true;
      this.connectSpan?.end();
      this.connectSpan = undefined;
    });
  }

  public reserveSend(event: VoiceAgentClientEvent): ReservedInput | undefined {
    let reservation: ReservedInput | undefined;
    recordTelemetry(() => {
      if (this.ended || !this.session || event.type !== "conversation.item.create") return;
      const summary = messages(event.item, this.config.contentRecording);
      const item = asRecord(event.item);
      if (!summary) return;
      reservation = { sequence: ++this.nextInputSequence };
      if (
        summary.role !== "user" ||
        !summary.parts.some((part) => part.type === "audio") ||
        typeof item?.id === "string" ||
        this.pendingAudioMessages.items.length >= maxInputItems ||
        this.pendingAudioMessages.skipped > 0
      ) {
        return;
      }
      reservation.audio = { sequence: reservation.sequence, pendingSend: true };
      this.enqueueInputAudio(this.pendingAudioMessages, reservation.audio);
    });
    return reservation;
  }

  public sent(event: VoiceAgentClientEvent, reservation?: ReservedInput): void {
    recordTelemetry(() => {
      if (this.ended || !this.session) return;
      if (event.type === "input_audio_buffer.append") {
        // Count decoded bytes without retaining or decoding the media.
        this.inputAudioBytes += Math.max(
          0,
          Math.floor((event.audio.length * 3) / 4) -
            (event.audio.endsWith("==") ? 2 : event.audio.endsWith("=") ? 1 : 0),
        );
        if (!this.inputAudioBuffer) {
          this.inputAudioBuffer = this.startInputAudio();
        } else if (this.inputAudioBuffer.sequence !== this.inputSequence) {
          this.inputSequence = ++this.nextInputSequence;
          this.inputAudioBuffer.sequence = this.inputSequence;
          this.setInputAudioSummary();
        }
      } else if (event.type === "input_audio_buffer.commit") {
        if (this.inputAudioBuffer) {
          this.enqueueInputAudio(this.pendingAudioCommits, this.inputAudioBuffer);
          this.inputAudioBuffer = undefined;
        }
      } else if (event.type === "input_audio_buffer.clear") {
        this.inputAudioBuffer = undefined;
        this.pendingAudioClears++;
      } else if (event.type === "conversation.item.create") {
        const summary = messages(event.item, this.config.contentRecording);
        const item = asRecord(event.item);
        if (summary) {
          const sequence = reservation?.sequence ?? ++this.nextInputSequence;
          if (summary.role === "user" && summary.parts.some((part) => part.type === "audio")) {
            const input = reservation?.audio ?? { sequence };
            input.pendingSend = undefined;
            if (!reservation?.audio) {
              if (typeof item?.id === "string") {
                this.rememberInputAudio(item.id, input);
              } else {
                this.enqueueInputAudio(this.pendingAudioMessages, input);
              }
            }
          }
          if (sequence >= this.inputSequence) {
            this.inputSequence = sequence;
            this.session.span.setAttribute(GEN_AI_INPUT_MESSAGES, JSON.stringify([summary]));
            if (reservation?.audio?.pendingTranscript !== undefined) {
              this.setInputAudioSummary(reservation.audio.pendingTranscript);
            }
          }
        }
        if (item?.type === "function_call_output" && typeof item.call_id === "string") {
          this.session.span.addEvent("voice_agents.tool.output_sent", {
            [GEN_AI_TOOL_CALL_ID]: item.call_id,
          });
        }
      } else if (event.type === "response.cancel") {
        this.session.span.addEvent("voice_agents.response.cancel_requested");
      }
    });
  }

  public sendFailed(error: unknown, reservation?: ReservedInput): void {
    recordTelemetry(() => {
      if (reservation?.audio) this.rollbackPendingAudioMessage(reservation.audio);
      if (!this.ended) {
        this.session?.span.addEvent("voice_agents.send.failed", {
          [ERROR_TYPE]:
            error instanceof Error && safeErrorTypes.has(error.name) ? error.name : "Error",
        });
      }
    });
  }

  public received(event: VoiceAgentRealtimeEvent): void {
    recordTelemetry(() => {
      if (this.ended || !this.session || event.type === "unknown") return;
      switch (event.type) {
        case "session.created":
        case "session.updated":
          this.model = event.session.model;
          this.session.span.setAttribute(`${prefix}session.id`, event.session.id);
          if (event.type === "session.created" && event.conversation_id) {
            this.session.span.setAttribute(GEN_AI_CONVERSATION_ID, event.conversation_id);
          }
          if (this.model) this.session.span.setAttribute(GEN_AI_REQUEST_MODEL, this.model);
          break;
        case "input_audio_buffer.speech_started":
          if (!this.inputAudioItems.has(event.item_id)) {
            const buffer = this.inputAudioBuffer;
            const input = buffer && buffer.itemId === undefined ? buffer : this.startInputAudio();
            this.rememberInputAudio(event.item_id, input);
            this.inputAudioBuffer = input;
          }
          break;
        case "input_audio_buffer.committed": {
          const pending =
            this.pendingAudioCommits.items.length > 0 || this.pendingAudioCommits.skipped > 0;
          let input = this.matchInputAudio(this.pendingAudioCommits, event.item_id);
          if (!input) {
            if (pending) break;
            input = this.inputAudioBuffer ?? this.startInputAudio();
            this.rememberInputAudio(event.item_id, input);
          }
          if (this.inputAudioBuffer === input) this.inputAudioBuffer = undefined;
          break;
        }
        case "input_audio_buffer.cleared":
          if (this.pendingAudioClears > 0) this.pendingAudioClears--;
          else this.inputAudioBuffer = undefined;
          break;
        case "conversation.item.added":
        case "conversation.item.created": {
          const item = asRecord(event.item);
          const summary = messages(event.item, false);
          if (
            typeof item?.id === "string" &&
            summary?.role === "user" &&
            summary.parts.some((part) => part.type === "audio")
          ) {
            this.matchInputAudio(this.pendingAudioMessages, item.id);
          }
          break;
        }
        case "response.created":
          this.beginResponse(event.response);
          break;
        case "response.output_audio.delta": {
          const tracked = this.responses.get(event.response_id);
          if (tracked) {
            tracked.audioBytes += event.delta.byteLength;
            if (event.delta.byteLength > 0) {
              tracked.firstAudioInSeconds ??= (performance.now() - tracked.started) / 1000;
            }
          }
          break;
        }
        case "response.done":
          this.endResponse(event.response);
          break;
        case "response.output_text.done":
        case "response.output_audio_transcript.done": {
          const tracked = this.responses.get(event.response_id);
          if (tracked) {
            const part: Record<string, unknown> = {
              type: event.type === "response.output_text.done" ? "text" : "audio",
            };
            if (this.config.contentRecording) {
              part.content = limitedContent(
                event.type === "response.output_text.done" ? event.text : event.transcript,
              );
            }
            this.recordOutputPart(tracked, event.item_id, event.content_index, part);
          }
          break;
        }
        case "response.output_audio.done": {
          const tracked = this.responses.get(event.response_id);
          if (tracked) {
            this.recordOutputPart(tracked, event.item_id, event.content_index, { type: "audio" });
          }
          break;
        }
        case "response.function_call_arguments.done": {
          const span = this.responses.get(event.response_id)?.span ?? this.session.span;
          const attributes: Attributes = {
            [GEN_AI_TOOL_CALL_ID]: event.call_id,
            [`${prefix}tool.kind`]: "function",
          };
          if (this.config.contentRecording) {
            attributes["gen_ai.tool.name"] = limitedContent(event.name);
            attributes[`${prefix}tool.arguments`] = limitedContent(event.arguments);
          }
          span.addEvent("voice_agents.tool.requested", attributes);
          const tracked = this.responses.get(event.response_id);
          const summary = messages(
            {
              type: "function_call",
              call_id: event.call_id,
              name: event.name,
              arguments: event.arguments,
            },
            this.config.contentRecording,
          );
          if (tracked && summary && tracked.outputMessages.size < maxParts) {
            tracked.outputMessages.set(`tool:${event.call_id}`, summary);
          }
          break;
        }
        case "response.mcp_call.completed":
        case "response.mcp_call.failed":
          this.session.span.addEvent(event.type, { [`${prefix}item.id`]: event.item_id });
          break;
        case "session.subagent.started":
        case "session.subagent.completed":
        case "session.subagent.aborted": {
          const attributes: Attributes = {
            [`${prefix}subagent.consultation.id`]: event.consultation_id,
          };
          if (
            event.type === "session.subagent.aborted" &&
            [
              "unknown_target",
              "timeout",
              "cancelled",
              "stopped_by_user",
              "superseded",
              "failed",
            ].includes(event.reason)
          ) {
            attributes[`${prefix}subagent.abort_reason`] = event.reason;
          }
          this.session.span.addEvent(event.type, attributes);
          break;
        }
        case "error":
          this.session.span.addEvent(
            "voice_agents.server_error",
            serverErrorAttributes(event.error.type, event.error.code),
          );
          break;
        case "warning":
          this.session.span.addEvent("voice_agents.warning");
          break;
        case "rtc.call.error":
          this.session.span.addEvent(
            "rtc.call.error",
            serverErrorAttributes(event.error.type, event.error.code),
          );
          break;
        case "conversation.item.input_audio_transcription.completed": {
          const input = this.inputAudioItems.get(event.item_id);
          if (input?.pendingSend) {
            input.pendingTranscript = event.transcript;
          } else if (input?.sequence === this.inputSequence) {
            this.setInputAudioSummary(event.transcript);
          }
          this.session.span.addEvent("voice_agents.transcription.completed");
          break;
        }
        case "conversation.item.input_audio_transcription.failed": {
          const input = this.inputAudioItems.get(event.item_id);
          if (input?.sequence === this.inputSequence) {
            this.setInputAudioSummary();
          }
          this.session.span.addEvent("voice_agents.transcription.failed");
          break;
        }
      }
    });
  }

  private startInputAudio(): TrackedInputAudio {
    const input = { sequence: ++this.nextInputSequence };
    this.inputSequence = input.sequence;
    this.setInputAudioSummary();
    return input;
  }

  private enqueueInputAudio(queue: PendingInputAudio, input: TrackedInputAudio): void {
    input.pendingQueue = queue;
    if (queue.items.length >= maxInputItems || queue.skipped > 0) {
      input.pendingSkipped = true;
      queue.skipped++;
      this.untrackedInputItems++;
    } else {
      queue.items.push(input);
    }
  }

  private rollbackPendingAudioMessage(input: TrackedInputAudio): void {
    if (input.pendingQueue) {
      const index = input.pendingQueue.items.indexOf(input);
      if (index !== -1) {
        input.pendingQueue.items.splice(index, 1);
      } else if (input.pendingSkipped && input.pendingQueue.skipped > 0) {
        input.pendingQueue.skipped--;
        this.untrackedInputItems--;
      }
      input.pendingQueue = undefined;
      input.pendingSkipped = undefined;
    }
    if (input.itemId && this.inputAudioItems.get(input.itemId) === input) {
      this.inputAudioItems.delete(input.itemId);
    }
    input.pendingSend = undefined;
    input.pendingTranscript = undefined;
  }

  private matchInputAudio(queue: PendingInputAudio, itemId: string): TrackedInputAudio | undefined {
    const known = this.inputAudioItems.get(itemId);
    if (known) {
      if (known.pendingQueue === queue) {
        const index = queue.items.indexOf(known);
        if (index !== -1) queue.items.splice(index, 1);
        else if (known.pendingSkipped && queue.skipped > 0) queue.skipped--;
        known.pendingQueue = undefined;
        known.pendingSkipped = undefined;
      }
      return known;
    }
    // Match ordered commit/create acknowledgements, never asynchronous ASR completion order.
    const input = queue.items.shift();
    if (input) {
      input.pendingQueue = undefined;
      this.rememberInputAudio(itemId, input);
      return input;
    }
    if (queue.skipped > 0) queue.skipped--;
    return undefined;
  }

  private rememberInputAudio(itemId: string, input: TrackedInputAudio): void {
    input.itemId = itemId;
    this.inputAudioItems.set(itemId, input);
    if (this.inputAudioItems.size > maxInputItems) {
      for (const [id, tracked] of this.inputAudioItems) {
        if (tracked.sequence !== this.inputSequence || id !== tracked.itemId) {
          this.inputAudioItems.delete(id);
          break;
        }
      }
    }
  }

  private setInputAudioSummary(transcript?: string): void {
    const parts: Record<string, unknown>[] = [{ type: "audio" }];
    if (this.config.contentRecording && transcript !== undefined) {
      parts[0].content = limitedContent(transcript);
    }
    this.session?.span.setAttribute(
      GEN_AI_INPUT_MESSAGES,
      JSON.stringify([{ role: "user", parts }]),
    );
  }

  private recordOutputPart(
    tracked: TrackedResponse,
    itemId: string,
    contentIndex: number,
    part: Record<string, unknown>,
  ): void {
    const key = `${itemId}:${contentIndex}:${part.type}`;
    const existing = tracked.outputParts.get(key);
    if (existing) {
      if (part.content !== undefined) existing.part.content = part.content;
    } else if (tracked.outputParts.size < maxParts) {
      tracked.outputParts.set(key, { itemId, contentIndex, part });
    }
  }

  private beginResponse(response: VoiceAgentRealtimeResponse): void {
    const id = response.id;
    if (!id || !this.session || this.responses.has(id)) return;
    if (this.responses.size >= maxResponses) {
      this.untrackedResponses++;
      return;
    }
    const { span } = startSpan("invoke_agent", this.session.ctx);
    commonAttributes(span, this.endpoint);
    span.setAttribute(GEN_AI_OPERATION_NAME, "invoke_agent");
    span.setAttribute(GEN_AI_RESPONSE_ID, id);
    if (this.model) span.setAttribute(GEN_AI_REQUEST_MODEL, this.model);
    if (response.conversation_id) {
      span.setAttribute(GEN_AI_CONVERSATION_ID, response.conversation_id);
    }
    this.responses.set(id, {
      span,
      started: performance.now(),
      audioBytes: 0,
      model: this.model,
      outputMessages: new Map(),
      outputParts: new Map(),
    });
  }

  private endResponse(response: VoiceAgentRealtimeResponse): void {
    const id = response.id;
    const tracked = id ? this.responses.get(id) : undefined;
    if (!tracked || !id) return;
    this.responses.delete(id);
    const durationInSeconds = (performance.now() - tracked.started) / 1000;
    const { span } = tracked;
    if (response.status) span.setAttribute(`${prefix}response.status`, response.status);
    if (response.output_modalities) {
      span.setAttribute(`${prefix}response.output_modalities`, response.output_modalities);
    }
    if (response.usage?.input_tokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_INPUT_TOKENS, response.usage.input_tokens);
    }
    if (response.usage?.output_tokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_OUTPUT_TOKENS, response.usage.output_tokens);
    }
    this.flushObservedResponse(tracked, response);
    if (response.status === "failed") {
      span.setAttribute(ERROR_TYPE, "response_failed");
      span.setStatus({ code: SpanStatusCode.ERROR });
    } else if (response.status === "completed") {
      span.setStatus({ code: SpanStatusCode.OK });
    }
    const dimensions = {
      operationName: "invoke_agent",
      ...parseEndpoint(this.endpoint),
      responseModel: tracked.model,
      ...(response.status === "failed" ? { errorType: "response_failed" } : {}),
    };
    span.end();
    this.finishedResponses++;
    recordOperationDuration(durationInSeconds, dimensions);
    recordTokenUsage(response.usage?.input_tokens, response.usage?.output_tokens, dimensions);
  }

  private flushObservedResponse(
    tracked: TrackedResponse,
    response?: VoiceAgentRealtimeResponse,
  ): void {
    const { span } = tracked;
    span.setAttribute(`${prefix}output.audio.bytes`, tracked.audioBytes);
    if (tracked.firstAudioInSeconds !== undefined) {
      span.setAttribute(
        `${prefix}response.time_to_first_audio_seconds`,
        tracked.firstAudioInSeconds,
      );
    }
    const fallback = new Map(tracked.outputMessages);
    for (const observed of [...tracked.outputParts.values()].sort(
      (a, b) => a.contentIndex - b.contentIndex,
    )) {
      const message: MessageSummary = fallback.get(observed.itemId) ?? {
        role: "assistant",
        parts: [],
      };
      message.parts.push(observed.part);
      fallback.set(observed.itemId, message);
    }
    const output: MessageSummary[] = [];
    let unkeyedFinalItem = false;
    for (const item of response?.output?.slice(0, maxParts) ?? []) {
      const summary = messages(item, this.config.contentRecording);
      if (!summary) continue;
      const record = asRecord(item);
      const itemId =
        record?.type === "function_call" && typeof record.call_id === "string"
          ? `tool:${record.call_id}`
          : typeof record?.id === "string"
            ? record.id
            : typeof record?.call_id === "string"
              ? record.call_id
              : undefined;
      if (itemId) {
        fallback.delete(itemId);
        if (record?.type === "message" && Array.isArray(record.content)) {
          summary.parts = record.content.slice(0, maxParts).flatMap((value, index) => {
            const part = messagePart(value, this.config.contentRecording);
            if (!part) return [];
            const observed = tracked.outputParts.get(`${itemId}:${index}:${part.type}`);
            if (part.content === undefined && observed?.part.content !== undefined) {
              part.content = observed.part.content;
            }
            return [part];
          });
        }
      } else {
        // Final output is authoritative; don't guess identities for items without an ID.
        unkeyedFinalItem = true;
      }
      output.push(summary);
    }
    if (!unkeyedFinalItem) output.push(...fallback.values());
    if (output.length) {
      span.setAttribute(GEN_AI_OUTPUT_MESSAGES, JSON.stringify(output.slice(0, maxParts)));
    }
  }

  public close(code: number | undefined, wasClean: boolean, error?: unknown): void {
    if (this.ended) return;
    this.ended = true;
    recordTelemetry(() => {
      const cancelled = asRecord(error)?.code === "operationCancelled";
      if (this.connectSpan) {
        if (error && !cancelled) fail(this.connectSpan, error);
        this.connectSpan.end();
        this.connectSpan = undefined;
      }
      for (const tracked of this.responses.values()) {
        this.flushObservedResponse(tracked);
        tracked.span.setAttribute(`${prefix}response.status`, "interrupted");
        if (error && !cancelled) fail(tracked.span, error);
        tracked.span.end();
        recordOperationDuration((performance.now() - tracked.started) / 1000, {
          operationName: "invoke_agent",
          ...parseEndpoint(this.endpoint),
          responseModel: tracked.model,
          ...(error && !cancelled ? { errorType: "response_interrupted" } : {}),
        });
      }
      this.responses.clear();
      this.inputAudioItems.clear();
      this.pendingAudioCommits.items.length = 0;
      this.pendingAudioMessages.items.length = 0;
      this.inputAudioBuffer = undefined;
      if (!this.session) return;
      if (error && !cancelled) fail(this.session.span, error);
      if (cancelled) this.session.span.setAttribute(`${prefix}cancelled`, true);
      if (code !== undefined) this.session.span.setAttribute(`${prefix}close.code`, code);
      this.session.span.setAttribute(`${prefix}close.was_clean`, wasClean);
      this.session.span.setAttribute(`${prefix}input.audio.bytes`, this.inputAudioBytes);
      if (this.untrackedInputItems) {
        this.session.span.setAttribute(`${prefix}input.items.untracked`, this.untrackedInputItems);
      }
      this.session.span.setAttribute(`${prefix}responses.finished`, this.finishedResponses);
      if (this.untrackedResponses) {
        this.session.span.setAttribute(`${prefix}responses.untracked`, this.untrackedResponses);
      }
      this.session.span.setAttribute(`${prefix}connected`, this.connected);
      this.session.span.end();
    });
  }
}
