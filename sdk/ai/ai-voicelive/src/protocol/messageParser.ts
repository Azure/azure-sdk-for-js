// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { 
  ServerEventUnion, 
  ClientEventUnion 
} from '../models/index.js';
import { clientEventUnionSerializer } from '../models/models.js';

/**
 * Parsed message containing event data and metadata
 */
export interface ParsedMessage {
  /** Type of event: client or server */
  type: 'client' | 'server';
  /** Parsed event data */
  event: ClientEventUnion | ServerEventUnion;
  /** Original raw data for debugging */
  raw: string | ArrayBuffer;
}

/**
 * Parses and serializes Voice Live protocol messages
 */
export class VoiceLiveMessageParser {
  /**
   * Parses incoming WebSocket message data into typed events
   */
  parseIncomingMessage(data: string | ArrayBuffer): ParsedMessage | null {
    try {
      let messageText: string;
      
      if (data instanceof ArrayBuffer) {
        messageText = new TextDecoder().decode(data);
      } else {
        messageText = data;
      }
      
      const parsedData = JSON.parse(messageText);
      
      // Validate and type the message based on the 'type' field
      if (this._isServerEvent(parsedData)) {
        return {
          type: 'server',
          event: parsedData as ServerEventUnion,
          raw: data
        };
      }
      
      // Handle unexpected client events (shouldn't normally receive these from server)
      if (this._isClientEvent(parsedData)) {
        return {
          type: 'client',
          event: parsedData as ClientEventUnion,
          raw: data
        };
      }
      
      return null; // Unknown message format
    } catch (error) {
      // Invalid JSON or parsing error
      return null;
    }
  }
  
  /**
   * Serializes outgoing client events for WebSocket transmission
   */
  serializeOutgoingMessage(event: ClientEventUnion): string {
    return JSON.stringify(clientEventUnionSerializer(event));
  }
  
  /**
   * Checks if the parsed data represents a server event
   */
  private _isServerEvent(data: any): boolean {
    // Check if data matches ServerEventUnion structure
    return data && typeof data.type === 'string' && this._isValidServerEventType(data.type);
  }
  
  /**
   * Checks if the parsed data represents a client event
   */
  private _isClientEvent(data: any): boolean {
    // Check if data matches ClientEventUnion structure
    return data && typeof data.type === 'string' && this._isValidClientEventType(data.type);
  }
  
  /**
   * Validates if the type string represents a valid server event type
   */
  private _isValidServerEventType(type: string): boolean {
    // Based on the comprehensive analysis in EXISTING_TYPES_ANALYSIS.md
    const validServerTypes = [
      // Error handling
      'error',
      
      // Session management
      'session.created',
      'session.updated', 
      'session.avatar.connecting',
      
      // Audio buffer events
      'input_audio_buffer.committed',
      'input_audio_buffer.cleared',
      'input_audio_buffer.speech_started',
      'input_audio_buffer.speech_stopped',
      
      // Conversation item events
      'conversation.item.created',
      'conversation.item.truncated',
      'conversation.item.deleted',
      'conversation.item.retrieved',
      'conversation.item.input_audio_transcription.completed',
      'conversation.item.input_audio_transcription.failed',
      'conversation.item.input_audio_transcription.delta',
      
      // Response lifecycle events
      'response.created',
      'response.done',
      'response.output_item.added',
      'response.output_item.done',
      
      // Content streaming events
      'response.content_part.added',
      'response.content_part.done',
      'response.text.delta',
      'response.text.done',
      
      // Audio streaming events
      'response.audio_transcript.delta',
      'response.audio_transcript.done',
      'response.audio.delta',
      'response.audio.done',
      
      // Animation events
      'response.animation.blendshape.delta',
      'response.animation.blendshape.done',
      'response.animation.viseme.delta',
      'response.animation.viseme.done',
      
      // Timestamp events
      'response.audio.timestamp.delta',
      'response.audio.timestamp.done',
      
      // Function call events
      'response.function_call_arguments.delta',
      'response.function_call_arguments.done'
    ];
    
    return validServerTypes.includes(type);
  }
  
  /**
   * Validates if the type string represents a valid client event type
   */
  private _isValidClientEventType(type: string): boolean {
    // Based on the comprehensive analysis in EXISTING_TYPES_ANALYSIS.md
    const validClientTypes = [
      // Session management
      'session.update',
      'session.avatar.connect',
      
      // Turn-based audio
      'input_audio_turn.start',
      'input_audio_turn.append',
      'input_audio_turn.end',
      'input_audio_turn.cancel',
      
      // Buffer-based audio
      'input_audio_buffer.append',
      'input_audio_buffer.commit',
      'input_audio_buffer.clear',
      
      // Audio control
      'input_audio.clear',
      
      // Conversation management
      'conversation.item.create',
      'conversation.item.truncate',
      'conversation.item.delete',
      'conversation.item.retrieve',
      
      // Response management
      'response.create',
      'response.cancel'
    ];
    
    return validClientTypes.includes(type);
  }
}
