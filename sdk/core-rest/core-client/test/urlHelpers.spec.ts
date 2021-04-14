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
});
