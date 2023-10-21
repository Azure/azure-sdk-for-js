// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { decompressResponsePolicy } from "../../src";

describe("decompressResponsePolicy (browser)", function () {
  it("Throws on creation", function () {
    assert.throws(() => {
      decompressResponsePolicy();
    }, /decompressResponsePolicy is not supported in browser environment/);
  });
});
