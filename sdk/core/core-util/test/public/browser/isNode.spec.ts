// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isNode } from "../../../src";

describe("isNode (browser)", function () {
  it("should return false", async function () {
    assert.isFalse(isNode);
  });
});
