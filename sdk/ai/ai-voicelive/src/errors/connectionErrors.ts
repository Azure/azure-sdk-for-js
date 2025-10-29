// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Error codes for Voice Live WebSocket operations
 */
export enum VoiceLiveErrorCodes {
  // Connection errors
  CONNECTION_FAILED = "CONNECTION_FAILED",
  CONNECTION_TIMEOUT = "CONNECTION_TIMEOUT",
  CONNECTION_LOST = "CONNECTION_LOST",
  ALREADY_CONNECTED = "ALREADY_CONNECTED",
  NOT_CONNECTED = "NOT_CONNECTED",
  
  // WebSocket errors
  WEBSOCKET_ERROR = "WEBSOCKET_ERROR",
  
  // General errors
  OPERATION_CANCELLED = "OPERATION_CANCELLED",
  INVALID_STATE = "INVALID_STATE",
}

/**
 * Base error class for Voice Live WebSocket operations
 */
export class VoiceLiveConnectionError extends Error {
  /** Error code identifying the specific error type */
  public readonly code: string;
  
  /** Context information about where the error occurred */
  public readonly context: string;
  
  /** Indicates whether this error is potentially recoverable */
  public readonly recoverable: boolean;
  
  /** The original error that caused this error, if any */
  public readonly cause?: Error;
  
  /** Timestamp when the error occurred */
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: string,
    context: string = "websocket",
    recoverable: boolean = false,
    cause?: Error
  ) {
    super(message);
    this.name = "VoiceLiveConnectionError";
    this.code = code;
    this.context = context;
    this.recoverable = recoverable;
    this.cause = cause;
    this.timestamp = new Date();
    
    // Ensure proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VoiceLiveConnectionError);
    }
  }

  /**
   * Returns a JSON representation of the error
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      recoverable: this.recoverable,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Classifier for WebSocket close events to determine error handling
 */
export class VoiceLiveErrorClassifier {
  /**
   * Classifies a WebSocket close event and returns appropriate error
   */
  static classifyWebSocketClose(code: number, reason: string): VoiceLiveConnectionError {
    switch (code) {
      case 1000: // Normal closure
        return new VoiceLiveConnectionError(
          "WebSocket connection closed normally",
          VoiceLiveErrorCodes.CONNECTION_LOST,
          "websocket_close",
          false
        );
      
      case 1001: // Going away
      case 1006: // Abnormal closure
        return new VoiceLiveConnectionError(
          `WebSocket connection lost: ${reason || 'Abnormal closure'}`,
          VoiceLiveErrorCodes.CONNECTION_LOST,
          "websocket_close",
          true // Recoverable
        );
      
      case 1008: // Policy violation
        return new VoiceLiveConnectionError(
          `WebSocket policy violation: ${reason}`,
          VoiceLiveErrorCodes.WEBSOCKET_ERROR,
          "websocket_close",
          false // Not recoverable
        );
      
      case 1011: // Server error
        return new VoiceLiveConnectionError(
          `WebSocket server error: ${reason}`,
          VoiceLiveErrorCodes.WEBSOCKET_ERROR,
          "websocket_close",
          true // Recoverable
        );
      
      default:
        return new VoiceLiveConnectionError(
          `WebSocket closed with code ${code}: ${reason}`,
          VoiceLiveErrorCodes.CONNECTION_LOST,
          "websocket_close",
          true // Default to recoverable
        );
    }
  }
}
