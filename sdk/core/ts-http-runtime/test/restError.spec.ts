// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { PipelineRequest, PipelineResponse } from "../src/interfaces.js";
import { createHttpHeaders } from "../src/httpHeaders.js";
import { RestError } from "../src/restError.js";

describe("RestError", function () {
  const request: PipelineRequest = {
    url: "http://example.com/",
    headers: createHttpHeaders(),
  } as PipelineRequest;
  const response: PipelineResponse = {
    request,
    status: 500,
    headers: createHttpHeaders(),
  };

  it("Request and response properties are accessible", function () {
    const error = new RestError("error!", { request, response });
    assert.strictEqual(error.request, request);
    assert.strictEqual(error.response, response);
  });

  it("Request and response properties are non-enumerable", function () {
    const error = new RestError("error!", { request, response });
    const properties = Object.keys(error);
    assert.notInclude(properties, "request");
    assert.notInclude(properties, "response");
  });

  it("Request and response properties do not appear in JSON serialization", function () {
    const error = new RestError("error!", { request, response });
    const json = JSON.stringify(error);
    assert.equal(json, `{"name":"RestError"}`);
  });
});
