// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { describe, it } from "node:test";
import WebSocket from "ws";
import { NodeWebSocketTransport } from "../../src/streaming/webSocketTransport.js";

class HangingWebSocket extends EventEmitter {
  public readyState: number = WebSocket.OPEN;
  public terminated = false;

  public close(): void {
    this.readyState = WebSocket.CLOSING;
  }

  public terminate(): void {
    this.terminated = true;
    this.readyState = WebSocket.CLOSED;
  }
}

describe("NodeWebSocketTransport", () => {
  it("terminates a socket that does not complete its close handshake", async () => {
    const transport = new NodeWebSocketTransport(10);
    const webSocket = new HangingWebSocket();
    Object.assign(transport, { webSocket });

    await transport.close(1000, "test complete");

    assert.equal(webSocket.terminated, true);
    assert.equal(webSocket.listenerCount("close"), 0);
  });
});
