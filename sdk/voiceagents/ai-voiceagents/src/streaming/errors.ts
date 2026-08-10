// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Error codes raised by the Voice Agents streaming client. */
export type VoiceAgentStreamingErrorCode =
  | "authenticationFailed"
  | "connectionFailed"
  | "connectionClosed"
  | "invalidState"
  | "operationCancelled"
  | "protocolError"
  | "sendFailed";

/** Base error raised by the Voice Agents streaming client. */
export class VoiceAgentStreamingError extends Error {
  /** A stable code identifying the error category. */
  public readonly code: VoiceAgentStreamingErrorCode;
  /** The underlying error, when available. */
  public override readonly cause?: unknown;

  public constructor(
    message: string,
    code: VoiceAgentStreamingErrorCode,
    options: { cause?: unknown } = {},
  ) {
    super(message);
    this.name = "VoiceAgentStreamingError";
    this.code = code;
    this.cause = options.cause;
  }
}

/** An error raised while acquiring a Microsoft Entra access token. */
export class VoiceAgentAuthenticationError extends VoiceAgentStreamingError {
  public constructor(message: string, options: { cause?: unknown } = {}) {
    super(message, "authenticationFailed", options);
    this.name = "VoiceAgentAuthenticationError";
  }
}

/** An error raised by the WebSocket connection. */
export class VoiceAgentConnectionError extends VoiceAgentStreamingError {
  /** The WebSocket close code, when the error was caused by a close frame. */
  public readonly closeCode?: number;

  public constructor(
    message: string,
    code: Extract<
      VoiceAgentStreamingErrorCode,
      "connectionFailed" | "connectionClosed" | "invalidState" | "operationCancelled" | "sendFailed"
    >,
    options: { cause?: unknown; closeCode?: number } = {},
  ) {
    super(message, code, options);
    this.name = "VoiceAgentConnectionError";
    this.closeCode = options.closeCode;
  }
}

/** An error raised when a WebSocket message does not match the voice-agent protocol. */
export class VoiceAgentProtocolError extends VoiceAgentStreamingError {
  public constructor(message: string, options: { cause?: unknown } = {}) {
    super(message, "protocolError", options);
    this.name = "VoiceAgentProtocolError";
  }
}
