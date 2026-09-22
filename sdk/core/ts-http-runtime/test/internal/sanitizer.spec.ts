// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { Sanitizer } from "../../src/util/internal.js";

describe("Sanitizer", function () {
  it("Redacts query parameters in url properties", function () {
    const expected = `{
  "url": "http://example.com/foo?api-version=123&secret=REDACTED"
}`;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize({ url: "http://example.com/foo?api-version=123&secret=42" });
    assert.strictEqual(result, expected);
  });

  it("Ignores url of empty string", function () {
    const expected = `{
  "url": ""
}`;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize({ url: "" });
    assert.strictEqual(result, expected);
  });

  it("Handles recursive data structures", function () {
    const recursive: { a: number; b: unknown } = {
      a: 42,
      b: undefined,
    };
    const expected = `{
  "a": 42,
  "b": "[Circular]"
}`;
    recursive.b = recursive;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize(recursive);
    assert.strictEqual(result, expected);
  });

  it("Sanitizes headers even when value is not an object", function () {
    const sanitizer = new Sanitizer();
    // When "headers" is a non-object (e.g. a string), it should pass through
    const result = sanitizer.sanitize({ headers: "not-an-object" });
    assert.strictEqual(result, `{\n  "headers": "not-an-object"\n}`);
  });

  it("Sanitizes url even when value is not a string", function () {
    const sanitizer = new Sanitizer();
    // When "url" is a non-string (e.g. a number), it should pass through
    const result = sanitizer.sanitize({ url: 12345 });
    assert.strictEqual(result, `{\n  "url": 12345\n}`);
  });

  it("Sanitizes query even when value is not an object", function () {
    const sanitizer = new Sanitizer();
    // When "query" is a non-object (e.g. a string), it should pass through
    const result = sanitizer.sanitize({ query: "not-an-object" });
    assert.strictEqual(result, `{\n  "query": "not-an-object"\n}`);
  });
});
