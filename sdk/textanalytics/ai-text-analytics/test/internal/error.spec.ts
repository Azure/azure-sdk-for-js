// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { makeTextAnalyticsErrorResult } from "../../src/textAnalyticsResult";

describe("makeTextAnalyticsErrorResult", function () {
  it("single-layer error is transposed", () => {
    const result = makeTextAnalyticsErrorResult("1", {
      code: "ServiceUnavailable",
      message: "internal server error",
      details: [],
    });

    assert.deepEqual(result, {
      id: "1",
      error: {
        code: "ServiceUnavailable",
        message: "internal server error",
        target: undefined,
      },
    });
  });

  it("innerError must take precedence", () => {
    const result = makeTextAnalyticsErrorResult("2", {
      code: "InvalidRequest",
      message: "This is an error message",
      innererror: {
        code: "MissingInputRecords",
        message: "This is a deeper error message",
        target: "a target",
      },
    });

    assert.deepEqual(result, {
      id: "2",
      error: {
        code: "MissingInputRecords",
        message: "This is a deeper error message",
        target: "a target",
      },
    });
  });
});
