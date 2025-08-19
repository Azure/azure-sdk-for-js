// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";

import { isRestError, RestError } from "../src/restError.js";
import { RestError as TspRestError } from "@typespec/ts-http-runtime";

describe("RestError", () => {
  it("constructor is TypeSpec RestError", () => {
    assert.strictEqual(RestError, TspRestError as typeof RestError);
  });

  it("any constructed core-rest-pipeline RestError is a TypeSpec RestError", () => {
    const error = new RestError("test error");
    assert.instanceOf(error, TspRestError);
  });

  it("any constructed TypeSpec RestError is a core-rest-pipeline RestError", () => {
    const tspError = new TspRestError("test error");
    assert.instanceOf(tspError, RestError);
  });

  it("isRestError is true for core-rest-pipeline RestError", () => {
    const error = new RestError("test error");
    assert.isTrue(isRestError(error));
  });

  it("isRestError is true for TypeSpec RestError", () => {
    const tspError = new TspRestError("test error");
    assert.isTrue(isRestError(tspError));
  });
});
