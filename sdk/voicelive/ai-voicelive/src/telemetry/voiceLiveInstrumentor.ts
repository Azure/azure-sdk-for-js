// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * VoiceLive telemetry instrumentor for OpenTelemetry-based tracing.
 *
 * Provides opt-in OpenTelemetry tracing for VoiceLive WebSocket sessions.
 * When enabled, the SDK automatically emits spans for connect, send, recv,
 * and close — with voice-specific attributes, session-level counters, and
 * Azure AI Foundry parity attributes.
 *
 * @remarks
 * This follows GenAI Semantic Conventions v1.34.0.
 */

import { logger } from "../logger.js";
import {
  type ServerEventUnion,
  type ClientEventUnion,
  KnownClientEventType,
  KnownServerEventType,
} from "../models/index.js";
import type { AgentSessionConfig } from "../client/types.js";
import {
  AZ_AI_VOICELIVE_SYSTEM,
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  ERROR_MESSAGE,
  ERROR_TYPE,
  GEN_AI_AGENT_ID,
  GEN_AI_AGENT_NAME,
  GEN_AI_AGENT_PROJECT_NAME,
  GEN_AI_AGENT_THREAD_ID,
  GEN_AI_AGENT_VERSION,
  GEN_AI_CLIENT_OPERATION_DURATION,
  GEN_AI_CLIENT_TOKEN_USAGE,
  GEN_AI_CONVERSATION_ID,
  GEN_AI_EVENT_CONTENT,
  GEN_AI_OPERATION_NAME,
  GEN_AI_PROVIDER_NAME,
  GEN_AI_PROVIDER_VALUE,
  GEN_AI_REQUEST_MAX_OUTPUT_TOKENS,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOOLS,
  GEN_AI_RESPONSE_FINISH_REASONS,
  GEN_AI_RESPONSE_ID,
  GEN_AI_SYSTEM,
  GEN_AI_SYSTEM_INSTRUCTION_EVENT,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_VOICE_AUDIO_BYTES_RECEIVED,
  GEN_AI_VOICE_AUDIO_BYTES_SENT,
  GEN_AI_VOICE_CALL_ID,
  GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS,
  GEN_AI_VOICE_INPUT_AUDIO_FORMAT,
  GEN_AI_VOICE_INPUT_SAMPLE_RATE,
  GEN_AI_VOICE_INTERRUPTION_COUNT,
  GEN_AI_VOICE_ITEM_ID,
  GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID,
  GEN_AI_VOICE_MCP_APPROVE,
  GEN_AI_VOICE_MCP_CALL_COUNT,
  GEN_AI_VOICE_MCP_LIST_TOOLS_COUNT,
  GEN_AI_VOICE_MCP_SERVER_LABEL,
  GEN_AI_VOICE_MCP_TOOL_NAME,
  GEN_AI_VOICE_MESSAGE_SIZE,
  GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT,
  GEN_AI_VOICE_OUTPUT_INDEX,
  GEN_AI_VOICE_PREVIOUS_ITEM_ID,
  GEN_AI_VOICE_SESSION_ID,
  GEN_AI_VOICE_TURN_COUNT,
  OperationName,
  SERVER_ADDRESS,
  SERVER_PORT,
} from "./utils.js";

// --- Minimal span interface (avoids compile-time dependency on @opentelemetry/api) ---

/**
 * Minimal span interface compatible with OpenTelemetry's Span.
 * @internal
 */
interface TracingSpan {
  setAttribute(key: string, value: string | number | boolean): void;
  addEvent(name: string, attributes?: Record<string, string | number | boolean>): void;
  setStatus(status: { code: number; message?: string }): void;
  updateName(name: string): void;
  isRecording(): boolean;
  end(): void;
}

/** @internal */
interface Tracer {
  startSpan(name: string, options?: Record<string, unknown>, context?: unknown): TracingSpan;
}

/** @internal */
interface OtelHandle {
  trace: {
    getTracer(name: string): Tracer;
    setSpan(ctx: unknown, span: TracingSpan): unknown;
  };
  context: { active(): unknown };
  SpanKind: { CLIENT: number };
  SpanStatusCode: { ERROR: number };
  metrics?: {
    getMeter(name: string): {
      createHistogram(
        name: string,
        options: Record<string, string>,
      ): { record(value: number, attrs: Record<string, unknown>): void };
    };
  };
}

// --- Module-level state ---
let _otel: OtelHandle | undefined;
let _voiceLiveTracesEnabled = false;
let _traceVoiceLiveContent = false;

function tryLoadOtel(): OtelHandle | undefined {
  if (_otel) return _otel;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const g = globalThis as Record<string, unknown>;
    const reqFn = g["require"] as ((id: string) => unknown) | undefined;
    if (typeof reqFn === "function") {
      const api = reqFn("@opentelemetry/api") as OtelHandle | undefined;
      if (api?.trace) {
        _otel = api;
      }
    }
  } catch {
    // Not installed — instrumentation is a no-op
  }
  return _otel;
}

