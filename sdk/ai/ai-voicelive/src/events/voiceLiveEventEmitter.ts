// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { 
  ServerEventUnion,
  ServerEventError,
  ServerEventSessionCreated,
  ServerEventSessionUpdated,
  ServerEventResponseTextDelta,
  ServerEventResponseAudioDelta,
  ServerEventConversationItemCreated,
  ServerEventResponseCreated,
  ServerEventResponseDone,
  ServerEventResponseTextDone,
  ServerEventResponseAudioDone,
  ServerEventInputAudioBufferCommitted,
  ServerEventInputAudioBufferCleared,
  ServerEventInputAudioBufferSpeechStarted,
  ServerEventInputAudioBufferSpeechStopped,
  ServerEventConversationItemTruncated,
  ServerEventConversationItemDeleted,
  ServerEventResponseOutputItemAdded,
  ServerEventResponseOutputItemDone,
  ServerEventResponseContentPartAdded,
  ServerEventResponseContentPartDone,
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
  ServerEventConversationItemInputAudioTranscriptionCompleted,
  ServerEventConversationItemInputAudioTranscriptionFailed,
  ServerEventConversationItemInputAudioTranscriptionDelta,
  ServerEventConversationItemRetrieved,
  ServerEventSessionAvatarConnecting
} from '../models/index.js';

/**
 * Event argument interfaces for strongly typed event handling
 */

// Connection lifecycle events
export interface ConnectedEventArgs {
  connectionId: string;
  sessionId?: string;
  timestamp: Date;
}

export interface DisconnectedEventArgs {
  code: number;
  reason: string;
  wasClean: boolean;
  timestamp: Date;
}

export interface ReconnectingEventArgs {
  attempt: number;
  maxAttempts: number;
  delayMs: number;
  timestamp: Date;
}

export interface ReconnectedEventArgs {
  connectionId: string;
  attempt: number;
  timestamp: Date;
}

export interface ErrorEventArgs {
  error: Error;
  context: string;
  recoverable: boolean;
  timestamp: Date;
}

// Raw message events for debugging
export interface RawMessageEventArgs {
  data: string | ArrayBuffer;
  timestamp: Date;
}

export interface RawSentEventArgs {
  data: string | ArrayBuffer;
  timestamp: Date;
}

/**
 * Strongly typed event map for Voice Live client events
 */
export interface VoiceLiveEventMap {
  // Connection lifecycle events
  'connected': ConnectedEventArgs;
  'disconnected': DisconnectedEventArgs;
  'reconnecting': ReconnectingEventArgs;
  'reconnected': ReconnectedEventArgs;
  'error': ErrorEventArgs;
  
  // Server events (mapped 1:1 from ServerEventUnion types with 'server.' prefix)
  'server.error': ServerEventError;
  'server.session.created': ServerEventSessionCreated;
  'server.session.updated': ServerEventSessionUpdated;
  'server.session.avatar.connecting': ServerEventSessionAvatarConnecting;
  
  // Audio buffer events
  'server.input_audio_buffer.committed': ServerEventInputAudioBufferCommitted;
  'server.input_audio_buffer.cleared': ServerEventInputAudioBufferCleared;
  'server.input_audio_buffer.speech_started': ServerEventInputAudioBufferSpeechStarted;
  'server.input_audio_buffer.speech_stopped': ServerEventInputAudioBufferSpeechStopped;
  
  // Conversation item events
  'server.conversation.item.created': ServerEventConversationItemCreated;
  'server.conversation.item.truncated': ServerEventConversationItemTruncated;
  'server.conversation.item.deleted': ServerEventConversationItemDeleted;
  'server.conversation.item.retrieved': ServerEventConversationItemRetrieved;
  'server.conversation.item.input_audio_transcription.completed': ServerEventConversationItemInputAudioTranscriptionCompleted;
  'server.conversation.item.input_audio_transcription.failed': ServerEventConversationItemInputAudioTranscriptionFailed;
  'server.conversation.item.input_audio_transcription.delta': ServerEventConversationItemInputAudioTranscriptionDelta;
  
