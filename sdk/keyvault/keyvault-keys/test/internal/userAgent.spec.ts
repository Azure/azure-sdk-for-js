// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CryptographyClient, KeyClient } from "../../src/index.js";
import { SDK_VERSION } from "../../src/constants.js";
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

  it("does not mutate options when constructing clients", () => {
    const options = {
      userAgentOptions: { userAgentPrefix: "custom-prefix" },
    };

    new KeyClient(
      "https://myvault.vault.azure.net",
      {
        getToken: async () => ({ token: "my-test-token", expiresOnTimestamp: 111111111111 }),
      },
      options,
    );
    new CryptographyClient(
      "https://myvault.vault.azure.net/keys/my-key",
      {
        getToken: async () => ({ token: "my-test-token", expiresOnTimestamp: 111111111111 }),
      },
      options,
    );

    assert.equal(options.userAgentOptions.userAgentPrefix, "custom-prefix");
  });
});
