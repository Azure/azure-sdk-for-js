// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { StaticTokenCredential } from "../../src";

describe("StaticTokenCredential", function() {
  it("returns the token sent through the constructor", async () => {
    const expiresOnTimestamp = Date.now();
    const credential = new StaticTokenCredential({
      token: "token",
      expiresOnTimestamp
    });
    const accessToken = await credential.getToken("scope");
    assert.strictEqual(accessToken?.token, "token");
    assert.strictEqual(accessToken?.expiresOnTimestamp, expiresOnTimestamp);
  });
});
