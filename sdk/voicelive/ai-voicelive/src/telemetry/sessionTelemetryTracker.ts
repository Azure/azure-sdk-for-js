// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TracingSpan, TracingContext } from "@azure/core-tracing";
import { tracingClient } from "./tracing.js";
import {
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  AZ_AI_VOICELIVE_SYSTEM,
  GEN_AI_SYSTEM,
  GEN_AI_OPERATION_NAME,
  GEN_AI_PROVIDER_NAME,
  GEN_AI_PROVIDER_NAME_VALUE,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_VOICE_SESSION_ID,
  GEN_AI_VOICE_EVENT_TYPE,
  GEN_AI_VOICE_INPUT_AUDIO_FORMAT,
  GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT,
  GEN_AI_VOICE_INPUT_SAMPLE_RATE,
  GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS,
  GEN_AI_VOICE_TURN_COUNT,
  GEN_AI_VOICE_INTERRUPTION_COUNT,
  GEN_AI_VOICE_AUDIO_BYTES_SENT,
  GEN_AI_VOICE_AUDIO_BYTES_RECEIVED,
  GEN_AI_VOICE_MESSAGE_SIZE,
  GEN_AI_VOICE_CALL_ID,
  GEN_AI_VOICE_ITEM_ID,
  GEN_AI_VOICE_PREVIOUS_ITEM_ID,
  GEN_AI_VOICE_OUTPUT_INDEX,
  GEN_AI_VOICE_MCP_CALL_COUNT,
  GEN_AI_VOICE_MCP_LIST_TOOLS_COUNT,
  GEN_AI_VOICE_MCP_SERVER_LABEL,
  GEN_AI_VOICE_MCP_TOOL_NAME,
  GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID,
  GEN_AI_VOICE_MCP_APPROVE,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_RESPONSE_ID,
  GEN_AI_RESPONSE_FINISH_REASONS,
  GEN_AI_CONVERSATION_ID,
  GEN_AI_AGENT_NAME,
  GEN_AI_AGENT_ID,
  GEN_AI_AGENT_THREAD_ID,
  GEN_AI_AGENT_VERSION,
  GEN_AI_AGENT_PROJECT_NAME,
  GEN_AI_EVENT_CONTENT,
  GEN_AI_INPUT_MESSAGES_EVENT,
  GEN_AI_OUTPUT_MESSAGES_EVENT,
  GEN_AI_VOICE_ERROR_EVENT,
  GEN_AI_VOICE_RATE_LIMITS_EVENT,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_MAX_OUTPUT_TOKENS,
  GEN_AI_REQUEST_TOOLS,
  SERVER_ADDRESS,
  SERVER_PORT,
  ERROR_TYPE,
  OperationName,
} from "./attributes.js";
import { KnownServerEventType, KnownClientEventType } from "../models/index.js";

/**
 * Options for creating a session telemetry tracker.
 */
export interface SessionTelemetryOptions {
  /** The server endpoint hostname */
  serverAddress?: string;
  /** The server endpoint port */
  serverPort?: number;
  /** The model name */
  model?: string;
  /** The agent name (for agent-centric sessions) */
  agentName?: string;
  /** The agent version (for agent-centric sessions) */
  agentVersion?: string;
  /** The agent project name (for agent-centric sessions) */
  agentProjectName?: string;
  /** The conversation ID (from agent config, if set at connect time) */
  conversationId?: string;
  /** Whether to record full message content in span events */
  enableContentRecording?: boolean;
}

/** Set of server event types to skip creating recv spans for (high-frequency deltas). */
const DELTA_SKIP_EVENT_TYPES = new Set<string>([
  KnownServerEventType.ResponseTextDelta,
  KnownServerEventType.ResponseAudioTranscriptDelta,
  KnownServerEventType.ResponseAudioDelta,
  KnownServerEventType.ResponseAnimationBlendshapesDelta,
  KnownServerEventType.ResponseAnimationVisemeDelta,
  KnownServerEventType.ResponseAudioTimestampDelta,
]);

/** Event types that carry a nested `item` with extractable fields. */
const ITEM_BEARING_EVENT_TYPES = new Set<string>([
  KnownServerEventType.ConversationItemCreated,
  KnownServerEventType.ConversationItemRetrieved,
  KnownServerEventType.ResponseOutputItemAdded,
  KnownServerEventType.ResponseOutputItemDone,
]);

