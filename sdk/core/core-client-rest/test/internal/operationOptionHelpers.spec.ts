// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { operationOptionsToRequestParameters } from "../../src/operationOptionHelpers.js";

describe("operationOptionsToRequestParameters", () => {
  it("should convert empty operation options to request parameters", () => {
    const result = operationOptionsToRequestParameters({});
    assert.isDefined(result);
    assert.isUndefined(result.abortSignal);
    assert.isUndefined(result.onResponse);
    assert.isObject(result);
  });

  it("should pass through abort signal", () => {
    const abortController = new AbortController();
    const result = operationOptionsToRequestParameters({
      abortSignal: abortController.signal,
    });
    assert.equal(result.abortSignal, abortController.signal);
  });
});
