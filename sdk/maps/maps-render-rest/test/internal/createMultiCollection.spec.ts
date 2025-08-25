// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createMultiCollection } from "$internal/createMultiCollection.js";
import { describe, it, assert } from "vitest";

describe("createMultiCollection", () => {
  it("should create a multi collection query string", () => {
    const actual = createMultiCollection("foo", ["value1", "value2"]);
    assert.equal(actual, "value1&foo=value2");
  });

  it("should return empty string if the array is empty", () => {
    const actual = createMultiCollection("foo", []);
    assert.equal(actual, "");
  });
});
