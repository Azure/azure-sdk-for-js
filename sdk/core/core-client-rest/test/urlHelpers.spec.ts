// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildRequestUrl } from "../src/urlHelpers";
import { assert } from "chai";

describe("urlHelpers", () => {
  const mockBaseUrl = "https://example.org";

  it("should handle double forward slashes", () => {
    const result = buildRequestUrl(`${mockBaseUrl}/`, "/foo/{id}", ["one"]);

    assert.equal(result, `https://example.org/foo/one`);
  });

  it("should append path and fill path parameters", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"]);

    assert.equal(result, `https://example.org/foo/one`);
  });

  it("should append path, fill path parameters and append query parameters", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "1", bar: "two" },
    });

    assert.equal(result, `https://example.org/foo/one?foo=1&bar=two`);
  });

  it("should append date query parameter as ISO string", () => {
    const start = new Date("2021-06-25T07:00:00.000Z");
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "1", start },
    });
    assert.equal(result, "https://example.org/foo/one?foo=1&start=2021-06-25T07%3A00%3A00.000Z");
  });

  it("should append path and append query parameters", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo", [], {
      queryParameters: { foo: "1", bar: "two" },
    });

    assert.equal(result, `https://example.org/foo?foo=1&bar=two`);
  });

  it("should append query parameters to an url with existing params", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo?existing=hey", [], {
      queryParameters: { foo: "1", bar: "two" },
    });

    assert.equal(result, `https://example.org/foo?existing=hey&foo=1&bar=two`);
  });

  it("should handle full urls as path", () => {
    const result = buildRequestUrl(mockBaseUrl, "https://example2.org", []);
    assert.equal(result, `https://example2.org`);
  });

  it("should encode url when enable path parameter encoding", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo bar", []);
    assert.equal(result, `https://example.org/foo%20bar`);
  });

  it("should encode url when enable query parameter encoding", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo", [], {
      queryParameters: { foo: " aaaa", bar: "b= " },
    });
    assert.equal(result, `https://example.org/foo?foo=+aaaa&bar=b%3D+`);
  });

  it("should encode url when skip encoding path parameter", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo%bar", [], {
      skipUrlEncoding: true,
    });
    assert.equal(result, `https://example.org/foo%bar`);
  });
});
