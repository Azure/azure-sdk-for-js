// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Sanitizer } from "../src/util/sanitizer";

describe("Sanitizer", function () {
  it("Redacts query parameters in url properties", function () {
    const expected = `{
  "url": "http://example.com/foo?api-version=123&secret=REDACTED"
}`;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize({ url: "http://example.com/foo?api-version=123&secret=42" });
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
});
