// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { buildBaseUrl, buildRequestUrl } from "../../src/client/urlHelpers";
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
      `https://example.org/foo/one?foo=1&bar=two&%24maxpagesize=1&%24skip=%24_20`
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
      `https://example.org/foo?existing=hey&arrayQuery=ArrayQuery1%2Cbegin%21*%27%28%29%3B%3A%40+%26%3D%2B%24%2C%2F%3F%23%5B%5Dend%2C%2C`
    );
    result = buildRequestUrl(mockBaseUrl, "/foo?existing=hey", [], {
      queryParameters: {
        arrayQuery: [],
      },
    });
    assert.equal(result, `https://example.org/foo?existing=hey&arrayQuery=`);
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
});
