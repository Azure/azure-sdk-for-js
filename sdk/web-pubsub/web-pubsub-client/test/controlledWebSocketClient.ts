// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubClient } from "../src/index.js";
import type {
  WebSocketClientFactoryLike,
  WebSocketClientLike,
} from "../src/websocket/websocketClientLike.js";

/** A transport boundary with distinct sockets and manually delivered events. */
export class ControlledWebSocketClient implements WebSocketClientLike {
  private _open = false;
  private _onOpen?: () => void;
  private _onClose?: (code: number, reason: string) => void;
  private _onError?: (error: unknown) => void;
  private _onMessage?: (data: string | Buffer | ArrayBuffer | Buffer[]) => void;

  public readonly sent: unknown[] = [];

  onopen(fn: () => void): void {
    this._onOpen = fn;
  }

  onclose(fn: (code: number, reason: string) => void): void {
    this._onClose = fn;
  }

  onerror(fn: (error: unknown) => void): void {
    this._onError = fn;
  }

  onmessage(fn: (data: string | Buffer | ArrayBuffer | Buffer[]) => void): void {
    this._onMessage = fn;
  }

  isOpen(): boolean {
    return this._open;
  }

  async send(data: unknown): Promise<void> {
    if (!this._open) {
      throw new Error("Test socket is not open");
    }
    this.sent.push(data);
  }

  close(code = 1000, reason = ""): void {
    this.receiveClose(code, reason);
  }

  receiveOpen(): void {
    this._open = true;
    this._onOpen?.();
  }

  receiveClose(code: number, reason = ""): void {
    this._open = false;
    this._onClose?.(code, reason);
  }

  receiveError(error: Error): void {
    this._onError?.(error);
  }

  receiveMessage(data: string): void {
    this._onMessage?.(data);
  }
}

export class ControlledWebSocketFactory implements WebSocketClientFactoryLike {
  public readonly sockets: ControlledWebSocketClient[] = [];
  public readonly requests: { uri: string; protocolName: string }[] = [];

  constructor(client: WebPubSubClient) {
    // Replace only the transport factory, as in TestWebSocketClient. All client
    // lifecycle decisions and message serialization remain real SDK behavior.
    client["_getWebSocketClientFactory"] = () => this;
  }

  create(uri: string, protocolName: string): ControlledWebSocketClient {
    const socket = new ControlledWebSocketClient();
    this.requests.push({ uri, protocolName });
    this.sockets.push(socket);
    return socket;
  }

  socket(index: number): ControlledWebSocketClient {
    const socket = this.sockets[index];
    if (!socket) {
      throw new Error(`Socket ${index} has not been created`);
    }
    return socket;
  }
}