// --- Event type sets matching Python implementation ---
const _ITEM_BEARING_EVENTS = new Set<string>([
  KnownServerEventType.ConversationItemCreated,
  KnownServerEventType.ConversationItemRetrieved,
  KnownServerEventType.ResponseOutputItemAdded,
  KnownServerEventType.ResponseOutputItemDone,
]);

const _SESSION_EVENT_TYPES = new Set<string>([
  KnownServerEventType.SessionCreated,
  KnownServerEventType.SessionUpdated,
]);

const _DELTA_SKIP_EVENT_TYPES = new Set<string>([
  KnownServerEventType.ResponseTextDelta,
  KnownServerEventType.ResponseAudioTranscriptDelta,
]);

const _MCP_CALL_EVENT_TYPES = new Set<string>([
  KnownServerEventType.ResponseMcpCallCompleted,
  KnownServerEventType.ResponseMcpCallFailed,
]);

const _MCP_LIST_TOOLS_EVENT_TYPES = new Set<string>([
  KnownServerEventType.McpListToolsCompleted,
  KnownServerEventType.McpListToolsFailed,
]);

/**
 * Telemetry state stored on a VoiceLiveSession for the duration of a connection.
 * @internal
 */
export interface TelemetryState {
  connectSpan: TracingSpan | undefined;
  serverAddress: string | undefined;
  port: number | undefined;
  model: string | undefined;
  sessionId: string | undefined;
  conversationId: string | undefined;
  agentName: string | undefined;
  turnCount: number;
  interruptionCount: number;
  audioBytesSent: number;
  audioBytesReceived: number;
  mcpCallCount: number;
  mcpListToolsCount: number;
  responseCreateTime: number | undefined;
  firstTokenLatencyRecorded: boolean;
  connectStartTime: number;
}

// ------------------------------------------------------------------ //
//  Helpers                                                            //
// ------------------------------------------------------------------ //

function getField(obj: unknown, field: string): unknown {
  if (obj == null || typeof obj !== "object") return undefined;
  return (obj as Record<string, unknown>)[field];
}

function serializeContentAndSize(payload: unknown): {
  content: string | undefined;
  messageSize: number | undefined;
} {
  let json: string | undefined;
  try {
    json = JSON.stringify(payload);
  } catch {
    /* empty */
  }
  return {
    content: _traceVoiceLiveContent ? json : undefined,
    messageSize: json?.length,
  };
}

function base64ByteLength(base64: string): number {
  try {
    return atob(base64).length;
  } catch {
    return base64.length;
  }
}

function startSpan(
  operationName: OperationName,
  options?: {
    serverAddress?: string;
    port?: number;
    model?: string;
    spanName?: string;
    parentSpan?: TracingSpan;
  },
): TracingSpan | undefined {
  const otel = tryLoadOtel();
  if (!otel) return undefined;

  const tracer = otel.trace.getTracer("@azure/ai-voicelive");
  if (!tracer) return undefined;

  const spanName = options?.spanName ?? operationName;
  let ctx = otel.context.active();
  if (options?.parentSpan) {
    ctx = otel.trace.setSpan(ctx, options.parentSpan);
  }

  const span = tracer.startSpan(spanName, { kind: otel.SpanKind.CLIENT }, ctx);
  if (span.isRecording()) {
    span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
    span.setAttribute(GEN_AI_PROVIDER_NAME, GEN_AI_PROVIDER_VALUE);
    span.setAttribute(GEN_AI_SYSTEM, AZ_AI_VOICELIVE_SYSTEM);
    span.setAttribute(GEN_AI_OPERATION_NAME, operationName);
    if (options?.serverAddress) span.setAttribute(SERVER_ADDRESS, options.serverAddress);
    if (options?.port != null) span.setAttribute(SERVER_PORT, options.port);
    if (options?.model) span.setAttribute(GEN_AI_REQUEST_MODEL, options.model);
  }
  return span;
}

function recordError(span: TracingSpan, err: unknown): void {
  const otel = tryLoadOtel();
  if (!otel) return;
  const error = err instanceof Error ? err : new Error(String(err));
  span.setStatus({ code: otel.SpanStatusCode.ERROR, message: error.message });
  span.setAttribute(ERROR_TYPE, error.constructor?.name ?? "Error");
  span.setAttribute(ERROR_MESSAGE, error.message);
}

function addConnectionContextAttributes(state: TelemetryState, span: TracingSpan): void {
  if (state.sessionId) span.setAttribute(GEN_AI_VOICE_SESSION_ID, state.sessionId);
  if (state.conversationId) span.setAttribute(GEN_AI_CONVERSATION_ID, state.conversationId);
}

function trackAudioBytesReceived(state: TelemetryState, result: unknown): void {
  const delta = getField(result, "delta") as string | undefined;
  if (delta && typeof delta === "string") {
    state.audioBytesReceived += base64ByteLength(delta);
  }
}

