// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { disableResponseDecompressionPolicy } from "../../src";

describe("disableResponseDecompressionPolicy (browser)", function() {
  it("Throws on creation", function() {
    assert.throws(() => {
      disableResponseDecompressionPolicy();
    }, /disableResponseDecompressionPolicy is not supported in browser environment/);
  });
});
