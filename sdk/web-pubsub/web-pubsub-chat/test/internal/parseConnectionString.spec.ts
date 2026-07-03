// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseConnectionString } from "../../src/parseConnectionString.js";
import { describe, it, assert } from "vitest";

describe("parseConnectionString", () => {
  it("parses a valid connection string", () => {
    const result = parseConnectionString(
      "Endpoint=https://example.webpubsub.azure.com;AccessKey=ABCDEFG=",
    );
    assert.equal(result.endpoint, "https://example.webpubsub.azure.com");
    assert.equal(result.accessKey, "ABCDEFG=");
  });

  it("parses with extra whitespace", () => {
    const result = parseConnectionString(
      "  Endpoint = https://example.webpubsub.azure.com ; AccessKey = key123 ",
    );
    assert.equal(result.endpoint, "https://example.webpubsub.azure.com");
    assert.equal(result.accessKey, "key123");
  });

  it("is case-insensitive for keys", () => {
    const result = parseConnectionString("endpoint=https://host.com;accesskey=myKey");
    assert.equal(result.endpoint, "https://host.com");
    assert.equal(result.accessKey, "myKey");
  });

  it("handles AccessKey with equals signs", () => {
    const result = parseConnectionString("Endpoint=https://host.com;AccessKey=abc+def/ghi==");
    assert.equal(result.endpoint, "https://host.com");
    assert.equal(result.accessKey, "abc+def/ghi==");
  });

  it("throws when Endpoint is missing", () => {
    assert.throws(() => parseConnectionString("AccessKey=myKey"), /Endpoint/);
  });

  it("throws when AccessKey is missing", () => {
    assert.throws(() => parseConnectionString("Endpoint=https://host.com"), /AccessKey/);
  });

  it("throws for empty string", () => {
    assert.throws(() => parseConnectionString(""), /Endpoint/);
  });
});
