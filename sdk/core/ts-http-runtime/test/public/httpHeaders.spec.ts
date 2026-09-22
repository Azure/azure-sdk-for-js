// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHttpHeaders } from "../../src/index.js";

describe("HttpHeaders", () => {
  it("toJSON() should use normalized header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value",
    };
    const normalizedHeaders = {
      lowercase: "lower case value",
      camelcase: "camel case value",
      alluppercase: "all upper case value",
    };
    const headers = createHttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.toJSON(), normalizedHeaders);
  });

  it("toJSON({preserveCase: true}) should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value",
    };
    const headers = createHttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.toJSON({ preserveCase: true }), rawHeaders);
  });

  it("iteration should use original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value",
    };
    const headers = createHttpHeaders(rawHeaders);

    for (const [name, value] of headers) {
      assert.include(rawHeaders, { [name]: value });
    }
  });

  it("should remove leading and trailing whitespace in values", () => {
    const rawHeaders = {
      withLeadingWhitespace: "  value1",
      withTrailingWhitespace: "value2   ",
      withLeadingAndTrialingWhitespace: " value3 ",
    };
    const headers = createHttpHeaders(rawHeaders);

    const expected = {
      withLeadingWhitespace: "value1",
      withTrailingWhitespace: "value2",
      withLeadingAndTrialingWhitespace: "value3",
    };
    for (const [name, value] of headers) {
      assert.include(expected, { [name]: value });
    }
  });

  it("should strip CR and LF characters from values to prevent obs-fold (RFC 7230 §3.2.4)", () => {
    const rawHeaders = {
      withCRLF: "value1\r\ninjected: bad",
      withCR: "val\rue2",
      withLF: "val\nue3",
      withTrailingCRLF: "value4\r\n",
    };
    const headers = createHttpHeaders(rawHeaders);

    const expected = {
      withCRLF: "value1injected: bad",
      withCR: "value2",
      withLF: "value3",
      withTrailingCRLF: "value4",
    };
    for (const [name, value] of headers) {
      assert.include(expected, { [name]: value });
    }
  });
});
