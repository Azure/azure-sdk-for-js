// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "../src/index.js";
import { AbortError } from "../src/index.js";
import { describe, it, assert } from "vitest";

describe("AbortSignalLike", () => {
  it("is compatible with the standard AbortSignal", () => {
    const controller = new AbortController();
    const signal: AbortSignalLike = controller.signal;
    assert.isFalse(signal.aborted);
    assert.isUndefined(signal.reason);

    controller.abort("Test reason");
    assert.isTrue(signal.aborted);
    assert.strictEqual(signal.reason, "Test reason");
  });
});

describe("AbortError", () => {
  it("sets the name property", () => {
    const error = new AbortError();
    assert.strictEqual(error.name, "AbortError");
  });
});
