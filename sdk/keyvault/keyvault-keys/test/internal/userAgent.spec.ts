// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyClient } from "../../src/index.js";
import { SDK_VERSION } from "../../src/constants.js";
import type { TokenCredential } from "@azure/core-auth";
import { describe, it, assert } from "vitest";

describe("Keys client's user agent", () => {
  it("SDK_VERSION and user-agent should match", async function () {
    let userAgent: string | undefined;
    const client = new KeyClient("https://myvault.vault.azure.net", {} as TokenCredential, {
      httpClient: {
        sendRequest: async (request) => {
          userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
          throw new Error("only a test");
        },
      },
    });

    try {
      await client.getKey("foo");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-keyvault-keys/${SDK_VERSION}`);
  });
});
