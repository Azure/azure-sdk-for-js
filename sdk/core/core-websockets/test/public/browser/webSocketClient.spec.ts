// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createWebSocketClient } from "../../../src/index.js";
import { delay } from "@azure/core-util";
import { createIdentifier } from "../../utils/reliableConnectionClientMocks.js";

describe("createWebSocketClient", () => {
  describe("asWebSocket", () => {
    it("should connect to a WebSocket server", async (test) => {
      const url = "wss://echo.websocket.org/";
      const client = await createWebSocketClient(url, {
        identifier: createIdentifier(test),
      }).asWebSocket();
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, url);
      assert.equal(client.websocket.binaryType, "arraybuffer");
      let received = "";
      client.on("message", (data) => {
        received += "\n" + data;
      });
      await client.send("Hello, World!");
      await delay(200);
      assert.include(received, "Hello, World!");
      await client.close();
      assert.equal(client.status, "disconnected");
    });
  });
});