// ------------------------------------------------------------------ //
//  Session audio / config extraction                                  //
// ------------------------------------------------------------------ //

function extractSessionAudioAttributes(state: TelemetryState, session: unknown): void {
  const inputFmt =
    getField(session, "inputAudioFormat") ?? getField(session, "input_audio_format");
  if (inputFmt && state.connectSpan?.isRecording()) {
    state.connectSpan.setAttribute(GEN_AI_VOICE_INPUT_AUDIO_FORMAT, String(inputFmt));
  }
  const inputRate =
    getField(session, "inputAudioSamplingRate") ??
    getField(session, "input_audio_sampling_rate");
  if (inputRate != null && state.connectSpan?.isRecording()) {
    state.connectSpan.setAttribute(GEN_AI_VOICE_INPUT_SAMPLE_RATE, inputRate as number);
  }
  const outputFmt =
    getField(session, "outputAudioFormat") ?? getField(session, "output_audio_format");
  if (outputFmt && state.connectSpan?.isRecording()) {
    state.connectSpan.setAttribute(GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT, String(outputFmt));
  }
}

function extractSessionConfigFromSend(state: TelemetryState, event: unknown): void {
  const session = getField(event, "session");
  if (!session) return;
  const cs = state.connectSpan;

  const instructions = getField(session, "instructions") as string | undefined;
  if (instructions && cs?.isRecording()) {
    cs.setAttribute(GEN_AI_SYSTEM_MESSAGE, instructions);
    if (_traceVoiceLiveContent) {
      cs.addEvent(GEN_AI_SYSTEM_INSTRUCTION_EVENT, {
        [GEN_AI_PROVIDER_NAME]: GEN_AI_PROVIDER_VALUE,
        [GEN_AI_EVENT_CONTENT]: JSON.stringify([{ role: "system", content: instructions }]),
      });
    }
  }
  const temp = getField(session, "temperature");
  if (temp != null && cs?.isRecording()) cs.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(temp));

  const maxT =
    getField(session, "maxResponseOutputTokens") ??
    getField(session, "max_response_output_tokens");
  if (maxT != null && cs?.isRecording()) cs.setAttribute(GEN_AI_REQUEST_MAX_OUTPUT_TOKENS, maxT as number);

  const tools = getField(session, "tools");
  if (tools && cs?.isRecording()) {
    try {
      cs.setAttribute(GEN_AI_REQUEST_TOOLS, Array.isArray(tools) ? JSON.stringify(tools) : String(tools));
    } catch {
      /* empty */
    }
  }
}

// ------------------------------------------------------------------ //
//  ID extraction                                                      //
// ------------------------------------------------------------------ //

function extractEventIds(state: TelemetryState, result: unknown, span: TracingSpan): void {
  const responseId =
    (getField(result, "responseId") as string) ?? (getField(result, "response_id") as string);
  if (responseId) span.setAttribute(GEN_AI_RESPONSE_ID, responseId);

  const callId =
    (getField(result, "callId") as string) ?? (getField(result, "call_id") as string);
  if (callId) span.setAttribute(GEN_AI_VOICE_CALL_ID, callId);

  const itemId =
    (getField(result, "itemId") as string) ?? (getField(result, "item_id") as string);
  if (itemId) span.setAttribute(GEN_AI_VOICE_ITEM_ID, itemId);

  const prevItemId =
    (getField(result, "previousItemId") as string) ??
    (getField(result, "previous_item_id") as string);
  if (prevItemId) span.setAttribute(GEN_AI_VOICE_PREVIOUS_ITEM_ID, prevItemId);

  const outIdx = getField(result, "outputIndex") ?? getField(result, "output_index");
  if (outIdx != null) span.setAttribute(GEN_AI_VOICE_OUTPUT_INDEX, outIdx as number);

  const respObj = getField(result, "response");
  if (respObj) {
    if (!responseId) {
      const nid = getField(respObj, "id") as string;
      if (nid) span.setAttribute(GEN_AI_RESPONSE_ID, nid);
    }
    const ncid =
      (getField(respObj, "conversationId") as string) ??
      (getField(respObj, "conversation_id") as string);
    if (ncid) {
      state.conversationId = ncid;
      span.setAttribute(GEN_AI_CONVERSATION_ID, ncid);
    }
  }

  const evType = String(getField(result, "type") ?? "");
  if (_ITEM_BEARING_EVENTS.has(evType)) {
    const itm = getField(result, "item");
    if (itm) {
      if (!itemId) {
        const nid = getField(itm, "id") as string;
        if (nid) span.setAttribute(GEN_AI_VOICE_ITEM_ID, nid);
      }
      if (!callId) {
        const ncid = (getField(itm, "callId") as string) ?? (getField(itm, "call_id") as string);
        if (ncid) span.setAttribute(GEN_AI_VOICE_CALL_ID, ncid);
      }
      const sl =
        (getField(itm, "serverLabel") as string) ?? (getField(itm, "server_label") as string);
      if (sl) span.setAttribute(GEN_AI_VOICE_MCP_SERVER_LABEL, sl);

      const tn = getField(itm, "name") as string;
      const it = getField(itm, "type") as string;
      if (tn && it && String(it) !== "message") span.setAttribute(GEN_AI_VOICE_MCP_TOOL_NAME, tn);

      const arid =
        (getField(itm, "approvalRequestId") as string) ??
        (getField(itm, "approval_request_id") as string);
      if (arid) span.setAttribute(GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID, arid);

      const appr = getField(itm, "approve");
      if (appr != null) span.setAttribute(GEN_AI_VOICE_MCP_APPROVE, appr as boolean);
    }
  }
}

