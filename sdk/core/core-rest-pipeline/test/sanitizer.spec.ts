// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { createSanitizerAllowedValues, sanitizeObject } from "../src/util/sanitizer.js";

describe("Sanitizer", function () {
  it("Redacts query parameters in url properties", function () {
    const expected = `{
  "url": "http://example.com/foo?api-version=123&secret=REDACTED"
}`;
    const result = sanitizeObject({ url: "http://example.com/foo?api-version=123&secret=42" });
    assert.strictEqual(result, expected);
  });

  it("Respects additionally allowed query parameters", function () {
    const allowedValues = createSanitizerAllowedValues({
      additionalAllowedQueryParameters: ["secret"],
    });
    const expected = `{
  "url": "http://example.com/foo?api-version=123&secret=42"
}`;
    const result = sanitizeObject(
      { url: "http://example.com/foo?api-version=123&secret=42" },
      allowedValues,
    );
    assert.strictEqual(result, expected);
  });

  it("Respects additionally allowed header values", function () {
    const allowedValues = createSanitizerAllowedValues({
      additionalAllowedHeaderNames: ["dontSanitizeMe"],
    });
    const expected = `{
  "headers": {
    "sanitizeMe": "REDACTED",
    "dontSanitizeMe": "value",
    "User-Agent": "blah"
  }
}`;
    const result = sanitizeObject(
      {
        headers: {
          sanitizeMe: "value",
          dontSanitizeMe: "value",
          "User-Agent": "blah",
        },
      },
      allowedValues,
    );
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
    const result = sanitizeObject(recursive);
    assert.strictEqual(result, expected);
  });
});
