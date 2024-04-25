// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { isOpenAIError } from "../../src/api/util.js";
import { OpenAIError } from "../../src/models/models.js";
import { RestError } from "@azure/core-rest-pipeline";

describe("isOpenAIError", () => {
  it("should recognize OpenAI Error", () => {
    const openAIError = new OpenAIError("An OpenAI error message", "error_param", "error_type");
    assert.isTrue(isOpenAIError(openAIError));
  });

  it("should return false for Rest Error", () => {
    const restError = new RestError("A rest error message");
    assert.isFalse(isOpenAIError(restError));
  });
});
