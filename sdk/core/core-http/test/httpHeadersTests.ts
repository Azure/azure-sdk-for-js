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

  it("toJson() should use normalized header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const normalizedHeaders = {
      lowercase: "lower case value",
      camelcase: "camel case value",
      alluppercase: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.toJson(), normalizedHeaders);
  });

  it("toJson({preserveCase: true}) should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.toJson({ preserveCase: true }), rawHeaders);
  });

  it("rawHeaders() should keep the original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);

    assert.deepStrictEqual(headers.rawHeaders(), rawHeaders);
  });

  it("iteration should use original header names", () => {
    const rawHeaders = {
      lowercase: "lower case value",
      camelCase: "camel case value",
      ALLUPPERCASE: "all upper case value"
    };
    const headers = new HttpHeaders(rawHeaders);
    headers.headersArray().forEach((pair) => {
      assert.include(rawHeaders, { [pair.name]: pair.value });
    });
  });
});
