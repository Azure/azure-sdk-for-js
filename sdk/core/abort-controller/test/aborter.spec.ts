// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, type AbortSignalLike } from "../src/index.js";
import { assert } from "chai";

describe("AbortSignalLike", () => {
  it("is compatible with the standard AbortSignal", () => {
    const controller = new AbortController();
    const signal: AbortSignalLike = controller.signal;
    assert.isFalse(signal.aborted);
  });
});

describe("AbortError", () => {
  it("sets the name property", () => {
    const error = new AbortError();
    assert.strictEqual(error.name, "AbortError");
  });
});