function extractSendEventIds(_state: TelemetryState, event: unknown, span: TracingSpan): void {
  const rid = (getField(event, "responseId") as string) ?? (getField(event, "response_id") as string);
  if (rid) span.setAttribute(GEN_AI_RESPONSE_ID, rid);

  const item = getField(event, "item");
  if (item) {
    const cid = (getField(item, "callId") as string) ?? (getField(item, "call_id") as string);
    if (cid) span.setAttribute(GEN_AI_VOICE_CALL_ID, cid);
    const arid =
      (getField(item, "approvalRequestId") as string) ??
      (getField(item, "approval_request_id") as string);
    if (arid) span.setAttribute(GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID, arid);
    const appr = getField(item, "approve");
    if (appr != null) span.setAttribute(GEN_AI_VOICE_MCP_APPROVE, appr as boolean);
  }

  const pid =
    (getField(event, "previousItemId") as string) ??
    (getField(event, "previous_item_id") as string);
  if (pid) span.setAttribute(GEN_AI_VOICE_PREVIOUS_ITEM_ID, pid);
}

function extractSessionId(state: TelemetryState, result: unknown): void {
  const session = getField(result, "session");
  if (!session) return;
  const sid = getField(session, "id") as string;
  if (sid) {
    state.sessionId = sid;
    if (state.connectSpan?.isRecording()) {
      state.connectSpan.setAttribute(GEN_AI_VOICE_SESSION_ID, sid);
    }
  }
}

function extractAgentConfigFromSession(state: TelemetryState, result: unknown): void {
  const session = getField(result, "session");
  if (!session) return;
  const agent = getField(session, "agent");
  if (!agent) return;
  const cs = state.connectSpan;

  const aid = (getField(agent, "agentId") as string) ?? (getField(agent, "agent_id") as string);
  if (aid && cs?.isRecording()) cs.setAttribute(GEN_AI_AGENT_ID, aid);
  const tid = (getField(agent, "threadId") as string) ?? (getField(agent, "thread_id") as string);
  if (tid && cs?.isRecording()) cs.setAttribute(GEN_AI_AGENT_THREAD_ID, tid);
}

function extractResponseDone(state: TelemetryState, result: unknown, span: TracingSpan): void {
  const response = getField(result, "response");
  if (!response) return;
  const cs = state.connectSpan;

  const rid = getField(response, "id") as string;
  if (rid) {
    span.setAttribute(GEN_AI_RESPONSE_ID, rid);
    if (cs?.isRecording()) cs.setAttribute(GEN_AI_RESPONSE_ID, rid);
  }
  const cid =
    (getField(response, "conversationId") as string) ??
    (getField(response, "conversation_id") as string);
  if (cid) {
    state.conversationId = cid;
    span.setAttribute(GEN_AI_CONVERSATION_ID, cid);
    if (cs?.isRecording()) cs.setAttribute(GEN_AI_CONVERSATION_ID, cid);
  }
  const status = getField(response, "status") as string;
  if (status) {
    const fr = JSON.stringify([String(status)]);
    span.setAttribute(GEN_AI_RESPONSE_FINISH_REASONS, fr);
    if (cs?.isRecording()) cs.setAttribute(GEN_AI_RESPONSE_FINISH_REASONS, fr);
  }
}

// ------------------------------------------------------------------ //
//  Done-event content extraction                                      //
// ------------------------------------------------------------------ //

