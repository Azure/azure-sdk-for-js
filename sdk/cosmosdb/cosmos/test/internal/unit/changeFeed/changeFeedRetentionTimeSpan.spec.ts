// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedRetentionTimeSpan } from "../../../../src/client/ChangeFeed/ChangeFeedRetentionTimeSpan";
import assert from "assert";

describe("test ChangeFeedRetentionTimeSpan", function () {
  it("timeSpan should be positive number", async function () {
    try {
      ChangeFeedRetentionTimeSpan.fromMinutes(-5);
      assert.fail("should throw exception");
    } catch (err) {
      assert.equal(err.message, "ChangeFeedRetentionTimeSpan must be a positive number.");
    }
  });
  it("timeSpan granularity should be minutes", async function () {
    try {
      ChangeFeedRetentionTimeSpan.fromMinutes(5.5);
      assert.fail("should throw exception");
    } catch (err) {
      assert.equal(err.message, "Retention's granularity is minutes.");
    }
  });
  it("timeSpan should work correctly", async function () {
    const timeSpan = ChangeFeedRetentionTimeSpan.fromMinutes(5);
    assert.equal(timeSpan.getRetentionInMinutes(), 5);
  });
});
