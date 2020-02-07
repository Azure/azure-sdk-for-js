// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { makeTextAnalyticsErrorResult } from "../src/textAnalyticsResult";
import { ErrorCodeValue, InnerErrorCodeValue } from "../src/generated/models";

/**
 * Works around an issue with the swagger models and casing
 */
function cap<T extends ErrorCodeValue | InnerErrorCodeValue>(code: T): T {
  return (code.charAt(0).toUpperCase() + code.slice(1)) as T;
}

describe("makeTextAnalyticsErrorResult", function() {
  it("single-layer error is transposed", () => {
    const result = makeTextAnalyticsErrorResult("1", {
      code: cap("serviceUnavailable"),
      message: "internal server error",
      details: []
    });

    assert.deepEqual(result, {
      id: "1",
      error: {
        code: "ServiceUnavailable",
        message: "internal server error",
        target: undefined
      }
    });
  });

  it("innerError must take precedence", () => {
    const result = makeTextAnalyticsErrorResult("2", {
      code: cap("invalidRequest"),
      message: "This is an error message",
      innerError: {
        code: cap("missingInputRecords"),
        message: "This is a deeper error message",
        target: "a target"
      }
    });

    assert.deepEqual(result, {
      id: "2",
      error: {
        code: "MissingInputRecords",
        message: "This is a deeper error message",
        target: "a target"
      }
    });
  });
});
