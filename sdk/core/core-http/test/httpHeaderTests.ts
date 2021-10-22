// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { HttpHeaders } from "../src/httpHeaders";

describe("HttpHeaders", () => {
  it("rawHeaders() preserves casing of raw header names from constructor", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);

    const actual = headers.rawHeaders();
    assert.deepStrictEqual(actual, rawHeaders);
  });

  it("preserves casing of raw header names from set() calls", () => {
    const expected = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders();
    headers.set("lowercase", "lower case value");
    headers.set("camelCase", "camel case value");
    headers.set("ALLUPPERCASE", "all upper case value");

    const actual = headers.rawHeaders();
    assert.deepStrictEqual(actual, expected);
  });
});
