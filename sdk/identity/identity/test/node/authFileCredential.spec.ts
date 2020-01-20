// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { AuthFileCredential } from "../../src";

describe("throw an error when use the incorrect file path ", function() {
  it("use incorrect file path will throw an error when getting token", async () => {
    let credential = new AuthFileCredential("Bougs*File*Path");
    try {
      await credential.getToken("https://mock.scope/.default/");
    } catch (error) {
      assert.equal(error.message, "Error parsing SDK Auth File");
    }
  });
});
