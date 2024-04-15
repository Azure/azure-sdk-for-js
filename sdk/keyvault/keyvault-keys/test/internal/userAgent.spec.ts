// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyClient } from "../../src";
import { SDK_VERSION } from "../../src/constants";
import { TokenCredential } from "@azure/core-auth";
import { assert } from "@azure/test-utils";

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
