// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { isLoopbackAddress } from "../src/util/utils.js";

describe("isLoopbackAddress", () => {
  it("returns true for localhost", () => {
    assert.isTrue(isLoopbackAddress("sb://localhost"));
  });

  it("returns true for 127-prefix addresses", () => {
    assert.isTrue(isLoopbackAddress("sb://127.0.0.1"));
    assert.isTrue(isLoopbackAddress("sb://127.0.0.2"));
  });

  it("returns true for 0:0:0:0:0:1", () => {
    assert.isTrue(isLoopbackAddress("sb://0:0:0:0:0:1"));
  });

  it("returns true for ::1", () => {
    assert.isTrue(isLoopbackAddress("sb://::1"));
  });

  it("returns true for localhost with missing scheme", () => {
    assert.isTrue(isLoopbackAddress("localhost"));
  });

  it("returns false for other addresses", () => {
    assert.isFalse(isLoopbackAddress("sb://test.servicebus.windows.net"));
  });
});
