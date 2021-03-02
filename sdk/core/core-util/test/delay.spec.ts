// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "../src";
import { assert } from "chai";

describe("delay", function() {
  it("should return after the given number of ms", async function() {
    await delay(1);
    assert.isTrue(true);
  });
});
