// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createHttpHeaders } from "../src/httpHeaders";

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
});
