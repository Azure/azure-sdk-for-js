// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServerEventUnion,
  ServerEventError,
  ServerEventSessionCreated,
  ServerEventSessionUpdated,
  ServerEventSessionAvatarConnecting,
  ServerEventInputAudioBufferCommitted,
  ServerEventInputAudioBufferCleared,
  ServerEventInputAudioBufferSpeechStarted,
  ServerEventInputAudioBufferSpeechStopped,
  ServerEventConversationItemCreated,
  ServerEventConversationItemInputAudioTranscriptionCompleted,
  ServerEventConversationItemInputAudioTranscriptionFailed,
  ServerEventConversationItemInputAudioTranscriptionDelta,
  ServerEventConversationItemTruncated,
  ServerEventConversationItemDeleted,
  ServerEventConversationItemRetrieved,
  ServerEventResponseCreated,
  ServerEventResponseDone,
  ServerEventResponseOutputItemAdded,
  ServerEventResponseOutputItemDone,
  ServerEventResponseContentPartAdded,
  ServerEventResponseContentPartDone,
  ServerEventResponseTextDelta,
  ServerEventResponseTextDone,
  ServerEventResponseAudioDelta,
  ServerEventResponseAudioDone,
  ServerEventResponseAudioTranscriptDelta,
  ServerEventResponseAudioTranscriptDone,
  ServerEventResponseAnimationBlendshapeDelta,
  ServerEventResponseAnimationBlendshapeDone,
  ServerEventResponseAnimationVisemeDelta,
  ServerEventResponseAnimationVisemeDone,
  ServerEventResponseAudioTimestampDelta,
  ServerEventResponseAudioTimestampDone,
  ServerEventResponseFunctionCallArgumentsDelta,
  ServerEventResponseFunctionCallArgumentsDone,
  // MCP events
  ServerEventMcpListToolsInProgress,
  ServerEventMcpListToolsCompleted,
  ServerEventMcpListToolsFailed,
  ServerEventResponseMcpCallArgumentsDelta,
  ServerEventResponseMcpCallArgumentsDone,
  ServerEventResponseMcpCallInProgress,
  ServerEventResponseMcpCallCompleted,
  ServerEventResponseMcpCallFailed,
} from "../models/index.js";

/**
 * Context information provided to connection-related handlers
 */
export interface ConnectionContext {
  /** The session endpoint URL */
  readonly endpoint: string;
  /** The session ID (if available) */
  readonly sessionId?: string;
  /** When the event occurred */
  readonly timestamp: Date;
  /** The model being used for this session (undefined for agent sessions) */
  readonly model?: string;
  /** The agent name being used for this session (undefined for model sessions) */
  readonly agentName?: string;
}

/**
 * Context information provided to session-related handlers
 */
export interface SessionContext extends ConnectionContext {
  /** The session ID (guaranteed to be available for session events) */
  readonly sessionId: string;
  /** The current conversation ID (if available) */
  readonly conversationId?: string;
}

/**
 * Arguments provided when a connection is established
 */
export interface ConnectedEventArgs {
  /** Connection identifier */
  connectionId: string;
  /** When the connection was established */
  timestamp: Date;
}

/**
 * Arguments provided when a connection is lost
 */
export interface DisconnectedEventArgs {
  /** WebSocket close code */
  code: number;
  /** Close reason */
  reason: string;
  /** Whether the close was clean */
  wasClean: boolean;
  /** When the disconnection occurred */
  timestamp: Date;
}

/**
 * Arguments provided when an error occurs
 */
export interface ErrorEventArgs {
  /** The error that occurred */
  error: Error;
  /** Additional context about where the error occurred */
  context: string;
  /** Whether the error is recoverable (always false in fail-fast model) */
  recoverable: boolean;
  /** When the error occurred */
  timestamp: Date;
}

/**
 * Handler functions for VoiceLive session events following Azure SDK patterns.
 *
 * ALL handlers are optional - implement only the events you care about!
 * Each handler receives strongly-typed event data and context information.
 */