  // Response lifecycle events
  'server.response.created': ServerEventResponseCreated;
  'server.response.done': ServerEventResponseDone;
  'server.response.output_item.added': ServerEventResponseOutputItemAdded;
  'server.response.output_item.done': ServerEventResponseOutputItemDone;
  
  // Content streaming events
  'server.response.content_part.added': ServerEventResponseContentPartAdded;
  'server.response.content_part.done': ServerEventResponseContentPartDone;
  'server.response.text.delta': ServerEventResponseTextDelta;
  'server.response.text.done': ServerEventResponseTextDone;
  
  // Audio streaming events
  'server.response.audio_transcript.delta': ServerEventResponseAudioTranscriptDelta;
  'server.response.audio_transcript.done': ServerEventResponseAudioTranscriptDone;
  'server.response.audio.delta': ServerEventResponseAudioDelta;
  'server.response.audio.done': ServerEventResponseAudioDone;
  
  // Animation events
  'server.response.animation.blendshape.delta': ServerEventResponseAnimationBlendshapeDelta;
  'server.response.animation.blendshape.done': ServerEventResponseAnimationBlendshapeDone;
  'server.response.animation.viseme.delta': ServerEventResponseAnimationVisemeDelta;
  'server.response.animation.viseme.done': ServerEventResponseAnimationVisemeDone;
  
  // Timestamp events
  'server.response.audio.timestamp.delta': ServerEventResponseAudioTimestampDelta;
  'server.response.audio.timestamp.done': ServerEventResponseAudioTimestampDone;
  
  // Function call events
  'server.response.function_call_arguments.delta': ServerEventResponseFunctionCallArgumentsDelta;
  'server.response.function_call_arguments.done': ServerEventResponseFunctionCallArgumentsDone;
  
  // Raw events for debugging/advanced use
  'raw.message': RawMessageEventArgs;
  'raw.sent': RawSentEventArgs;
}

/**
 * Event listener function type
 */
export type EventListener<T> = (args: T) => void;

/**
 * Strongly typed event emitter for Voice Live client events
 * Using a simple implementation compatible with both Node.js and browser environments
 */
export class VoiceLiveEventEmitter {
  private readonly _listeners: Map<string, Array<EventListener<any>>> = new Map();

  /**
   * Add an event listener for a specific event type
   */
  on<K extends keyof VoiceLiveEventMap>(
    event: K,
    listener: EventListener<VoiceLiveEventMap[K]>
  ): void {
    const eventListeners = this._listeners.get(event) || [];
    eventListeners.push(listener);
    this._listeners.set(event, eventListeners);
  }

  /**
   * Add a one-time event listener
   */
  once<K extends keyof VoiceLiveEventMap>(
    event: K,
    listener: EventListener<VoiceLiveEventMap[K]>
  ): void {
    const onceWrapper = (args: VoiceLiveEventMap[K]): void => {
      this.off(event, onceWrapper);
      listener(args);
    };
    this.on(event, onceWrapper);
  }

