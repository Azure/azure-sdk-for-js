// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createWebSocketClient } from "../../src/index.js";
import { delay } from "@azure/core-util";

describe("WebSocket client", () => {
  it("should connect to a WebSocket server", async () => {
    const client = await createWebSocketClient("wss://echo.websocket.org");
    let received = "";
    client.on("message", (data) => {
      received += data;
      console.log("received:", data);
    });
    await client.send("Hello, World!");
    await delay(200);
    assert.isNotEmpty(received);
    await client.close();
  });
});
