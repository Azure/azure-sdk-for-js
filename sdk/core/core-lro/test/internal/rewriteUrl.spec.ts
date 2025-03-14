// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { rewriteUrl } from "../../src/http/utils.js";

describe("rewriteUrl", () => {
  it("should return undefined when the input url is undefined", () => {
    const result = rewriteUrl({ url: undefined, baseUrl: "https://new.example.com" });
    assert.equal(result, undefined);
  });

  it("should return the original url when baseUrl is undefined", () => {
    const originalUrl = "https://old.example.com/path?query=456#hash";
    const result = rewriteUrl({ url: originalUrl, baseUrl: undefined });
    assert.equal(result, originalUrl);
  });

  it("should rewrite an absolute input url with a valid baseUrl", () => {
    const inputUrl = "https://old.example.com/path/to/resource?query=123#section";
    const baseUrl = "https://new.example.com";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "https://new.example.com/path/to/resource?query=123#section");
  });

  it("should rewrite a relative input url with a valid baseUrl", () => {
    const inputUrl = "/relative/path?query=789#frag";
    const baseUrl = "https://new.example.com";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "https://new.example.com/relative/path?query=789#frag");
  });

  it("should handle input urls with no pathname (defaulting to '/')", () => {
    const inputUrl = "https://old.example.com";
    const baseUrl = "https://new.example.com";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "https://new.example.com/");
  });

  it("should throw an error for an invalid baseUrl", () => {
    const inputUrl = "https://old.example.com/path";
    const invalidBaseUrl = "invalidurl";
    assert.throws(() => {
      rewriteUrl({ url: inputUrl, baseUrl: invalidBaseUrl });
    }, /Invalid base URL provided/);
  });

  it("should correctly handle URLs with encoded components", () => {
    const inputUrl = "https://old.example.com/a%20b?query=hello%20world#section%20one";
    const baseUrl = "https://new.example.com";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "https://new.example.com/a%20b?query=hello%20world#section%20one");
  });

  it("should change the protocol from https to http", () => {
    const inputUrl = "https://old.example.com/path/to/resource";
    const baseUrl = "http://new.example.com";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "http://new.example.com/path/to/resource");
  });

  it("should change the port when specified", () => {
    const inputUrl = "https://old.example.com/path";
    const baseUrl = "https://new.example.com:8080";
    const result = rewriteUrl({ url: inputUrl, baseUrl });
    assert.equal(result, "https://new.example.com:8080/path");
  });
});