function extractDoneEventContent(result: unknown, eventType: string): string | undefined {
  function collectFromItem(itemObj: unknown): Record<string, unknown>[] {
    const out: Record<string, unknown>[] = [];
    if (!itemObj) return out;
    const itype = getField(itemObj, "type") as string;
    if (itype === "function_call") {
      const n = getField(itemObj, "name") as string;
      const a = getField(itemObj, "arguments") as string;
      const p: Record<string, unknown> = {};
      if (n) p.name = String(n);
      if (a) {
        try {
          p.arguments = JSON.parse(a);
        } catch {
          p.arguments = String(a);
        }
      }
      if (Object.keys(p).length > 0) out.push(p);
      return out;
    }
    const parts = getField(itemObj, "content") as unknown[];
    if (!parts || !Array.isArray(parts)) return out;
    for (const part of parts) {
      const t = getField(part, "text") as string;
      const tr = getField(part, "transcript") as string;
      const pp: Record<string, string> = {};
      if (t) pp.text = String(t);
      if (tr) pp.transcript = String(tr);
      if (Object.keys(pp).length > 0) out.push(pp);
    }
    return out;
  }

  if (eventType === KnownServerEventType.ResponseFunctionCallArgumentsDone) {
    const n = getField(result, "name") as string;
    const a = getField(result, "arguments") as string;
    const p: Record<string, unknown> = {};
    if (n) p.name = String(n);
    if (a) {
      try {
        p.arguments = JSON.parse(a);
      } catch {
        p.arguments = String(a);
      }
    }
    if (Object.keys(p).length > 0) return JSON.stringify(p);
  } else if (eventType === KnownServerEventType.ResponseTextDone) {
    const t = getField(result, "text") as string;
    if (t) return JSON.stringify({ text: t });
  } else if (eventType === KnownServerEventType.ResponseAudioTranscriptDone) {
    const tr = getField(result, "transcript") as string;
    if (tr) return JSON.stringify({ transcript: tr });
  } else if (eventType === KnownServerEventType.ResponseContentPartDone) {
    const part = getField(result, "part");
    if (part) {
      const t = getField(part, "text") as string;
      const tr = getField(part, "transcript") as string;
      const p: Record<string, unknown> = {};
      if (t) p.text = t;
      if (tr) p.transcript = tr;
      if (Object.keys(p).length > 0) return JSON.stringify(p);
    }
  } else if (eventType === KnownServerEventType.ResponseOutputItemDone) {
    const item = getField(result, "item");
    const msgs = collectFromItem(item);
    if (msgs.length > 0) return JSON.stringify({ messages: msgs });
  } else if (eventType === KnownServerEventType.ResponseDone) {
    const resp = getField(result, "response");
    const output = resp ? (getField(resp, "output") as unknown[]) : undefined;
    if (output && Array.isArray(output)) {
      const msgs: Record<string, unknown>[] = [];
      for (const oi of output) msgs.push(...collectFromItem(oi));
      if (msgs.length > 0) return JSON.stringify({ messages: msgs });
    }
  }
  return undefined;
}

// ------------------------------------------------------------------ //
//  Span events                                                        //
// ------------------------------------------------------------------ //

