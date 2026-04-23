// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Error codes for Voice Live WebSocket operations
 */
export enum VoiceLiveErrorCodes {
  // Connection errors
  ConnectionFailed = "CONNECTION_FAILED",
  ConnectionTimeout = "CONNECTION_TIMEOUT",
  ConnectionLost = "CONNECTION_LOST",
  AlreadyConnected = "ALREADY_CONNECTED",
  NotConnected = "NOT_CONNECTED",

  // WebSocket errors
  WebSocketError = "WEBSOCKET_ERROR",

  // Authentication errors
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  InvalidCredentials = "INVALID_CREDENTIALS",
  Unauthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",

  // Protocol errors
  InvalidMessage = "INVALID_MESSAGE",
  MessageTooLarge = "MESSAGE_TOO_LARGE",
  ProtocolError = "PROTOCOL_ERROR",
  BufferOverflow = "BUFFER_OVERFLOW",

  // General errors
  OperationCancelled = "OPERATION_CANCELLED",
  InvalidState = "INVALID_STATE",
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
    cause?: Error,
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

    // Make properties enumerable for JSON.stringify (following Azure SDK pattern)
    Object.defineProperty(this, "message", { enumerable: true });
    Object.defineProperty(this, "name", { enumerable: true });
    Object.defineProperty(this, "stack", { enumerable: true });
  }
}

/**
 * Authentication error class for Voice Live operations
 */
export class VoiceLiveAuthenticationError extends VoiceLiveConnectionError {
  constructor(message: string, code: string, cause?: Error) {
    super(message, code, "authentication", false, cause);
    this.name = "VoiceLiveAuthenticationError";
  }
}

/**
 * Protocol error class for Voice Live message operations
 */
export class VoiceLiveProtocolError extends VoiceLiveConnectionError {
  constructor(message: string, code: string, cause?: Error) {
    super(message, code, "protocol", false, cause);
    this.name = "VoiceLiveProtocolError";
  }
}

/**
 * General Voice Live error class
 */
export class VoiceLiveError extends VoiceLiveConnectionError {
  constructor(
    message: string,
    code: string,
    context: string = "general",
    recoverable: boolean = false,
    cause?: Error,
  ) {
    super(message, code, context, recoverable, cause);
    this.name = "VoiceLiveError";
  }
}

/**
 * Classifies a WebSocket close event and returns appropriate error
 */
export function classifyWebSocketClose(code: number, reason: string): VoiceLiveConnectionError {
  switch (code) {
    case 1000: // Normal closure
      return new VoiceLiveConnectionError(
        "WebSocket connection closed normally",
        VoiceLiveErrorCodes.ConnectionLost,
        "websocket_close",
        false,
      );

    case 1001: // Going away
    case 1006: // Abnormal closure
      return new VoiceLiveConnectionError(
        `WebSocket connection lost: ${reason || "Abnormal closure"}`,
        VoiceLiveErrorCodes.ConnectionLost,
        "websocket_close",
        true, // Recoverable
      );

    case 1008: // Policy violation
      return new VoiceLiveConnectionError(
        `WebSocket policy violation: ${reason}`,
        VoiceLiveErrorCodes.WebSocketError,
        "websocket_close",
        false, // Not recoverable
      );

    case 1011: // Server error
      return new VoiceLiveConnectionError(
        `WebSocket server error: ${reason}`,
        VoiceLiveErrorCodes.WebSocketError,
        "websocket_close",
        true, // Recoverable
      );

    default:
      return new VoiceLiveConnectionError(
        `WebSocket closed with code ${code}: ${reason}`,
        VoiceLiveErrorCodes.ConnectionLost,
        "websocket_close",
        true, // Default to recoverable
      );
  }
}

/**
 * Classifies connection errors
 */
export function classifyConnectionError(
  error: VoiceLiveConnectionError | Error | unknown,
): VoiceLiveConnectionError {
  if (error instanceof VoiceLiveConnectionError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.includes("timeout")) {
      return new VoiceLiveConnectionError(
        `Connection timeout: ${error.message}`,
        VoiceLiveErrorCodes.ConnectionTimeout,
        "connection",
        true,
        error,
      );
    }

    if (error.message.includes("ECONNREFUSED") || error.message.includes("ENOTFOUND")) {
      return new VoiceLiveConnectionError(
        `Connection failed: ${error.message}`,
        VoiceLiveErrorCodes.ConnectionFailed,
        "connection",
        true,
        error,
      );
    }
  }

  return new VoiceLiveConnectionError(
    `Unknown connection error: ${error instanceof Error ? error.message : String(error)}`,
    VoiceLiveErrorCodes.ConnectionFailed,
    "connection",
    true,
    error instanceof Error ? error : new Error(String(error)),
  );
}

/**
 * Classifies protocol errors
 */
export function classifyProtocolError(error: Error, messageType: string): VoiceLiveProtocolError {
  if (error.message.includes("JSON")) {
    return new VoiceLiveProtocolError(
      `Invalid JSON message: ${error.message}`,
      VoiceLiveErrorCodes.InvalidMessage,
      error,
    );
  }

  if (error.message.includes("size") || error.message.includes("large")) {
    return new VoiceLiveProtocolError(
      `Message too large: ${error.message}`,
      VoiceLiveErrorCodes.MessageTooLarge,
      error,
    );
  }

  return new VoiceLiveProtocolError(
    `Protocol error in ${messageType}: ${error.message}`,
    VoiceLiveErrorCodes.ProtocolError,
    error,
  );
}
