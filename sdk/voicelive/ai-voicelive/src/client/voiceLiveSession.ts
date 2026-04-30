// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { AbortSignalLike } from "@azure/abort-controller";
import {
  type RequestSession,
  type ClientEventSessionUpdate,
  type ClientEventUnion,
  type ClientEventInputAudioBufferAppend,
  type ClientEventInputAudioTurnStart,
  type ClientEventInputAudioTurnAppend,
  type ClientEventInputAudioTurnEnd,
  type ConversationRequestItem,
  type ClientEventConversationItemCreate,
  type ServerEventUnion,
  KnownClientEventType,
  KnownServerEventType,
} from "../models/index.js";
import { ConnectionManager, ConnectionState } from "../websocket/connectionManager.js";
import { VoiceLiveWebSocketFactory } from "../websocket/websocketFactory.js";
import { VoiceLiveMessageParser } from "../protocol/messageParser.js";
import { CredentialHandler } from "../auth/credentialHandler.js";
import { VoiceLiveConnectionError, classifyConnectionError } from "../errors/index.js";
import { logger } from "../logger.js";
import type {
  VoiceLiveSessionHandlers,
  VoiceLiveSubscription,
  ConnectionContext,
  SessionContext,
  ConnectedEventArgs,
  DisconnectedEventArgs,
  ErrorEventArgs,
} from "../handlers/sessionHandlers.js";
import { SubscriptionManager } from "../handlers/subscriptionManager.js";
import type { AgentSessionConfig } from "./types.js";

export interface VoiceLiveSessionOptions {
  /** Connection timeout in milliseconds */
  connectionTimeoutInMs?: number;
  /** Enable debug logging for development */
  enableDebugLogging?: boolean;
}

export interface CreateSessionOptions extends VoiceLiveSessionOptions {}

export interface StartSessionOptions extends VoiceLiveSessionOptions {
  /** Optional session handlers to subscribe immediately upon connection */
  sessionHandlers?: VoiceLiveSessionHandlers;
}

export interface ConnectOptions {
  /** Abort signal to cancel connection attempt */
  abortSignal?: AbortSignalLike;
  /** Override connection timeout for this operation */
  timeoutInMs?: number;
}

export interface SendEventOptions {
  /** Abort signal to cancel send operation */
  abortSignal?: AbortSignalLike;
  /** Timeout for send operation */
  timeoutInMs?: number;
}

export interface AudioStreamOptions extends SendEventOptions {
  /** Turn ID for turn-based audio (if not provided, uses buffer mode) */
  turnId?: string;
}

export interface TurnOptions extends SendEventOptions {
  /** Custom turn ID (if not provided, one will be generated) */
  turnId?: string;
}

/**
 * Represents a WebSocket-based session for real-time voice communication with the Azure VoiceLive service.
 *
 * This class manages the connection, handles real-time communication, and provides access to all
 * interactive features including audio streaming, conversation management, and avatar control.
 */
export class VoiceLiveSession {
  private readonly _endpoint: string;
  private readonly _credentialHandler: CredentialHandler;
  private readonly _options: Required<VoiceLiveSessionOptions>;
  private readonly _messageParser: VoiceLiveMessageParser;
  private readonly _model?: string;
  private readonly _agentConfig?: AgentSessionConfig;
  private readonly _apiVersion: string;
  private _connectionManager?: ConnectionManager;
  private _sessionId?: string;
  private _activeTurnId?: string;
  private _disposed = false;
  // Handler-based subscription management
  private readonly _subscriptionManager: SubscriptionManager;

