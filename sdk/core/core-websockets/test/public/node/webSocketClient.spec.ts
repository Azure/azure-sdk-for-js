// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, it } from "vitest";
import { assert } from "../../utils/vitest.js";
import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";
import { getSecureServerAddress } from "../../utils/injectables.js";
import { createIdentifier } from "../../utils/utils.js";

buildWebSocketClientTests("ws", (url, options) => createWebSocketClient(url, options).asWs());

const nodeVersion = Number(process.versions.node.split(".")[0]);
if (nodeVersion >= 23) {
  buildWebSocketClientTests("NodeJS Native", (url, options) =>
    createWebSocketClient(url, options).asWebSocket(),
  );
} else {
  describe("[asWebSocket] Is not available in NodeJS < v23", () => {
    const secureServerUrl = getSecureServerAddress();
    let identifier: string;
    beforeEach(async (test) => {
      identifier = createIdentifier(test);
    });
    it("should throw an error", async () => {
      await assert.isRejected(
        createWebSocketClient(secureServerUrl, { identifier }).asWebSocket(),
        /The WebSocket Web API is not available in this runtime environment/,
      );
    });
  });
}