export interface VoiceLiveSessionHandlers {
  // ========================================
  // CONNECTION LIFECYCLE EVENTS
  // ========================================

  /**
   * Called when the session connects successfully to the VoiceLive service
   */
  onConnected?: (args: ConnectedEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when the session disconnects from the VoiceLive service
   * In fail-fast mode, this indicates the session is permanently dead
   */
  onDisconnected?: (args: DisconnectedEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when an error occurs that makes the session unusable
   * In fail-fast mode, this indicates the session is permanently dead
   */
  onError?: (args: ErrorEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when an error event is received from the server
   */
  onServerError?: (event: ServerEventError, context: SessionContext) => Promise<void>;

  /**
   * Called when the session is created on the server
   */
  onSessionCreated?: (event: ServerEventSessionCreated, context: SessionContext) => Promise<void>;

  /**
   * Called when the session configuration is updated
   */
  onSessionUpdated?: (event: ServerEventSessionUpdated, context: SessionContext) => Promise<void>;

  /**
   * Called when the server is establishing an avatar media connection
   */
  onSessionAvatarConnecting?: (
    event: ServerEventSessionAvatarConnecting,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // INPUT AUDIO BUFFER EVENTS
  // ========================================

  /**
   * Called when the input audio buffer is committed
   */
  onInputAudioBufferCommitted?: (
    event: ServerEventInputAudioBufferCommitted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when the input audio buffer is cleared
   */
  onInputAudioBufferCleared?: (
    event: ServerEventInputAudioBufferCleared,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when speech is detected in the user's audio input
   */
  onInputAudioBufferSpeechStarted?: (
    event: ServerEventInputAudioBufferSpeechStarted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when speech stops being detected in the user's audio input
   */
  onInputAudioBufferSpeechStopped?: (
    event: ServerEventInputAudioBufferSpeechStopped,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // CONVERSATION ITEM EVENTS
  // ========================================

  /**
   * Called when a conversation item is created
   */
  onConversationItemCreated?: (
    event: ServerEventConversationItemCreated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription is completed
   */
  onConversationItemInputAudioTranscriptionCompleted?: (
    event: ServerEventConversationItemInputAudioTranscriptionCompleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription fails
   */
  onConversationItemInputAudioTranscriptionFailed?: (
    event: ServerEventConversationItemInputAudioTranscriptionFailed,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription delta is received
   */
  onConversationItemInputAudioTranscriptionDelta?: (
    event: ServerEventConversationItemInputAudioTranscriptionDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is truncated
   */
  onConversationItemTruncated?: (
    event: ServerEventConversationItemTruncated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is deleted
   */
  onConversationItemDeleted?: (
    event: ServerEventConversationItemDeleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is retrieved
   */
  onConversationItemRetrieved?: (
    event: ServerEventConversationItemRetrieved,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE LIFECYCLE EVENTS
  // ========================================

  /**
   * Called when a response is created by the assistant
   */
  onResponseCreated?: (event: ServerEventResponseCreated, context: SessionContext) => Promise<void>;

  /**
   * Called when a response is completed by the assistant
   */
  onResponseDone?: (event: ServerEventResponseDone, context: SessionContext) => Promise<void>;

  /**
   * Called when a new output item is added to a response
   */
  onResponseOutputItemAdded?: (
    event: ServerEventResponseOutputItemAdded,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when an output item is completed
   */
  onResponseOutputItemDone?: (
    event: ServerEventResponseOutputItemDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a new content part is added to a response
   */
  onResponseContentPartAdded?: (
    event: ServerEventResponseContentPartAdded,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a content part is completed
   */
  onResponseContentPartDone?: (
    event: ServerEventResponseContentPartDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE TEXT EVENTS
  // ========================================

  /**
   * Called when text data is received from the assistant (streaming text response)
   */
  onResponseTextDelta?: (
    event: ServerEventResponseTextDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when text response is completed
   */
  onResponseTextDone?: (
    event: ServerEventResponseTextDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE AUDIO EVENTS
  // ========================================

  /**
   * Called when audio data is received from the assistant (streaming audio response)
   */
  onResponseAudioDelta?: (
    event: ServerEventResponseAudioDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio response is completed
   */
  onResponseAudioDone?: (
    event: ServerEventResponseAudioDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio transcript data is received (what the assistant said as text)
   */
  onResponseAudioTranscriptDelta?: (
    event: ServerEventResponseAudioTranscriptDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio transcript is completed
   */
  onResponseAudioTranscriptDone?: (
    event: ServerEventResponseAudioTranscriptDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE ANIMATION EVENTS
  // ========================================

  /**
   * Called when animation blendshape data is received
   */
  onResponseAnimationBlendshapeDelta?: (
    event: ServerEventResponseAnimationBlendshapeDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation blendshape data is completed
   */
  onResponseAnimationBlendshapeDone?: (
    event: ServerEventResponseAnimationBlendshapeDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation viseme data is received
   */
  onResponseAnimationVisemeDelta?: (
    event: ServerEventResponseAnimationVisemeDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation viseme data is completed
   */
  onResponseAnimationVisemeDone?: (
    event: ServerEventResponseAnimationVisemeDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE TIMING EVENTS
  // ========================================

  /**
   * Called when audio timestamp data is received
   */
  onResponseAudioTimestampDelta?: (
    event: ServerEventResponseAudioTimestampDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio timestamp data is completed
   */
  onResponseAudioTimestampDone?: (
    event: ServerEventResponseAudioTimestampDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // FUNCTION CALL EVENTS
  // ========================================

  /**
   * Called when function call arguments are received (streaming)
   */
  onResponseFunctionCallArgumentsDelta?: (
    event: ServerEventResponseFunctionCallArgumentsDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when function call arguments are completed
   */
  onResponseFunctionCallArgumentsDone?: (
    event: ServerEventResponseFunctionCallArgumentsDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // MCP (MODEL CONTEXT PROTOCOL) EVENTS
  // ========================================

  /**
   * Called when MCP tool listing is in progress
   */
  onMcpListToolsInProgress?: (
    event: ServerEventMcpListToolsInProgress,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when MCP tool listing is completed
   */
  onMcpListToolsCompleted?: (
    event: ServerEventMcpListToolsCompleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when MCP tool listing fails
   */
  onMcpListToolsFailed?: (
    event: ServerEventMcpListToolsFailed,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when MCP call arguments are received (streaming)
   */
  onResponseMcpCallArgumentsDelta?: (
    event: ServerEventResponseMcpCallArgumentsDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when MCP call arguments are completed
   */
  onResponseMcpCallArgumentsDone?: (
    event: ServerEventResponseMcpCallArgumentsDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when an MCP call is in progress
   */
  onResponseMcpCallInProgress?: (
    event: ServerEventResponseMcpCallInProgress,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when an MCP call is completed
   */
  onResponseMcpCallCompleted?: (
    event: ServerEventResponseMcpCallCompleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when an MCP call fails
   */
  onResponseMcpCallFailed?: (
    event: ServerEventResponseMcpCallFailed,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // CATCH-ALL HANDLER (OPTIONAL)
  // ========================================

  /**
   * Called for all server events from the VoiceLive service.
   * This is a catch-all handler that receives every server protocol message.
   *
   * Use this for:
   * - Custom logging/monitoring of all events
   * - Handling future events not yet covered by specific handlers
   * - Debugging and development
   *
   * Note: This is called IN ADDITION TO any specific handlers above.
   */
  onServerEvent?: (event: ServerEventUnion, context: SessionContext) => Promise<void>;
}

/**
 * Represents an active subscription to VoiceLive session events
 */
export interface VoiceLiveSubscription {
  /**
   * Stops the subscription and cleans up resources
   */
  close(): Promise<void>;

  /**
   * Whether the subscription is currently active
   */
  readonly isActive: boolean;

  /**
   * The subscription ID for tracking
   */
  readonly subscriptionId: string;
}
