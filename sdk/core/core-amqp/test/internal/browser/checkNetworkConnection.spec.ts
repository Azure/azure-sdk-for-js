// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { checkNetworkConnection } from "../../../src/util/checkNetworkConnection.common.js";

describe("checkNetworkConnection (browser)", function () {
  it("returns a boolean reflecting navigator.onLine", async function () {
    const result = await checkNetworkConnection("hostname.example.com");
    assert.isBoolean(result);
    // In a browser test environment, navigator.onLine should be true
    assert.equal(result, self.navigator.onLine);
  });
});
