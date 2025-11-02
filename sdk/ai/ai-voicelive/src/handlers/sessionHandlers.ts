// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServerEventUnion,
  ServerEventResponseCreated,
  ServerEventResponseDone,
  ServerEventResponseAudioDelta,
  ServerEventResponseTextDelta,
  ServerEventInputAudioBufferSpeechStarted,
  ServerEventInputAudioBufferSpeechStopped,
  ServerEventSessionCreated,
  ServerEventError
} from '../models/index.js';

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
  abortSignal?: AbortSignal;
  /** Whether to include detailed server events (default: true) */
  includeServerEvents?: boolean;
  /** Whether to include audio events (default: true) */
  includeAudioEvents?: boolean;
  /** Whether to include text events (default: true) */
  includeTextEvents?: boolean;
}

/**
 * Handler functions for VoiceLive session events following Azure SDK patterns
 */
export interface VoiceLiveSessionHandlers {
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
   * Called for all server events from the VoiceLive service
   * This is the catch-all handler for any server protocol message
   */
  processServerEvent?: (event: ServerEventUnion, context: SessionContext) => Promise<void>;

  /**
   * Called when the session is created on the server
   */
  processSessionCreated?: (event: ServerEventSessionCreated, context: SessionContext) => Promise<void>;

  /**
   * Called when a response is created by the assistant
   */
  processResponseCreated?: (event: ServerEventResponseCreated, context: SessionContext) => Promise<void>;

  /**
   * Called when a response is completed by the assistant
   */
  processResponseDone?: (event: ServerEventResponseDone, context: SessionContext) => Promise<void>;

  /**
   * Called when audio data is received from the assistant
   */
  processAudioReceived?: (event: ServerEventResponseAudioDelta, context: SessionContext) => Promise<void>;

  /**
   * Called when text data is received from the assistant
   */
  processTextReceived?: (event: ServerEventResponseTextDelta, context: SessionContext) => Promise<void>;

  /**
   * Called when speech is detected in the user's audio input
   */
  processSpeechStarted?: (event: ServerEventInputAudioBufferSpeechStarted, context: SessionContext) => Promise<void>;

  /**
   * Called when speech stops being detected in the user's audio input
   */
  processSpeechStopped?: (event: ServerEventInputAudioBufferSpeechStopped, context: SessionContext) => Promise<void>;

  /**
   * Called when an error event is received from the server
   */
  processServerError?: (event: ServerEventError, context: SessionContext) => Promise<void>;
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