// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "../../src";
import { assert } from "chai";

describe("isNode (node)", function() {
  it("should return true", async function() {
    assert.isTrue(isNode);
  });
});
