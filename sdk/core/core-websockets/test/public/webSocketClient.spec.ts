// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createWebSocketClient } from "../../src/index.js";
import { delay } from "@azure/core-util";
import { createIdentifier } from "../utils/reliableConnectionClientMocks.js";

describe("createWebSocketClient", () => {
  it("should connect to a WebSocket server", async (test) => {
    const client = await createWebSocketClient("wss://echo.websocket.org", {
      identifier: createIdentifier(test),
    });
    let received = "";
    client.on("message", (data) => {
      received += data;
    });
    await client.send("Hello, World!");
    await delay(200);
    assert.include(received, "Hello, World!");
    await client.close();
  });
});
