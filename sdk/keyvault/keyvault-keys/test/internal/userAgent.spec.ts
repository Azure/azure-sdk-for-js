// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyClient } from "@azure/keyvault-keys";
import { SDK_VERSION } from "$internal/constants.js";
import { describe, it, assert } from "vitest";

describe("Keys client's user agent", () => {
  it("SDK_VERSION and user-agent should match", async () => {
    let userAgent: string | undefined;
    const client = new KeyClient(
      "https://myvault.vault.azure.net",
      {
        getToken: async () => {
          return {
            token: "my-test-token",
            expiresOnTimestamp: 111111111111,
          };
        },
      },
      {
        httpClient: {
          sendRequest: async (request) => {
            userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
            throw new Error("only a test");
          },
        },
      },
    );

    try {
      await client.getKey("foo");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-keyvault-keys/${SDK_VERSION}`);
  });
});
