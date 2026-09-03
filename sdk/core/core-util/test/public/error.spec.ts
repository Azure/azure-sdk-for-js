// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getErrorMessage } from "../../src/index.js";

describe("getErrorMessage", function () {
  it("should return the message of an Error object", function () {
    const error = new Error("test error");
    assert.strictEqual(getErrorMessage(error), "test error");
  });

  it("should stringify a plain object", function () {
    const obj = { code: 42 };
    assert.strictEqual(getErrorMessage(obj), `Unknown error ${JSON.stringify(obj)}`);
  });

  it("should stringify a non-object value", function () {
    assert.strictEqual(getErrorMessage("some string"), "Unknown error some string");
    assert.strictEqual(getErrorMessage(123), "Unknown error 123");
    assert.strictEqual(getErrorMessage(null), "Unknown error null");
    assert.strictEqual(getErrorMessage(undefined), "Unknown error undefined");
  });

  it("should handle objects that throw on JSON.stringify", function () {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    assert.strictEqual(getErrorMessage(circular), "Unknown error [unable to stringify input]");
  });
});
