// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isNode } from "../../../src";

describe("isNode (node)", function () {
  it("should return true", async function () {
    assert.isTrue(isNode);
  });
});
