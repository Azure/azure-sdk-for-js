// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { getYieldedValue } from "../src/getYieldedValue.js";

describe("getYieldedValue", () => {
  it("returns the yielded value", () => {
    const iteratorResult = { done: false, value: "foo" };
    assert.equal(getYieldedValue(iteratorResult), "foo");
  });

  it("throws if the iterator is done", () => {
    const iteratorResult = { done: true, value: "foo" };
    assert.throws(() => getYieldedValue(iteratorResult), /Expected an item but did not get any/);
  });
});
