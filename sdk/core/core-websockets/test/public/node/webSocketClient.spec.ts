// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, it } from "vitest";
import { assert } from "../../utils/vitest.js";
import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";
import { getSecureServerAddress } from "../../utils/injectables.js";
import { createTestFullName } from "@azure-tools/test-utils-vitest";

buildWebSocketClientTests("undici", (url, options) => createWebSocketClient(url, options).undici());

const [nodeVersion, minorVersion] = process.versions.node.split(".").map(Number);
if (nodeVersion >= 23) {
  buildWebSocketClientTests("NodeJS Native", (url, options) =>
    createWebSocketClient(url, options).web(),
  );
} else if (minorVersion < 10 && nodeVersion <= 20) {
  describe("[web] Is not available in NodeJS < v20.10", () => {
    const secureServerUrl = getSecureServerAddress();
    let identifier: string;
    beforeEach(async (test) => {
      identifier = createTestFullName(test);
    });
    it("should throw an error", async () => {
      await assert.isRejected(
        createWebSocketClient(secureServerUrl, { identifier }).web(),
        /The WebSocket Web API is not available in this runtime environment/,
      );
    });
  });
}
