// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import { BlobClient } from "../../src/index.js";

const CUSTOM_DOMAIN = "https://storage.mycustomdomain.com/mycontainer/blob.txt";

const credential: TokenCredential = {
  getToken: async (): Promise<AccessToken> => ({
    token: "fake-bearer-token",
    expiresOnTimestamp: Date.now() + 3600 * 1000,
  }),
};

describe("session authentication in the browser", () => {
  it("accepts a custom endpoint with sessions enabled", () => {
    // Node rejects this, because it cannot derive the account name needed to sign. The browser
    // never signs — the session policy is a bearer passthrough — so the guard must not fire.
    assert.doesNotThrow(
      () => new BlobClient(CUSTOM_DOMAIN, credential, { sessionOptions: { mode: "enabled" } }),
    );
  });
});
