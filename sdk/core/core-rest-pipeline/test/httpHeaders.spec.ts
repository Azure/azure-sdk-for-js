// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createHttpHeaders } from "../src/httpHeaders";

describe("HttpHeaders", () => {
  it("toJSON() should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = createHttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.toJSON(), rawHeaders);
  });

  it("iteration should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = createHttpHeaders(rawHeaders);

    for (const [name, value] of headers) {
      assert.include(rawHeaders, { [name]: value });
    }
  });
});