  /**
   * Creates an instance of VoiceLiveSession for model-centric sessions.
   *
   * @param endpoint - The Voice Live service endpoint URL
   * @param credential - Azure TokenCredential or KeyCredential for authentication
   * @param apiVersion - API version to use for the Voice Live service
   * @param model - The model name to use for the session
   * @param options - Optional configuration for the session
   */
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    apiVersion: string,
    model: string,
    options?: VoiceLiveSessionOptions,
  );

  /**
   * Creates an instance of VoiceLiveSession for agent-centric sessions.
   *
   * @param endpoint - The Voice Live service endpoint URL
   * @param credential - Azure TokenCredential or KeyCredential for authentication
   * @param apiVersion - API version to use for the Voice Live service
   * @param agentConfig - The agent configuration for the session
   * @param options - Optional configuration for the session
   */
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    apiVersion: string,
    agentConfig: AgentSessionConfig,
    options?: VoiceLiveSessionOptions,
  );

  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    apiVersion: string,
    modelOrAgent: string | AgentSessionConfig,
    options: VoiceLiveSessionOptions = {},
  ) {
    this._endpoint = this._normalizeEndpoint(endpoint);
    this._credentialHandler = new CredentialHandler(credential);
    this._options = this._buildDefaultOptions(options);
    this._messageParser = new VoiceLiveMessageParser();
    this._apiVersion = apiVersion;

    // Determine if this is a model or agent session
    if (typeof modelOrAgent === "string") {
      logger.info("Creating model-centric VoiceLiveSession", { model: modelOrAgent });
      this._model = modelOrAgent;
      this._agentConfig = undefined;
    } else {
      this._model = undefined;
      this._agentConfig = modelOrAgent;
    }

    // Initialize handler-based subscription management
    this._subscriptionManager = new SubscriptionManager();

    logger.info("VoiceLiveSession created", {
      endpoint: this._endpoint,
      model: this._model,
      agentName: this._agentConfig?.agentName,
      apiVersion: apiVersion,
      enableDebugLogging: this._options.enableDebugLogging,
    });
  }

  /**
   * Establishes connection to the Voice Live service with authentication.
   */
  async connect(options: ConnectOptions = {}): Promise<void> {
    this._ensureNotDisposed();

    if (this.isConnected) {
      logger.info("VoiceLiveSession already connected");
      return;
    }

    try {
      logger.info("Connecting to Voice Live service", {
        endpoint: this._endpoint,
        model: this._model,
        agentName: this._agentConfig?.agentName,
      });

      // Get WebSocket URL with authentication and model or agent config
      const wsUrl = await this._credentialHandler.getWebSocketUrl(
        this._endpoint,
        this._apiVersion,
        this._model,
        this._agentConfig,
      );
      const authHeaders = await this._credentialHandler.getAuthHeaders();

      // Create connection manager
      const websocketFactory = new VoiceLiveWebSocketFactory();
      this._connectionManager = new ConnectionManager(
        () =>
          websocketFactory.create({
            headers: { ...authHeaders },
            connectionTimeoutInMs: this._options.connectionTimeoutInMs,
            compression: true,
          }),
        {
          endpoint: wsUrl,
          connectionTimeout: options.timeoutInMs || this._options.connectionTimeoutInMs,
        },
      );

      // Setup connection event handlers
      this._setupConnectionEventHandlers();

      // Connect with proper error handling
      await this._connectionManager.connect(options.abortSignal);

      logger.info("Successfully connected to Voice Live service");
    } catch (error) {
      logger.error("Failed to connect to Voice Live service", { error });

      // Use error classification
      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      } else {
        throw classifyConnectionError(error);
      }
    }
  }

  /**
   * Disconnects from the Voice Live service and cleans up resources.
   */
  async disconnect(): Promise<void> {
    if (!this._connectionManager) {
      return;
    }

    logger.info("Disconnecting from Voice Live service");

    try {
      await this._connectionManager.disconnect();
    } catch (error) {
      logger.error("Error during disconnect", { error });
    } finally {
      this._connectionManager = undefined;
      this._sessionId = undefined;
      this._activeTurnId = undefined;
      logger.info("Disconnected from Voice Live service");
    }
  }

  /**
   * Subscribe to VoiceLive session events using strongly-typed handlers.
   *
   * @param handlers - Handler functions for different types of events
   * @returns A subscription object that can be used to stop receiving events
   */
  subscribe(handlers: VoiceLiveSessionHandlers): VoiceLiveSubscription {
    this._ensureNotDisposed();

    logger.info("Creating VoiceLive session subscription");
    return this._subscriptionManager.createSubscription(handlers);
  }

  /**
   * Sends a custom client event to the service.
   */
  async sendEvent(event: ClientEventUnion, options: SendEventOptions = {}): Promise<void> {
    this._ensureConnected();
    await this._sendEvent(event, options);
  }

  /**
   * Updates the session configuration with the service.
   */
  async updateSession(session: RequestSession, options: SendEventOptions = {}): Promise<void> {
    this._ensureConnected();

    const updateEvent: ClientEventSessionUpdate = {
      type: KnownClientEventType.SessionUpdate,
      session: session,
      eventId: this._generateEventId(),
    };

    await this._sendEvent(updateEvent, options);
  }

  /**
   * Sends audio data to the service using turn-based or buffer-based approach.
   */
  async sendAudio(
    audioData: ArrayBuffer | Uint8Array,
    options: AudioStreamOptions = {},
  ): Promise<void> {
    this._ensureConnected();

    const audioBase64 = this._arrayBufferToBase64(audioData);

    if (options.turnId) {
      // Turn-based audio
      const appendEvent: ClientEventInputAudioTurnAppend = {
        type: KnownClientEventType.InputAudioTurnAppend,
        audio: audioBase64,
        turnId: options.turnId,
        eventId: this._generateEventId(),
      };
      await this._sendEvent(appendEvent, options);
    } else {
      // Buffer-based audio (VAD mode)
      const bufferEvent: ClientEventInputAudioBufferAppend = {
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: audioBase64,
        eventId: this._generateEventId(),
      };
      await this._sendEvent(bufferEvent, options);
    }
  }

  /**
   * Starts a new audio turn for turn-based audio input.
   */
  async startAudioTurn(options: TurnOptions = {}): Promise<string> {
    this._ensureConnected();

    const turnId = options.turnId || this._generateTurnId();
    this._activeTurnId = turnId;

    const startEvent: ClientEventInputAudioTurnStart = {
      type: KnownClientEventType.InputAudioTurnStart,
      turnId: turnId,
      eventId: this._generateEventId(),
    };

    await this._sendEvent(startEvent, options);
    return turnId;
  }

  /**
   * Ends the current audio turn.
   */
  async endAudioTurn(turnId?: string, options: SendEventOptions = {}): Promise<void> {
    this._ensureConnected();

    const targetTurnId = turnId || this._activeTurnId;
    if (!targetTurnId) {
      throw new VoiceLiveConnectionError("No active audio turn to end", "INVALID_STATE");
    }

    const endEvent: ClientEventInputAudioTurnEnd = {
      type: KnownClientEventType.InputAudioTurnEnd,
      turnId: targetTurnId,
      eventId: this._generateEventId(),
    };

    await this._sendEvent(endEvent, options);

    if (targetTurnId === this._activeTurnId) {
      this._activeTurnId = undefined;
    }
  }

  /**
   * Adds a conversation item (message) to the conversation.
   */
  async addConversationItem(
    item: ConversationRequestItem,
    options: SendEventOptions = {},
  ): Promise<void> {
    this._ensureConnected();

    const createEvent: ClientEventConversationItemCreate = {
      type: KnownClientEventType.ConversationItemCreate,
      item: item,
      eventId: this._generateEventId(),
    };

    await this._sendEvent(createEvent, options);
  }

  /**
   * Indicates whether the session is currently connected to the Voice Live service.
   */
  get isConnected(): boolean {
    return this._connectionManager?.isConnected || false;
  }

  /**
   * Gets the current connection state of the session.
   */
  get connectionState(): ConnectionState {
    return this._connectionManager?.state || ConnectionState.Disconnected;
  }

  /**
   * Gets the current session ID.
   */
  get sessionId(): string | undefined {
    return this._sessionId;
  }

  /**
   * Gets the current active audio turn ID.
   */
  get activeTurnId(): string | undefined {
    return this._activeTurnId;
  }

  /**
   * Disposes the session and cleans up resources.
   */
  async dispose(): Promise<void> {
    if (this._disposed) {
      return;
    }

    logger.info("Disposing VoiceLiveSession");

    try {
      // Close all subscriptions first
      await this._subscriptionManager.closeAll();

      // Then disconnect
      await this.disconnect();
    } catch (error) {
      logger.error("Error during session disposal", { error });
    } finally {
      this._disposed = true;
      logger.info("VoiceLiveSession disposed");
    }
  }

  // Private methods

  private _buildDefaultOptions(
    options: VoiceLiveSessionOptions,
  ): Required<VoiceLiveSessionOptions> {
    return {
      connectionTimeoutInMs: options.connectionTimeoutInMs || 30000,
      enableDebugLogging: options.enableDebugLogging ?? false,
    };
  }

  private _normalizeEndpoint(endpoint: string): string {
    // Ensure endpoint has proper protocol
    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
      endpoint = `https://${endpoint}`;
    }

    // Remove trailing slash
    return endpoint.replace(/\/$/, "");
  }

  private _setupConnectionEventHandlers(): void {
    if (!this._connectionManager) return;

    this._connectionManager.updateEventHandlers({
      onStateChange: (state, previousState) => {
        logger.info("Connection state changed", { state, previousState });

        // Handle connection state changes for handler-based subscriptions
        if (state === ConnectionState.Connected && previousState === ConnectionState.Connecting) {
          this._notifyConnectionEvent("connected", {
            connectionId: `conn_${Date.now()}`,
            timestamp: new Date(),
          });
        } else if (
          state === ConnectionState.Disconnected &&
          previousState === ConnectionState.Connected
        ) {
          this._notifyConnectionEvent("disconnected", {
            code: 1006, // Abnormal closure
            reason: "Connection lost during session",
            wasClean: false,
            timestamp: new Date(),
          });
          this._markSessionAsDead(
            "Connection lost during session - session is permanently unusable",
          );
        }
      },
      onMessage: (data) => {
        this._handleIncomingMessage(data);
      },
      onError: (error) => {
        logger.error("Connection error - marking session as dead", { error });
        this._notifyConnectionEvent("error", {
          error: error,
          context: "WebSocket connection error",
          recoverable: false,
          timestamp: new Date(),
        });
        this._markSessionAsDead(`Connection error: ${error.message}`);
      },
    });
  }

  private _markSessionAsDead(reason: string): void {
    if (this._disposed) return;

    logger.error("Session marked as permanently dead", { reason });

    // Mark as disposed to prevent further use
    this._disposed = true;

    // Clean up connection manager
    this._connectionManager = undefined;
    this._sessionId = undefined;
    this._activeTurnId = undefined;
  }

  private _handleIncomingMessage(data: string | ArrayBuffer): void {
    try {
      logger.info("Message received", {
        type: typeof data,
        size: typeof data === "string" ? data.length : data.byteLength,
      });

      // Parse and process the message
      const parsed = this._messageParser.parseIncomingMessage(data);
      if (parsed && parsed.type === "server") {
        // Handle server events
        this._handleServerEvent(parsed.event);
      }
    } catch (error) {
      logger.error("Error handling incoming message", { error });
    }
  }

  private _handleServerEvent(event: any): void {
    // Extract session information from events
    if (event.type === KnownServerEventType.SessionCreated && event.session?.id) {
      this._sessionId = event.session.id;
      logger.info("Session created", { sessionId: this._sessionId });
    }

    // Notify handler-based subscriptions
    this._notifyServerEvent(event);
  }

  private _notifyConnectionEvent(
    eventType: "connected" | "disconnected" | "error",
    args: ConnectedEventArgs | DisconnectedEventArgs | ErrorEventArgs,
  ): void {
    const context: ConnectionContext = {
      endpoint: this._endpoint,
      sessionId: this._sessionId,
      timestamp: new Date(),
      model: this._model,
      agentName: this._agentConfig?.agentName,
    };

    // Fire and forget - don't await to avoid blocking
    this._subscriptionManager.processConnectionEvent(eventType, args, context).catch((error) => {
      logger.error("Error processing connection event in handlers", { eventType, error });
    });
  }

  private _notifyServerEvent(event: ServerEventUnion): void {
    if (!this._sessionId) {
      // Can't notify server events without a session ID
      return;
    }

    const context: SessionContext = {
      endpoint: this._endpoint,
      sessionId: this._sessionId,
      timestamp: new Date(),
      model: this._model,
      agentName: this._agentConfig?.agentName,
      conversationId: undefined, // Could extract from event if available
    };

    // Fire and forget - don't await to avoid blocking
    this._subscriptionManager.processServerEvent(event, context).catch((error) => {
      logger.error("Error processing server event in handlers", { eventType: event.type, error });
    });
  }

  private async _sendEvent(event: ClientEventUnion, options: SendEventOptions): Promise<void> {
    if (!this._connectionManager?.isConnected) {
      throw new VoiceLiveConnectionError("Not connected to Voice Live service", "NOT_CONNECTED");
    }

    try {
      const serialized = this._messageParser.serializeOutgoingMessage(event);
      await this._connectionManager.send(serialized, options.abortSignal);

      logger.info("Sent event", { type: event.type, eventId: (event as any).eventId });
    } catch (error) {
      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      }

      throw classifyConnectionError(error);
    }
  }

  private _ensureConnected(): void {
    this._ensureNotDisposed();
    if (!this.isConnected) {
      throw new VoiceLiveConnectionError(
        "Must be connected to Voice Live service",
        "NOT_CONNECTED",
      );
    }
  }

  private _ensureNotDisposed(): void {
    if (this._disposed) {
      throw new VoiceLiveConnectionError(
        "Session is permanently dead and cannot be used. Create a new session to continue.",
        "SESSION_DEAD",
      );
    }
  }

  private _generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private _generateTurnId(): string {
    return `turn_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private _arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
