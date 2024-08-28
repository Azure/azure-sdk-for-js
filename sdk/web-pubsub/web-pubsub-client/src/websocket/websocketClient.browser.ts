// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { WebSocketClientFactoryLike, WebSocketClientLike } from "./websocketClientLike";

export class WebSocketClient implements WebSocketClientLike {
  private _socket: WebSocket;

  public constructor(uri: string, protocolName: string) {
    this._socket = new WebSocket(uri, protocolName);
    this._socket.binaryType = "arraybuffer";
  }

  onopen(fn: () => void): void {
    this._socket.onopen = fn;
  }

  onclose(fn: (code: number, reason: string) => void): void {
    this._socket.onclose = (ev: CloseEvent) => fn(ev.code, ev.reason);
  }

  onerror(fn: (error: any) => void): void {
    this._socket.onerror = (ev: Event) => fn(ev);
  }

  onmessage(fn: (data: string | Buffer | ArrayBuffer | Buffer[]) => void): void {
    this._socket.onmessage = (event: MessageEvent) => fn(event.data);
  }

  close(code?: number, reason?: string): void {
    this._socket.close(code, reason);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  send(data: any, _?: AbortSignalLike): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this._socket.send(data);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  isOpen(): boolean {
    return this._socket.readyState === WebSocket.OPEN;
  }
}

export class WebSocketClientFactory implements WebSocketClientFactoryLike {
  public create(uri: string, protocolName: string): WebSocketClient {
    return new WebSocketClient(uri, protocolName);
  }
}
