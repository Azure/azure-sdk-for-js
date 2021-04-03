// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "../../src";
import { assert } from "chai";

describe("isNode (browser)", function() {
  it("should return false", async function() {
    assert.isFalse(isNode);
  });
});
