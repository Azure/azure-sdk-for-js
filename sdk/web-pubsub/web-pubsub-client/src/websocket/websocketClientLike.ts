// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";

export interface WebSocketClientLike {
  onclose(fn: (code: number, reason: string) => void): void;
  onerror(fn: (error: any) => void): void;
  onmessage(fn: (data: string | Buffer | ArrayBuffer | Buffer[]) => void): void;
  onopen(fn: () => void): void;
  /** Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason. */
  close(code?: number, reason?: string): void;
  /** Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  send(data: any, _?: AbortSignalLike): Promise<void>;
  isOpen(): boolean;
}

export interface WebSocketClientFactoryLike {
  create(uri: string, protocolName: string): WebSocketClientLike;
}
