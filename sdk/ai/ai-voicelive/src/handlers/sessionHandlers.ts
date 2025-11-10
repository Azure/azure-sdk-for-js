// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
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
  /** The model being used for this session */
  readonly model: string;
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
 * Options for configuring session subscriptions
 */
export interface SubscribeOptions {
  /** Signal to abort the subscription */
  abortSignal?: AbortSignalLike;
  /** Whether to include detailed server events (default: true) */
  includeServerEvents?: boolean;
  /** Whether to include audio events (default: true) */
  includeAudioEvents?: boolean;
  /** Whether to include text events (default: true) */
  includeTextEvents?: boolean;
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
  processConnected?: (args: ConnectedEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when the session disconnects from the VoiceLive service
   * In fail-fast mode, this indicates the session is permanently dead
   */
  processDisconnected?: (args: DisconnectedEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when an error occurs that makes the session unusable
   * In fail-fast mode, this indicates the session is permanently dead
   */
  processError?: (args: ErrorEventArgs, context: ConnectionContext) => Promise<void>;

  /**
   * Called when an error event is received from the server
   */
  processServerError?: (event: ServerEventError, context: SessionContext) => Promise<void>;

  /**
   * Called when the session is created on the server
   */
  processSessionCreated?: (
    event: ServerEventSessionCreated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when the session configuration is updated
   */
  processSessionUpdated?: (
    event: ServerEventSessionUpdated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when the server is establishing an avatar media connection
   */
  processSessionAvatarConnecting?: (
    event: ServerEventSessionAvatarConnecting,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // INPUT AUDIO BUFFER EVENTS
  // ========================================

  /**
   * Called when the input audio buffer is committed
   */
  processInputAudioBufferCommitted?: (
    event: ServerEventInputAudioBufferCommitted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when the input audio buffer is cleared
   */
  processInputAudioBufferCleared?: (
    event: ServerEventInputAudioBufferCleared,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when speech is detected in the user's audio input
   */
  processInputAudioBufferSpeechStarted?: (
    event: ServerEventInputAudioBufferSpeechStarted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when speech stops being detected in the user's audio input
   */
  processInputAudioBufferSpeechStopped?: (
    event: ServerEventInputAudioBufferSpeechStopped,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // CONVERSATION ITEM EVENTS
  // ========================================

  /**
   * Called when a conversation item is created
   */
  processConversationItemCreated?: (
    event: ServerEventConversationItemCreated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription is completed
   */
  processConversationItemInputAudioTranscriptionCompleted?: (
    event: ServerEventConversationItemInputAudioTranscriptionCompleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription fails
   */
  processConversationItemInputAudioTranscriptionFailed?: (
    event: ServerEventConversationItemInputAudioTranscriptionFailed,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when input audio transcription delta is received
   */
  processConversationItemInputAudioTranscriptionDelta?: (
    event: ServerEventConversationItemInputAudioTranscriptionDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is truncated
   */
  processConversationItemTruncated?: (
    event: ServerEventConversationItemTruncated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is deleted
   */
  processConversationItemDeleted?: (
    event: ServerEventConversationItemDeleted,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a conversation item is retrieved
   */
  processConversationItemRetrieved?: (
    event: ServerEventConversationItemRetrieved,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE LIFECYCLE EVENTS
  // ========================================

  /**
   * Called when a response is created by the assistant
   */
  processResponseCreated?: (
    event: ServerEventResponseCreated,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a response is completed by the assistant
   */
  processResponseDone?: (event: ServerEventResponseDone, context: SessionContext) => Promise<void>;

  /**
   * Called when a new output item is added to a response
   */
  processResponseOutputItemAdded?: (
    event: ServerEventResponseOutputItemAdded,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when an output item is completed
   */
  processResponseOutputItemDone?: (
    event: ServerEventResponseOutputItemDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a new content part is added to a response
   */
  processResponseContentPartAdded?: (
    event: ServerEventResponseContentPartAdded,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when a content part is completed
   */
  processResponseContentPartDone?: (
    event: ServerEventResponseContentPartDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE TEXT EVENTS
  // ========================================

  /**
   * Called when text data is received from the assistant (streaming text response)
   */
  processResponseTextDelta?: (
    event: ServerEventResponseTextDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when text response is completed
   */
  processResponseTextDone?: (
    event: ServerEventResponseTextDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE AUDIO EVENTS
  // ========================================

  /**
   * Called when audio data is received from the assistant (streaming audio response)
   */
  processResponseAudioDelta?: (
    event: ServerEventResponseAudioDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio response is completed
   */
  processResponseAudioDone?: (
    event: ServerEventResponseAudioDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio transcript data is received (what the assistant said as text)
   */
  processResponseAudioTranscriptDelta?: (
    event: ServerEventResponseAudioTranscriptDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio transcript is completed
   */
  processResponseAudioTranscriptDone?: (
    event: ServerEventResponseAudioTranscriptDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE ANIMATION EVENTS
  // ========================================

  /**
   * Called when animation blendshape data is received
   */
  processResponseAnimationBlendshapeDelta?: (
    event: ServerEventResponseAnimationBlendshapeDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation blendshape data is completed
   */
  processResponseAnimationBlendshapeDone?: (
    event: ServerEventResponseAnimationBlendshapeDone,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation viseme data is received
   */
  processResponseAnimationVisemeDelta?: (
    event: ServerEventResponseAnimationVisemeDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when animation viseme data is completed
   */
  processResponseAnimationVisemeDone?: (
    event: ServerEventResponseAnimationVisemeDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // RESPONSE TIMING EVENTS
  // ========================================

  /**
   * Called when audio timestamp data is received
   */
  processResponseAudioTimestampDelta?: (
    event: ServerEventResponseAudioTimestampDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when audio timestamp data is completed
   */
  processResponseAudioTimestampDone?: (
    event: ServerEventResponseAudioTimestampDone,
    context: SessionContext,
  ) => Promise<void>;

  // ========================================
  // FUNCTION CALL EVENTS
  // ========================================

  /**
   * Called when function call arguments are received (streaming)
   */
  processResponseFunctionCallArgumentsDelta?: (
    event: ServerEventResponseFunctionCallArgumentsDelta,
    context: SessionContext,
  ) => Promise<void>;

  /**
   * Called when function call arguments are completed
   */
  processResponseFunctionCallArgumentsDone?: (
    event: ServerEventResponseFunctionCallArgumentsDone,
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
  processServerEvent?: (event: ServerEventUnion, context: SessionContext) => Promise<void>;
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
