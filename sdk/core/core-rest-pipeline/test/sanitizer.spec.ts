// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { Sanitizer } from "../src/util/sanitizer.js";
import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";

describe("Sanitizer", function () {
  it("Redacts query parameters in url properties", function () {
    const expected = `{
  "url": "http://example.com/foo?api-version=123&secret=REDACTED"
}`;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize({ url: "http://example.com/foo?api-version=123&secret=42" });
    assert.strictEqual(result, expected);
  });

  it("Ignores url of empty string", function () {
    const expected = `{
  "url": ""
}`;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize({ url: "" });
    assert.strictEqual(result, expected);
  });

  it("Handles recursive data structures", function () {
    const recursive: { a: number; b: unknown } = {
      a: 42,
      b: undefined,
    };
    const expected = `{
  "a": 42,
  "b": "[Circular]"
}`;
    recursive.b = recursive;
    const sanitizer = new Sanitizer();
    const result = sanitizer.sanitize(recursive);
    assert.strictEqual(result, expected);
  });

  it("Sanitizes a PipelineRequest", function () {
    const request = createPipelineRequest({
      url: "http://example.com/foo?api-version=123&secret=42",
      headers: createHttpHeaders({
        "secret-header": "remove-me",
      }),
      body: "aaa",
    });

    const sanitizer = new Sanitizer();
    const sanitizedRequest = sanitizer.sanitizePipelineRequest(request);
    assert.equal(sanitizedRequest.url, "http://example.com/foo?api-version=123&secret=REDACTED");
    assert.deepEqual(sanitizedRequest.headers, createHttpHeaders({ "secret-header": "REDACTED" }));
  });

  it("Sanitizes a PipelineResponse", function () {
    const request = createPipelineRequest({
      url: "http://example.com/foo?api-version=123&secret=42",
      headers: createHttpHeaders({
        "secret-header": "remove-me",
      }),
      body: "aaa",
    });

    const response: PipelineResponse = {
      request,
      headers: createHttpHeaders({
        "secret-header": "remove",
      }),
      status: 200,
    };

    const sanitizer = new Sanitizer();
    const sanitizedResponse = sanitizer.sanitizePipelineResponse(response);

    assert.equal(
      sanitizedResponse.request.url,
      "http://example.com/foo?api-version=123&secret=REDACTED",
    );
    assert.deepEqual(
      sanitizedResponse.request.headers,
      createHttpHeaders({ "secret-header": "REDACTED" }),
    );
    assert.deepEqual(sanitizedResponse.headers, createHttpHeaders({ "secret-header": "REDACTED" }));
  });
});
