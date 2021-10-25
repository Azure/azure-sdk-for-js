// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { HttpHeaders } from "../src/httpHeaders";

describe("HttpHeaders", () => {
  it("clone() should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);
    const cloned = headers.clone();

    assert.deepStrictEqual(cloned.headersArray(), headers.headersArray());
  });
});
