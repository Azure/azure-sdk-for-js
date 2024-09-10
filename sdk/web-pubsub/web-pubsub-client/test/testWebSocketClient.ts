// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import EventEmitter from "events";
import { WebPubSubClient } from "../src/webPubSubClient";
import {
  WebSocketClientFactoryLike,
  WebSocketClientLike,
} from "../src/websocket/websocketClientLike";

export class TestWebSocketClient implements WebSocketClientLike {
  private readonly _emitter: EventEmitter = new EventEmitter();

  public openTime = 0;

  constructor(client: WebPubSubClient) {
    client["_getWebSocketClientFactory"] = (): WebSocketClientFactoryLike => {
      return {
        create: (_: string, __: string) => this,
      };
    };
  }

  onclose(fn: (code: number, reason: string) => void): void {
    this._emitter.removeAllListeners("close");
    this._emitter.on("close", fn);
  }
  onerror(fn: (error: any) => void): void {
    this._emitter.removeAllListeners("error");
    this._emitter.on("error", fn);
  }
  onmessage(fn: (data: any) => void): void {
    this._emitter.removeAllListeners("message");
    this._emitter.on("message", fn);
    this.openTime = this.openTime + 1;
  }
  onopen(fn: () => void): void {
    this._emitter.removeAllListeners("open");
    this._emitter.on("open", fn);
  }
  close(code: number | undefined, __?: string | undefined): void {
    this.invokeclose(code ?? 1000);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  send(_: any, __?: AbortSignalLike | undefined): Promise<void> {
    return Promise.resolve();
  }
  isOpen(): boolean {
    return true;
  }
  invokeopen(): void {
    this._emitter.emit("open");
  }
  invokeclose(code: number): void {
    this._emitter.emit("close", code);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  invokemessage(data: any): void {
    this._emitter.emit("message", data);
  }
}