function addSendEvent(span: TracingSpan, eventType: string | undefined, content: string | undefined): void {
  const attrs: Record<string, string> = { [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM };
  if (eventType) attrs["gen_ai.voice.event_type"] = eventType;
  if (_traceVoiceLiveContent && content) attrs[GEN_AI_EVENT_CONTENT] = content;
  span.addEvent("gen_ai.input.messages", attrs);
}

function addRecvEvent(
  span: TracingSpan,
  eventType: string | undefined,
  content: string | undefined,
): void {
  const attrs: Record<string, string> = { [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM };
  if (eventType) attrs["gen_ai.voice.event_type"] = eventType;
  if (_traceVoiceLiveContent && content) attrs[GEN_AI_EVENT_CONTENT] = content;
  span.addEvent("gen_ai.output.messages", attrs);
}

function addRateLimitOrErrorEvent(span: TracingSpan, eventType: string, result: unknown): void {
  const attrs: Record<string, string | number | boolean> = {
    [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
    "gen_ai.voice.event_type": eventType,
  };
  if (eventType === "error") {
    const eObj = getField(result, "error");
    if (eObj) {
      const ec = getField(eObj, "code") as string;
      const em = getField(eObj, "message") as string;
      if (ec) attrs["error.code"] = String(ec);
      if (em) attrs["error.message"] = String(em);
    }
  } else if (eventType === "rate_limits.updated") {
    const rl = getField(result, "rateLimits") ?? getField(result, "rate_limits");
    if (rl) {
      try {
        attrs["gen_ai.voice.rate_limits"] = Array.isArray(rl) ? JSON.stringify(rl) : String(rl);
      } catch {
        /* empty */
      }
    }
  }
  span.addEvent(`gen_ai.voice.${eventType}`, attrs);
}

// ------------------------------------------------------------------ //
//  Metrics                                                            //
// ------------------------------------------------------------------ //

let _durationHist: { record(v: number, a: Record<string, unknown>): void } | undefined;
let _tokenHist: { record(v: number, a: Record<string, unknown>): void } | undefined;

function initializeMetrics(): void {
  const otel = tryLoadOtel();
  if (!otel?.metrics) return;
  try {
    const meter = otel.metrics.getMeter("@azure/ai-voicelive");
    _durationHist = meter.createHistogram(GEN_AI_CLIENT_OPERATION_DURATION, {
      description: "Duration of GenAI VoiceLive operations",
      unit: "s",
    });
    _tokenHist = meter.createHistogram(GEN_AI_CLIENT_TOKEN_USAGE, {
      description: "Token usage for GenAI VoiceLive operations",
      unit: "token",
    });
  } catch {
    logger.info("Failed to initialize VoiceLive metrics");
  }
}

function recordOperationDuration(
  duration: number,
  opName: string,
  serverAddr?: string,
  port?: number,
  model?: string,
  errType?: string,
): void {
  if (!_durationHist) return;
  const a: Record<string, unknown> = {
    [GEN_AI_OPERATION_NAME]: opName,
    [GEN_AI_PROVIDER_NAME]: GEN_AI_PROVIDER_VALUE,
  };
  if (serverAddr) a[SERVER_ADDRESS] = serverAddr;
  if (port != null) a[SERVER_PORT] = String(port);
  if (model) a[GEN_AI_REQUEST_MODEL] = model;
  if (errType) a[ERROR_TYPE] = errType;
  try {
    _durationHist.record(duration, a);
  } catch {
    /* empty */
  }
}

function recordTokenUsage(
  count: number,
  tokenType: string,
  opName: string,
  serverAddr?: string,
  model?: string,
): void {
  if (!_tokenHist) return;
  const a: Record<string, unknown> = {
    [GEN_AI_OPERATION_NAME]: opName,
    [GEN_AI_PROVIDER_NAME]: GEN_AI_PROVIDER_VALUE,
    "gen_ai.token.type": tokenType,
  };
  if (serverAddr) a[SERVER_ADDRESS] = serverAddr;
  if (model) a[GEN_AI_REQUEST_MODEL] = model;
  try {
    _tokenHist.record(count, a);
  } catch {
    /* empty */
  }
}

// ------------------------------------------------------------------ //
//  Environment variable helper                                        //
// ------------------------------------------------------------------ //

function getEnv(name: string): string | undefined {
  try {
    const g = globalThis as Record<string, unknown>;
    const p = g["process"] as { env?: Record<string, string | undefined> } | undefined;
    return p?.env?.[name];
  } catch {
    return undefined;
  }
}

// ------------------------------------------------------------------ //
//  Public API                                                         //
// ------------------------------------------------------------------ //

/**
 * Manages OpenTelemetry trace instrumentation for VoiceLive.
 *
 * Instrumentation is opt-in and controlled via the
 * `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` environment variable,
 * which must be set to `"true"` for `.instrument()` to take effect.
 */
export class VoiceLiveInstrumentor {
  constructor() {
    if (!tryLoadOtel()) {
      throw new Error(
        "OpenTelemetry is not installed. " +
          "Please install it using 'npm install @opentelemetry/api'",
      );
    }
  }

  /**
   * Enable trace instrumentation for VoiceLive.
   *
   * @param options - Optional configuration for instrumentation
   */
  instrument(options?: { enableContentRecording?: boolean }): void {
    const envGate = getEnv("AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING") ?? "";
    if (envGate.toLowerCase() !== "true") {
      logger.info(
        "VoiceLive tracing not enabled. Set AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true to enable.",
      );
      return;
    }

    let ecr = options?.enableContentRecording;
    if (ecr == null) {
      const vNew = getEnv("OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT");
      const vOld = getEnv("AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED");
      let v: string | undefined;
      if (vNew && vOld && vNew !== vOld) {
        logger.error(
          "Environment variables OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT " +
            "and AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED are both set and differ. " +
            "Content recording will be disabled.",
        );
        v = undefined;
      } else {
        v = vNew ?? vOld;
      }
      ecr = v?.toLowerCase() === "true";
    }

    if (!_voiceLiveTracesEnabled) {
      _voiceLiveTracesEnabled = true;
      _traceVoiceLiveContent = ecr ?? false;
      initializeMetrics();
    } else {
      _traceVoiceLiveContent = ecr ?? false;
    }
  }

  /** Remove trace instrumentation for VoiceLive. */
  uninstrument(): void {
    _voiceLiveTracesEnabled = false;
    _traceVoiceLiveContent = false;
  }

  /** Check whether VoiceLive tracing is currently active. */
  isInstrumented(): boolean {
    return _voiceLiveTracesEnabled;
  }

  /** Check whether message content recording is enabled. */
  isContentRecordingEnabled(): boolean {
    return _traceVoiceLiveContent;
  }
}

// ------------------------------------------------------------------ //
//  Telemetry lifecycle (called from VoiceLiveSession)                 //
// ------------------------------------------------------------------ //

/**
 * Creates a new telemetry state for a VoiceLive session connection.
 * @internal
 */
export function createTelemetryState(
  endpoint: string,
  model?: string,
  agentConfig?: AgentSessionConfig,
): { state: TelemetryState; active: boolean } {
  if (!_voiceLiveTracesEnabled || !tryLoadOtel()) {
    return { state: undefined as unknown as TelemetryState, active: false };
  }

  let serverAddress: string | undefined;
  let port: number | undefined;
  try {
    const parsed = new URL(endpoint);
    serverAddress = parsed.hostname;
    port = parsed.port ? parseInt(parsed.port, 10) : undefined;
    if (port == null) {
      const scheme = parsed.protocol?.replace(":", "").toLowerCase();
      if (scheme === "https" || scheme === "wss") port = 443;
      else if (scheme === "http" || scheme === "ws") port = 80;
    }
  } catch {
    /* empty */
  }

  const span = startSpan(OperationName.CONNECT, { serverAddress, port, model });
  if (!span) return { state: undefined as unknown as TelemetryState, active: false };

  const state: TelemetryState = {
    connectSpan: span,
    serverAddress,
    port,
    model,
    sessionId: undefined,
    conversationId: undefined,
    agentName: undefined,
    turnCount: 0,
    interruptionCount: 0,
    audioBytesSent: 0,
    audioBytesReceived: 0,
    mcpCallCount: 0,
    mcpListToolsCount: 0,
    responseCreateTime: undefined,
    firstTokenLatencyRecorded: false,
    connectStartTime: performance.now(),
  };

  if (agentConfig) {
    if (agentConfig.agentName) {
      state.agentName = agentConfig.agentName;
      span.setAttribute(GEN_AI_AGENT_NAME, agentConfig.agentName);
    }
    if (agentConfig.conversationId) {
      state.conversationId = agentConfig.conversationId;
      span.setAttribute(GEN_AI_CONVERSATION_ID, agentConfig.conversationId);
    }
    if (agentConfig.agentVersion) span.setAttribute(GEN_AI_AGENT_VERSION, agentConfig.agentVersion);
    if (agentConfig.projectName) span.setAttribute(GEN_AI_AGENT_PROJECT_NAME, agentConfig.projectName);
  }

  return { state, active: true };
}

/**
 * Trace a send event.
 * @internal
 */
export function traceSend(state: TelemetryState, event: ClientEventUnion): void {
  if (!state?.connectSpan || !tryLoadOtel()) return;

  const eventType = getField(event, "type") as string | undefined;
  const eventTypeStr = eventType ? String(eventType) : "";
  const { content: contentStr, messageSize } = serializeContentAndSize(event);

  // Track audio bytes
  if (eventTypeStr.includes(KnownClientEventType.InputAudioBufferAppend)) {
    const audio = getField(event, "audio") as string;
    if (audio && typeof audio === "string") state.audioBytesSent += base64ByteLength(audio);
  }

  // Track interruptions
  if (eventTypeStr.includes(KnownClientEventType.ResponseCancel)) state.interruptionCount += 1;

  // Track response.create for latency
  if (eventTypeStr.includes(KnownClientEventType.ResponseCreate)) {
    state.responseCreateTime = performance.now();
    state.firstTokenLatencyRecorded = false;
  }

  // Extract audio format from session.update
  if (eventTypeStr.includes(KnownClientEventType.SessionUpdate)) {
    const session = getField(event, "session");
    if (session) extractSessionAudioAttributes(state, session);
    extractSessionConfigFromSend(state, event);
  }

  const spanName = eventType ? `send ${eventType}` : "send";
  const span = startSpan(OperationName.SEND, {
    serverAddress: state.serverAddress,
    port: state.port,
    model: state.model,
    spanName,
    parentSpan: state.connectSpan,
  });
  if (!span) return;

  try {
    addConnectionContextAttributes(state, span);
    if (eventType) span.setAttribute("gen_ai.voice.event_type", eventType);
    if (messageSize != null) span.setAttribute(GEN_AI_VOICE_MESSAGE_SIZE, messageSize);
    extractSendEventIds(state, event, span);
    addSendEvent(span, eventType, contentStr);
  } catch (err) {
    recordError(span, err);
  } finally {
    span.end();
  }
}

/**
 * Trace a received event.
 * @internal
 */
export function traceRecv(state: TelemetryState, result: ServerEventUnion): void {
  if (!state?.connectSpan || !tryLoadOtel()) return;

  const eventType = getField(result, "type") as string | undefined;
  const eventTypeStr = eventType ? String(eventType) : "";
  const { messageSize } = serializeContentAndSize(result);

  // --- First-token latency ---
  if (
    eventTypeStr === KnownServerEventType.ResponseAudioDelta ||
    eventTypeStr === KnownServerEventType.ResponseTextDelta
  ) {
    if (state.responseCreateTime != null && !state.firstTokenLatencyRecorded) {
      const latencyMs = performance.now() - state.responseCreateTime;
      const rounded = Math.round(latencyMs * 100) / 100;

      if (state.connectSpan?.isRecording()) {
        state.connectSpan.setAttribute(GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS, rounded);
      }
      state.firstTokenLatencyRecorded = true;

      if (_DELTA_SKIP_EVENT_TYPES.has(eventTypeStr)) return;

      const span = startSpan(OperationName.RECV, {
        serverAddress: state.serverAddress,
        port: state.port,
        model: state.model,
        spanName: `recv ${eventTypeStr}`,
        parentSpan: state.connectSpan,
      });
      if (!span) return;
      try {
        addConnectionContextAttributes(state, span);
        span.setAttribute("gen_ai.voice.event_type", eventTypeStr);
        span.setAttribute(GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS, rounded);
        if (messageSize != null) span.setAttribute(GEN_AI_VOICE_MESSAGE_SIZE, messageSize);
        extractEventIds(state, result, span);
        const dc = _traceVoiceLiveContent ? extractDoneEventContent(result, eventTypeStr) : undefined;
        addRecvEvent(span, eventTypeStr, dc);
        trackAudioBytesReceived(state, result);
      } catch (err) {
        recordError(span, err);
      } finally {
        span.end();
      }
      return;
    }
  }

  if (_DELTA_SKIP_EVENT_TYPES.has(eventTypeStr)) return;

  const span = startSpan(OperationName.RECV, {
    serverAddress: state.serverAddress,
    port: state.port,
    model: state.model,
    parentSpan: state.connectSpan,
  });
  if (!span) return;

  try {
    addConnectionContextAttributes(state, span);

    if (eventType) {
      span.setAttribute("gen_ai.voice.event_type", eventTypeStr);
      span.updateName(`recv ${eventTypeStr}`);
    }
    if (messageSize != null) span.setAttribute(GEN_AI_VOICE_MESSAGE_SIZE, messageSize);

    const dc = _traceVoiceLiveContent ? extractDoneEventContent(result, eventTypeStr) : undefined;
    addRecvEvent(span, eventTypeStr || undefined, dc);
    extractEventIds(state, result, span);

    if (_SESSION_EVENT_TYPES.has(eventTypeStr)) {
      extractSessionId(state, result);
      extractSessionAudioAttributes(state, getField(result, "session") ?? result);
      extractAgentConfigFromSession(state, result);
    }

    if (eventTypeStr === KnownServerEventType.ResponseAudioDelta) trackAudioBytesReceived(state, result);

    if (eventTypeStr === KnownServerEventType.ResponseDone) {
      state.turnCount += 1;
      extractResponseDone(state, result, span);
    }

    if (eventTypeStr === KnownServerEventType.Error || eventTypeStr === "rate_limits.updated") {
      addRateLimitOrErrorEvent(span, eventTypeStr, result);
    }

    if (_MCP_CALL_EVENT_TYPES.has(eventTypeStr)) state.mcpCallCount += 1;
    if (_MCP_LIST_TOOLS_EVENT_TYPES.has(eventTypeStr)) state.mcpListToolsCount += 1;

    const usage = getField(result, "usage");
    if (usage) {
      const it = (getField(usage, "inputTokens") as number) ?? (getField(usage, "input_tokens") as number);
      const ot = (getField(usage, "outputTokens") as number) ?? (getField(usage, "output_tokens") as number);
      if (it != null) {
        span.setAttribute(GEN_AI_USAGE_INPUT_TOKENS, it);
        recordTokenUsage(it, "input", OperationName.RECV, state.serverAddress, state.model);
      }
      if (ot != null) {
        span.setAttribute(GEN_AI_USAGE_OUTPUT_TOKENS, ot);
        recordTokenUsage(ot, "output", OperationName.RECV, state.serverAddress, state.model);
      }
    }
  } catch (err) {
    recordError(span, err);
  } finally {
    span.end();
  }
}

/**
 * Trace a close event and flush session-level counters.
 * @internal
 */
export function traceClose(state: TelemetryState, error?: unknown): void {
  if (!state?.connectSpan || !tryLoadOtel()) return;

  const span = startSpan(OperationName.CLOSE, {
    serverAddress: state.serverAddress,
    port: state.port,
    model: state.model,
    parentSpan: state.connectSpan,
  });
  if (span) {
    try {
      addConnectionContextAttributes(state, span);
    } catch (err) {
      recordError(span, err);
    } finally {
      span.end();
    }
  }

  const cs = state.connectSpan;
  if (cs?.isRecording()) {
    if (state.turnCount > 0) cs.setAttribute(GEN_AI_VOICE_TURN_COUNT, state.turnCount);
    if (state.interruptionCount > 0) cs.setAttribute(GEN_AI_VOICE_INTERRUPTION_COUNT, state.interruptionCount);
    if (state.audioBytesSent > 0) cs.setAttribute(GEN_AI_VOICE_AUDIO_BYTES_SENT, state.audioBytesSent);
    if (state.audioBytesReceived > 0) cs.setAttribute(GEN_AI_VOICE_AUDIO_BYTES_RECEIVED, state.audioBytesReceived);
    if (state.mcpCallCount > 0) cs.setAttribute(GEN_AI_VOICE_MCP_CALL_COUNT, state.mcpCallCount);
    if (state.mcpListToolsCount > 0) cs.setAttribute(GEN_AI_VOICE_MCP_LIST_TOOLS_COUNT, state.mcpListToolsCount);
  }

  const duration = (performance.now() - state.connectStartTime) / 1000;
  recordOperationDuration(
    duration,
    OperationName.CONNECT,
    state.serverAddress,
    state.port,
    state.model,
    error ? (error instanceof Error ? error.constructor.name : "Error") : undefined,
  );

  if (error) recordError(cs, error);
  cs.end();
}
