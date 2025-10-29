// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from '@azure/core-auth';
import type { AbortSignalLike } from '@azure/abort-controller';
import type { 
  RequestSession,
  ClientEventSessionUpdate,
  ClientEventUnion,
  ClientEventInputAudioBufferAppend,
  ClientEventInputAudioTurnStart,
  ClientEventInputAudioTurnAppend,
  ClientEventInputAudioTurnEnd,
  ConversationRequestItem,
  ClientEventConversationItemCreate
} from './models/index.js';
import { ConnectionManager, ConnectionState } from './websocket/connectionManager.js';
import { VoiceLiveWebSocketFactory } from './websocket/websocketFactory.js';
import { VoiceLiveMessageParser } from './protocol/messageParser.js';
import { CredentialHandler } from './auth/credentialHandler.js';
import { VoiceLiveConnectionError, VoiceLiveErrorClassifier } from './errors/index.js';
import { logger } from './logger.js';
import { EnhancedVoiceLiveEventEmitter } from './events/enhancedEventEmitter.js';
import { ResponseStreamer } from './streaming/responseStreamer.js';
import { VoiceLiveAsyncIterators } from './streaming/asyncIterators.js';
import { AudioProcessor } from './media/audioProcessor.js';
import { VideoProcessor } from './media/videoProcessor.js';
import { AvatarManager } from './avatar/avatarManager.js';

export interface VoiceLiveClientOptions {
  /** API version to use for the Voice Live service */
  apiVersion?: string;
  /** Connection timeout in milliseconds */
  connectionTimeoutMs?: number;
  /** Maximum number of reconnection attempts */
  maxReconnectAttempts?: number;
  /** Base delay for reconnection attempts in milliseconds */
  reconnectDelayMs?: number;
  /** Whether to automatically reconnect on connection loss */
  autoReconnect?: boolean;
  /** Enable debug logging for development */
  enableDebugLogging?: boolean;
}

export interface ConnectOptions {
  /** Abort signal to cancel connection attempt */
  abortSignal?: AbortSignalLike;
  /** Override connection timeout for this operation */
  timeoutMs?: number;
}

export interface SendEventOptions {
  /** Abort signal to cancel send operation */
  abortSignal?: AbortSignalLike;
  /** Timeout for send operation */
  timeoutMs?: number;
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
 * The VoiceLive client provides real-time conversational AI capabilities
 * with support for audio, text, and avatar features through WebSocket connections.
 * 
 * Built on Azure SDK patterns with comprehensive error handling and reconnection logic.
 */
export class VoiceLiveClient {
  private readonly _endpoint: string;
  private readonly _credentialHandler: CredentialHandler;
  private readonly _options: Required<VoiceLiveClientOptions>;
  private readonly _messageParser: VoiceLiveMessageParser;
  private _connectionManager?: ConnectionManager;
  private _sessionId?: string;
  private _activeTurnId?: string;

  // Real-time features
  private readonly _eventEmitter: EnhancedVoiceLiveEventEmitter;
  private readonly _responseStreamer: ResponseStreamer;
  private readonly _asyncIterators: VoiceLiveAsyncIterators;
  private readonly _audioProcessor: AudioProcessor;
  private readonly _videoProcessor: VideoProcessor;
  private readonly _avatarManager: AvatarManager;

  /**
   * Creates an instance of VoiceLiveClient with endpoint and credential.
   * 
   * @param endpoint - The Voice Live service endpoint URL
   * @param credential - Azure credential for authentication
   * @param options - Optional configuration for the client
   */
  constructor(
    endpoint: string, 
    credential: TokenCredential, 
    options: VoiceLiveClientOptions = {}
  ) {
    this._endpoint = this._normalizeEndpoint(endpoint);
    this._credentialHandler = new CredentialHandler(credential);
    this._options = this._buildDefaultOptions(options);
    this._messageParser = new VoiceLiveMessageParser();
    
    // Initialize real-time features
    this._eventEmitter = new EnhancedVoiceLiveEventEmitter();
    this._responseStreamer = new ResponseStreamer(this._eventEmitter);
    this._asyncIterators = new VoiceLiveAsyncIterators(this._eventEmitter);
    this._audioProcessor = new AudioProcessor();
    this._videoProcessor = new VideoProcessor();
    this._avatarManager = new AvatarManager(this._eventEmitter, this._videoProcessor);
    
    logger.info('VoiceLiveClient created', { 
      endpoint: this._endpoint,
      apiVersion: this._options.apiVersion,
      enableDebugLogging: this._options.enableDebugLogging
    });
  }

