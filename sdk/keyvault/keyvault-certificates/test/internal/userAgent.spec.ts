// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateClient } from "../../src/index.js";
import { SDK_VERSION } from "../../src/constants.js";
import { TokenCredential } from "@azure/core-auth";
import { describe, it, assert } from "vitest";

describe("Certificates client's user agent (only in Node, because of fs)", () => {
  it("SDK_VERSION and user-agent should match", async function () {
    let userAgent: string | undefined;
    const client = new CertificateClient("https://myvault.vault.azure.net", {} as TokenCredential, {
      httpClient: {
        sendRequest: async (request) => {
          userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
          throw new Error("only a test");
        },
      },
    });

    try {
      await client.getCertificate("foo");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-keyvault-certificates/${SDK_VERSION}`);
  });
});
