// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { buildBaseUrl, buildRequestUrl } from "$internal/client/urlHelpers.js";

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

  it("should only encode the values, ignore the encoding for keys in query parameter", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "1", bar: "two", $maxpagesize: 1, $skip: 2 },
    });

    assert.equal(result, `https://example.org/foo/one?foo=1&bar=two&%24maxpagesize=1&%24skip=2`);
  });

  it("should skip encoding for values in query parameter", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "1", bar: "two", $maxpagesize: 1, $skip: "$_20" },
      skipUrlEncoding: true,
    });

    assert.equal(result, `https://example.org/foo/one?foo=1&bar=two&$maxpagesize=1&$skip=$_20`);
  });

  it("should skip encoding if the client already encoded the parameters", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "%24encoded%20value" }, // the value is already encoded so we could enable the setting skipUrlEncoding
      skipUrlEncoding: true,
    });

    assert.equal(result, `https://example.org/foo/one?foo=%24encoded%20value`);
  });

  it("should enable encoding for values in query parameter", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{id}", ["one"], {
      queryParameters: { foo: "1", bar: "two", $maxpagesize: 1, $skip: "$_20" },
      skipUrlEncoding: false,
    });

    assert.equal(
      result,
      `https://example.org/foo/one?foo=1&bar=two&%24maxpagesize=1&%24skip=%24_20`,
    );
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

  it("should build url with parenthesis", () => {
    const path = "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})";
    const parameters = ["foo", "bar"];
    const result = buildRequestUrl(mockBaseUrl, path, parameters);

    assert.equal(result, `${mockBaseUrl}/certificates(thumbprintAlgorithm=foo,thumbprint=bar)`);
  });

  it("should build url with array queries", () => {
    const testArray = ["ArrayQuery1", "begin!*'();:@ &=+$,/?#[]end", null as any, ""] as string[];
    let result = buildRequestUrl(mockBaseUrl, "/foo?existing=hey", [], {
      queryParameters: {
        arrayQuery: testArray,
      },
    });

    assert.equal(
      result,
      `https://example.org/foo?existing=hey&arrayQuery=ArrayQuery1,begin!*%27()%3B%3A%40%20%26%3D%2B%24%2C%2F%3F%23%5B%5Dend,,`,
    );
    result = buildRequestUrl(mockBaseUrl, "/foo?existing=hey", [], {
      queryParameters: {
        arrayQuery: [],
      },
    });
    assert.equal(result, `https://example.org/foo?existing=hey&arrayQuery=`);
  });

  it("should build url with dashes in path parameters", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo/{settings-name}", ["example"]);

    assert.equal(result, `https://example.org/foo/example`);
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
    assert.equal(result, `https://example.org/foo?foo=%20aaaa&bar=b%3D%20`);
  });

  it("should encode url when skip encoding path parameter", () => {
    const result = buildRequestUrl(mockBaseUrl, "/foo%bar", [], {
      skipUrlEncoding: true,
    });
    assert.equal(result, `https://example.org/foo%bar`);
  });

  it("should handle custom base url", () => {
    const result = buildRequestUrl("https://{accountName}.org", "/foo", [], {
      pathParameters: {
        accountName: "example",
      },
    });
    assert.equal(result, `https://example.org/foo`);
  });

  it("should build base url when enable path parameter encoding", () => {
    const result = buildBaseUrl("https://{accountName}.org", {
      pathParameters: {
        accountName: "foo bar",
      },
    });
    assert.equal(result, "https://foo%20bar.org");
  });

  it("should build base url when skip path parameter encoding", () => {
    const result = buildBaseUrl("https://{accountName}.org", {
      pathParameters: {
        accountName: "foo%bar",
      },
      skipUrlEncoding: true,
    });
    assert.equal(result, "https://foo%bar.org");
  });

  it("allows for path parameters with metadata", () => {
    const result = buildRequestUrl("https://example.org/", "{foo}/", [
      {
        value: "foo",
      },
    ]);

    assert.equal(result, "https://example.org/foo/");
  });

  it("allowReserved in path parameter defaults to false", () => {
    const result = buildRequestUrl("https://example.org/", "{foo}/", [
      {
        value: "foo/bar",
      },
    ]);

    assert.equal(result, "https://example.org/foo%2Fbar/");
  });

  it("allowReserved in path parameter allows special characters in path parameters", () => {
    const result = buildRequestUrl("https://example.org/", "{foo}/", [
      {
        value: "foo/bar",
        allowReserved: true,
      },
    ]);

    assert.equal(result, "https://example.org/foo/bar/");
  });

  it("allows for query parameters with metadata", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: "bar",
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar");
  });

  it("explode defaults to false; style defaults to `form`", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: ["bar", "baz"],
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar,baz");
  });

  it("style `pipeDelimited` works", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: ["bar", "baz"],
          style: "pipeDelimited",
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar|baz");
  });

  it("style `spaceDelimited` works", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: ["bar", "baz"],
          style: "spaceDelimited",
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar%20baz");
  });

  it("objects are handled by decomposing into array of key1,value1,key2,value2...", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: { bar: "aaa", baz: "bbb" },
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar,aaa,baz,bbb");
  });

  it("explode decomposes query parameter array into multiple query parameters", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: ["bar", "baz"],
          explode: true,
        },
      },
    });

    assert.equal(result, "https://example.org/?foo=bar&foo=baz");
  });

  it("explode handles an object", () => {
    const result = buildRequestUrl("https://example.org/", "", [], {
      queryParameters: {
        foo: {
          value: { bar: "aaa", baz: "bbb" },
          explode: true,
        },
      },
    });

    assert.equal(result, "https://example.org/?bar=aaa&baz=bbb");
  });
});
