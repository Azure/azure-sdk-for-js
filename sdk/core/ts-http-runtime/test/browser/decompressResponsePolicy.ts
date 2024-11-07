// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { decompressResponsePolicy } from "../../src/policies/decompressResponsePolicy.js";

describe("decompressResponsePolicy (browser)", function () {
  it("Throws on creation", function () {
    assert.throws(() => {
      decompressResponsePolicy();
    }, /decompressResponsePolicy is not supported in browser environment/);
  });
});
