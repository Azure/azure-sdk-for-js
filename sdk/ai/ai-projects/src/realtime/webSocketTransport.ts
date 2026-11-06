// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";

/** Callbacks invoked by a {@link VoiceAgentWebSocketTransport} as connection events occur. */
export interface VoiceAgentWebSocketHandlers {
  /** Invoked when a message is received from the service. */
  onMessage: (data: string | ArrayBuffer) => void;
  /** Invoked when the connection closes. */
  onClose: (code: number, reason: string, wasClean: boolean) => void;
  /** Invoked when the transport encounters an error. */
  onError: (error: Error) => void;
}

/** Options passed to {@link VoiceAgentWebSocketTransport.connect}. */
export interface VoiceAgentWebSocketConnectOptions {
  /** The WebSocket URL to connect to. */
  url: string;
  /** The WebSocket subprotocols to negotiate. */
  protocols: string[];
  /** Headers to send with the connection upgrade request, where supported by the transport. */
  headers: Record<string, string>;
  /** Connection timeout, in milliseconds. */
  connectionTimeoutInMs: number;
  /** Cancels the connection attempt. */
  abortSignal?: AbortSignalLike;
}

/**
 * WebSocket transport used by Realtime and GPT Live.
 * Implement this interface to connect through an authenticated relay or another custom transport.
 */
export interface VoiceAgentWebSocketTransport {
  /** Registers the handlers invoked as connection events occur. */
  setHandlers(handlers: VoiceAgentWebSocketHandlers): void;
  /** Establishes the WebSocket connection. */
  connect(options: VoiceAgentWebSocketConnectOptions): Promise<void>;
  /** Sends a message over the connection. */
  send(data: string, abortSignal?: AbortSignalLike): Promise<void>;
  /** Closes the connection. */
  close(code: number, reason: string): Promise<void>;
}

/** Creates transport instances for the Voice Agents Realtime and GPT Live clients. */
export interface VoiceAgentWebSocketFactory {
  /** Creates a new transport instance for a single connection attempt. */
  create(): VoiceAgentWebSocketTransport;
}

/** Whether the close code represents a non-error closure. @internal */
export function isCleanCloseCode(code: number): boolean {
  switch (code) {
    case 1002:
    case 1003:
    case 1005:
    case 1006:
    case 1007:
    case 1008:
    case 1009:
    case 1010:
    case 1011:
    case 1012:
    case 1013:
    case 1014:
    case 1015:
      return false;
    default:
      return true;
  }
}