/** Tracks session-level telemetry for a VoiceLive session. */
export class SessionTelemetryTracker {
  private _connectSpan: TracingSpan | undefined;
  private _connectTracingContext: TracingContext | undefined;
  private _sessionId: string | undefined;
  private _conversationId: string | undefined;
  private _turnCount = 0;
  private _interruptionCount = 0;
  private _audioBytesSent = 0;
  private _audioBytesReceived = 0;
  private _mcpCallCount = 0;
  private _mcpListToolsCount = 0;
  private _responseCreateTime: number | undefined;
  private _firstTokenLatencyRecorded = false;
  private _options: SessionTelemetryOptions;
  private _enableContentRecording: boolean;

  constructor(options: SessionTelemetryOptions = {}) {
    this._options = options;
    this._enableContentRecording = options.enableContentRecording ?? false;
    // Pre-set conversation ID from agent config if provided
    if (options.conversationId) {
      this._conversationId = options.conversationId;
    }
  }

  /**
   * Starts the connect span (parent span for the whole session lifecycle).
   *
   * Resets all per-session state so that a single SessionTelemetryTracker instance
   * can be reused across reconnects (VoiceLiveSession may disconnect and reconnect
   * with the same tracker). Guards against being called while a previous connect
   * span is still active to avoid orphaning it.
   */
  startConnectSpan(): void {
    // Guard: if a previous connect span is still active (caller forgot to traceClose),
    // close it cleanly before starting a new one to avoid leaking the span.
    if (this._connectSpan) {
      this.traceClose();
    }

    // Reset all per-session counters and IDs so values from a prior session do not
    // leak into the new one.
    this._sessionId = undefined;
    this._conversationId = this._options.conversationId; // restore initial value, if any
    this._turnCount = 0;
    this._interruptionCount = 0;
    this._audioBytesSent = 0;
    this._audioBytesReceived = 0;
    this._mcpCallCount = 0;
    this._mcpListToolsCount = 0;
    this._responseCreateTime = undefined;
    this._firstTokenLatencyRecorded = false;

    const { span, updatedOptions } = tracingClient.startSpan(
      OperationName.Connect,
      {},
      {
        spanAttributes: {
          [AZ_NAMESPACE]: AZ_NAMESPACE_VALUE,
          [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
          [GEN_AI_OPERATION_NAME]: OperationName.Connect,
          [GEN_AI_PROVIDER_NAME]: GEN_AI_PROVIDER_NAME_VALUE,
          ...(this._options.serverAddress && {
            [SERVER_ADDRESS]: this._options.serverAddress,
          }),
          ...(this._options.serverPort && { [SERVER_PORT]: this._options.serverPort }),
          ...(this._options.model && { [GEN_AI_REQUEST_MODEL]: this._options.model }),
          ...(this._options.agentName && { [GEN_AI_AGENT_NAME]: this._options.agentName }),
          ...(this._options.agentVersion && { [GEN_AI_AGENT_VERSION]: this._options.agentVersion }),
          ...(this._options.agentProjectName && {
            [GEN_AI_AGENT_PROJECT_NAME]: this._options.agentProjectName,
          }),
          ...(this._conversationId && { [GEN_AI_CONVERSATION_ID]: this._conversationId }),
        },
      },
    );

    this._connectSpan = span;
    this._connectTracingContext = updatedOptions.tracingOptions?.tracingContext;
  }

  /**
   * Records a successful connection.
   */
  recordConnectSuccess(): void {
    // connect span stays open — it's the parent for the session lifetime
  }

  /**
   * Records a connection error and ends the connect span.
   */
  recordConnectError(error: Error): void {
    if (this._connectSpan) {
      this._connectSpan.setAttribute(ERROR_TYPE, error.name || "Error");
      this._connectSpan.setStatus({ status: "error", error: error.message });
      this._connectSpan.end();
      this._connectSpan = undefined;
    }
  }

  /**
   * Traces a send operation (client → server message).
   */
  traceSend(event: Record<string, unknown>): void {
    if (!this._connectSpan || !this._connectTracingContext) return;

    const eventType = (event.type as string) ?? undefined;
    const spanName = eventType ? `send ${eventType}` : "send";

    const { span } = tracingClient.startSpan(spanName, {
      tracingOptions: { tracingContext: this._connectTracingContext },
    });
    try {
      this._setCommonAttributes(span, OperationName.Send, eventType);

      // Message size
      const messageSize = this._computeMessageSize(event);
      if (messageSize !== undefined) {
        span.setAttribute(GEN_AI_VOICE_MESSAGE_SIZE, messageSize);
      }

      // Track audio bytes for input_audio_buffer.append
      if (eventType === KnownClientEventType.InputAudioBufferAppend) {
        this._trackAudioBytesSent(event);
      }

      // Track response.cancel for interruption count
      if (eventType === KnownClientEventType.ResponseCancel) {
        this._interruptionCount++;
      }

      // Track response.create timestamp for first-token latency
      if (eventType === KnownClientEventType.ResponseCreate) {
        this._responseCreateTime = Date.now();
        this._firstTokenLatencyRecorded = false;
      }

      // Extract audio format from session.update
      if (eventType === KnownClientEventType.SessionUpdate) {
        this._extractSessionConfigFromSend(event, span);
      }

      // Extract call_id, response_id from send events
      this._extractSendEventIds(event, span);

      // Add span event
      this._addSendSpanEvent(span, eventType, event);

      span.setStatus({ status: "success" });
    } catch (err: any) {
      span.setStatus({ status: "error", error: err });
    } finally {
      span.end();
    }
  }

  /**
   * Traces a received server event.
   */
  traceRecv(event: Record<string, unknown>): void {
    if (!this._connectSpan || !this._connectTracingContext) return;

    const eventType = (event.type as string) ?? undefined;
    const eventTypeStr = eventType ?? "";

    // Skip high-frequency delta events to keep telemetry volume lower,
    // but still measure first-token latency from audio/text deltas.
    if (DELTA_SKIP_EVENT_TYPES.has(eventTypeStr)) {
      this._checkFirstTokenLatency(eventTypeStr);
      // Track audio bytes for audio delta
      if (eventTypeStr === KnownServerEventType.ResponseAudioDelta) {
        this._trackAudioBytesRecv(event);
      }
      return;
    }

    const spanName = eventType ? `recv ${eventType}` : "recv";

    const { span } = tracingClient.startSpan(spanName, {
      tracingOptions: { tracingContext: this._connectTracingContext },
    });
    try {
      this._setCommonAttributes(span, OperationName.Recv, eventType);

      // Message size
      const messageSize = this._computeMessageSize(event);
      if (messageSize !== undefined) {
        span.setAttribute(GEN_AI_VOICE_MESSAGE_SIZE, messageSize);
      }

      // Session ID and audio format from session.created / session.updated
      if (
        eventTypeStr === KnownServerEventType.SessionCreated ||
        eventTypeStr === KnownServerEventType.SessionUpdated
      ) {
        this._extractSessionFromRecv(event);
        this._extractAgentConfigFromSession(event);
      }

      // Turn count from response.done
      if (eventTypeStr === KnownServerEventType.ResponseDone) {
        this._turnCount++;
        this._extractResponseDone(event, span);
      }

      // Extract event IDs (response_id, call_id, item_id, etc.)
      this._extractRecvEventIds(event, span);

      // MCP call count
      if (
        eventTypeStr === KnownServerEventType.ResponseMcpCallCompleted ||
        eventTypeStr === KnownServerEventType.ResponseMcpCallFailed
      ) {
        this._mcpCallCount++;
      }

      // MCP list tools count
      if (
        eventTypeStr === KnownServerEventType.McpListToolsCompleted ||
        eventTypeStr === KnownServerEventType.McpListToolsFailed
      ) {
        this._mcpListToolsCount++;
      }

      // Token usage
      this._extractTokenUsage(event, span);

      // Error / rate limits events
      if (eventTypeStr === KnownServerEventType.Error) {
        this._addErrorSpanEvent(span, event);
      }
      if (eventTypeStr === "rate_limits.updated") {
        this._addRateLimitsSpanEvent(span, event);
      }

      // Add span event
      this._addRecvSpanEvent(span, eventType, event);

      // Don't overwrite the error status set by _addErrorSpanEvent for server "error" events.
      if (eventTypeStr !== KnownServerEventType.Error) {
        span.setStatus({ status: "success" });
      }
    } catch (err: any) {
      span.setStatus({ status: "error", error: err });
    } finally {
      span.end();
    }
  }

  /**
   * Traces a close operation and ends the connect span with session-level counters.
   */
  traceClose(error?: Error): void {
    if (!this._connectSpan || !this._connectTracingContext) return;

    // Create a close child span (use startSpan+end, not withSpan, to stay synchronous)
    const { span: closeSpan } = tracingClient.startSpan(OperationName.Close, {
      tracingOptions: { tracingContext: this._connectTracingContext },
    });
    try {
      this._setCommonAttributes(closeSpan, OperationName.Close, undefined);
      if (this._sessionId) {
        closeSpan.setAttribute(GEN_AI_VOICE_SESSION_ID, this._sessionId);
      }
      closeSpan.setStatus({ status: "success" });
    } catch (err: any) {
      closeSpan.setStatus({ status: "error", error: err });
    } finally {
      closeSpan.end();
    }

    // Record session-level counters on the connect span
    if (this._turnCount > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_TURN_COUNT, this._turnCount);
    }
    if (this._interruptionCount > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_INTERRUPTION_COUNT, this._interruptionCount);
    }
    if (this._audioBytesSent > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_AUDIO_BYTES_SENT, this._audioBytesSent);
    }
    if (this._audioBytesReceived > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_AUDIO_BYTES_RECEIVED, this._audioBytesReceived);
    }
    if (this._mcpCallCount > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_MCP_CALL_COUNT, this._mcpCallCount);
    }
    if (this._mcpListToolsCount > 0) {
      this._connectSpan.setAttribute(GEN_AI_VOICE_MCP_LIST_TOOLS_COUNT, this._mcpListToolsCount);
    }

    // End the connect span
    if (error) {
      this._connectSpan.setAttribute(ERROR_TYPE, error.name || "Error");
      this._connectSpan.setStatus({ status: "error", error: error.message });
    } else {
      this._connectSpan.setStatus({ status: "success" });
    }
    this._connectSpan.end();
    this._connectSpan = undefined;
    this._connectTracingContext = undefined;
  }

  /** Whether tracing is active (connect span is open) */
  get isActive(): boolean {
    return this._connectSpan !== undefined;
  }

  // --- Private helpers ---

  private _setCommonAttributes(
    span: TracingSpan,
    operation: OperationName,
    eventType: string | undefined,
  ): void {
    span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
    span.setAttribute(GEN_AI_SYSTEM, AZ_AI_VOICELIVE_SYSTEM);
    span.setAttribute(GEN_AI_OPERATION_NAME, operation);
    span.setAttribute(GEN_AI_PROVIDER_NAME, GEN_AI_PROVIDER_NAME_VALUE);
    if (this._options.serverAddress) {
      span.setAttribute(SERVER_ADDRESS, this._options.serverAddress);
    }
    if (this._options.serverPort) {
      span.setAttribute(SERVER_PORT, this._options.serverPort);
    }
    if (this._options.model) {
      span.setAttribute(GEN_AI_REQUEST_MODEL, this._options.model);
    }
    if (this._sessionId) {
      span.setAttribute(GEN_AI_VOICE_SESSION_ID, this._sessionId);
    }
    if (this._conversationId) {
      span.setAttribute(GEN_AI_CONVERSATION_ID, this._conversationId);
    }
    if (eventType) {
      span.setAttribute(GEN_AI_VOICE_EVENT_TYPE, eventType);
    }
  }

  private _computeMessageSize(event: Record<string, unknown>): number | undefined {
    try {
      return JSON.stringify(event).length;
    } catch {
      return undefined;
    }
  }

  private _trackAudioBytesSent(event: Record<string, unknown>): void {
    const audio = event.audio;
    if (typeof audio === "string") {
      // base64 encoded audio → approximate decoded byte count
      this._audioBytesSent += Math.floor((audio.length * 3) / 4);
    }
  }

  private _trackAudioBytesRecv(event: Record<string, unknown>): void {
    const delta = event.delta;
    if (typeof delta === "string") {
      this._audioBytesReceived += Math.floor((delta.length * 3) / 4);
    }
  }

  private _checkFirstTokenLatency(eventType: string): void {
    if (
      (eventType === KnownServerEventType.ResponseAudioDelta ||
        eventType === KnownServerEventType.ResponseTextDelta) &&
      this._responseCreateTime !== undefined &&
      !this._firstTokenLatencyRecorded
    ) {
      const latencyMs = Date.now() - this._responseCreateTime;
      this._connectSpan?.setAttribute(
        GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS,
        Math.round(latencyMs * 100) / 100,
      );
      this._firstTokenLatencyRecorded = true;
    }
  }

  private _extractSessionFromRecv(event: Record<string, unknown>): void {
    const session = event.session as Record<string, unknown> | undefined;
    if (!session) return;

    // Session ID
    const sessionId = session.id as string | undefined;
    if (sessionId) {
      this._sessionId = sessionId;
      this._connectSpan?.setAttribute(GEN_AI_VOICE_SESSION_ID, sessionId);
    }

    // Audio formats
    const inputAudioFormat = session.input_audio_format as string | undefined;
    if (inputAudioFormat) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_INPUT_AUDIO_FORMAT, inputAudioFormat);
    }
    const outputAudioFormat = session.output_audio_format as string | undefined;
    if (outputAudioFormat) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT, outputAudioFormat);
    }

    // Input sample rate
    const inputSampleRate = session.input_audio_sampling_rate;
    if (inputSampleRate !== undefined && inputSampleRate !== null) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_INPUT_SAMPLE_RATE, Number(inputSampleRate));
    }
  }

  private _extractAgentConfigFromSession(event: Record<string, unknown>): void {
    const session = event.session as Record<string, unknown> | undefined;
    if (!session) return;

    const agent = session.agent as Record<string, unknown> | undefined;
    if (!agent) return;

    const agentId = agent.agent_id as string | undefined;
    if (agentId) {
      this._connectSpan?.setAttribute(GEN_AI_AGENT_ID, agentId);
    }

    const threadId = agent.thread_id as string | undefined;
    if (threadId) {
      this._connectSpan?.setAttribute(GEN_AI_AGENT_THREAD_ID, threadId);
    }
  }

  private _extractSessionConfigFromSend(event: Record<string, unknown>, span: TracingSpan): void {
    const session = event.session as Record<string, unknown> | undefined;
    if (!session) return;

    // Audio formats
    const inputAudioFormat = session.input_audio_format as string | undefined;
    if (inputAudioFormat) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_INPUT_AUDIO_FORMAT, inputAudioFormat);
    }
    const outputAudioFormat = session.output_audio_format as string | undefined;
    if (outputAudioFormat) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT, outputAudioFormat);
    }

    // Input sample rate
    const inputSampleRate = session.input_audio_sampling_rate;
    if (inputSampleRate !== undefined && inputSampleRate !== null) {
      this._connectSpan?.setAttribute(GEN_AI_VOICE_INPUT_SAMPLE_RATE, Number(inputSampleRate));
    }

    // System instructions
    // Only record system instructions when content recording is explicitly enabled.
    // System prompts often contain sensitive customer content, so they must not leak
    // into traces by default. _addSystemInstructionsSpanEvent already enforces the
    // same gate for the span event payload.
    const instructions = session.instructions as string | undefined;
    if (instructions && this._enableContentRecording) {
      this._connectSpan?.setAttribute(GEN_AI_SYSTEM_MESSAGE, instructions);
      this._addSystemInstructionsSpanEvent(span, instructions);
    }

    // Temperature
    const temperature = session.temperature;
    if (temperature !== undefined && temperature !== null) {
      this._connectSpan?.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(temperature));
    }

    // Max output tokens
    const maxOutputTokens = session.max_response_output_tokens;
    if (maxOutputTokens !== undefined && maxOutputTokens !== null) {
      this._connectSpan?.setAttribute(GEN_AI_REQUEST_MAX_OUTPUT_TOKENS, Number(maxOutputTokens));
    }

    // Tools
    const tools = session.tools;
    if (tools && Array.isArray(tools)) {
      try {
        this._connectSpan?.setAttribute(GEN_AI_REQUEST_TOOLS, JSON.stringify(tools));
      } catch {
        // ignore serialization errors
      }
    }
  }

  private _extractResponseDone(event: Record<string, unknown>, span: TracingSpan): void {
    const response = event.response as Record<string, unknown> | undefined;
    if (!response) return;

    // Propagate response ID to the connect span
    const responseId = response.id as string | undefined;
    if (responseId) {
      this._connectSpan?.setAttribute(GEN_AI_RESPONSE_ID, responseId);
    }

    // Finish status
    const status = response.status as string | undefined;
    if (status) {
      span.setAttribute(GEN_AI_RESPONSE_FINISH_REASONS, JSON.stringify([status]));
      this._connectSpan?.setAttribute(GEN_AI_RESPONSE_FINISH_REASONS, JSON.stringify([status]));
    }
  }

  private _extractRecvEventIds(event: Record<string, unknown>, span: TracingSpan): void {
    const eventType = (event.type as string) ?? "";

    // Top-level IDs (available on most response.* events)
    const responseId = event.response_id as string | undefined;
    if (responseId) {
      span.setAttribute(GEN_AI_RESPONSE_ID, responseId);
    }

    const callId = event.call_id as string | undefined;
    if (callId) {
      span.setAttribute(GEN_AI_VOICE_CALL_ID, callId);
    }

    const itemId = event.item_id as string | undefined;
    if (itemId) {
      span.setAttribute(GEN_AI_VOICE_ITEM_ID, itemId);
    }

    const previousItemId = event.previous_item_id as string | undefined;
    if (previousItemId) {
      span.setAttribute(GEN_AI_VOICE_PREVIOUS_ITEM_ID, previousItemId);
    }

    const outputIndex = event.output_index;
    if (outputIndex !== undefined && outputIndex !== null) {
      span.setAttribute(GEN_AI_VOICE_OUTPUT_INDEX, Number(outputIndex));
    }

    // Nested response.id and response.conversation_id (response.created / response.done)
    if (
      eventType === KnownServerEventType.ResponseCreated ||
      eventType === KnownServerEventType.ResponseDone
    ) {
      const response = event.response as Record<string, unknown> | undefined;
      if (response) {
        const nestedResponseId = response.id as string | undefined;
        if (nestedResponseId) {
          span.setAttribute(GEN_AI_RESPONSE_ID, nestedResponseId);
        }
        const nestedConvId = response.conversation_id as string | undefined;
        if (nestedConvId) {
          this._conversationId = nestedConvId;
          span.setAttribute(GEN_AI_CONVERSATION_ID, nestedConvId);
          this._connectSpan?.setAttribute(GEN_AI_CONVERSATION_ID, nestedConvId);
        }
      }
    }

    // Guarded nested item extraction (only for known item-bearing events)
    if (ITEM_BEARING_EVENT_TYPES.has(eventType)) {
      const item = event.item as Record<string, unknown> | undefined;
      if (item) {
        const nestedItemId = item.id as string | undefined;
        if (nestedItemId) {
          span.setAttribute(GEN_AI_VOICE_ITEM_ID, nestedItemId);
        }
        const nestedCallId = item.call_id as string | undefined;
        if (nestedCallId) {
          span.setAttribute(GEN_AI_VOICE_CALL_ID, nestedCallId);
        }
        // MCP-specific nested fields
        const serverLabel = item.server_label as string | undefined;
        if (serverLabel) {
          span.setAttribute(GEN_AI_VOICE_MCP_SERVER_LABEL, serverLabel);
        }
        const toolName = item.name as string | undefined;
        // Only extract tool name for non-message item types
        if (toolName && item.type !== "message") {
          span.setAttribute(GEN_AI_VOICE_MCP_TOOL_NAME, toolName);
        }
        const approvalRequestId = item.approval_request_id as string | undefined;
        if (approvalRequestId) {
          span.setAttribute(GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID, approvalRequestId);
        }
        const approve = item.approve;
        if (approve !== undefined) {
          span.setAttribute(GEN_AI_VOICE_MCP_APPROVE, String(approve));
        }
      }
    }
  }

  private _extractSendEventIds(event: Record<string, unknown>, span: TracingSpan): void {
    const responseId = event.response_id as string | undefined;
    if (responseId) {
      span.setAttribute(GEN_AI_RESPONSE_ID, responseId);
    }

    const previousItemId = event.previous_item_id as string | undefined;
    if (previousItemId) {
      span.setAttribute(GEN_AI_VOICE_PREVIOUS_ITEM_ID, previousItemId);
    }

    const item = event.item as Record<string, unknown> | undefined;
    if (item) {
      const callId = item.call_id as string | undefined;
      if (callId) {
        span.setAttribute(GEN_AI_VOICE_CALL_ID, callId);
      }
      // MCP approval fields on send
      const approvalRequestId = item.approval_request_id as string | undefined;
      if (approvalRequestId) {
        span.setAttribute(GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID, approvalRequestId);
      }
      const approve = item.approve;
      if (approve !== undefined) {
        span.setAttribute(GEN_AI_VOICE_MCP_APPROVE, String(approve));
      }
    }
  }

  private _extractTokenUsage(event: Record<string, unknown>, span: TracingSpan): void {
    // Token usage can be at top-level event.usage or nested in response.usage (response.done)
    let usage = event.usage as Record<string, unknown> | undefined;
    if (!usage) {
      const response = event.response as Record<string, unknown> | undefined;
      usage = response?.usage as Record<string, unknown> | undefined;
    }
    if (!usage) return;

    const inputTokens = usage.input_tokens as number | undefined;
    if (inputTokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_INPUT_TOKENS, inputTokens);
    }

    const outputTokens = usage.output_tokens as number | undefined;
    if (outputTokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_OUTPUT_TOKENS, outputTokens);
    }
  }

  private _addSendSpanEvent(
    span: TracingSpan,
    eventType: string | undefined,
    event: Record<string, unknown>,
  ): void {
    const attrs: Record<string, unknown> = {
      [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
    };
    if (eventType) {
      attrs[GEN_AI_VOICE_EVENT_TYPE] = eventType;
    }
    if (this._enableContentRecording) {
      try {
        attrs[GEN_AI_EVENT_CONTENT] = JSON.stringify(event);
      } catch {
        // ignore
      }
    }
    span.addEvent?.(GEN_AI_INPUT_MESSAGES_EVENT, { attributes: attrs });
  }

  private _addRecvSpanEvent(
    span: TracingSpan,
    eventType: string | undefined,
    event: Record<string, unknown>,
  ): void {
    const attrs: Record<string, unknown> = {
      [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
    };
    if (eventType) {
      attrs[GEN_AI_VOICE_EVENT_TYPE] = eventType;
    }
    if (this._enableContentRecording) {
      try {
        attrs[GEN_AI_EVENT_CONTENT] = JSON.stringify(event);
      } catch {
        // ignore
      }
    }
    span.addEvent?.(GEN_AI_OUTPUT_MESSAGES_EVENT, { attributes: attrs });
  }

  private _addErrorSpanEvent(span: TracingSpan, event: Record<string, unknown>): void {
    const errorObj = event.error as Record<string, unknown> | undefined;
    const attrs: Record<string, unknown> = {
      [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
    };
    if (errorObj) {
      const code = errorObj.code as string | undefined;
      if (code) attrs["error.code"] = code;
      const message = errorObj.message as string | undefined;
      if (message) attrs["error.message"] = message;
    }
    span.addEvent?.(GEN_AI_VOICE_ERROR_EVENT, { attributes: attrs });

    // Also set error status on the span
    const errorMessage = (errorObj?.message as string) ?? "Server error";
    span.setStatus({ status: "error", error: errorMessage });
    span.setAttribute(ERROR_TYPE, (errorObj?.type as string) ?? "server_error");
  }

  private _addRateLimitsSpanEvent(span: TracingSpan, event: Record<string, unknown>): void {
    const rateLimits = event.rate_limits;
    const attrs: Record<string, unknown> = {
      [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
    };
    if (rateLimits) {
      try {
        attrs["rate_limits"] = JSON.stringify(rateLimits);
      } catch {
        // ignore
      }
    }
    span.addEvent?.(GEN_AI_VOICE_RATE_LIMITS_EVENT, { attributes: attrs });
  }

  private _addSystemInstructionsSpanEvent(span: TracingSpan, instructions: string): void {
    if (!this._enableContentRecording) return;
    const attrs: Record<string, unknown> = {
      [GEN_AI_SYSTEM]: AZ_AI_VOICELIVE_SYSTEM,
      [GEN_AI_EVENT_CONTENT]: JSON.stringify([{ role: "system", content: instructions }]),
    };
    span.addEvent?.(GEN_AI_SYSTEM_MESSAGE, { attributes: attrs });
  }
}