  /**
   * Remove an event listener
   */
  off<K extends keyof VoiceLiveEventMap>(
    event: K,
    listener: EventListener<VoiceLiveEventMap[K]>
  ): void {
    const eventListeners = this._listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index >= 0) {
        eventListeners.splice(index, 1);
        if (eventListeners.length === 0) {
          this._listeners.delete(event);
        }
      }
    }
  }

  /**
   * Remove all event listeners for a specific event or all events
   */
  removeAllListeners(event?: keyof VoiceLiveEventMap): void {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
  }

  /**
   * Emit a strongly typed event
   */
  emit<K extends keyof VoiceLiveEventMap>(
    event: K,
    args: VoiceLiveEventMap[K]
  ): void {
    const eventListeners = this._listeners.get(event);
    if (eventListeners) {
      // Create a copy of the listeners array to avoid issues if listeners are modified during emit
      const listenersCopy = [...eventListeners];
      for (const listener of listenersCopy) {
        try {
          listener(args);
        } catch (error) {
          // Log error but don't stop other listeners
          console.error(`Error in event listener for ${event}:`, error);
        }
      }
    }
  }

  /**
   * Helper method to emit server events based on parsed messages
   */
  emitServerEvent(event: ServerEventUnion): void {
    // Map server event types to typed events with 'server.' prefix
    // Type-safe event emission using type guards
    switch (event.type) {
      case 'error':
        this.emit('server.error', event as ServerEventError);
        break;
      case 'session.created':
        this.emit('server.session.created', event as ServerEventSessionCreated);
        break;
      case 'session.updated':
        this.emit('server.session.updated', event as ServerEventSessionUpdated);
        break;
      case 'session.avatar.connecting':
        this.emit('server.session.avatar.connecting', event as ServerEventSessionAvatarConnecting);
        break;
      case 'input_audio_buffer.committed':
        this.emit('server.input_audio_buffer.committed', event as ServerEventInputAudioBufferCommitted);
        break;
      case 'input_audio_buffer.cleared':
        this.emit('server.input_audio_buffer.cleared', event as ServerEventInputAudioBufferCleared);
        break;
      case 'input_audio_buffer.speech_started':
        this.emit('server.input_audio_buffer.speech_started', event as ServerEventInputAudioBufferSpeechStarted);
        break;
      case 'input_audio_buffer.speech_stopped':
        this.emit('server.input_audio_buffer.speech_stopped', event as ServerEventInputAudioBufferSpeechStopped);
        break;
      case 'conversation.item.created':
        this.emit('server.conversation.item.created', event as ServerEventConversationItemCreated);
        break;
      case 'conversation.item.truncated':
        this.emit('server.conversation.item.truncated', event as ServerEventConversationItemTruncated);
        break;
      case 'conversation.item.deleted':
        this.emit('server.conversation.item.deleted', event as ServerEventConversationItemDeleted);
        break;
      case 'conversation.item.retrieved':
        this.emit('server.conversation.item.retrieved', event as ServerEventConversationItemRetrieved);
        break;
      case 'conversation.item.input_audio_transcription.completed':
        this.emit('server.conversation.item.input_audio_transcription.completed', event as ServerEventConversationItemInputAudioTranscriptionCompleted);
        break;
      case 'conversation.item.input_audio_transcription.failed':
        this.emit('server.conversation.item.input_audio_transcription.failed', event as ServerEventConversationItemInputAudioTranscriptionFailed);
        break;
      case 'conversation.item.input_audio_transcription.delta':
        this.emit('server.conversation.item.input_audio_transcription.delta', event as ServerEventConversationItemInputAudioTranscriptionDelta);
        break;
      case 'response.created':
        this.emit('server.response.created', event as ServerEventResponseCreated);
        break;
      case 'response.done':
        this.emit('server.response.done', event as ServerEventResponseDone);
        break;
      case 'response.output_item.added':
        this.emit('server.response.output_item.added', event as ServerEventResponseOutputItemAdded);
        break;
      case 'response.output_item.done':
        this.emit('server.response.output_item.done', event as ServerEventResponseOutputItemDone);
        break;
      case 'response.content_part.added':
        this.emit('server.response.content_part.added', event as ServerEventResponseContentPartAdded);
        break;
      case 'response.content_part.done':
        this.emit('server.response.content_part.done', event as ServerEventResponseContentPartDone);
        break;
      case 'response.text.delta':
        this.emit('server.response.text.delta', event as ServerEventResponseTextDelta);
        break;
      case 'response.text.done':
        this.emit('server.response.text.done', event as ServerEventResponseTextDone);
        break;
      case 'response.audio_transcript.delta':
        this.emit('server.response.audio_transcript.delta', event as ServerEventResponseAudioTranscriptDelta);
        break;
      case 'response.audio_transcript.done':
        this.emit('server.response.audio_transcript.done', event as ServerEventResponseAudioTranscriptDone);
        break;
      case 'response.audio.delta':
        this.emit('server.response.audio.delta', event as ServerEventResponseAudioDelta);
        break;
      case 'response.audio.done':
        this.emit('server.response.audio.done', event as ServerEventResponseAudioDone);
        break;
      case 'response.animation.blendshape.delta':
        this.emit('server.response.animation.blendshape.delta', event as ServerEventResponseAnimationBlendshapeDelta);
        break;
      case 'response.animation.blendshape.done':
        this.emit('server.response.animation.blendshape.done', event as ServerEventResponseAnimationBlendshapeDone);
        break;
      case 'response.animation.viseme.delta':
        this.emit('server.response.animation.viseme.delta', event as ServerEventResponseAnimationVisemeDelta);
        break;
      case 'response.animation.viseme.done':
        this.emit('server.response.animation.viseme.done', event as ServerEventResponseAnimationVisemeDone);
        break;
      case 'response.audio.timestamp.delta':
        this.emit('server.response.audio.timestamp.delta', event as ServerEventResponseAudioTimestampDelta);
        break;
      case 'response.audio.timestamp.done':
        this.emit('server.response.audio.timestamp.done', event as ServerEventResponseAudioTimestampDone);
        break;
      case 'response.function_call_arguments.delta':
        this.emit('server.response.function_call_arguments.delta', event as ServerEventResponseFunctionCallArgumentsDelta);
        break;
      case 'response.function_call_arguments.done':
        this.emit('server.response.function_call_arguments.done', event as ServerEventResponseFunctionCallArgumentsDone);
        break;
      default:
        console.warn('Unknown server event type:', (event as any).type);
        // Still emit as generic raw message for debugging
        this.emit('raw.message', {
          data: JSON.stringify(event),
          timestamp: new Date()
        });
    }
  }

  /**
   * Helper method to emit connection lifecycle events
   */
  emitConnected(connectionId: string, sessionId?: string): void {
    this.emit('connected', {
      connectionId,
      sessionId,
      timestamp: new Date()
    });
  }

  emitDisconnected(code: number, reason: string, wasClean: boolean): void {
    this.emit('disconnected', {
      code,
      reason,
      wasClean,
      timestamp: new Date()
    });
  }

  emitReconnecting(attempt: number, maxAttempts: number, delayMs: number): void {
    this.emit('reconnecting', {
      attempt,
      maxAttempts,
      delayMs,
      timestamp: new Date()
    });
  }

  emitReconnected(connectionId: string, attempt: number): void {
    this.emit('reconnected', {
      connectionId,
      attempt,
      timestamp: new Date()
    });
  }

  emitError(error: Error, context: string, recoverable: boolean): void {
    this.emit('error', {
      error,
      context,
      recoverable,
      timestamp: new Date()
    });
  }

  emitRawMessage(data: string | ArrayBuffer): void {
    this.emit('raw.message', {
      data,
      timestamp: new Date()
    });
  }

  emitRawSent(data: string | ArrayBuffer): void {
    this.emit('raw.sent', {
      data,
      timestamp: new Date()
    });
  }

  /**
   * Get the number of listeners for a specific event
   */
  listenerCount(event: keyof VoiceLiveEventMap): number {
    const eventListeners = this._listeners.get(event);
    return eventListeners ? eventListeners.length : 0;
  }

  /**
   * Get all event names that have listeners
   */
  eventNames(): Array<keyof VoiceLiveEventMap> {
    return Array.from(this._listeners.keys()) as Array<keyof VoiceLiveEventMap>;
  }
}
