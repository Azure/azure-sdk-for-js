// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import {
  type ServerEventUnion,
  type ClientEventUnion,
  KnownServerEventType,
} from "../models/index.js";
import {
  clientEventUnionSerializer,
  KnownClientEventType,
  type ServerEventError,
  type ServerEventErrorDetails,
  serverEventUnionDeserializer,
} from "../models/models.js";

/**
 * Parsed message containing event data and metadata
 */
export interface ParsedMessage {
  /** Type of event: client or server */
  type: "client" | "server";
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
          type: "server",
          event: serverEventUnionDeserializer(parsedData),
          raw: data,
        };
      }

      // Handle unexpected client events (shouldn't normally receive these from server)
      if (this._isClientEvent(parsedData)) {
        return {
          type: "client",
          event: parsedData as ClientEventUnion,
          raw: data,
        };
      }

      return null; // Unknown message format
    } catch (error) {
      logger.error("Failed to parse incoming message:", error);
      return {
        type: "server",
        event: {
          type: KnownServerEventType.Error,
          error: {
            type: "error",
            code: "MessageParsingError",
            message:
              "Failed to parse incoming message data. " +
              (error instanceof Error ? error.message : String(error)),
          } as ServerEventErrorDetails,
        } as ServerEventError,
        raw: data,
      };
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
    return data && typeof data.type === "string" && this._isValidServerEventType(data.type);
  }

  /**
   * Checks if the parsed data represents a client event
   */
  private _isClientEvent(data: any): boolean {
    // Check if data matches ClientEventUnion structure
    return data && typeof data.type === "string" && this._isValidClientEventType(data.type);
  }

  /**
   * Validates if the type string represents a valid server event type
   */
  private _isValidServerEventType(type: string): boolean {
    // Based on the comprehensive analysis in EXISTING_TYPES_ANALYSIS.md
    return Object.values(KnownServerEventType).includes(type as KnownServerEventType);
  }

  /**
   * Validates if the type string represents a valid client event type
   */
  private _isValidClientEventType(type: string): boolean {
    // Based on the comprehensive analysis in EXISTING_TYPES_ANALYSIS.md
    return Object.values(KnownClientEventType).includes(type as KnownClientEventType);
  }
}
