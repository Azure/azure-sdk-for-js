// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";

import { RestError } from "../src/restError.js";
import { RestError as TspRestError } from "@typespec/ts-http-runtime";

describe("RestError", () => {
  it("constructor is TypeSpec RestError", () => {
    assert.strictEqual(RestError, TspRestError as typeof RestError);
  });
});
