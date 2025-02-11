// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, it } from "vitest";
import { assert } from "../../utils/vitest.js";
import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";
import { getSecureServerAddress } from "../../utils/injectables.js";
import { createIdentifier } from "../../utils/utils.js";

buildWebSocketClientTests("Web API", (url, options) =>
  createWebSocketClient(url, options).asWebSocket(),
);

describe("[asWs] Is not available in the browser", () => {
  const secureServerUrl = getSecureServerAddress();
  let identifier: string;
  beforeEach(async (test) => {
    identifier = createIdentifier(test);
  });
  it("should throw an error", async () => {
    await assert.isRejected(
      createWebSocketClient(secureServerUrl, { identifier }).asWs(),
      /The 'ws' module is not available in this runtime environment/,
    );
  });
});