  /**
   * Establishes connection to the Voice Live service with authentication.
   */
  async connect(options: ConnectOptions = {}): Promise<void> {
    if (this.isConnected) {
      logger.info('VoiceLiveClient already connected');
      return;
    }

    try {
      logger.info('Connecting to Voice Live service', { endpoint: this._endpoint });
      
      // Get WebSocket URL with authentication
      const wsUrl = await this._credentialHandler.getWebSocketUrl(
        this._endpoint, 
        this._options.apiVersion
      );
      const authHeaders = await this._credentialHandler.getAuthHeaders();
      
      // Create connection manager with Phase 2 integration
      const websocketFactory = new VoiceLiveWebSocketFactory();
      this._connectionManager = new ConnectionManager(
        () => websocketFactory.create({
          headers: { ...authHeaders },
          connectionTimeoutMs: this._options.connectionTimeoutMs,
          compression: true
        }),
        {
          endpoint: wsUrl,
          protocols: ['voice-live-realtime'],
          reconnectAttempts: this._options.autoReconnect ? this._options.maxReconnectAttempts : 0,
          reconnectDelay: this._options.reconnectDelayMs,
          connectionTimeout: options.timeoutMs || this._options.connectionTimeoutMs
        }
      );

      // Setup connection event handlers
      this._setupConnectionEventHandlers();
      
      // Connect with proper error handling
      await this._connectionManager.connect(options.abortSignal as AbortSignal);
      
      logger.info('Successfully connected to Voice Live service');
      
    } catch (error) {
      logger.error('Failed to connect to Voice Live service', { error });
      
      // Use Phase 2 error classification
      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      } else {
        throw VoiceLiveErrorClassifier.classifyConnectionError(error);
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

    logger.info('Disconnecting from Voice Live service');
    
    try {
      await this._connectionManager.disconnect();
    } catch (error) {
      logger.error('Error during disconnect', { error });
    } finally {
      this._connectionManager = undefined;
      this._sessionId = undefined;
      this._activeTurnId = undefined;
      logger.info('Disconnected from Voice Live service');
    }
  }

  /**
   * Updates the session configuration with the service.
   */
  async updateSession(
    session: RequestSession, 
    options: SendEventOptions = {}
  ): Promise<void> {
    this._ensureConnected();

    const updateEvent: ClientEventSessionUpdate = {
      type: 'session.update',
      session: session,
      eventId: this._generateEventId()
    };

    await this._sendEvent(updateEvent, options);
  }

  /**
   * Sends a custom client event to the service.
   */
  async sendEvent(event: ClientEventUnion, options: SendEventOptions = {}): Promise<void> {
    this._ensureConnected();
    await this._sendEvent(event, options);
  }

  /**
   * Sends audio data to the service using turn-based or buffer-based approach.
   */
  async sendAudio(
    audioData: ArrayBuffer | Uint8Array,
    options: AudioStreamOptions = {}
  ): Promise<void> {
    this._ensureConnected();

    const audioBase64 = this._arrayBufferToBase64(audioData);

    if (options.turnId) {
      // Turn-based audio
      const appendEvent: ClientEventInputAudioTurnAppend = {
        type: 'input_audio.turn.append',
        audio: audioBase64,
        turnId: options.turnId,
        eventId: this._generateEventId()
      };
      await this._sendEvent(appendEvent, options);
    } else {
      // Buffer-based audio (VAD mode)
      const bufferEvent: ClientEventInputAudioBufferAppend = {
        type: 'input_audio_buffer.append',
        audio: audioBase64,
        eventId: this._generateEventId()
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
      type: 'input_audio.turn.start',
      turnId: turnId,
      eventId: this._generateEventId()
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
      throw new VoiceLiveConnectionError(
        'No active audio turn to end',
        'INVALID_STATE'
      );
    }

    const endEvent: ClientEventInputAudioTurnEnd = {
      type: 'input_audio.turn.end',
      turnId: targetTurnId,
      eventId: this._generateEventId()
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
    options: SendEventOptions = {}
  ): Promise<void> {
    this._ensureConnected();

    const createEvent: ClientEventConversationItemCreate = {
      type: 'conversation.item.create',
      item: item,
      eventId: this._generateEventId()
    };

    await this._sendEvent(createEvent, options);
  }

  // Properties
  get isConnected(): boolean {
    return this._connectionManager?.isConnected || false;
  }

  get connectionState(): ConnectionState {
    return this._connectionManager?.state || ConnectionState.Disconnected;
  }

  get sessionId(): string | undefined {
    return this._sessionId;
  }

  get activeTurnId(): string | undefined {
    return this._activeTurnId;
  }

  private _buildDefaultOptions(options: VoiceLiveClientOptions): Required<VoiceLiveClientOptions> {
    return {
      apiVersion: options.apiVersion || '2024-10-01-preview',
      connectionTimeoutMs: options.connectionTimeoutMs || 30000,
      maxReconnectAttempts: options.maxReconnectAttempts || 5,
      reconnectDelayMs: options.reconnectDelayMs || 1000,
      autoReconnect: options.autoReconnect ?? true,
      enableDebugLogging: options.enableDebugLogging ?? false
    };
  }

  private _normalizeEndpoint(endpoint: string): string {
    // Ensure endpoint has proper protocol
    if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
      endpoint = `https://${endpoint}`;
    }
    
    // Remove trailing slash
    return endpoint.replace(/\/$/, '');
  }

  private _setupConnectionEventHandlers(): void {
    if (!this._connectionManager) return;

    this._connectionManager.updateEventHandlers({
      onStateChange: (state, previousState) => {
        logger.info('Connection state changed', { state, previousState });
      },
      onMessage: (data) => {
        this._handleIncomingMessage(data);
      },
      onError: (error) => {
        logger.error('Connection error', { error });
      },
      onReconnectAttempt: (attempt, maxAttempts) => {
        logger.info('Reconnection attempt', { attempt, maxAttempts });
      }
    });
  }

  private _handleIncomingMessage(data: string | ArrayBuffer): void {
    try {
      logger.info('Message received', { 
        type: typeof data, 
        size: typeof data === 'string' ? data.length : data.byteLength 
      });
      
      // Parse and process the message using Phase 2 message parser
      const parsed = this._messageParser.parseIncomingMessage(data);
      if (parsed && parsed.type === 'server') {
        // Handle server events
        this._handleServerEvent(parsed.event);
      }
    } catch (error) {
      logger.error('Error handling incoming message', { error });
    }
  }

  private _handleServerEvent(event: any): void {
    // Extract session information from events
    if (event.type === 'session.created' && event.session?.id) {
      this._sessionId = event.session.id;
      logger.info('Session created', { sessionId: this._sessionId });
    }

    // Emit through enhanced event emitter for real-time features
    this._eventEmitter.emitServerEvent(event);
  }

  // Real-time feature accessors

  /**
   * Access to enhanced event system with async iteration and filtering
   */
  get events(): EnhancedVoiceLiveEventEmitter {
    return this._eventEmitter;
  }

  /**
   * Access to response streaming capabilities
   */
  get streaming(): ResponseStreamer {
    return this._responseStreamer;
  }

  /**
   * Access to async iteration patterns for data streaming
   */
  get asyncIterators(): VoiceLiveAsyncIterators {
    return this._asyncIterators;
  }

  /**
   * Access to audio processing capabilities
   */
  get audioProcessor(): AudioProcessor {
    return this._audioProcessor;
  }

  /**
   * Access to video and avatar processing capabilities
   */
  get videoProcessor(): VideoProcessor {
    return this._videoProcessor;
  }

  /**
   * Access to avatar management and animation handling
   */
  get avatarManager(): AvatarManager {
    return this._avatarManager;
  }

  /**
   * Wait for a specific event with optional filtering and timeout
   */
  async waitForEvent<K extends keyof import('./events/voiceLiveEventEmitter.js').VoiceLiveEventMap>(
    event: K,
    filter?: (eventData: import('./events/voiceLiveEventEmitter.js').VoiceLiveEventMap[K]) => boolean,
    timeoutMs = 30000
  ): Promise<import('./events/voiceLiveEventEmitter.js').VoiceLiveEventMap[K]> {
    return this._eventEmitter.waitForEvent(event, filter, timeoutMs);
  }

  private async _sendEvent(event: ClientEventUnion, options: SendEventOptions): Promise<void> {
    if (!this._connectionManager?.isConnected) {
      throw new VoiceLiveConnectionError(
        'Not connected to Voice Live service',
        'NOT_CONNECTED'
      );
    }

    try {
      const serialized = this._messageParser.serializeOutgoingMessage(event);
      await this._connectionManager.send(serialized, options.abortSignal as AbortSignal);
      
      logger.info('Sent event', { type: event.type, eventId: (event as any).eventId });
      
    } catch (error) {
      if (error instanceof VoiceLiveConnectionError) {
        throw error;
      }
      
      throw VoiceLiveErrorClassifier.classifyConnectionError(error);
    }
  }

  private _ensureConnected(): void {
    if (!this.isConnected) {
      throw new VoiceLiveConnectionError(
        'Must be connected to Voice Live service',
        'NOT_CONNECTED'
      );
    }
  }

  private _generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private _generateTurnId(): string {
    return `turn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private _arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}