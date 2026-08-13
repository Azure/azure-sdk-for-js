// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";

/** @internal */
export interface VoiceAgentWebSocketHandlers {
  onMessage: (data: string | ArrayBuffer) => void;
  onClose: (code: number, reason: string, wasClean: boolean) => void;
  onError: (error: Error) => void;
}

/** @internal */
export interface VoiceAgentWebSocketConnectOptions {
  url: string;
  protocols: string[];
  headers: Record<string, string>;
  connectionTimeoutInMs: number;
  abortSignal?: AbortSignalLike;
}

/** @internal */
export interface VoiceAgentWebSocketTransport {
  setHandlers(handlers: VoiceAgentWebSocketHandlers): void;
  connect(options: VoiceAgentWebSocketConnectOptions): Promise<void>;
  send(data: string, abortSignal?: AbortSignalLike): Promise<void>;
  close(code: number, reason: string): Promise<void>;
}

/** @internal */
export interface VoiceAgentWebSocketFactory {
  create(): VoiceAgentWebSocketTransport;
}
