// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { NoOpCredential } from "$internal/noOpCredential.js";

describe("NoOpCredential", () => {
  it("getToken", async () => {
    const credential = new NoOpCredential();

    const token = await credential.getToken();

    assert.equal(token.token, "SecretPlaceholder");
    assert(token.expiresOnTimestamp <= Date.now() + 86400 * 1000);
  });
});
