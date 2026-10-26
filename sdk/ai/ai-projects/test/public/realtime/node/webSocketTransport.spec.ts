// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventEmitter } from "node:events";
import WebSocket from "ws";
import { NodeWebSocketTransport } from "$internal/webSocketTransport.js";
import { assert, describe, it } from "vitest";

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

    assert.isTrue(webSocket.terminated);
    assert.equal(webSocket.listenerCount("close"), 0);
  });
});
