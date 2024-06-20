// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StaticTokenCredential} from "../../src/staticTokenCredential";
import { assert } from "chai";

// most of StaticTokenCredential is tested in the public API tests for AzureCommunicationTokenCredential
describe("Internal tests for StaticTokenCredential", function () {
  it("Calls token fetcher", async function () {
    const getToken = Promise.resolve({ token: "entraToken", expiresOnTimestamp: Date.now() + 1000 });
    
    const credential = new StaticTokenCredential(getToken);
    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, "entraToken");
  });
});
