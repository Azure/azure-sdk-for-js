// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, it } from "vitest";
import { assert } from "../../utils/vitest.js";
import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";
import { getSecureServerAddress } from "../../utils/injectables.js";
import { createTestFullName } from "@azure-tools/test-utils-vitest";

buildWebSocketClientTests("Web API", (url, options) =>
  createWebSocketClient(url, options).asWebSocket(),
);

describe("[asWs] Is not available in the browser", () => {
  const secureServerUrl = getSecureServerAddress();
  let identifier: string;
  beforeEach(async (test) => {
    identifier = createTestFullName(test);
  });
  it("should throw an error", async () => {
    await assert.isRejected(
      createWebSocketClient(secureServerUrl, { identifier }).asWs(),
      /The 'ws' module is not available in this runtime environment/,
    );
  });
});
