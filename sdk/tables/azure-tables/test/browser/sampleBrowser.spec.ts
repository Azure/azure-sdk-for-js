// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { helloWorld } from "../../src";

// another node built-in that has to be shimmed for the browser
import { assert } from "chai";

describe("Hello function - browser", () => {
  it("should create an event emitter", () => {
    const result = helloWorld();
    assert.strictEqual(result, "Hello world!");
  });
});
