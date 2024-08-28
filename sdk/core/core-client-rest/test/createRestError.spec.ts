// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRestError } from "../src/restError.js";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert } from "vitest";

describe("createRestError", () => {
  it("should create a rest error from a PathUnchecked response with standard error", () => {
    const response = {
      status: "400",
      headers: {},
      request: {} as PipelineRequest,
      body: {
        error: {
          code: "code",
          message: "message",
        },
      },
    };
    const error = createRestError(response);
    assert.equal(error.statusCode, 400);
    assert.equal(error.code, "code");
    assert.equal(error.message, "message");
  });

  it("should create a rest error from an error message and a PathUnchecked response with standard error", () => {
    const response = {
      status: "400",
      headers: {},
      request: {} as PipelineRequest,
      body: {
        error: {
          code: "code",
          message: "message",
        },
      },
    };
    const error = createRestError("error message", response);
    assert.equal(error.statusCode, 400);
    assert.equal(error.code, "code");
    assert.equal(error.message, "error message");
  });

  it("should create a rest error from a PathUnchecked response with non-standard error", () => {
    const response = {
      status: "400",
      headers: {},
      request: {} as PipelineRequest,
      body: {
        code: "code",
        message: "message",
      },
    };
    const error = createRestError(response);
    assert.equal(error.statusCode, 400);
    assert.equal(error.code, "code");
    assert.equal(error.message, "message");
  });

  it("should create a rest error from an error message and a PathUnchecked response with standard error", () => {
    const response = {
      status: "400",
      headers: {},
      request: {} as PipelineRequest,
      body: {
        code: "code",
        message: "message",
      },
    };
    const error = createRestError("error message", response);
    assert.equal(error.statusCode, 400);
    assert.equal(error.code, "code");
    assert.equal(error.message, "error message");
  });
});
